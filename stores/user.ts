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
    login() {
      this.isLogged = true;
    },
    setUserId(userId: string) {
      this.userId = userId;
    },
  },
});
