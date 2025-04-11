// // profile까지만
// import { defineStore } from "pinia";
// import axios from "axios";

// export const useUserStore = defineStore("user", {
//   state: () => ({
//     currentUser: null,
//   }),
//   actions: {
//     async fetchUser(id) {
//       const res = await axios.get(`http://localhost:3000/users/${id}`);
//       this.currentUser = res.data;
//     },
//     async updateUser(userData) {
//       await axios.put(`http://localhost:3000/users/${userData.id}`, userData);
//       this.currentUser = userData;
//     },
//   },
// });

import { defineStore } from "pinia";
import axios from "axios";
import router from "@/router";

export const useUserStore = defineStore("user", {
  state: () => ({
    currentUser: null,
  }),

  actions: {
    // ✅ 사용자 조회 (기존 유지)
    async fetchUser(id) {
      const res = await axios.get(`http://localhost:3000/users/${id}`);
      this.currentUser = res.data;
    },

    // ✅ 사용자 정보 수정 (기존 유지)
    async updateUser(userData) {
      await axios.put(`http://localhost:3000/users/${userData.id}`, userData);
      this.currentUser = userData;
    },

    // ✅ 로그인 기능 추가
    async login(email, password) {
      const res = await axios.get(
        `http://localhost:3000/users?email=${email}&password=${password}`
      );

      console.log("응답:", res.data); // ✅ 추가

      if (res.data.length === 1) {
        this.currentUser = res.data[0];

        console.log("로그인 성공, 사용자:", this.currentUser); // ✅ 추가
        localStorage.setItem("currentUser", JSON.stringify(this.currentUser)); // ✅ 추가
        return true;
      } else {
        throw new Error("이메일 또는 비밀번호가 올바르지 않습니다.");
      }
    },

    // ✅ 회원가입 기능 추가
    async signup(userData) {
      // 중복 이메일 체크
      const res = await axios.get(
        `http://localhost:3000/users?email=${userData.email}`
      );
      if (res.data.length > 0) {
        throw new Error("이미 존재하는 이메일입니다.");
      }

      const newUser = {
        ...userData,
        id: `user_${Date.now()}`, // 또는 uuid
        profileImage: "profile1.png", // 기본 이미지 설정
      };

      await axios.post("http://localhost:3000/users", newUser);
      // this.currentUser = newUser;
    },

    // ✅ 로그아웃
    logout() {
      this.currentUser = null;
      localStorage.removeItem("currentUser"); // ✅ 로그아웃 시 저장된 정보 제거
      // router.push("/login");
    },

    initializeUserFromStorage() {
      const savedUser = localStorage.getItem("currentUser");
      if (savedUser) {
        this.currentUser = JSON.parse(savedUser);
      }
    },
  },
});
