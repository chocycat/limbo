import { Direction, EventTimeline, RoomMember, type Room } from 'matrix-js-sdk';
import { RoomType } from '~/types/Room';

export function useMatrixRoom() {
  const { client } = storeToRefs(useMatrix());

  function getRoomType(room: Room): RoomType {
    if (room.isSpaceRoom()) return RoomType.Space;
    if (isRoomDM(room)) return RoomType.Direct;

    const spaceParents = room
      .getLiveTimeline()
      .getState(Direction.Forward)
      ?.getStateEvents('m.space.parent');
    if (spaceParents && spaceParents.length > 0) {
      return RoomType.Channel;
    }

    return RoomType.Group;
  }

  function isRoomDM(room: Room): boolean {
    const directRooms = client.value!.getAccountData('m.direct')?.getContent();
    if (
      directRooms &&
      Object.values(directRooms).some((rooms) => rooms.includes(room.roomId))
    )
      return true;

    return false;
  }

  return { getRoomType, isRoomDM };
}
