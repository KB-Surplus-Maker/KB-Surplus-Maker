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

const userStore = useUserStore();

onMounted(() => {
  // 로그인한 유저 ID로 fetch
  userStore.fetchUser("user1"); // 실제 로그인 시스템 연결 시 동적으로
});
</script>
