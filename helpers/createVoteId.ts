import type { GovernmentVotes } from "@prisma/client";

export function createVoteId(vote: GovernmentVotes) {
  return `${vote.term}_${vote.sitting}_${vote.sittingDay}_${vote.votingNumber}`;
}
