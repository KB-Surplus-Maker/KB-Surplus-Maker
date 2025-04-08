<template>
  <div class="container mt-5">
    <div class="row mb-4 text-center"></div>
    <div class="row">
      <div class="col-md-6 mb-4">
        <div
          class="d-flex justify-content-center align-items-center p-3 border rounded shadow-sm"
          style="height: 350px"
        >
          <LineChart :chartData="chartData" :options="chartOptions" />
        </div>
      </div>

      <div class="col-md-6 mb-4">
        <div
          class="d-flex justify-content-center align-items-center p-3 border rounded shadow-sm"
          style="height: 350px"
        >
          <DonutChart />
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

const transactionsStore = useTransactionStore();
const curMonthExpenses = transactionsStore.curMonthExpenseList;

const chartData = computed(() => {
  const dailyExpenses = {};

  for (let i = 1; i <= 31; i++) {
    dailyExpenses[i] = 0;
  }

  curMonthExpenses.forEach((trans) => {
    const day = Number(trans.date.day);
    const label = day;

    dailyExpenses[label] += trans.price;
  });

  const labels = Array.from({ length: 31 }, (_, i) => `${i + 1}일`);
  const data = labels.map((_, idx) => dailyExpenses[idx + 1]);

  return {
    labels: labels,
    datasets: [
      {
        label: '일별 지출 금액',
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
  plugins: {
    legend: {
      display: true,
    },
    title: {
      display: true,
      text: '일별 지출 금액',
    },
  },
};
</script>
