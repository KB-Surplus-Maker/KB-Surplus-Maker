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
import TransactionMapper from '@/mapper/TransactionMapper.js';
import UserMapper from '@/mapper/UserMapper.js';
import SideBar from './components/SideBar.vue';

// console.log(UserMapper.getUserById('user1'));
// console.log(TransactionMapper.getTransactionByUserId('user1'));
</script>

<style></style>
