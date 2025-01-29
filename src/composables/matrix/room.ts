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

    if (room.getCanonicalAlias()) {
      return RoomType.Public;
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

  /** Checks if the current user is the only one inside of the room */
  function isRoomPersonal(room: Room): boolean {
    const members = room.getMembers();
    return (
      members.length === 1 && members[0].userId === client.value?.getUserId()
    );
  }

  return { getRoomType, isRoomDM, isRoomPersonal };
}
