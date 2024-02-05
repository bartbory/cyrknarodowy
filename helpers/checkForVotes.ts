import type { UserData } from "~/types/types";
export default function checkIfVoteExist(
  usersArray: UserData[],
  userId: string
): boolean {
  if (usersArray.length < 1) {
    return false;
  } else {
    if (usersArray.find((user) => user.id === userId)) {
      return true;
    } else {
      return false;
    }
  }
}
