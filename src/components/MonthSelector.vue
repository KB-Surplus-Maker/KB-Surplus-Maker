<template>
  <div class="d-flex justify-content-center align-items-center my-3 gap-3">
    <button class="btn btn-outline-secondary" @click="prevMonth()">◀</button>
    <div class="fs-5">{{ curYear }}.{{ curMonth }}</div>
    <button class="btn btn-outline-secondary" @click="nextMonth()">▶</button>
  </div>
</template>

<script setup>
import { useTransactionStore } from '@/stores/transactions';
import { computed } from 'vue';

const transactions = useTransactionStore();

const nextMonth = transactions.nextMonth;
const prevMonth = transactions.prevMonth;

const curMonth = computed(() => transactions.curMonth);
const curYear = computed(() => transactions.curYear);
</script>
