<template>
  <div class="container">
    <div>
      <!-- 여기  -->
    </div>
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
      @update:tableData="updateTableData"
      @update:categories="updateCategories"
    ></TransactionHistoryList>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import TransactionHistoryList from './TransactionHistoryList.vue';

const selectedCategory = ref('all');
const selectCategory = (category) => {
  selectedCategory.value = category;
};

const dropdownText = computed(() =>
  selectedCategory.value === 'all' ? '카테고리별 보기' : selectedCategory.value
);

// 자식에게서 받는 데이터들
const tableData = ref([]);
const uniqueCategories = ref([]);

// 자식이 emit할 때 받을 함수들
const updateTableData = (data) => {
  tableData.value = data;
};

const updateCategories = (categories) => {
  uniqueCategories.value = categories;
};
</script>
<style scoped>
.fixed-width {
  min-width: 120px; /* 혹은 width: 160px; 완전 고정도 가능 */
  text-align: center; /* 글자가 길어져도 자연스럽게 */
}
</style>
