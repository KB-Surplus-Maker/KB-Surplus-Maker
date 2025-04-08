<template>
  <div></div>
</template>

<script setup>
import { onMounted } from "vue";
import { useUserStore } from "@/stores/userStore";
import { useRouter } from "vue-router";

const userStore = useUserStore();

const router = useRouter();

// onMounted(() => {
//   if (!userStore.currentUser) {
//     const savedUser = localStorage.getItem("currentUser");
//     if (savedUser) {
//       userStore.currentUser = JSON.parse(savedUser); // ✅ 자동 로그인 처리
//     } else {
//       alert("로그인이 필요합니다.");
//       router.push("/login");
//     }
//   }
// });
</script>

<style lang="scss" scoped></style>
