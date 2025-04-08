<template>
  <div>
    <h2>월별 카테고리별 지출 도넛 차트</h2>
    <canvas ref="doughnutCanvas"></canvas>
  </div>
  <button @click="changeMonth(3)">버튼</button>
  <!-- <div>{{ filteredData }}</div> -->
</template>

<script setup>
// import TransactionMapper from '@/mapper/TransactionMapper.js';
import { onMounted, ref, computed } from 'vue';
import {
  Chart,
  DoughnutController,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { storeToRefs } from 'pinia';
import { useTransactionStore } from '@/stores/transactions';

// Chart.js 등록
Chart.register(DoughnutController, ArcElement, Tooltip, Legend);

const doughnutCanvas = ref(null);
const transactionStore = useTransactionStore();
const changeMonth = transactionStore.changeCurMonth;

const filteredData = computed(() => transactionStore.curMonthExpenseList);

const categoryData = computed(() => {
  const data = {};
  filteredData.value.forEach((t) => {
    data[t.category] = (data[t.category] || 0) + t.price;
  });
  return data;
});

onMounted(() => {
  console.log('진입');

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
