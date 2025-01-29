import type { RoomMember } from 'matrix-js-sdk';

export function useMatrixUser() {
  const { client } = storeToRefs(useMatrix());

  function getSelf() {
    return client.value?.getUser(client.value.getUserId()!);
  }

  function getAvatar(user?: RoomMember, size = 32) {
    const url = user?.getMxcAvatarUrl();
    if (!client.value || !url) return null;

    const s = Math.floor(size * window.devicePixelRatio);
    return client.value.mxcUrlToHttp(
      url,
      s,
      s,
      'crop',
      undefined,
      false,
      false
    );
  }

  return { getSelf, getAvatar };
}
