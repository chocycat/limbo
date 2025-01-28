export const useRandom = () => ({
  randomHex: (length = 16) =>
    [...Array(length)]
      .map(() => Math.floor(Math.random() * 16).toString(16))
      .join(''),
});
