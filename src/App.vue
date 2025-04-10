<template>
  <div class="d-flex min-vh-100" id="app-wrapper">
    <!-- Sidebar -->
    <!-- <div
      class="d-flex flex-column flex-shrink-0 p-3 bg-light sidebar"
      style="width: 250px"
    >
      <SideBar />
    </div> -->

    <div
      class="d-flex flex-column p-3 bg-light sidebar"
      :class="{
        collapsed: !isSidebarOpen && isMobile,
        'd-md-block': true,
      }"
    >
      <button class="hamburger-btn d-md-none" @click="toggleSidebar">☰</button>

      <SideBar v-if="isSidebarOpen || !isMobile" />
    </div>

    <!-- Main Content -->
    <div class="flex-grow-1 p-4" id="main-content">
      <router-view />
    </div>

    <!-- Floating Add Button -->
    <div class="home">
      <AddButton @click="openModal" />
      <TransactionForm :show="showModal" @close="closeModal" />
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { useTransactionStore } from './stores/transactions';
import { useUserStore } from './stores/userStore';
import SideBar from './components/SideBar.vue';
import TransactionForm from './components/TransactionForm.vue';
import AddButton from './components/AddButton.vue';

const isSidebarOpen = ref(false);
const isMobile = ref(false);
const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};
const checkMobile = () => {
  isMobile.value = window.innerWidth < 768;
};

onMounted(() => {
  checkMobile();
  window.addEventListener('resize', checkMobile);
});

// 스토어 불러오기
const transactionStore = useTransactionStore();
const userStore = useUserStore();

// 모달 상태 관리
const showModal = ref(false);
const openModal = () => (showModal.value = true);
const closeModal = () => (showModal.value = false);

// ✅ 로그인된 사용자의 ID 기반으로 거래내역 불러오기
watch(
  () => userStore.currentUser?.id,
  (userId) => {
    if (userId) {
      transactionStore.fetchTransactionListByUserId(userId);
    }
  },
  { immediate: true } // 앱 시작 시 바로 실행
);

console.log(transactionStore.curMonthIncomeList);
</script>

<style>
body {
  background-color: #f4f8fb;
}

#app-wrapper {
  display: flex;
  height: 100vh; /* 전체 뷰포트 높이 고정 */
  overflow: hidden;
}
Sidebar {
  width: 240px;
  min-height: 100%;
  border-right: 1px solid #dee2e6;
}

#main-content {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
}
.sidebar {
  width: 250px;
  transition: all 0.3s ease;
}

.sidebar.collapsed {
  width: 60px;
  overflow: hidden;
}

.hamburger-btn {
  margin-bottom: 1rem;
  align-self: flex-start;

  width: 40px;
  height: 40px;
  font-size: 24px;

  background-color: white;
  border: 1px solid #007bff;
  border-radius: 6px;
  color: #007bff;

  display: flex;
  align-items: center;
  justify-content: center;
}

.hamburger-btn:hover {
  background-color: #007bff;
  color: white;
}
</style>
