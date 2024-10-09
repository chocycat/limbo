export default defineNuxtPlugin(() => {
  const stackStore = useStackNavigation();
  const { platform } = usePlatform();

  if (platform === 'mobile') {
    addRouteMiddleware(
      'stack-navigation',
      (to, from) => {
        const toPath = normalizePath(to.path);
        const fromPath = normalizePath(from.path);

        if (toPath === fromPath) return;

        const currentIndex = stackStore.stack.findIndex(
          (item) => normalizePath(item.path) === toPath
        );

        if (currentIndex === -1) {
          stackStore.push(toPath);
        } else {
          stackStore.popToIndex(currentIndex);
        }
      },
      { global: true }
    );
  }

  return {
    provide: {
      stackNavigate: (path: string) => navigateTo(path),
      stackGoBack: () => {
        const currentIndex = stackStore.stack.findIndex(
          (item) => item.path === stackStore.currentRoute
        );
        if (currentIndex > 0) {
          return navigateTo(stackStore.stack[currentIndex - 1].path);
        }
      },
    },
  };
});

function normalizePath(path: string) {
  // remove the trailing slash
  if (path.endsWith('/')) path = path.slice(0, path.length - 1);

  return path;
}
