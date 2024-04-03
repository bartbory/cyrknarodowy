import type { GovernmentVoteType, ReferendumVoteType } from "~/types/types";

export default function checkHasVotedOnList(
  vote: GovernmentVoteType | ReferendumVoteType,
  userId: string
) {
  let hasVoted = false;
  if (
    vote.userVotesNo.find((u) => u.id === userId) ||
    vote.userVotesYes.find((u) => u.id === userId) ||
    vote.userVotesAbstain.find((u) => u.id === userId)
  ) {
    hasVoted = true;
    return hasVoted;
  } else if (!userId && process.client) {
    if (localStorage.getItem(vote.id)) {
      hasVoted = true;
      return hasVoted;
    }
  }
  return hasVoted;
}
