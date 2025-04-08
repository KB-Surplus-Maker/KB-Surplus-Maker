<template>
  <div class="container">
    <table class="table table-hover">
      <thead>
        <tr>
          <td>날짜</td>
          <td>분류</td>
          <td>금액</td>
          <td>카테고리</td>
          <td>메모</td>
        </tr>
      </thead>
      <tbody>
        <!--행 클릭 이벤트 추가-->
        <TransactionHistoryItems
          v-for="item in paginatedData"
          :key="item.id"
          :item="item"
          @click="handleRowClick(item)"
        ></TransactionHistoryItems>
      </tbody>
    </table>
    <!-- 페이지네이션 -->
    <nav v-if="totalPages > 1" class="mt-3 d-flex justify-content-center">
      <ul class="pagination">
        <li
          class="page-item"
          :class="{ disabled: currentPage === 1 }"
          @click="goToPage(currentPage - 1)"
        >
          <a class="page-link" href="#"><</a>
        </li>
        <li
          v-for="page in totalPages"
          :key="page"
          class="page-item"
          :class="{ active: page === currentPage }"
          @click="goToPage(page)"
        >
          <a class="page-link" href="#">{{ page }}</a>
        </li>
        <li
          class="page-item"
          :class="{ disabled: currentPage === totalPages }"
          @click="goToPage(currentPage + 1)"
        >
          <a class="page-link" href="#">></a>
        </li>
      </ul>
    </nav>
    <!-- 상세 보기 모달 추가 위치 -->
    <TransactionDetailModal
      :show="showDetailModal"
      :transaction="selectedTransaction"
      @close="showDetailModal = false"
      @edit="handleEdit"
    />
  </div>
</template>

<script setup>
import TransactionHistoryItems from './TransactionHistoryItems.vue';
import { computed, ref, watch, onMounted } from 'vue';
import { defineProps } from 'vue';
import axios from 'axios';

//상세보기:TransactionDetailModal
import TransactionDetailModal from '@/components/TransactionDetailModal.vue'; // 상세모달 추가

const tableData = ref([]);

const emit = defineEmits(['update:tableData', 'update:categories']);

const props = defineProps({
  selectedCategory: {
    type: String,
    default: 'all',
  },
  yearMonth: {
    type: String,
    required: true,
  },
});

const currentPage = ref(1);
const itemsPerPage = 15;

const filteredData = computed(() => {
  const [yearStr, monthStr] = props.yearMonth.split('.');
  const year = parseInt(yearStr);
  const month = parseInt(monthStr);

  const monthFiltered = tableData.value.filter((item) => {
    return item.date.year == year && item.date.month == month;
  });

  const categoryFiltered =
    props.selectedCategory === 'all'
      ? monthFiltered
      : monthFiltered.filter(
          (item) => item.category === props.selectedCategory
        );

  // 날짜 정렬: 최신순 (내림차순)
  const sorted = categoryFiltered.slice().sort((a, b) => {
    const dateA = new Date(a.date.year, a.date.month - 1, a.date.day);
    const dateB = new Date(b.date.year, b.date.month - 1, b.date.day);
    return dateB - dateA; // 최신순 정렬 (내림차순)
  });

  return sorted;
});

const totalPages = computed(() =>
  Math.ceil(filteredData.value.length / itemsPerPage)
);

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredData.value.slice(start, start + itemsPerPage);
});

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

// 카테고리 바뀌면 페이지 초기화
watch(
  () => props.selectedCategory,
  () => {
    currentPage.value = 1;
  }
);

onMounted(async () => {
  await requestAPI();

  // 데이터와 카테고리 리스트를 부모에 전달
  emit('update:tableData', tableData.value);
  const categories = [...new Set(tableData.value.map((item) => item.category))];
  console.log('categories:', categories);
  emit('update:categories', categories);
});

const requestAPI = async () => {
  const url = 'http://localhost:3000/transactions';
  const response = await axios.get(url);
  console.log('response.data: ', response.data);
  tableData.value = response.data;
};

//상세보기 페이지
const handleRowClick = (item) => {
  selectedTransaction.value = item;
  showDetailModal.value = true;
};

// 상세보기 모달 상태
const showDetailModal = ref(false);
const selectedTransaction = ref(null);

// 수정 버튼 클릭 시
const handleEdit = (transaction) => {
  console.log('수정할 데이터:', transaction);
  // 여기에 수정 모드로 전환하는 로직 작성 가능
};
</script>

<style></style>
