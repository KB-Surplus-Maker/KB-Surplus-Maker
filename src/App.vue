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

    <div class="home">
      <AddButton @click="openModal" />
      <TransactionForm :show="showModal" @close="closeModal" />
    </div>
  </div>
</template>

<script setup>
import { useTransactionStore } from './stores/transactions';
import { ref } from 'vue';
import SideBar from './components/SideBar.vue';
import TransactionForm from './pages/TransactionForm.vue';
import AddButton from './components/AddButton.vue';

const transactionStore = useTransactionStore();

const getTransactionListByUserId =
  transactionStore.fetchTransactionListByUserId;

const showModal = ref(false);
const openModal = () => (showModal.value = true);
const closeModal = () => (showModal.value = false);
getTransactionListByUserId('user1');
</script>

<style>
body {
  background-color: #f4f8fb;
}
</style>
