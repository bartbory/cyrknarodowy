import { GovernmentVoteType } from "~/types/types";

type TermType = {
  current: boolean;
  from: string;
  num: number;
  prints: {
    count: number;
    link: string;
  };
  to: string;
};

export default defineEventHandler(async (event) => {
  try {
    const response = await fetch(
      `https://api.sejm.gov.pl/sejm/term
      `
    );
    const result: TermType[] = await response.json();
    const currentTerm = result.find((term: TermType) => {
      const current = term.current;
      return current;
    });
    // console.log(currentTerm!.num);
    return { currentTerm: currentTerm!.num };
  } catch (error: any) {
    //handle error here
    // console.log("Error:", error);
  }
});
