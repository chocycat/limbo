import type { MatrixClient } from 'matrix-js-sdk';
import type { SavedHomeserver } from '~/types/Homeserver';
import * as sdk from 'matrix-js-sdk';

export const useMatrix = defineStore('matrix', () => {
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
  const homeserver = ref<SavedHomeserver>();
  const client = ref<MatrixClient>();

  async function initalizeClient() {
    if (!homeserver.value)
      throw fail('Cannot create client if no homeserver is selected.');

    try {
      client.value = sdk.createClient({ baseUrl: homeserver.value.url });
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

    function fail(message: string) {
      homeserver.value = undefined;
      client.value = undefined;
      return new Error(message);
    }
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

  return {
    client,
    homeserver,
    savedHomeservers,
    setCurrentHomeserver,
    initalizeClient,
  };
});
