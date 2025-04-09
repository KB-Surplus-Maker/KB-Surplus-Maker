<template>
  <table class="table table-hover">
    <thead>
      <tr>
        <th>날짜</th>
        <th>금액</th>
        <th>카테고리</th>
        <th>메모</th>
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

const filteredData = computed(() => {
  const filtered = [...transactionStore.curMonthTransactionList2].sort(
    (a, b) => {
      const aDate = new Date(
        `${a.date.year}-${a.date.month.padStart(2, '0')}-${a.date.day.padStart(
          2,
          '0'
        )}`
      );
      const bDate = new Date(
        `${b.date.year}-${b.date.month.padStart(2, '0')}-${b.date.day.padStart(
          2,
          '0'
        )}`
      );
      return bDate - aDate; // 최신순 정렬
    }
  );

  return filtered.slice(0, 10);
});
</script>
