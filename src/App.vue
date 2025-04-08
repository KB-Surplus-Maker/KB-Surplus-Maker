<template>
  <div class="d-flex min-vh-100">
    <!-- Sidebar -->
    <div
      class="d-flex flex-column flex-shrink-0 p-3 bg-light sidebar"
      style="width: 250px"
    >
      <SideBar />
    </div>
    <div class="flex-grow-1 p-4">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import TransactionMapper from '@/mapper/TransactionMapper.js';
import UserMapper from '@/mapper/UserMapper.js';
import SideBar from './components/SideBar.vue';
import TransactionForm from './pages/TransactionForm.vue';

const showForm = ref(false);

const handleRefresh = () => {
  alert('거래 내역이 새로고침되었습니다!');
  showForm.value = false;
};
// console.log(UserMapper.getUserById('user1'));
// console.log(TransactionMapper.getTransactionByUserId('user1'));
</script>

<style>
body {
  background-color: #f4f8fb;
}
</style>
