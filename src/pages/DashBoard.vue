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
      <div class="col-12 col-md-6 mb-4">
        <div class="chart-wrapper">
          <LineChart :chartData="chartData" :options="chartOptions" />
        </div>
      </div>

      <div class="col-12 col-md-6 mb-4">
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
import { computed, reactive } from 'vue';
import MonthSelector from '@/components/MonthSelector.vue';
import Summary from '@/components/Summary.vue';

const transactionsStore = useTransactionStore();
const curMonthExpenses = computed(() => transactionsStore.curMonthExpenseList);

const chartData = computed(() => {
  const dailyExpenses = {};

  for (let i = 1; i <= 31; i++) {
    dailyExpenses[i] = 0;
  }

  curMonthExpenses.value.forEach((trans) => {
    const day = parseInt(trans.date.day);

    dailyExpenses[day] += trans.price;
  });

  const labels = Array.from({ length: 31 }, (_, i) => `${i + 1}일`);
  const data = labels.map((_, idx) => dailyExpenses[idx + 1]);

  return {
    labels: labels,
    datasets: [
      {
        label: '일별 지출내역',
        data: data,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
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
      text: '일별 지출 내역',
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
