<template>
  <tr>
    <td>{{}}</td>
    <!-- `${item.date.year}.${item.date.month}.${item.date.day} ` -->
    <td>
      <span
        class="badge rounded-pill"
        :class="item.type === 'expense' ? 'bg-danger' : 'bg-success'"
        >{{ item.type }}</span
      >
    </td>
    <td>
      <span :class="item.type === 'expense' ? 'text-danger' : 'text-primary'">
        {{ item.type === 'expense' ? '-' : '+' }}{{ item.price }}</span
      >
    </td>
    <td>{{ item.category }}</td>
    <td>{{ item.memo }}</td>
  </tr>
</template>

<script setup>
const props = defineProps({
  item: Object,
});
</script>
