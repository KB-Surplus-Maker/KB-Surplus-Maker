<script setup>
import { ref } from 'vue';
import TransactionForm from './TransactionForm.vue';
import AddButton from '../components/AddButton.vue';

const showModal = ref(false);
const openModal = () => (showModal.value = true);
const closeModal = () => (showModal.value = false);
</script>

<template>
  <div class="home">
    <AddButton @click="openModal" />
    <TransactionForm :show="showModal" @close="closeModal" />
  </div>
</template>
