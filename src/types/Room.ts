/**
 * limbo groups rooms into 5 different types:
 * - `Space` is for actual Matrix spaces
 * - `Channel` is for rooms within spaces
 * - `Direct` is for rooms contained within the `m.direct` data
 * - `Public` is for rooms that have an alias and don't fit the above
 * - `Group` is for any other room containing 2+ users
 */
export enum RoomType {
  Space,
  Channel,
  Direct,
  Public,
  Group,
}
