<template>
  <tr @click="$emit('click', transaction)" style="cursor: pointer">
    >
    <td>
      {{
        `${transaction.date.year}
        -
        ${transaction.date.month.padStart(2, '0')}
        -
        ${transaction.date.day.padStart(2, '0')}`
      }}
    </td>
    <td>{{ transaction.category }}</td>
    <td>{{ transaction.memo }}</td>
    <td :class="priceClass">{{ pricePrefix }}{{ transaction.price }}</td>
  </tr>
</template>

<script setup>
import { computed } from 'vue';

const { transaction } = defineProps({
  transaction: Object,
});

const pricePrefix = computed(() =>
  transaction.type === 'expense' ? '-' : '+'
);
const priceClass = computed(() =>
  transaction.type === 'expense' ? 'text-danger' : 'text-primary'
);
</script>
