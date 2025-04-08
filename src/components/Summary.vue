<template>
  <div class="summary-container">
    <div class="summary-card" v-for="item in summaryData" :key="item.title">
      <div class="title">{{ item.title }}</div>
      <div class="value" :class="item.type">
        {{ formatCurrency(item.value) }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useTransactionStore } from '@/stores/transactions';

const store = useTransactionStore();

const transactions = computed(() => store.curMonthTransactionList2);

const totalExpense = computed(() =>
  transactions.value
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.price, 0)
);

const totalIncome = computed(() =>
  transactions.value
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.price, 0)
);

const netProfit = computed(() => totalIncome.value - totalExpense.value);

const formatCurrency = (val) =>
  val.toLocaleString('ko-KR', { style: 'currency', currency: 'KRW' });

const summaryData = computed(() => [
  {
    title: '총지출',
    value: totalExpense.value,
    type: 'expense',
  },
  {
    title: '총수입',
    value: totalIncome.value,
    type: 'income',
  },
  {
    title: '순수익',
    value: netProfit.value,
    type: netProfit.value >= 0 ? 'income' : 'expense',
  },
]);
</script>

<style scoped>
.summary-container {
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.summary-card {
  flex: 1 1 30%;
  background: #f8f9fa;
  border-radius: 1rem;
  padding: 1.5rem;
  margin: 0.5rem;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.icon-wrapper {
  margin-bottom: 0.75rem;
}

.icon {
  width: 40px;
  height: 40px;
}

.title {
  font-weight: bold;
  font-size: 1.2rem;
  margin-bottom: 0.25rem;
}

.value {
  font-size: 1.4rem;
}

.value.expense {
  color: #dc3545;
}

.value.income {
  color: #28a745;
}
</style>
