import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  try {
    const voteId = event.context.params!.voteId;
    console.log(voteId);
    console.log(body);
    const sentPrompt = body.prompt;
    if (body.vote === "abstain") {
      const result = await prisma.governmentVotes.update({
        where: { id: voteId },
        data: {
          unregistredUserVotesAbstain: { increment: 1 },
        },
      });
      return { data: sentPrompt };
    } else if (body.vote === "yes") {
      const result = await prisma.governmentVotes.update({
        where: { id: voteId },
        data: {
          unregistredUserVotesYes: { increment: 1 },
        },
      });
      return { data: sentPrompt };
    } else if (body.vote === "no") {
      const result = await prisma.governmentVotes.update({
        where: { id: voteId },
        data: {
          unregistredUserVotesNo: { increment: 1 },
        },
      });
      return { data: sentPrompt };
    }
  } catch (error: any) {
    //handle error here
    console.log("Error:", error);
  }
});
