<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-12">
        <MonthSelector />
      </div>
    </div>
    <div class="row mb-4">
      <div class="col-12">
        <Summary />
      </div>
    </div>
    <!-- 상단 차트 영역 -->
    <div class="row mb-4">
      <div class="col-10 col-md-6 mb-4">
        <div class="chart-wrapper">
          <LineChart :chartData="chartData" :options="chartOptions" />
        </div>
      </div>

      <div class="col-10 col-md-6 mb-4">
        <div class="chart-wrapper">
          <DonutChart />
        </div>
      </div>
    </div>

    <!-- 트랜잭션 리스트 -->
    <div class="row">
      <div class="col-12">
        <div class="list-wrapper">
          <TransactionList />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import DonutChart from '@/components/DonutChart.vue';
import TransactionList from '@/components/TransactionList.vue';
import LineChart from '@/components/LineChart.vue';
import { useTransactionStore } from '@/stores/transactions';
import { useUserStore } from '@/stores/userStore';
import { computed, reactive, onMounted } from 'vue';
import MonthSelector from '@/components/MonthSelector.vue';
import Summary from '@/components/Summary.vue';

const transactionsStore = useTransactionStore();
const userStore = useUserStore();
const curMonthExpenses = computed(() => transactionsStore.curMonthExpenseList);
const curMonthIncomes = computed(() => transactionsStore.curMonthIncomeList);

const visibleLines = reactive({
  expense: true,
  income: true,
});

const chartData = computed(() => {
  const daily = Array.from({ length: 31 }, () => ({ expense: 0, income: 0 }));

  curMonthExpenses.value.forEach((trans) => {
    const day = parseInt(trans.date.day) - 1;
    if (trans.type === 'expense') {
      daily[day].expense += trans.price;
    }
  });

  curMonthIncomes.value.forEach((trans) => {
    const day = parseInt(trans.date.day) - 1;
    if (trans.type === 'income') {
      daily[day].income += trans.price;
    }
  });

  const labels = daily.map((_, i) => `${i + 1}일`);
  const expenseData = daily.map((d) => d.expense);
  const incomeData = daily.map((d) => d.income);

  return {
    labels,
    datasets: [
      {
        label: '지출',
        data: expenseData,
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.3,
        hidden: !visibleLines.expense,
      },
      {
        label: '수입',
        data: incomeData,
        borderColor: 'rgb(54, 162, 235)',
        tension: 0.3,
        hidden: !visibleLines.income,
      },
    ],
  };
});

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
    },
    title: {
      display: true,
      text: '일별 지출/수입 내역',
      font: {
        size: 18,
        weight: 'bold',
      },
      padding: {
        top: 16,
        bottom: 10,
      },
      color: '#333',
    },
  },
};
</script>

<style scoped>
.chart-wrapper {
  width: 100%;
  height: 100%;
  min-height: 300px;
  max-height: 450px;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #dee2e6;
  border-radius: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.list-wrapper {
  width: 100%;
  min-height: 400px;
  padding: 1rem;
  border: 1px solid #dee2e6;
  border-radius: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
