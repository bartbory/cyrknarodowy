import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export default defineEventHandler(async (event) => {
  try {
    const voteId = event.context.params?.voteId;

    const result = await prisma.governmentVotes.findUnique({
      where: { id: voteId },
      include: {
        userVotesAbstain: {
          select: {
            id: true,
            voidvodeship: true,
            gender: true,
            education: true,
            birthYear: true,
          },
        },
        userVotesNo: {
          select: {
            id: true,
            voidvodeship: true,
            gender: true,
            education: true,
            birthYear: true,
          },
        },
        userVotesYes: {
          select: {
            id: true,
            voidvodeship: true,
            gender: true,
            education: true,
            birthYear: true,
          },
        },
      },
    });

    return { result };
  } catch (error: any) {
    //handle error here
    console.log("Error:", error);
  }
});
