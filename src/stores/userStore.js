import { defineStore } from "pinia";
import axios from "axios";

export const useUserStore = defineStore("user", {
  state: () => ({
    currentUser: null,
  }),
  actions: {
    async fetchUser(id) {
      const res = await axios.get(`http://localhost:3000/users/${id}`);
      this.currentUser = res.data;
    },
    async updateUser(userData) {
      await axios.put(`http://localhost:3000/users/${userData.id}`, userData);
      this.currentUser = userData;
    },
  },
});
