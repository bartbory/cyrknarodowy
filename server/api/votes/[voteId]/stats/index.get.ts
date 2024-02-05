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
            if (user.education == "Wyższe") return user.id;
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

    const actualYear = new Date().getFullYear();
    const ageVotes: StatisticsData[] = [
      {
        key: "poniej 18",
        votes: {
          abstain: responde!.userVotesAbstain.filter((user) => {
            if (user.birthYear && user.birthYear > actualYear - 18)
              return user.id;
          }),
          no: responde!.userVotesNo.filter((user) => {
            if (user.birthYear && user.birthYear > actualYear - 18)
              return user.id;
          }),
          yes: responde!.userVotesYes.filter((user) => {
            if (user.birthYear && user.birthYear > actualYear - 18)
              return user.id;
          }),
        },
      },
      {
        key: "18 - 22",
        votes: {
          abstain: responde!.userVotesAbstain.filter((user) => {
            if (
              user.birthYear &&
              user.birthYear <= actualYear - 18 &&
              user.birthYear >= actualYear - 22
            )
              return user.id;
          }),
          no: responde!.userVotesNo.filter((user) => {
            if (
              user.birthYear &&
              user.birthYear <= actualYear - 18 &&
              user.birthYear >= actualYear - 22
            )
              return user.id;
          }),
          yes: responde!.userVotesYes.filter((user) => {
            if (
              user.birthYear &&
              user.birthYear <= actualYear - 18 &&
              user.birthYear >= actualYear - 22
            )
              return user.id;
          }),
        },
      },
      {
        key: "23 - 30",
        votes: {
          abstain: responde!.userVotesAbstain.filter((user) => {
            if (
              user.birthYear &&
              user.birthYear <= actualYear - 23 &&
              user.birthYear >= actualYear - 30
            )
              return user.id;
          }),
          no: responde!.userVotesNo.filter((user) => {
            if (
              user.birthYear &&
              user.birthYear <= actualYear - 23 &&
              user.birthYear >= actualYear - 30
            )
              return user.id;
          }),
          yes: responde!.userVotesYes.filter((user) => {
            if (
              user.birthYear &&
              user.birthYear <= actualYear - 23 &&
              user.birthYear >= actualYear - 30
            )
              return user.id;
          }),
        },
      },
      {
        key: "31 - 40",
        votes: {
          abstain: responde!.userVotesAbstain.filter((user) => {
            if (
              user.birthYear &&
              user.birthYear <= actualYear - 31 &&
              user.birthYear >= actualYear - 40
            )
              return user.id;
          }),
          no: responde!.userVotesNo.filter((user) => {
            if (
              user.birthYear &&
              user.birthYear <= actualYear - 31 &&
              user.birthYear >= actualYear - 40
            )
              return user.id;
          }),
          yes: responde!.userVotesYes.filter((user) => {
            if (
              user.birthYear &&
              user.birthYear <= actualYear - 31 &&
              user.birthYear >= actualYear - 40
            )
              return user.id;
          }),
        },
      },
      {
        key: "41 - 50",
        votes: {
          abstain: responde!.userVotesAbstain.filter((user) => {
            if (
              user.birthYear &&
              user.birthYear <= actualYear - 41 &&
              user.birthYear >= actualYear - 50
            )
              return user.id;
          }),
          no: responde!.userVotesNo.filter((user) => {
            if (
              user.birthYear &&
              user.birthYear <= actualYear - 41 &&
              user.birthYear >= actualYear - 50
            )
              return user.id;
          }),
          yes: responde!.userVotesYes.filter((user) => {
            if (
              user.birthYear &&
              user.birthYear <= actualYear - 41 &&
              user.birthYear >= actualYear - 50
            )
              return user.id;
          }),
        },
      },
      {
        key: "51 - 67",
        votes: {
          abstain: responde!.userVotesAbstain.filter((user) => {
            if (
              user.birthYear &&
              user.birthYear <= actualYear - 51 &&
              user.birthYear >= actualYear - 67
            )
              return user.id;
          }),
          no: responde!.userVotesNo.filter((user) => {
            if (
              user.birthYear &&
              user.birthYear <= actualYear - 51 &&
              user.birthYear >= actualYear - 67
            )
              return user.id;
          }),
          yes: responde!.userVotesYes.filter((user) => {
            if (
              user.birthYear &&
              user.birthYear <= actualYear - 51 &&
              user.birthYear >= actualYear - 67
            )
              return user.id;
          }),
        },
      },
      {
        key: "67+",
        votes: {
          abstain: responde!.userVotesAbstain.filter((user) => {
            if (user.birthYear && user.birthYear < actualYear - 67)
              return user.id;
          }),
          no: responde!.userVotesNo.filter((user) => {
            if (user.birthYear && user.birthYear < actualYear - 67)
              return user.id;
          }),
          yes: responde!.userVotesYes.filter((user) => {
            if (user.birthYear && user.birthYear < actualYear - 67)
              return user.id;
          }),
        },
      },
    ];

    const usersVotes: StatisticsData[] = [
      {
        key: "Głos narodu",
        votes: {
          abstain: responde!.userVotesAbstain,
          no: responde!.userVotesNo,
          yes: responde!.userVotesYes,
        },
      },
    ];

    return {
      data: {
        voidvodeship: voidvodeshipVotes,
        gender: genderVotes,
        education: educationVotes,
        age: ageVotes,
        votes: usersVotes,
      },
    };
  } catch (error: any) {
    //handle error here
    // console.log("Error:", error);
  }
});
