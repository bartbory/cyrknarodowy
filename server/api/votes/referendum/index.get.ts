import { GovernmentVotes, PrismaClient } from "@prisma/client";
import { reactive, ref } from "vue";
import { createVoteId } from "~/helpers/createVoteId";
import { GovernmentVoteType } from "~/types/types";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const result = await prisma.vote.findMany({
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
