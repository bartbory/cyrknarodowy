import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  try {
    const refId = event.context.params!.refId;
    console.log(refId);
    const sentPrompt = body.prompt;
    if (body.vote === "abstain") {
      const result = await prisma.vote.update({
        where: { id: refId },
        data: {
          unregistredUserVotesAbstain: { increment: 1 },
        },
      });
      return { data: sentPrompt };
    } else if (body.vote === "yes") {
      const result = await prisma.vote.update({
        where: { id: refId },
        data: {
          unregistredUserVotesYes: { increment: 1 },
        },
      });
      return { data: sentPrompt };
    } else if (body.vote === "no") {
      const result = await prisma.vote.update({
        where: { id: refId },
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
