import type { SavedHomeserver } from '~/types/Homeserver';

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
  const homeserver = ref<SavedHomeserver>(savedHomeservers.value[0] || null);

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

  return { homeserver, savedHomeservers, setCurrentHomeserver };
});
