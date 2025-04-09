<template>
  <div class="container">
    <table class="table table-hover">
      <thead>
        <tr>
          <td class="fixed-width">날짜</td>
          <td>분류</td>
          <td>금액</td>
          <td>카테고리</td>
          <td>메모</td>
        </tr>
      </thead>
      <tbody>
        <!-- 날짜별로 그룹화된 데이터 표시 -->
        <template v-for="(group, date) in groupedData" :key="date">
          <!-- 날짜별 총계 행 -->
          <tr class="daily-total bg-secondary">
            <td colspan="2">{{ date }}</td>
            <td>{{ group.total.toLocaleString() }}원</td>
            <td colspan="2"></td>
          </tr>
          <!-- 해당 날짜의 거래 항목 -->
          <TransactionHistoryItems
            v-for="item in group.items"
            :key="item.id"
            :item="item"
            @click="handleRowClick(item)"
          ></TransactionHistoryItems>
        </template>
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
    <!-- 상세 보기 모달 -->
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
import TransactionDetailModal from '@/components/TransactionDetailModal.vue';
import { computed, ref, watch, onMounted } from 'vue';
import { defineProps, defineEmits } from 'vue';
import axios from 'axios';

const tableData = ref([]);
const emit = defineEmits(['update:tableData', 'update:categories']);

const props = defineProps({
  selectedCategory: { type: String, default: 'all' },
  yearMonth: { type: String, required: true },
});

const currentPage = ref(1);
const itemsPerPage = 15;

const filteredData = computed(() => {
  const [yearStr, monthStr] = props.yearMonth.split('.');
  const year = yearStr; // 문자열 그대로 사용
  const month = monthStr.padStart(2, '0'); // 두 자리로 패딩

  const monthFiltered = tableData.value.filter((item) => {
    const itemMonth = String(item.date.month).padStart(2, '0'); // 데이터의 month를 두 자리로 패딩
    return item.date.year === year && itemMonth === month;
  });

  const categoryFiltered =
    props.selectedCategory === 'all'
      ? monthFiltered
      : monthFiltered.filter(
          (item) => item.category === props.selectedCategory
        );

  return categoryFiltered.slice().sort((a, b) => {
    const dateA = new Date(a.date.year, parseInt(a.date.month) - 1, a.date.day);
    const dateB = new Date(b.date.year, parseInt(b.date.month) - 1, b.date.day);
    return dateB - dateA; // 최신순 정렬
  });
});

// 날짜별로 그룹화하고 총계를 계산
const groupedData = computed(() => {
  const grouped = {};
  paginatedData.value.forEach((item) => {
    const dateKey = `${item.date.year}.${String(item.date.month).padStart(
      2,
      '0'
    )}.${String(item.date.day).padStart(2, '0')}`;
    if (!grouped[dateKey]) {
      grouped[dateKey] = { items: [], total: 0 };
    }
    grouped[dateKey].items.push(item);
    // 수입은 더하고 지출은 뺌
    grouped[dateKey].total += item.type === 'income' ? item.price : -item.price;
  });
  return grouped;
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

watch(
  () => props.selectedCategory,
  () => {
    currentPage.value = 1;
  }
);

onMounted(async () => {
  await requestAPI();
  emit('update:tableData', tableData.value);
  const categories = [...new Set(tableData.value.map((item) => item.category))];
  emit('update:categories', categories);
});

const requestAPI = async () => {
  const url = 'http://localhost:3000/transactions';
  const response = await axios.get(url);
  tableData.value = response.data;
};

const handleRowClick = (item) => {
  selectedTransaction.value = item;
  showDetailModal.value = true;
};

const showDetailModal = ref(false);
const selectedTransaction = ref(null);

const handleEdit = (transaction) => {
  console.log('수정할 데이터:', transaction);
};
</script>

<style scoped>
.daily-total {
  background-color: #f5f5f5;
  font-weight: bold;
}
.fixed-width {
  min-width: 100px; /* 혹은 width: 160px; 완전 고정도 가능 */
}
</style>
