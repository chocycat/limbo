import { Buffer } from 'buffer';

export default defineNuxtPlugin(() => {
  global.Buffer = Buffer;
});
