<template>
  <div class="dashboard-container">
    <h1>대시보드다</h1>

    <button class="btn btn-primary" @click="showForm = true">거래 추가</button>

    <TransactionForm
      v-if="showForm"
      @close="showForm = false"
      @refresh="onRefresh"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import TransactionForm from './TransactionForm.vue';

const showForm = ref(false);

const onRefresh = () => {
  console.log('거래 내역 새로고침 or 메시지 표시 등');
  showForm.value = false;
};
</script>
