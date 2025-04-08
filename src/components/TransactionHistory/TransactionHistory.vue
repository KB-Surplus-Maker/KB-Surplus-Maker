<template>
  <div class="container">
    <div>
      <div class="d-flex justify-content-center align-items-center my-3 gap-3">
        <button class="btn btn-outline-secondary" @click="changeMonth(-1)">
          ←
        </button>
        <div class="fs-5">{{ formattedYearMonth }}</div>
        <button class="btn btn-outline-secondary" @click="changeMonth(1)">
          →
        </button>
      </div>
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
      :yearMonth="formattedYearMonth"
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

// 최상단 년월 로직
const currentDate = ref(new Date());

// 현재 연도와 월을 'YYYY.MM' 형식으로 출력
const formattedYearMonth = computed(() => {
  const year = currentDate.value.getFullYear();
  const month = String(currentDate.value.getMonth() + 1).padStart(2, '0');
  return `${year}.${month}`;
});

// 이전 또는 다음 달로 이동
const changeMonth = (offset) => {
  const newDate = new Date(currentDate.value);
  newDate.setMonth(newDate.getMonth() + offset);
  currentDate.value = newDate;
};
</script>
<style scoped>
.fixed-width {
  min-width: 120px; /* 혹은 width: 160px; 완전 고정도 가능 */
  text-align: center; /* 글자가 길어져도 자연스럽게 */
}
</style>
