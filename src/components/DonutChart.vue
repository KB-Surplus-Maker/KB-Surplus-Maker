<template>
  <div class="chart-wrapper">
    <canvas ref="doughnutCanvas"></canvas>
  </div>
</template>

<script setup>
import { onMounted, ref, computed, watch } from 'vue';
import {
  Chart,
  DoughnutController,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { useTransactionStore } from '@/stores/transactions';

Chart.register(DoughnutController, ArcElement, Tooltip, Legend);

const doughnutCanvas = ref(null);
const chartInstance = ref(null); // 차트 인스턴스 저장

const transactionStore = useTransactionStore();

const filteredData = computed(() => transactionStore.curMonthExpenseList);

// 카테고리별로 가격 합계
const categoryData = computed(() => {
  const data = {};
  filteredData.value.forEach((t) => {
    data[t.category] = (data[t.category] || 0) + t.price;
  });
  return data;
});

// 차트 그리는 함수
function drawChart() {
  const ctx = doughnutCanvas.value;

  if (chartInstance.value) {
    chartInstance.value.destroy();
  }

  chartInstance.value = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: Object.keys(categoryData.value),
      datasets: [
        {
          label: '지출',
          data: Object.values(categoryData.value),
          backgroundColor: [
            '#FF6F61',
            '#FFB74D',
            '#FFF176',
            '#4DD0E1',
            '#64B5F6',
            '#9575CD',
            '#E57373',
            '#90A4AE',
            '#AED581',
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
        title: {
          display: true,
          text: '카테고리별 지출 차트',
          font: {
            size: 18,
            weight: 'bold',
          },
          padding: {
            top: 10,
            bottom: 20,
          },
          color: '#333',
        },
      },
    },
  });
}

// mounted에서 최초 한 번 시도
onMounted(() => {
  if (filteredData.value.length > 0) {
    drawChart();
  }
});

// filteredData가 변할 때마다 다시 그리기
watch(categoryData, (newVal) => {
  drawChart();
});
</script>

<style scoped>
.chart-wrapper {
  width: 400px;
  height: 400px;
  margin: 0 auto;
}
</style>
