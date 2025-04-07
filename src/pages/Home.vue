<script setup>
import { ref } from 'vue';
import TransactionForm from './TransactionForm.vue';

const showModal = ref(false);
const openModal = () => (showModal.value = true);
const closeModal = () => (showModal.value = false);
</script>

<template>
  <div class="home">
    <button @click="openModal">거래내역 추가</button>

    <TransactionForm :show="showModal" @close="closeModal" />
  </div>
</template>
