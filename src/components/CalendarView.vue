<template>
  <div class="container my-4">
    <h3 class="mb-4 text-center">📅 가계부 달력</h3>

    <!-- 월 이동 버튼 -->
    <div
      class="d-flex justify-content-center align-items-center gap-3 mb-3 calendar-nav"
    >
      <button class="btn btn-outline-secondary btn-sm" @click="moveMonth(-1)">
        ←
      </button>
      <h5 class="m-0 px-2">{{ currentYear }}년 {{ currentMonth + 1 }}월</h5>
      <button class="btn btn-outline-secondary btn-sm" @click="moveMonth(1)">
        →
      </button>
    </div>

    <!-- 달력 -->
    <div class="calendar-grid border">
      <div class="day-header" v-for="(day, index) in weekdays" :key="index">
        {{ day }}
      </div>

      <div
        v-for="(cell, index) in calendarDays"
        :key="index"
        class="day-cell"
        :class="{ 'outside-date': !cell.isCurrentMonth }"
        @click="cell.isCurrentMonth && openModal(cell.date)"
        style="cursor: pointer"
      >
        <div class="date-number">{{ cell.date.getDate() }}</div>

        <div v-if="cell.isCurrentMonth">
          <div class="expense" v-if="cell.expense > 0">
            -₩{{ cell.expense.toLocaleString() }}
          </div>
          <div class="income" v-if="cell.income > 0">
            +₩{{ cell.income.toLocaleString() }}
          </div>
        </div>
      </div>
    </div>

    <!-- ✅ 거래 내역 모달 -->
    <div
      class="modal fade show"
      tabindex="-1"
      style="display: block"
      v-if="showModal"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ selectedDateString }} 거래 내역</h5>
            <!-- ✅ 더 잘 보이게 + 우측 상단 정렬 -->
            <button
              type="button"
              class="btn btn-sm"
              @click="closeModal"
              style="font-weight: bold; font-size: 1.1rem"
            >
              ✖
            </button>
          </div>
          <div class="modal-body">
            <div v-if="selectedTransactions.length > 0">
              <ul class="list-group">
                <li
                  v-for="txn in selectedTransactions"
                  :key="txn.id"
                  class="list-group-item d-flex justify-content-between align-items-center"
                >
                  <div>
                    <div>
                      <strong>{{
                        txn.type === "income" ? "수입" : "지출"
                      }}</strong>
                      - {{ txn.category }}
                    </div>
                    <small class="text-muted">{{ txn.memo }}</small>
                  </div>
                  <span
                    :class="
                      txn.type === 'income' ? 'text-success' : 'text-danger'
                    "
                  >
                    ₩{{ txn.price.toLocaleString() }}
                  </span>
                </li>
              </ul>
            </div>
            <div v-else class="text-muted text-center">
              거래 내역이 없습니다.
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-backdrop fade show" v-if="showModal"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import { useUserStore } from "@/stores/userStore";

const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
const userStore = useUserStore();
const transactions = ref([]);

const currentDate = ref(new Date());
const currentYear = computed(() => currentDate.value.getFullYear());
const currentMonth = computed(() => currentDate.value.getMonth());

// 이전/다음 달 이동
const moveMonth = (delta) => {
  const newDate = new Date(currentDate.value);
  newDate.setMonth(newDate.getMonth() + delta);
  currentDate.value = newDate;
};

// 거래 데이터 불러오기
const fetchTransactions = async () => {
  const userId = userStore.currentUser?.id;
  if (!userId) return;
  const res = await axios.get(
    `http://localhost:3000/transactions?userId=${userId}`
  );
  transactions.value = res.data;
};

// 달력 셀 구성
const calendarDays = computed(() => {
  const days = [];
  const year = currentYear.value;
  const month = currentMonth.value;

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const prevPadding = firstDay.getDay();
  const nextPadding = 6 - lastDay.getDay();
  const startDate = new Date(firstDay);
  startDate.setDate(startDate.getDate() - prevPadding);

  const totalCells = prevPadding + lastDay.getDate() + nextPadding;

  for (let i = 0; i < totalCells; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    const isCurrentMonth = date.getMonth() === month;

    const dayTxns = transactions.value.filter((t) => {
      const tDate = new Date(`${t.date.year}-${t.date.month}-${t.date.day}`);
      return (
        tDate.getFullYear() === date.getFullYear() &&
        tDate.getMonth() === date.getMonth() &&
        tDate.getDate() === date.getDate()
      );
    });

    const income = dayTxns
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.price, 0);
    const expense = dayTxns
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.price, 0);

    days.push({ date, isCurrentMonth, income, expense });
  }

  return days;
});

// 모달 관련 상태
const showModal = ref(false);
const selectedDate = ref(null);
const selectedTransactions = ref([]);

const openModal = (date) => {
  selectedDate.value = date;
  showModal.value = true;

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  selectedTransactions.value = transactions.value.filter((t) => {
    return (
      Number(t.date.year) === year &&
      Number(t.date.month) === month &&
      Number(t.date.day) === day
    );
  });
};

const closeModal = () => {
  showModal.value = false;
};

const selectedDateString = computed(() => {
  if (!selectedDate.value) return "";
  const y = selectedDate.value.getFullYear();
  const m = String(selectedDate.value.getMonth() + 1).padStart(2, "0");
  const d = String(selectedDate.value.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
});

onMounted(fetchTransactions);
</script>

<style scoped>
.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  border: 1px solid #ccc;
  max-width: 720px;
  margin: 0 auto;
}

.calendar-nav {
  max-width: 720px;
  margin: 0 auto;
}

.day-header {
  text-align: center;
  font-weight: bold;
  padding: 8px;
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
}

.day-cell {
  height: 100px;
  padding: 6px;
  border: 1px solid #dee2e6;
  box-sizing: border-box;
  font-size: 0.85rem;
}

.date-number {
  font-weight: bold;
  margin-bottom: 4px;
}

.outside-date .date-number {
  color: #bbb;
}
.outside-date {
  background-color: #f9f9f9;
}

.expense {
  color: red;
  font-size: 0.75rem;
}

.income {
  color: green;
  font-size: 0.75rem;
}

/* 모달 덮개 스타일 보완 */
.modal-backdrop {
  z-index: 1040;
}
.modal {
  z-index: 1050;
}

.modal .btn-close {
  font-size: 1.5rem;
  opacity: 0.8;
}

.modal .btn-close:hover {
  opacity: 1;
}
</style>
