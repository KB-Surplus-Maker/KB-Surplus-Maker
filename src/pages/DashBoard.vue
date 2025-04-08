<template>
  <div><h1>대시보드다</h1></div>
  <DonutChart />
  <TransactionList />
  <DonutChart2 />
</template>

<script setup>
import DonutChart from '@/components/DonutChart.vue';
import DonutChart2 from '@/components/DonutChart2.vue';
import TransactionList from '@/components/TransactionList.vue';
</script>
