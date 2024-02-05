import { PrismaClient } from "@prisma/client";
import { StatisticsData } from "~/types/types";
const prisma = new PrismaClient();
export default defineEventHandler(async (event) => {
  try {
    const voteId = event.context.params?.voteId;

    const responde = await prisma.governmentVotes.findUnique({
      where: { id: voteId },
      include: {
        userVotesAbstain: {
          select: {
            id: true,
            gender: true,
          },
        },
        userVotesNo: {
          select: {
            id: true,
            gender: true,
          },
        },
        userVotesYes: {
          select: {
            id: true,
            gender: true,
          },
        },
      },
    });

    const genderVotes: StatisticsData[] = [
      {
        key: "Kobieta",
        votes: {
          abstain: responde!.userVotesAbstain.filter((user) => {
            if (user.gender === "Kobieta") return user;
          }),
          no: responde!.userVotesNo.filter((user) => {
            if (user.gender === "Kobieta") return user;
          }),
          yes: responde!.userVotesYes.filter((user) => {
            if (user.gender === "Kobieta") return user;
          }),
        },
      },
      {
        key: "Mężczyzna",
        votes: {
          abstain: responde!.userVotesAbstain.filter((user) => {
            if (user.gender === "Mężczyzna") return user;
          }),
          no: responde!.userVotesNo.filter((user) => {
            if (user.gender === "Mężczyzna") return user;
          }),
          yes: responde!.userVotesYes.filter((user) => {
            if (user.gender === "Mężczyzna") return user;
          }),
        },
      },
      {
        key: "Niebinarna",
        votes: {
          abstain: responde!.userVotesAbstain.filter((user) => {
            if (user.gender === "Niebinarna") return user;
          }),
          no: responde!.userVotesNo.filter((user) => {
            if (user.gender === "Niebinarna") return user;
          }),
          yes: responde!.userVotesYes.filter((user) => {
            if (user.gender === "Niebinarna") return user;
          }),
        },
      },
      {
        key: "Nie chcę powiedzieć",
        votes: {
          abstain: responde!.userVotesAbstain.filter((user) => {
            if (user.gender === "Nie chcę powiedzieć") return user;
          }),
          no: responde!.userVotesNo.filter((user) => {
            if (user.gender === "Nie chcę powiedzieć") return user;
          }),
          yes: responde!.userVotesYes.filter((user) => {
            if (user.gender === "Nie chcę powiedzieć") return user;
          }),
        },
      },
    ];

    return { data: genderVotes };
  } catch (error: any) {
    //handle error here
    // console.log("Error:", error);
  }
});
