import { PrismaClient } from "@prisma/client";
import { ReferendumVoteType } from "~/types/types";
const prisma = new PrismaClient();
export default defineEventHandler(async (event) => {
  try {
    const refId = event.context.params?.refId;

    const result: ReferendumVoteType | null = await prisma.vote.findUnique({
      where: { id: refId },
      include: {
        userVotesAbstain: {
          select: {
            id: true,
            voidvodeship: true,
            education: true,
            gender: true,
            birthYear: true,
          },
        },
        userVotesNo: {
          select: {
            id: true,
            voidvodeship: true,
            education: true,
            gender: true,
            birthYear: true,
          },
        },
        userVotesYes: {
          select: {
            id: true,
            voidvodeship: true,
            education: true,
            gender: true,
            birthYear: true,
          },
        },
      },
    });

    return { result };
  } catch (error: any) {
    console.log("Error:", error);
  }
});
