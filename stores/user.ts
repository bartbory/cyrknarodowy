import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => {
    return {
      isLogged: false,
      userId: "",
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
  },
});
