import type { MatrixClient } from 'matrix-js-sdk';
import type { SavedHomeserver } from '~/types/Homeserver';
import * as sdk from 'matrix-js-sdk';
import { deriveRecoveryKeyFromPassphrase } from 'matrix-js-sdk/lib/crypto-api';
import { VerificationMethod } from 'matrix-js-sdk/lib/types';
import AuthVerificationPassphrase from '~/components/Auth/Verification/Passphrase.vue';

export const useMatrix = defineStore('matrix', () => {
  const { openModal } = useModal();
  const { secretStorageKeyBindings } = storeToRefs(useInterface());

  const savedHomeservers = useLocalStorage<Array<SavedHomeserver>>(
    'matrix/homeservers',
    [
      {
        name: 'matrix.org',
        url: 'https://matrix.org',
        description: 'The biggest public homeserver on Matrix.',
        featured: true,
      },
    ]
  );
  const homeserver = useLocalStorage<SavedHomeserver>(
    'matrix/homeserver',
    null,
    {
      serializer: {
        read(raw) {
          try {
            return JSON.parse(raw);
          } catch {
            return raw;
          }
        },
        write(value) {
          return JSON.stringify(value);
        },
      },
    }
  );

  // TODO: consider encrypting this
  const accessToken = useLocalStorage<string>('matrix/token', null);
  const deviceId = useLocalStorage<string>('matrix/deviceId', null);

  /** Whether the user skipped verification for this device */
  const skippedVerification = useLocalStorage<boolean>(
    'matrix/skippedVerification',
    false
  );

  const indexedDB = ref<sdk.IndexedDBStore>();
  const client = ref<MatrixClient>();

  const loginFlows = ref<sdk.LoginFlow[]>();
  const status = ref<'idle' | 'connecting' | 'syncing' | 'ready'>('idle');

  /** Cache keys so the user won't be asked to enter it each and every time */
  const secretStorageKeyCache = ref<
    Record<
      string,
      { key: Uint8Array; info: sdk.SecretStorage.SecretStorageKeyDescription }
    >
  >({});

  /**
   * Initializes the client and other information.
   *
   * This should be called *before* the user signed in.
   */
  async function initMatrix() {
    await initializeClient();
    await fetchLoginFlows();
  }

  /**
   * Initializes the Matrix client.
   */
  async function initializeClient() {
    if (!homeserver.value)
      throw fail('Cannot create client if no homeserver is selected.');

    status.value = 'connecting';

    try {
      indexedDB.value = new sdk.IndexedDBStore({
        dbName: 'sync-store',
        indexedDB: global.indexedDB,
        localStorage: global.localStorage,
      });

      client.value = sdk.createClient({
        baseUrl: homeserver.value.url,
        accessToken: accessToken.value || undefined,
        deviceId: deviceId.value || undefined,
        verificationMethods: [VerificationMethod.Sas],
        timelineSupport: true,
        cryptoStore: new sdk.IndexedDBCryptoStore(
          global.indexedDB,
          'crypto-store'
        ),
        store: indexedDB.value,
        cryptoCallbacks: {
          getSecretStorageKey: async ({ keys }) => {
            return new Promise(async (resolve, reject) => {
              if (!client.value) {
                reject(
                  new Error(
                    'No Matrix client found when resolving secret storage key.'
                  )
                );
                return;
              }

              let keyId = await client.value!.secretStorage.getDefaultKeyId();
              let keyInfo!: sdk.SecretStorage.SecretStorageKeyDescription;

              if (keyId) {
                keyInfo = keys[keyId];
                if (!keyInfo) keyId = null;
              }

              if (!keyId) {
                const keyInfoEntries = Object.entries(keys);
                if (keyInfoEntries.length > 1) {
                  throw new Error(
                    'Multiple storage key requests not implemented'
                  );
                }
                [keyId, keyInfo] = keyInfoEntries[0];
              }

              // publish props
              if (!secretStorageKeyBindings.value.props) {
                secretStorageKeyBindings.value.props = {
                  verify: async (phrase) => {
                    return client.value!.secretStorage.checkKey(
                      await deriveKey(phrase),
                      keyInfo
                    );
                  },
                  onSubmit: async (phrase) => {
                    const key = await deriveKey(phrase);
                    secretStorageKeyCache.value[keyId] = { info: keyInfo, key };

                    resolve([keyId, key]);
                    secretStorageKeyBindings.value.accepting = false;
                  },
                };
              }

              const deriveKey = async (phrase: string) =>
                deriveRecoveryKeyFromPassphrase(
                  phrase,
                  keyInfo.passphrase.salt,
                  keyInfo.passphrase.iterations
                );

              const cached = secretStorageKeyCache.value[keyId];
              if (cached) {
                resolve([keyId, cached.key]);
                return;
              }

              if (secretStorageKeyBindings.value.bound) {
                // use the UI bindings and wait for a response
                secretStorageKeyBindings.value.accepting = true;
              } else {
                // open a modal
                openModal({
                  component: AuthVerificationPassphrase,
                  props: secretStorageKeyBindings.value.props,
                  closable: false,
                });
              }
            });
          },
          cacheSecretStorageKey(keyId, keyInfo, key) {
            secretStorageKeyCache.value[keyId] = { info: keyInfo, key };
          },
        },
      });
    } catch (e) {
      throw fail((e as Error).message);
    }

    try {
      const versions = await client.value.getVersions();
      if (!versions || !versions.versions.length)
        throw fail(
          `Homeserver (${homeserver.value.name}) does not seem to be a valid Matrix homeserver.`
        );
    } catch (e) {
      throw fail((e as Error).message);
    }

    if (accessToken.value) {
      // Try to login and skip manual authentication
      try {
        await startClient();
      } catch {}
    } else {
      status.value = 'idle';
    }

    function fail(message: string) {
      unsetCurrentHomeserver();
      return new Error(message);
    }
  }

  async function startClient() {
    if (!client.value) return;

    await registerGlobalEvents();

    const { user_id: userId } = await client.value.whoami();
    client.value.credentials.userId = userId;

    status.value = 'syncing';

    try {
      await client.value.initRustCrypto();
    } catch (e) {
      console.error('Failed to init crypto:', e);
    }

    await indexedDB.value!.startup();
    await client.value.startClient();
  }

  async function registerGlobalEvents() {
    if (!client.value) return;

    client.value.once(sdk.ClientEvent.Sync, async (state) => {
      if (state === 'PREPARED') {
        status.value = 'ready';

        if (!(await isVerified())) navigateTo('/auth/verification');
        else navigateTo('/app');
      }
    });
  }

  async function fetchLoginFlows() {
    if (!client.value) return;
    const flows = await client.value.loginFlows();

    if (flows?.flows) {
      loginFlows.value = flows.flows;
    }

    return flows.flows;
  }

  async function verifyHomeserver(url: string): Promise<boolean> {
    try {
      const tempClient = sdk.createClient({ baseUrl: url });
      const versions = await tempClient.getVersions();
      if (!versions || !versions.versions.length) return false;
    } catch {
      return false;
    }

    return true;
  }

  /** Returns whether the current device is verified. */
  async function isVerified() {
    if (!client.value) return false;

    const crypto = client.value.getCrypto();
    if (!crypto) return false;

    const verificationStatus = await crypto.getDeviceVerificationStatus(
      client.value.getUserId()!,
      deviceId.value
    );

    return verificationStatus?.crossSigningVerified || false;
  }

  function addHomeserver(url: string, favorite = false) {
    savedHomeservers.value.push({
      name: new URL(url).host,
      url,
      favorite,
    });
  }

  function setCurrentHomeserver(url: string) {
    let _homeserver = savedHomeservers.value.find(
      (homeserver) => homeserver.url === url
    );

    if (!homeserver) {
      // Save the homeserver
      const host = new URL(url).host;
      const newHomeserver = { name: host, url };
      savedHomeservers.value.push(newHomeserver);
      _homeserver = newHomeserver;
    }

    homeserver.value = _homeserver!;
  }

  function unsetCurrentHomeserver() {
    homeserver.value = undefined;
    client.value = undefined;
    accessToken.value = null;
    status.value = 'idle';
  }

  return {
    client,
    accessToken,
    deviceId,
    homeserver,
    savedHomeservers,
    loginFlows,
    status,
    skippedVerification,
    initMatrix,
    startClient,
    fetchLoginFlows,
    addHomeserver,
    setCurrentHomeserver,
    unsetCurrentHomeserver,
    verifyHomeserver,
    initializeClient,
    isVerified,
  };
});

export * from './matrix/room';
export * from './matrix/user';
export * from './matrix/event';
