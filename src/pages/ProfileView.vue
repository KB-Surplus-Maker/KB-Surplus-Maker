<template>
  <div class="container mt-5">
    <!-- ✅ 페이지 제목 -->
    <div class="mb-4">
      <h2>프로필 수정</h2>
      <p class="text-muted">Keep track your financial plan</p>
    </div>
    <div class="row">
      <!-- 왼쪽: 프로필 이미지 -->
      <div class="col-md-4 mb-4">
        <ProfileImageCard />
      </div>

      <!-- 오른쪽: 사용자 정보 카드 -->
      <div class="col-md-8">
        <ProfileInfoCard />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useUserStore } from "@/stores/userStore";
import ProfileImageCard from "@/components/profile/ProfileImageCard.vue";
import ProfileInfoCard from "@/components/profile/ProfileInfoCard.vue";
import { useRouter } from "vue-router";

const userStore = useUserStore();

const router = useRouter();

onMounted(() => {
  if (userStore.currentUser == null) {
    // 로그인 안 된 경우 로그인 페이지로 이동
    alert("null");
    router.push("/login");
  }
  // 로그인한 유저 ID로 fetch
  // userStore.fetchUser("user1"); // 실제 로그인 시스템 연결 시 동적으로
});
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
