<template>
  <table class="table table-hover">
    <thead>
      <tr>
        <th>날짜</th>
        <th>카테고리</th>
        <th>메모</th>
        <th>지출내역</th>
      </tr>
    </thead>
    <tbody>
      <TransactionItem
        v-for="(transaction, index) in filteredData"
        :key="index"
        :transaction="transaction"
      />
      <tr v-if="filteredData.length === 0">
        <td colspan="4" class="text-center">해당 월의 거래 내역이 없습니다.</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { computed } from 'vue';
import { useTransactionStore } from '@/stores/transactions';
import TransactionItem from './TransactionItem.vue';

const transactionStore = useTransactionStore();

const filteredData = computed(() => transactionStore.curMonthTransactionList2);
</script>
