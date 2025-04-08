<template>
  <div class="container">
    <div class="d-flex justify-content-between align-items-center my-3">
      <div class="fs-3">상세 내역</div>
      <div class="dropdown">
        <button
          class="btn btn-secondary dropdown-toggle fixed-width"
          type="button"
          id="dropdownMenuButton1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {{ dropdownText }}
        </button>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          <li
            class="dropdown-item"
            href="#"
            @click.prevent="selectCategory('all')"
          >
            전체보기
          </li>
          <li v-for="category in uniqueCategories" :key="category">
            <a
              class="dropdown-item"
              href="#"
              @click.prevent="selectCategory(category)"
              >{{ category }}</a
            >
          </li>
        </ul>
      </div>
    </div>

    <hr />
    <TransactionHistoryList
      :selectedCategory="selectedCategory"
    ></TransactionHistoryList>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
const lst = [
  {
    id: 'txn001',
    userId: 'user1',
    date: { year: '2025', month: '04', day: '01' },
    type: 'expense',
    price: 12000,
    category: 'food',
    memo: '점심 식사',
  },
  {
    id: 'txn002',
    userId: 'user2',
    date: { year: '2025', month: '04', day: '01' },
    type: 'income',
    price: 300000,
    category: 'salary',
    memo: '프리랜서 급여',
  },
  {
    id: 'txn003',
    userId: 'user3',
    date: { year: '2025', month: '04', day: '02' },
    type: 'expense',
    price: 4500,
    category: 'transport',
    memo: '지하철 요금',
  },
];
import TransactionHistoryList from './TransactionHistoryList.vue';
const uniqueCategories = computed(() => {
  const categories = lst.map((item) => item.category);
  return [...new Set(categories)];
});
const selectedCategory = ref('all');
const selectCategory = (category) => {
  selectedCategory.value = category;
};

const dropdownText = computed(() =>
  selectedCategory.value === 'all' ? '카테고리별 보기' : selectedCategory.value
);
</script>
<style scoped>
.fixed-width {
  min-width: 120px; /* 혹은 width: 160px; 완전 고정도 가능 */
  text-align: center; /* 글자가 길어져도 자연스럽게 */
}
</style>
