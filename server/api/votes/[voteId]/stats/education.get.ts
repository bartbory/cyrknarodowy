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
            education: true,
          },
        },
        userVotesNo: {
          select: {
            id: true,
            education: true,
          },
        },
        userVotesYes: {
          select: {
            id: true,
            education: true,
          },
        },
      },
    });

    const educationVotes: StatisticsData[] = [
      {
        key: "Wyższe",
        votes: {
          abstain: responde!.userVotesAbstain.filter((user) => {
            if (user.education == "Wyższe") return user.id;
          }),
          no: responde!.userVotesNo.filter((user) => {
            if (user.education == "Wyższe") return user.id;
          }),
          yes: responde!.userVotesYes.filter((user) => {
            if (user.education == "wyższe") return user.id;
          }),
        },
      },
      {
        key: "Średnie",
        votes: {
          abstain: responde!.userVotesAbstain.filter((user) => {
            if (user.education === "Średnie") return user;
          }),
          no: responde!.userVotesNo.filter((user) => {
            if (user.education === "Średnie") return user;
          }),
          yes: responde!.userVotesYes.filter((user) => {
            if (user.education === "Średnie") return user;
          }),
        },
      },
      {
        key: "Zawodowe",
        votes: {
          abstain: responde!.userVotesAbstain.filter((user) => {
            if (user.education === "Zawodowe") return user;
          }),
          no: responde!.userVotesNo.filter((user) => {
            if (user.education === "Zawodowe") return user;
          }),
          yes: responde!.userVotesYes.filter((user) => {
            if (user.education === "Zawodowe") return user;
          }),
        },
      },
      {
        key: "Gimnazjalne",
        votes: {
          abstain: responde!.userVotesAbstain.filter((user) => {
            if (user.education === "Gimnazjalne") return user;
          }),
          no: responde!.userVotesNo.filter((user) => {
            if (user.education === "Gimnazjalne") return user;
          }),
          yes: responde!.userVotesYes.filter((user) => {
            if (user.education === "Gimnazjalne") return user;
          }),
        },
      },
      {
        key: "Podstawowe ukończone",
        votes: {
          abstain: responde!.userVotesAbstain.filter((user) => {
            if (user.education === "Podstawowe ukończone") return user;
          }),
          no: responde!.userVotesNo.filter((user) => {
            if (user.education === "Podstawowe ukończone") return user;
          }),
          yes: responde!.userVotesYes.filter((user) => {
            if (user.education === "Podstawowe ukończone") return user;
          }),
        },
      },
      {
        key: "Podstawowe nieukończone",
        votes: {
          abstain: responde!.userVotesAbstain.filter((user) => {
            if (user.education === "Podstawowe nieukończone") return user;
          }),
          no: responde!.userVotesNo.filter((user) => {
            if (user.education === "Podstawowe nieukończone") return user;
          }),
          yes: responde!.userVotesYes.filter((user) => {
            if (user.education === "Podstawowe nieukończone") return user;
          }),
        },
      },
      {
        key: "Nieustalone",
        votes: {
          abstain: responde!.userVotesAbstain.filter((user) => {
            if (user.education === "Nieustalone") return user;
          }),
          no: responde!.userVotesNo.filter((user) => {
            if (user.education === "Nieustalone") return user;
          }),
          yes: responde!.userVotesYes.filter((user) => {
            if (user.education === "Nieustalone") return user;
          }),
        },
      },
      {
        key: "Nie chcę powiedzieć",
        votes: {
          abstain: responde!.userVotesAbstain.filter((user) => {
            if (user.education === "Nie chcę powiedzieć") return user;
          }),
          no: responde!.userVotesNo.filter((user) => {
            if (user.education === "Nie chcę powiedzieć") return user;
          }),
          yes: responde!.userVotesYes.filter((user) => {
            if (user.education === "Nie chcę powiedzieć") return user;
          }),
        },
      },
    ];

    return { data: educationVotes };
  } catch (error: any) {
    //handle error here
    // console.log("Error:", error);
  }
});
