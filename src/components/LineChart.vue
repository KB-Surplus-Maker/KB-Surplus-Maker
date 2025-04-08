<template>
  <Line :data="chartData" :options="options" :width="10" :height="10" />
</template>

<script setup>
import { Line } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';

// Chart.js 요소 등록
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale
);

defineProps({
  chartData: { type: Object, required: true },
  options: { type: Object, required: true },
});

// 예시 데이터
// const chartData = {
//   labels: ['4/1', '4/2', '4/3', '4/4', '4/5'],
//   datasets: [
//     {
//       label: '지출 금액',
//       data: [12000, 25000, 3000, 19000, 14000],
//       fill: false,
//       borderColor: 'rgb(75, 192, 192)',
//       tension: 0.1,
//     },
//   ],
// };

// const chartOptions = {
//   responsive: true,
//   plugins: {
//     legend: {
//       display: true,
//     },
//     title: {
//       display: true,
//       text: '일별 지출 금액',
//     },
//   },
// };
</script>
