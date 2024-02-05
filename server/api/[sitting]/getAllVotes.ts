import { GovernmentVotes, PrismaClient } from "@prisma/client";
import { reactive, ref } from "vue";
import { createVoteId } from "~/helpers/createVoteId";
import { GovernmentVoteType } from "~/types/types";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const sitting = event.context.params!.sitting;
  let votesDataRef: GovernmentVotes[] = reactive([]);
  try {
    const response = await fetch(
      `https://api.sejm.gov.pl/sejm/term10/votings/${sitting}
      `
    );
    const result = await response.json();
    const votesData: GovernmentVotes[] = result.filter(
      (vote: GovernmentVoteType) => {
        const filtered = vote.kind === "ELECTRONIC";
        return filtered;
      }
    );
    votesDataRef = votesData;

    const votesToDb: GovernmentVoteType[] = votesDataRef.map((vote) =>
      vote.topic
        ? {
            ...vote,
            id: createVoteId(vote),
            userVotesYes: [],
            userVotesNo: [],
            userVotesAbstain: [],
          }
        : {
            ...vote,
            id: createVoteId(vote),
            topic: "",
            userVotesYes: [],
            userVotesNo: [],
            userVotesAbstain: [],
          }
    );

    try {
      //@ts-ignore
      const result = await prisma.governmentVotes.createMany({
        data: votesToDb.filter((vote) => {
          return vote.kind === "ELECTRONIC";
        }),
        skipDuplicates: true,
      });
    } catch (error) {
      console.log("Error in adding votes", error);
    }

    // return { data: votesToDb };
  } catch (error: any) {
    //handle error here
    // console.log("Error:", error);
  }

  try {
    const result = await prisma.governmentVotes.findMany({
      where: { sitting: +sitting },
      include: {
        userVotesAbstain: true,
        userVotesNo: true,
        userVotesYes: true,
      },
    });
    return { data: result };
  } catch (error) {
    console.log(error);
  }
});
