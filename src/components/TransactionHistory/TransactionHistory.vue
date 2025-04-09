<template>
  <div class="container">
    <!-- 년.월 컨트롤 -->
    <div class="d-flex justify-content-center align-items-center my-3 gap-3">
      <button class="btn btn-outline-secondary" @click="prevMonth">◀</button>
      <div class="fs-5">{{ formattedYearMonth }}</div>
      <button class="btn btn-outline-secondary" @click="nextMonth">▶</button>
    </div>
    <!-- ~년.월 컨트롤 -->

    <div class="d-flex justify-content-between align-items-center my-3">
      <div class="fs-3">상세 내역</div>

      <!-- 드롭다운 버튼 -->
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
          <li v-for="category in categories" :key="category">
            <a
              class="dropdown-item"
              href="#"
              @click.prevent="selectCategory(category)"
              >{{ category }}</a
            >
          </li>
        </ul>
      </div>
      <!-- ~드롭다운 버튼 끝 -->
    </div>

    <hr />
    <TransactionHistoryList
      :selectedCategory="selectedCategory"
      :yearMonth="formattedYearMonth"
      @update:tableData="(data) => (tableData.value = data)"
      @update:categories="(data) => (categories = data)"
    ></TransactionHistoryList>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import TransactionHistoryList from './TransactionHistoryList.vue';

const tableData = ref([]);
const categories = ref([]);
const selectedCategory = ref('all');

watch(categories, (newVal) => {
  console.log('categories updated:', newVal);
});

const selectCategory = (category) => {
  selectedCategory.value = category;
};

const dropdownText = computed(() =>
  selectedCategory.value === 'all' ? '카테고리별 보기' : selectedCategory.value
);

// 년/월 상태
const currentDate = ref(new Date());

// 포맷된 년.월 문자열 (예: 2025.04)
const formattedYearMonth = computed(() => {
  const year = currentDate.value.getFullYear();
  const month = String(currentDate.value.getMonth() + 1).padStart(2, '0');
  return `${year}.${month}`;
});

// 이전 달
const prevMonth = () => {
  const newDate = new Date(currentDate.value);
  newDate.setMonth(currentDate.value.getMonth() - 1);
  currentDate.value = newDate;
};

// 다음 달
const nextMonth = () => {
  const newDate = new Date(currentDate.value);
  newDate.setMonth(currentDate.value.getMonth() + 1);
  currentDate.value = newDate;
};
</script>
<style scoped>
.fixed-width {
  min-width: 120px; /* 혹은 width: 160px; 완전 고정도 가능 */
  text-align: center; /* 글자가 길어져도 자연스럽게 */
}
</style>
