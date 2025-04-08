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
  chartData: { Type: Object, required: true },
  options: { Type: Object, required: true },
});
</script>
