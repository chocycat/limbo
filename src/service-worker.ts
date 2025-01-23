/// <reference lib="webworker" />

declare var self: ServiceWorkerGlobalScope;

const MATRIX_PATH_DL = '/_matrix/media/v3/download';
const MATRIX_PATH_THUMB = '/_matrix/media/v3/thumbnail';
const MATRIX_SERVER_SUPPORT_CACHE: Record<
  string,
  { authenticatedMedia: boolean; expiry: number }
> = {};

self.addEventListener('install', (event) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);
  const { pathname, origin } = url;

  if (
    !pathname.startsWith(MATRIX_PATH_DL) &&
    !pathname.startsWith(MATRIX_PATH_THUMB)
  )
    return;

  // We proxy the request and insert the access token if authenticated media is needed.
  event.respondWith(
    (async (): Promise<Response> => {
      const client = await self.clients.get(event.clientId);
      if (!client) throw new Error('Failed to get target client');

      const auth = await getAuth(client);
      const { origin: hsOrigin } = new URL(auth.homeserver);

      if (origin !== hsOrigin)
        throw new Error(
          'Origin check failed between media endpoint and homeserver'
        );

      if (
        (await getServerSupport(hsOrigin, auth?.accessToken))
          .authenticatedMedia &&
        auth?.accessToken
      )
        url.href = url.href.replace(
          /\/media\/v3\/(.*)\//,
          '/client/v1/media/$1/'
        ); // replace URL with authenticated version

      return fetch(url, getRequestHeaders(auth?.accessToken));
    })()
  );
});

async function getServerSupport(url: string, accessToken?: string) {
  const cached = MATRIX_SERVER_SUPPORT_CACHE[url];
  if (cached?.expiry > new Date().getTime()) return cached;

  const config = getRequestHeaders(accessToken);
  const versions = await (
    await fetch(`${url}/_matrix/client/versions`, config)
  ).json();

  MATRIX_SERVER_SUPPORT_CACHE[url] = {
    authenticatedMedia: versions?.versions.includes('v1.11') || false,
    expiry: new Date().getTime() + 2 * 60 * 60 * 1000, // 2 hours
  };

  return MATRIX_SERVER_SUPPORT_CACHE[url];
}

async function getAuth(
  client: Client
): Promise<{ accessToken: string; homeserver: string }> {
  return new Promise((resolve, reject) => {
    const messageId = `limbo_${Math.random().toString(36)}`;
    const timeout = setTimeout(
      () => reject(new Error('Timeout when asking for authentication info')),
      1000
    );

    const listener = (event: ExtendableMessageEvent): void => {
      if (event.data?.messageId !== messageId) return;

      clearTimeout(timeout);
      resolve(event.data);
      self.removeEventListener('message', listener);
    };

    self.addEventListener('message', listener);

    // TODO: get rid of magic string
    client.postMessage({ messageId, request: 'sw_getAuth' });
  });
}

function getRequestHeaders(accessToken?: string) {
  return accessToken
    ? { headers: { Authorization: `Bearer ${accessToken}` } }
    : undefined;
}

export default null;
