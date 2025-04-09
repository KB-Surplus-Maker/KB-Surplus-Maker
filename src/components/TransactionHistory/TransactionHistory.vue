<template>
  <!--상단: 월 이동 + 카테고리 필터-->
  <div class="d-flex justify-content-center align-items-center my-3 gap-3">
    <button class="btn btn-outline-secondary" @click="prevMonth">◀</button>
    <div class="fs-5">{{ formattedYearMonth }}</div>
    <button class="btn btn-outline-secondary" @click="nextMonth">▶</button>
  </div>
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
    </div>

    <hr />
    <!--거래 목록-->
    <TransactionHistoryList
      :selectedCategory="selectedCategory"
      :yearMonth="formattedYearMonth"
      @update:tableData="(data) => (tableData.value = data)"
      @update:categories="(data) => (categories = data)"
      @select-transaction="openModal"
    ></TransactionHistoryList>

    <!--거래 상세 모달-->
    <TransactionDetailModal
      v-if="selectedTransaction"
      :show="isModalOpen"
      :transaction="selectedTransaction"
      @close="closeModal"
      @save="updateTransaction"
    ></TransactionDetailModal>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import TransactionHistoryList from './TransactionHistoryList.vue';
import TransactionDetailModal from '../TransactionDetailModal.vue';
import axios from 'axios';

const tableData = ref([]);
const categories = ref([]);
const selectedCategory = ref('all');

//모달 상태
const selectedTransaction = ref(null);
const isModalOpen = ref(false);

//거래내역 클릭 시 모달 열기
const openModal = (transaction) => {
  selectedTransaction.value = transaction;
  isModalOpen.value = true;
};

//모달 닫기
const closeModal = () => {
  isModalOpen.value = false;
};

//카테고리 필터링
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

watch(categories, (newVal) => {
  console.log('categories updated:', newVal);
});

//상세내역 modal : 수정 값 저장
const updateTransaction = async (updated) => {
  try {
    await axios.put(
      `http://localhost:3000/transactions/${updated.id}`,
      updated
    );

    // ✅ 저장 후 전체 데이터 다시 불러오기
    const response = await axios.get('http://localhost:3000/transactions');
    tableData.value = response.data;

    closeModal();
  } catch (error) {
    console.error('수정 실패:', error);
    alert('거래 수정에 실패했습니다.');
  }
};
</script>

<style scoped>
.fixed-width {
  min-width: 120px; /* 혹은 width: 160px; 완전 고정도 가능 */
  text-align: center; /* 글자가 길어져도 자연스럽게 */
}
</style>
