export function useMatrixUser() {
  const { client } = storeToRefs(useMatrix());

  function getSelf() {
    return client.value?.getUser(client.value.getUserId()!);
  }

  return { getSelf };
}
