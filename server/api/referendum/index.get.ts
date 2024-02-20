import { PrismaClient } from "@prisma/client";

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
