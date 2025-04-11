<template>
  <div class="container my-5">
    <h3 class="mb-4 text-center">🗓️ 기간별 거래내역 조회</h3>

    <!-- 📅 날짜 + 📂 카테고리 선택 -->
    <div class="row mb-4">
      <div class="col">
        <label class="form-label">시작일</label>
        <input type="date" v-model="startDate" class="form-control" />
      </div>
      <div class="col">
        <label class="form-label">종료일</label>
        <input type="date" v-model="endDate" class="form-control" />
      </div>
      <div class="col">
        <label class="form-label">카테고리</label>
        <select v-model="selectedCategory" class="form-select">
          <option value="전체">전체</option>
          <optgroup label="수입">
            <option v-for="cat in incomeCategories" :key="cat" :value="cat">
              {{ cat }}
            </option>
          </optgroup>
          <optgroup label="지출">
            <option v-for="cat in expenseCategories" :key="cat" :value="cat">
              {{ cat }}
            </option>
          </optgroup>
        </select>
      </div>
      <div class="col-auto d-flex align-items-end">
        <button class="btn btn-primary" @click="filterTransactions">
          조회하기
        </button>
      </div>
    </div>

    <!-- 🔁 정렬 토글 버튼 -->
    <div
      class="d-flex justify-content-end mb-2"
      v-if="filteredTransactions.length"
    >
      <button class="btn btn-sm btn-outline-secondary" @click="toggleSortOrder">
        {{ sortDesc ? '최신순 🔽' : '오래된순 🔼' }}
      </button>
    </div>

    <!-- 💸 거래 목록 -->
    <div v-if="paginatedTransactions.length">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>날짜</th>
            <th>종류</th>
            <th>금액</th>
            <th>카테고리</th>
            <th>메모</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="txn in paginatedTransactions" :key="txn.id">
            <td>{{ formatDate(txn.date) }}</td>
            <td>{{ txn.type === 'income' ? '수입' : '지출' }}</td>
            <td :class="txn.type === 'income' ? 'text-success' : 'text-danger'">
              ₩{{ txn.price.toLocaleString() }}
            </td>
            <td>{{ txn.category }}</td>
            <td>{{ txn.memo }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else class="text-muted">🔍 해당 조건의 거래내역이 없습니다.</div>

    <!-- ▶️ 페이지네이션 -->
    <div
      class="mt-4 d-flex justify-content-center align-items-center flex-wrap gap-2"
      v-if="totalPages > 1"
    >
      <button
        class="btn btn-sm btn-outline-secondary"
        :disabled="currentPage === 1"
        @click="currentPage--"
      >
        ◀ 이전
      </button>

      <button
        v-for="page in totalPages"
        :key="page"
        class="btn btn-sm"
        :class="page === currentPage ? 'btn-primary' : 'btn-outline-secondary'"
        @click="currentPage = page"
      >
        {{ page }}
      </button>

      <button
        class="btn btn-sm btn-outline-secondary"
        :disabled="currentPage === totalPages"
        @click="currentPage++"
      >
        다음 ▶
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import axios from 'axios';
import { useUserStore } from '@/stores/userStore';

const userStore = useUserStore();
const startDate = ref('');
const endDate = ref('');
const transactions = ref([]);
const filteredTransactions = ref([]);
const currentPage = ref(1);
const itemsPerPage = 10;
const sortDesc = ref(true);

const incomeCategories = [
  '전체 수입',
  '월급',
  '보너스',
  '용돈',
  '투자수익',
  '기타',
];
const expenseCategories = [
  '전체 지출',
  '카페&디저트',
  '쇼핑',
  '공과금',
  '교통',
  '문화생활',
  '병원',
  '식비',
];

// const categories = [
//   '전체',
//   '카페&디저트',
//   '쇼핑',
//   '공과금',
//   '교통',
//   '월급',
//   '문화생활',
//   '생활',
//   '기타',
//   '용돈',
//   '병원',
//   '투자수익',
//   '보너스',
//   '식비',
// ];
const selectedCategory = ref('전체');

// 거래 가져오기
const fetchTransactions = async () => {
  const userId = userStore.currentUser?.id;
  if (!userId) return;
  const res = await axios.get(
    `http://localhost:3000/transactions?userId=${userId}`
  );
  transactions.value = res.data;
};

// 거래 필터링
const filterTransactions = () => {
  const start = new Date(startDate.value);
  const end = new Date(endDate.value);

  filteredTransactions.value = transactions.value.filter((t) => {
    const tDate = new Date(`${t.date.year}-${t.date.month}-${t.date.day}`);
    const inDateRange = tDate >= start && tDate <= end;
    let inCategory = false;
    if (selectedCategory.value === '전체') {
      inCategory = true;
    } else if (selectedCategory.value === '전체 수입') {
      inCategory = t.type === 'income';
    } else if (selectedCategory.value === '전체 지출') {
      inCategory = t.type === 'expense';
    } else {
      inCategory = t.category === selectedCategory.value;
    }

    return inDateRange && inCategory;
  });

  sortFilteredTransactions();
  currentPage.value = 1;
};

// 정렬
const sortFilteredTransactions = () => {
  filteredTransactions.value.sort((a, b) => {
    const dateA = new Date(`${a.date.year}-${a.date.month}-${a.date.day}`);
    const dateB = new Date(`${b.date.year}-${b.date.month}-${b.date.day}`);
    return sortDesc.value ? dateB - dateA : dateA - dateB;
  });
};

const toggleSortOrder = () => {
  sortDesc.value = !sortDesc.value;
  sortFilteredTransactions();
};

// 날짜 출력 형식
const formatDate = (date) => {
  return `${date.year}-${String(date.month).padStart(2, '0')}-${String(
    date.day
  ).padStart(2, '0')}`;
};

// 페이지네이션
const paginatedTransactions = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredTransactions.value.slice(start, end);
});
const totalPages = computed(() => {
  return Math.ceil(filteredTransactions.value.length / itemsPerPage);
});

fetchTransactions();
</script>
