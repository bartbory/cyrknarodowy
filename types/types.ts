export interface GovernmentVoteType {
  id: string;
  date: string;
  abstain: number;
  absent?: number;
  description?: string;
  no: number;
  yes: number;
  sitting: number;
  sittingDay: number;
  term: number;
  notParticipating: number;
  title: string;
  topic: string;
  totalVoted: number;
  votingNumber: number;
  kind: string;
  votes?: MPVote[];
  userVotesYes: UserData[];
  userVotesNo: UserData[];
  userVotesAbstain: UserData[];
}
export interface ReferendumVoteType {
  id: string;
  votingNumber: number;
  date: string;
  description?: string;
  title: string;
  topic: string;
  userVotesYes: UserData[];
  userVotesNo: UserData[];
  userVotesAbstain: UserData[];
}

export interface MPVote {
  MP: number;
  club: string;
  firstName: string;
  lastName: string;
  secondName?: string;
  vote: VoteEnum;
  listVotes?: [];
}

export interface UserRegister {
  email: string;
  password: string;
  consent?: boolean;
}

export interface UserData {
  id: string;
  name: string | null;
  postalCode: string | null;
  voidvodeship: string | null;
  birthYear: number | null;
  education: string;
  gender: string;
}

export interface StatisticsData {
  key: string;
  votes: {
    abstain: { id: string }[];
    no: { id: string }[];
    yes: { id: string }[];
  };
}

export const enum Gender {
  Female = "Kobieta",
  Male = "Mężczyzna",
  NonBinary = "Niebinarna",
  NA = "Nie chcę powiedzieć",
}

export const enum Education {
  Wyzsze = "Wyższe",
  Srednie = "Średnie",
  Zawodowe = "Zawodowe",
  Gimanzjalne = "Gimnazjalne",
  PodstawoweUkonczone = "Podstawowe ukończone",
  PodstawoweNieukonczone = "Podstawowe nieukońoczone",
  Nieustalone = "Nieustalone",
  NA = "Nie chcę powiedzieć",
}

export const enum VoteEnum {
  Yes = "Za",
  No = "Przeciw",
  Abstain = "Wstrzymuje się",
  Absent = "Nieobecny",
  Vote_valid = "Głos poprawny",
}

export const enum IconTypes {
  Eye = "eye",
  Yes = "yes",
  No = "no",
  Abstain = "abstain",
  YesFont = "yes-font",
  NoFont = "no-font",
  AbstainFont = "abstain-font",
  Time = "time",
  Info = "info",
  Down = "down",
  User = "user",
}
