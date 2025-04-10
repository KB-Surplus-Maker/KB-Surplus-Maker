<template>
  <div
    class="d-flex flex-column flex-shrink-0 p-3 bg-light sidebar"
    style="width: 250px; height: 100vh"
  >
    <a
      href="/dashboard"
      class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none"
    >
      <span class="fs-4">💰 흑자메이커</span>
    </a>
    <hr />
    <ul class="nav nav-pills flex-column mb-auto">
      <li class="nav-item">
        <router-link
          to="/dashboard"
          class="nav-link"
          :class="{ active: route.path === '/dashboard' }"
        >
          🏠 대쉬보드
        </router-link>
      </li>
      <li>
        <router-link
          to="/history"
          class="nav-link"
          :class="{ active: route.path === '/history' }"
        >
          💵 거래내역
        </router-link>
      </li>
      <li>
        <router-link
          to="/calendar"
          class="nav-link"
          :class="{ active: route.path === '/calendar' }"
        >
          📅 달력
        </router-link>
      </li>
      <li>
        <router-link
          to="/transaction-range"
          class="nav-link"
          :class="{ active: route.path === '/transaction-range' }"
        >
          🔍 기간별 상세 조회
        </router-link>
      </li>
      <!-- <li>
        <a @click="goTo('/calendar')" class="nav-link link-dark"> 💸 달력 </a>
      </li> -->
    </ul>

    <div class="dropdown user-profile">
      <hr />
      <a
        href="#"
        class="d-flex align-items-center link-dark text-decoration-none dropdown-toggle"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <!-- ✅ 프로필 이미지 추가 -->
        <img
          :src="`/assets/profile-images/${
            user.currentUser?.profileImage || 'profile1.png'
          }`"
          alt="프로필"
          width="32"
          height="32"
          class="rounded-circle me-2"
        />
        <strong>{{ user.currentUser?.name || "사용자" }}</strong>
      </a>
      <ul class="dropdown-menu text-small shadow">
        <li><a class="dropdown-item" @click="goToProfile()">프로필 설정</a></li>
        <li><hr class="dropdown-divider" /></li>
        <li><a class="dropdown-item" @click="signout()">로그아웃</a></li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { useUserStore } from "@/stores/userStore";

const route = useRoute();
const router = useRouter();

const goToProfile = () => {
  router.push("/profile");
};

const user = useUserStore();

const signout = () => {
  user.logout();
  router.push("/");
};
</script>

<style scoped>
.sidebar {
  border-right: 1px solid #ddd;
}
.nav-link {
  cursor: pointer;
}
.user-profile {
  margin-top: auto; /* ✅ 항상 하단 정렬 */
  padding-top: 1rem;
  padding-bottom: 1rem;
  background-color: #f8f9fa; /* 보기 좋게 배경 추가(Optional) */
  position: sticky; /* ✅ 스크롤 시 아래 고정 효과 */
  bottom: 0;
  z-index: 1;
}
</style>
