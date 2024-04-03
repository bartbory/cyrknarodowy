import { PrismaClient } from "@prisma/client";
import { StatisticsData, UnregistredVotesData } from "~/types/types";
const prisma = new PrismaClient();
export default defineEventHandler(async (event) => {
  try {
    const voteId = event.context.params?.voteId;

    const response = await prisma.governmentVotes.findUnique({
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
          abstain: response!.userVotesAbstain.filter((user) => {
            if (user.voidvodeship === "dolnośląskie") return user.id;
          }),
          no: response!.userVotesNo.filter((user) => {
            if (user.voidvodeship === "dolnośląskie") return user.id;
          }),
          yes: response!.userVotesYes.filter((user) => {
            if (user.voidvodeship === "dolnośląskie") return user.id;
          }),
        },
      },
      {
        key: "Kujawsko-pomorskie",
        votes: {
          abstain: response!.userVotesAbstain.filter((user) => {
            if (user.voidvodeship === "kujawsko-pomorskie") return user;
          }),
          no: response!.userVotesNo.filter((user) => {
            if (user.voidvodeship === "kujawsko-pomorskie") return user;
          }),
          yes: response!.userVotesYes.filter((user) => {
            if (user.voidvodeship === "kujawsko-pomorskie") return user;
          }),
        },
      },
      {
        key: "Lubelskie",
        votes: {
          abstain: response!.userVotesAbstain.filter((user) => {
            if (user.voidvodeship === "lubelskie") return user;
          }),
          no: response!.userVotesNo.filter((user) => {
            if (user.voidvodeship === "lubelskie") return user;
          }),
          yes: response!.userVotesYes.filter((user) => {
            if (user.voidvodeship === "lubelskie") return user;
          }),
        },
      },
      {
        key: "Lubuskie",
        votes: {
          abstain: response!.userVotesAbstain.filter((user) => {
            if (user.voidvodeship === "lubuskie") return user;
          }),
          no: response!.userVotesNo.filter((user) => {
            if (user.voidvodeship === "lubuskie") return user;
          }),
          yes: response!.userVotesYes.filter((user) => {
            if (user.voidvodeship === "lubuskie") return user;
          }),
        },
      },
      {
        key: "Łódzkie",
        votes: {
          abstain: response!.userVotesAbstain.filter((user) => {
            if (user.voidvodeship === "łódzkie") return user;
          }),
          no: response!.userVotesNo.filter((user) => {
            if (user.voidvodeship === "łódzkie") return user;
          }),
          yes: response!.userVotesYes.filter((user) => {
            if (user.voidvodeship === "łódzkie") return user;
          }),
        },
      },
      {
        key: "Małopolskie",
        votes: {
          abstain: response!.userVotesAbstain.filter((user) => {
            if (user.voidvodeship === "małopolskie") return user;
          }),
          no: response!.userVotesNo.filter((user) => {
            if (user.voidvodeship === "małopolskie") return user;
          }),
          yes: response!.userVotesYes.filter((user) => {
            if (user.voidvodeship === "małopolskie") return user;
          }),
        },
      },
      {
        key: "Mazowieckie",
        votes: {
          abstain: response!.userVotesAbstain.filter((user) => {
            if (user.voidvodeship === "mazowieckie") return user;
          }),
          no: response!.userVotesNo.filter((user) => {
            if (user.voidvodeship === "mazowieckie") return user;
          }),
          yes: response!.userVotesYes.filter((user) => {
            if (user.voidvodeship === "mazowieckie") return user;
          }),
        },
      },
      {
        key: "Opolskie",
        votes: {
          abstain: response!.userVotesAbstain.filter((user) => {
            if (user.voidvodeship === "opolskie") return user;
          }),
          no: response!.userVotesNo.filter((user) => {
            if (user.voidvodeship === "opolskie") return user;
          }),
          yes: response!.userVotesYes.filter((user) => {
            if (user.voidvodeship === "opolskie") return user;
          }),
        },
      },
      {
        key: "Podkarpackie",
        votes: {
          abstain: response!.userVotesAbstain.filter((user) => {
            if (user.voidvodeship === "podkarpackie") return user;
          }),
          no: response!.userVotesNo.filter((user) => {
            if (user.voidvodeship === "podkarpackie") return user;
          }),
          yes: response!.userVotesYes.filter((user) => {
            if (user.voidvodeship === "podkarpackie") return user;
          }),
        },
      },
      {
        key: "Podlaskie",
        votes: {
          abstain: response!.userVotesAbstain.filter((user) => {
            if (user.voidvodeship === "podlaskie") return user;
          }),
          no: response!.userVotesNo.filter((user) => {
            if (user.voidvodeship === "podlaskie") return user;
          }),
          yes: response!.userVotesYes.filter((user) => {
            if (user.voidvodeship === "podlaskie") return user;
          }),
        },
      },
      {
        key: "Pomorskie",
        votes: {
          abstain: response!.userVotesAbstain.filter((user) => {
            if (user.voidvodeship === "pomorskie") return user;
          }),
          no: response!.userVotesNo.filter((user) => {
            if (user.voidvodeship === "pomorskie") return user;
          }),
          yes: response!.userVotesYes.filter((user) => {
            if (user.voidvodeship === "pomorskie") return user;
          }),
        },
      },
      {
        key: "Śląskie",
        votes: {
          abstain: response!.userVotesAbstain.filter((user) => {
            if (user.voidvodeship === "śląskie") return user;
          }),
          no: response!.userVotesNo.filter((user) => {
            if (user.voidvodeship === "śląskie") return user;
          }),
          yes: response!.userVotesYes.filter((user) => {
            if (user.voidvodeship === "śląskie") return user;
          }),
        },
      },
      {
        key: "Świętokrzyskie",
        votes: {
          abstain: response!.userVotesAbstain.filter((user) => {
            if (user.voidvodeship === "świętokrzyskie") return user;
          }),
          no: response!.userVotesNo.filter((user) => {
            if (user.voidvodeship === "świętokrzyskie") return user;
          }),
          yes: response!.userVotesYes.filter((user) => {
            if (user.voidvodeship === "świętokrzyskie") return user;
          }),
        },
      },
      {
        key: "Warmińsko-mazurskie",
        votes: {
          abstain: response!.userVotesAbstain.filter((user) => {
            if (user.voidvodeship === "warmińsko-mazurskie") return user;
          }),
          no: response!.userVotesNo.filter((user) => {
            if (user.voidvodeship === "warmińsko-mazurskie") return user;
          }),
          yes: response!.userVotesYes.filter((user) => {
            if (user.voidvodeship === "warmińsko-mazurskie") return user;
          }),
        },
      },
      {
        key: "Wielkopolskie",
        votes: {
          abstain: response!.userVotesAbstain.filter((user) => {
            if (user.voidvodeship === "wielkopolskie") return user;
          }),
          no: response!.userVotesNo.filter((user) => {
            if (user.voidvodeship === "wielkopolskie") return user;
          }),
          yes: response!.userVotesYes.filter((user) => {
            if (user.voidvodeship === "wielkopolskie") return user;
          }),
        },
      },
      {
        key: "Zachodniopomorskie",
        votes: {
          abstain: response!.userVotesAbstain.filter((user) => {
            if (user.voidvodeship === "zachodniopomorskie") return user;
          }),
          no: response!.userVotesNo.filter((user) => {
            if (user.voidvodeship === "zachodniopomorskie") return user;
          }),
          yes: response!.userVotesYes.filter((user) => {
            if (user.voidvodeship === "zachodniopomorskie") return user;
          }),
        },
      },
    ];

    const genderVotes: StatisticsData[] = [
      {
        key: "Kobieta",
        votes: {
          abstain: response!.userVotesAbstain.filter((user) => {
            if (user.gender === "Kobieta") return user;
          }),
          no: response!.userVotesNo.filter((user) => {
            if (user.gender === "Kobieta") return user;
          }),
          yes: response!.userVotesYes.filter((user) => {
            if (user.gender === "Kobieta") return user;
          }),
        },
      },
      {
        key: "Mężczyzna",
        votes: {
          abstain: response!.userVotesAbstain.filter((user) => {
            if (user.gender === "Mężczyzna") return user;
          }),
          no: response!.userVotesNo.filter((user) => {
            if (user.gender === "Mężczyzna") return user;
          }),
          yes: response!.userVotesYes.filter((user) => {
            if (user.gender === "Mężczyzna") return user;
          }),
        },
      },
      {
        key: "Niebinarna",
        votes: {
          abstain: response!.userVotesAbstain.filter((user) => {
            if (user.gender === "Niebinarna") return user;
          }),
          no: response!.userVotesNo.filter((user) => {
            if (user.gender === "Niebinarna") return user;
          }),
          yes: response!.userVotesYes.filter((user) => {
            if (user.gender === "Niebinarna") return user;
          }),
        },
      },
      {
        key: "Nie chcę powiedzieć",
        votes: {
          abstain: response!.userVotesAbstain.filter((user) => {
            if (user.gender === "Nie chcę powiedzieć") return user;
          }),
          no: response!.userVotesNo.filter((user) => {
            if (user.gender === "Nie chcę powiedzieć") return user;
          }),
          yes: response!.userVotesYes.filter((user) => {
            if (user.gender === "Nie chcę powiedzieć") return user;
          }),
        },
      },
    ];

    const educationVotes: StatisticsData[] = [
      {
        key: "Wyższe",
        votes: {
          abstain: response!.userVotesAbstain.filter((user) => {
            if (user.education == "Wyższe") return user.id;
          }),
          no: response!.userVotesNo.filter((user) => {
            if (user.education == "Wyższe") return user.id;
          }),
          yes: response!.userVotesYes.filter((user) => {
            if (user.education == "Wyższe") return user.id;
          }),
        },
      },
      {
        key: "Średnie",
        votes: {
          abstain: response!.userVotesAbstain.filter((user) => {
            if (user.education === "Średnie") return user;
          }),
          no: response!.userVotesNo.filter((user) => {
            if (user.education === "Średnie") return user;
          }),
          yes: response!.userVotesYes.filter((user) => {
            if (user.education === "Średnie") return user;
          }),
        },
      },
      {
        key: "Zawodowe",
        votes: {
          abstain: response!.userVotesAbstain.filter((user) => {
            if (user.education === "Zawodowe") return user;
          }),
          no: response!.userVotesNo.filter((user) => {
            if (user.education === "Zawodowe") return user;
          }),
          yes: response!.userVotesYes.filter((user) => {
            if (user.education === "Zawodowe") return user;
          }),
        },
      },
      {
        key: "Gimnazjalne",
        votes: {
          abstain: response!.userVotesAbstain.filter((user) => {
            if (user.education === "Gimnazjalne") return user;
          }),
          no: response!.userVotesNo.filter((user) => {
            if (user.education === "Gimnazjalne") return user;
          }),
          yes: response!.userVotesYes.filter((user) => {
            if (user.education === "Gimnazjalne") return user;
          }),
        },
      },
      {
        key: "Podstawowe ukończone",
        votes: {
          abstain: response!.userVotesAbstain.filter((user) => {
            if (user.education === "Podstawowe ukończone") return user;
          }),
          no: response!.userVotesNo.filter((user) => {
            if (user.education === "Podstawowe ukończone") return user;
          }),
          yes: response!.userVotesYes.filter((user) => {
            if (user.education === "Podstawowe ukończone") return user;
          }),
        },
      },
      {
        key: "Podstawowe nieukończone",
        votes: {
          abstain: response!.userVotesAbstain.filter((user) => {
            if (user.education === "Podstawowe nieukończone") return user;
          }),
          no: response!.userVotesNo.filter((user) => {
            if (user.education === "Podstawowe nieukończone") return user;
          }),
          yes: response!.userVotesYes.filter((user) => {
            if (user.education === "Podstawowe nieukończone") return user;
          }),
        },
      },
      {
        key: "Nieustalone",
        votes: {
          abstain: response!.userVotesAbstain.filter((user) => {
            if (user.education === "Nieustalone") return user;
          }),
          no: response!.userVotesNo.filter((user) => {
            if (user.education === "Nieustalone") return user;
          }),
          yes: response!.userVotesYes.filter((user) => {
            if (user.education === "Nieustalone") return user;
          }),
        },
      },
      {
        key: "Nie chcę powiedzieć",
        votes: {
          abstain: response!.userVotesAbstain.filter((user) => {
            if (user.education === "Nie chcę powiedzieć") return user;
          }),
          no: response!.userVotesNo.filter((user) => {
            if (user.education === "Nie chcę powiedzieć") return user;
          }),
          yes: response!.userVotesYes.filter((user) => {
            if (user.education === "Nie chcę powiedzieć") return user;
          }),
        },
      },
    ];

    const actualYear = new Date().getFullYear();
    const ageVotes: StatisticsData[] = [
      {
        key: "poniżej 18",
        votes: {
          abstain: response!.userVotesAbstain.filter((user) => {
            if (user.birthYear && user.birthYear > actualYear - 18)
              return user.id;
          }),
          no: response!.userVotesNo.filter((user) => {
            if (user.birthYear && user.birthYear > actualYear - 18)
              return user.id;
          }),
          yes: response!.userVotesYes.filter((user) => {
            if (user.birthYear && user.birthYear > actualYear - 18)
              return user.id;
          }),
        },
      },
      {
        key: "18 - 22",
        votes: {
          abstain: response!.userVotesAbstain.filter((user) => {
            if (
              user.birthYear &&
              user.birthYear <= actualYear - 18 &&
              user.birthYear >= actualYear - 22
            )
              return user.id;
          }),
          no: response!.userVotesNo.filter((user) => {
            if (
              user.birthYear &&
              user.birthYear <= actualYear - 18 &&
              user.birthYear >= actualYear - 22
            )
              return user.id;
          }),
          yes: response!.userVotesYes.filter((user) => {
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
          abstain: response!.userVotesAbstain.filter((user) => {
            if (
              user.birthYear &&
              user.birthYear <= actualYear - 23 &&
              user.birthYear >= actualYear - 30
            )
              return user.id;
          }),
          no: response!.userVotesNo.filter((user) => {
            if (
              user.birthYear &&
              user.birthYear <= actualYear - 23 &&
              user.birthYear >= actualYear - 30
            )
              return user.id;
          }),
          yes: response!.userVotesYes.filter((user) => {
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
          abstain: response!.userVotesAbstain.filter((user) => {
            if (
              user.birthYear &&
              user.birthYear <= actualYear - 31 &&
              user.birthYear >= actualYear - 40
            )
              return user.id;
          }),
          no: response!.userVotesNo.filter((user) => {
            if (
              user.birthYear &&
              user.birthYear <= actualYear - 31 &&
              user.birthYear >= actualYear - 40
            )
              return user.id;
          }),
          yes: response!.userVotesYes.filter((user) => {
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
          abstain: response!.userVotesAbstain.filter((user) => {
            if (
              user.birthYear &&
              user.birthYear <= actualYear - 41 &&
              user.birthYear >= actualYear - 50
            )
              return user.id;
          }),
          no: response!.userVotesNo.filter((user) => {
            if (
              user.birthYear &&
              user.birthYear <= actualYear - 41 &&
              user.birthYear >= actualYear - 50
            )
              return user.id;
          }),
          yes: response!.userVotesYes.filter((user) => {
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
          abstain: response!.userVotesAbstain.filter((user) => {
            if (
              user.birthYear &&
              user.birthYear <= actualYear - 51 &&
              user.birthYear >= actualYear - 67
            )
              return user.id;
          }),
          no: response!.userVotesNo.filter((user) => {
            if (
              user.birthYear &&
              user.birthYear <= actualYear - 51 &&
              user.birthYear >= actualYear - 67
            )
              return user.id;
          }),
          yes: response!.userVotesYes.filter((user) => {
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
          abstain: response!.userVotesAbstain.filter((user) => {
            if (user.birthYear && user.birthYear < actualYear - 67)
              return user.id;
          }),
          no: response!.userVotesNo.filter((user) => {
            if (user.birthYear && user.birthYear < actualYear - 67)
              return user.id;
          }),
          yes: response!.userVotesYes.filter((user) => {
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
          abstain: response!.userVotesAbstain,
          no: response!.userVotesNo,
          yes: response!.userVotesYes,
        },
      },
    ];

    const unregistredUserVotes: UnregistredVotesData = {
      key: "Głosy użytkowników nie zarejestrowanych",
      votes: {
        abstain: response!.unregistredUserVotesAbstain || 0,
        no: response!.unregistredUserVotesNo || 0,
        yes: response!.unregistredUserVotesYes || 0,
      },
    };

    return {
      data: {
        voidvodeship: voidvodeshipVotes,
        gender: genderVotes,
        education: educationVotes,
        age: ageVotes,
        votes: usersVotes,
        unregistredVotes: unregistredUserVotes,
      },
    };
  } catch (error: any) {
    //handle error here
    // console.log("Error:", error);
  }
});
