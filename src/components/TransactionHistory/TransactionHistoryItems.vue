<template>
  <tr>
    <td>{{ `${item.date.year}.${item.date.month}.${item.date.day} ` }}</td>
    <td>
      <span
        class="badge rounded-pill"
        :class="item.type === 'expense' ? 'bg-danger' : 'bg-success'"
        >{{ item.type }}</span
      >
    </td>
    <td>{{ item.price }} 원</td>
    <td>{{ item.category }}</td>
    <td>{{ item.memo }}</td>
  </tr>
</template>

<script setup>
const props = defineProps({
  item: Object,
});
</script>
