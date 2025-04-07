<template>
  <div>
    <h2>월별 카테고리별 지출 도넛 차트</h2>
    <canvas ref="doughnutCanvas"></canvas>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue';
import {
  Chart,
  DoughnutController,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { useTransactionStore } from '@/stores/transactionStore';
import { storeToRefs } from 'pinia';

// Chart.js 등록
Chart.register(DoughnutController, ArcElement, Tooltip, Legend);

const doughnutCanvas = ref(null);
const transactionStore = useTransactionStore();
const { transactions } = storeToRefs(transactionStore);

const filteredData = computed(() => {
  // 이번 달만 필터링
  const now = new Date();
  return transactions.value.filter(
    (t) =>
      t.type === 'expense' &&
      t.date.year == now.getFullYear() &&
      t.date.month == String(now.getMonth() + 1).padStart(2, '0')
  );
});

const categoryData = computed(() => {
  const data = {};
  filteredData.value.forEach((t) => {
    data[t.category] = (data[t.category] || 0) + t.price;
  });
  return data;
});

onMounted(async () => {
  await transactionStore.fetchTransactions();

  new Chart(doughnutCanvas.value, {
    type: 'doughnut',
    data: {
      labels: Object.keys(categoryData.value),
      datasets: [
        {
          label: '지출',
          data: Object.values(categoryData.value),
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#8BC34A',
            '#FF9800',
            '#9C27B0',
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom',
        },
      },
    },
  });
});
</script>

<style scoped>
canvas {
  max-width: 400px;
  margin: 0 auto;
}
</style>
