import type { CapacitorConfig } from '@capacitor/cli';
import { networkInterfaces } from 'os';

// During the loading of this config file, we can't get the
// port Vite uses, so we must guess.
//
// If you run Nuxt on a different port, you need to specify the
// PORT environment variable here, too.
const PORT = process.env.PORT || 3000;

function getIP() {
  const interfaces = networkInterfaces();

  for (const name of Object.keys(interfaces)) {
    if (!interfaces[name]) continue;

    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }

  // This is probably not gonna work, but we should try it anyways
  return 'localhost';
}

const config: CapacitorConfig = {
  appId: 'dev.chocycat.limbo',
  appName: 'limbo',
  webDir: 'dist',
  server: {
    url: `http://${getIP()}:${PORT}`,
    cleartext: true,
  }
};

export default config;
