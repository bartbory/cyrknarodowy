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
          userVotesAbstain: { connect: { id: body.user } },
        },
      });
      return { data: sentPrompt };
    } else if (body.vote === "yes") {
      const result = await prisma.governmentVotes.update({
        where: { id: voteId },
        data: {
          userVotesYes: { connect: { id: body.user } },
        },
      });
      return { data: sentPrompt };
    } else if (body.vote === "no") {
      const result = await prisma.governmentVotes.update({
        where: { id: voteId },
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
