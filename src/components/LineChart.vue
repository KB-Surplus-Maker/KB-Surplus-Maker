<template>
  <h1>Line Chart</h1>
</template>

<script setup>
import { computed } from 'vue';
import SideBar from './components/SideBar.vue';
import { useTransactionStore } from './stores/transactions';

const transactionStore = useTransactionStore();

const fetchTransactionList = transactionStore.fetchTransactionListByUserId;
fetchTransactionList('user1');
const curMonthTransactionList = computed(
  () => transactionStore.curMonthTransactionList
);
</script>
