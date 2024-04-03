import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => {
    return {
      isLogged: false,
      userId: "",
      unregistredVotes: [] as Object[],
    };
  },
  actions: {
    logout() {
      this.isLogged = false;
      this.userId = "";
    },
    login(userId: string) {
      this.isLogged = true;
      this.userId = userId;
    },
    addUnregistredVote(voteId: string, voteType: string) {
      this.unregistredVotes.push({ voteId: voteId, vote: voteType });
      localStorage.setItem(voteId, voteType);
      console.log(this.unregistredVotes);
    },
  },
});
