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
            voidvodeship: true,
          },
        },
        userVotesNo: {
          select: {
            id: true,
            voidvodeship: true,
          },
        },
        userVotesYes: {
          select: {
            id: true,
            voidvodeship: true,
          },
        },
      },
    });

    const voidvodeshipVotes: StatisticsData[] = [
      {
        key: "Dolnośląskie",
        votes: {
          abstain: responde!.userVotesAbstain.filter((user) => {
            if (user.voidvodeship === "dolnośląskie") return user.id;
          }),
          no: responde!.userVotesNo.filter((user) => {
            if (user.voidvodeship === "dolnośląskie") return user.id;
          }),
          yes: responde!.userVotesYes.filter((user) => {
            if (user.voidvodeship === "dolnośląskie") return user.id;
          }),
        },
      },
      {
        key: "Kujawsko-pomorskie",
        votes: {
          abstain: responde!.userVotesAbstain.filter((user) => {
            if (user.voidvodeship === "kujawsko-pomorskie") return user;
          }),
          no: responde!.userVotesNo.filter((user) => {
            if (user.voidvodeship === "kujawsko-pomorskie") return user;
          }),
          yes: responde!.userVotesYes.filter((user) => {
            if (user.voidvodeship === "kujawsko-pomorskie") return user;
          }),
        },
      },
      {
        key: "Lubelskie",
        votes: {
          abstain: responde!.userVotesAbstain.filter((user) => {
            if (user.voidvodeship === "lubelskie") return user;
          }),
          no: responde!.userVotesNo.filter((user) => {
            if (user.voidvodeship === "lubelskie") return user;
          }),
          yes: responde!.userVotesYes.filter((user) => {
            if (user.voidvodeship === "lubelskie") return user;
          }),
        },
      },
      {
        key: "Lubuskie",
        votes: {
          abstain: responde!.userVotesAbstain.filter((user) => {
            if (user.voidvodeship === "lubuskie") return user;
          }),
          no: responde!.userVotesNo.filter((user) => {
            if (user.voidvodeship === "lubuskie") return user;
          }),
          yes: responde!.userVotesYes.filter((user) => {
            if (user.voidvodeship === "lubuskie") return user;
          }),
        },
      },
      {
        key: "Łódzkie",
        votes: {
          abstain: responde!.userVotesAbstain.filter((user) => {
            if (user.voidvodeship === "łódzkie") return user;
          }),
          no: responde!.userVotesNo.filter((user) => {
            if (user.voidvodeship === "łódzkie") return user;
          }),
          yes: responde!.userVotesYes.filter((user) => {
            if (user.voidvodeship === "łódzkie") return user;
          }),
        },
      },
      {
        key: "Małopolskie",
        votes: {
          abstain: responde!.userVotesAbstain.filter((user) => {
            if (user.voidvodeship === "małopolskie") return user;
          }),
          no: responde!.userVotesNo.filter((user) => {
            if (user.voidvodeship === "małopolskie") return user;
          }),
          yes: responde!.userVotesYes.filter((user) => {
            if (user.voidvodeship === "małopolskie") return user;
          }),
        },
      },
      {
        key: "Mazowieckie",
        votes: {
          abstain: responde!.userVotesAbstain.filter((user) => {
            if (user.voidvodeship === "mazowieckie") return user;
          }),
          no: responde!.userVotesNo.filter((user) => {
            if (user.voidvodeship === "mazowieckie") return user;
          }),
          yes: responde!.userVotesYes.filter((user) => {
            if (user.voidvodeship === "mazowieckie") return user;
          }),
        },
      },
      {
        key: "Opolskie",
        votes: {
          abstain: responde!.userVotesAbstain.filter((user) => {
            if (user.voidvodeship === "opolskie") return user;
          }),
          no: responde!.userVotesNo.filter((user) => {
            if (user.voidvodeship === "opolskie") return user;
          }),
          yes: responde!.userVotesYes.filter((user) => {
            if (user.voidvodeship === "opolskie") return user;
          }),
        },
      },
      {
        key: "Podkarpackie",
        votes: {
          abstain: responde!.userVotesAbstain.filter((user) => {
            if (user.voidvodeship === "podkarpackie") return user;
          }),
          no: responde!.userVotesNo.filter((user) => {
            if (user.voidvodeship === "podkarpackie") return user;
          }),
          yes: responde!.userVotesYes.filter((user) => {
            if (user.voidvodeship === "podkarpackie") return user;
          }),
        },
      },
      {
        key: "Podlaskie",
        votes: {
          abstain: responde!.userVotesAbstain.filter((user) => {
            if (user.voidvodeship === "podlaskie") return user;
          }),
          no: responde!.userVotesNo.filter((user) => {
            if (user.voidvodeship === "podlaskie") return user;
          }),
          yes: responde!.userVotesYes.filter((user) => {
            if (user.voidvodeship === "podlaskie") return user;
          }),
        },
      },
      {
        key: "Pomorskie",
        votes: {
          abstain: responde!.userVotesAbstain.filter((user) => {
            if (user.voidvodeship === "pomorskie") return user;
          }),
          no: responde!.userVotesNo.filter((user) => {
            if (user.voidvodeship === "pomorskie") return user;
          }),
          yes: responde!.userVotesYes.filter((user) => {
            if (user.voidvodeship === "pomorskie") return user;
          }),
        },
      },
      {
        key: "Śląskie",
        votes: {
          abstain: responde!.userVotesAbstain.filter((user) => {
            if (user.voidvodeship === "śląskie") return user;
          }),
          no: responde!.userVotesNo.filter((user) => {
            if (user.voidvodeship === "śląskie") return user;
          }),
          yes: responde!.userVotesYes.filter((user) => {
            if (user.voidvodeship === "śląskie") return user;
          }),
        },
      },
      {
        key: "Świętokrzyskie",
        votes: {
          abstain: responde!.userVotesAbstain.filter((user) => {
            if (user.voidvodeship === "świętokrzyskie") return user;
          }),
          no: responde!.userVotesNo.filter((user) => {
            if (user.voidvodeship === "świętokrzyskie") return user;
          }),
          yes: responde!.userVotesYes.filter((user) => {
            if (user.voidvodeship === "świętokrzyskie") return user;
          }),
        },
      },
      {
        key: "Warmińsko-mazurskie",
        votes: {
          abstain: responde!.userVotesAbstain.filter((user) => {
            if (user.voidvodeship === "warmińsko-mazurskie") return user;
          }),
          no: responde!.userVotesNo.filter((user) => {
            if (user.voidvodeship === "warmińsko-mazurskie") return user;
          }),
          yes: responde!.userVotesYes.filter((user) => {
            if (user.voidvodeship === "warmińsko-mazurskie") return user;
          }),
        },
      },
      {
        key: "Wielkopolskie",
        votes: {
          abstain: responde!.userVotesAbstain.filter((user) => {
            if (user.voidvodeship === "wielkopolskie") return user;
          }),
          no: responde!.userVotesNo.filter((user) => {
            if (user.voidvodeship === "wielkopolskie") return user;
          }),
          yes: responde!.userVotesYes.filter((user) => {
            if (user.voidvodeship === "wielkopolskie") return user;
          }),
        },
      },
      {
        key: "Zachodniopomorskie",
        votes: {
          abstain: responde!.userVotesAbstain.filter((user) => {
            if (user.voidvodeship === "zachodniopomorskie") return user;
          }),
          no: responde!.userVotesNo.filter((user) => {
            if (user.voidvodeship === "zachodniopomorskie") return user;
          }),
          yes: responde!.userVotesYes.filter((user) => {
            if (user.voidvodeship === "zachodniopomorskie") return user;
          }),
        },
      },
    ];

    return { data: voidvodeshipVotes };
  } catch (error: any) {
    //handle error here
    // console.log("Error:", error);
  }
});
