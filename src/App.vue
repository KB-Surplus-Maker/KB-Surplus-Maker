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
import { useTransactionStore } from './stores/transactions';
import SideBar from './components/SideBar.vue';
import TransactionForm from './pages/TransactionForm.vue';


const transactionStore = useTransactionStore();

const getTransactionList = transactionStore.fetchTransactionListByUserId;

getTransactionList('user1');
console.log('끝');
</script>

<style>
body {
  background-color: #f4f8fb;
}
</style>
