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
          userVotesAbstain: { connect: { id: body.user } },
        },
      });
      return { data: sentPrompt };
    } else if (body.vote === "yes") {
      const result = await prisma.vote.update({
        where: { id: refId },
        data: {
          userVotesYes: { connect: { id: body.user } },
        },
      });
      return { data: sentPrompt };
    } else if (body.vote === "no") {
      const result = await prisma.vote.update({
        where: { id: refId },
        data: {
          userVotesNo: { connect: { id: body.user } },
        },
      });
      return { data: sentPrompt };
    }
  } catch (error: any) {
    //handle error here
    console.log("Error:", error);
  }
});
