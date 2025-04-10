<!-- ./pages/TransactionForm.vue -->
<template>
  <teleport to="body">
    <div v-if="show" class="modal-backdrop">
      <div class="modal-container">
        <div class="modal-header">
          <h3>거래 추가하기</h3>
          <button @click="close">X</button>
        </div>
        <div class="modal-body">
          <!-- 날짜, 유형, 카테고리, 세부 카테고리, 메모 입력 -->
          <form @submit.prevent="saveTransaction">
            <label>날짜</label>
            <input type="date" v-model="form.date" />

            <label>유형</label>
            <div>
              <!--라디오 버튼 간격-->
              <label style="margin-right: 1.5rem"
                ><input type="radio" value="수입" v-model="form.type" />
                수입</label
              >

              <label
                ><input type="radio" value="지출" v-model="form.type" />
                지출</label
              >
            </div>

            <label>카테고리</label>
            <select v-model="form.category">
              <option value="">--선택--</option>
              <option
                v-for="item in form.type === '수입'
                  ? incomeCategories
                  : expenseCategories"
                :key="item"
                :value="item"
              >
                {{ item }}
              </option>
            </select>

            <label>금액 </label>
            <input
              type="number"
              v-model="form.price"
              placeholder="금액을 입력하세요"
              min="0"
            />
            <label>메모</label>
            <input
              type="text"
              v-model="form.memo"
              placeholder="추가 메모를 입력하세요"
            />

            <div class="modal-actions">
              <button type="button" @click="close" class="cancel-button">
                취소
              </button>

              <button type="submit" class="save-button">저장</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import { defineProps, defineEmits, reactive } from 'vue';
import axios from 'axios';
import '@/assets/modal.css';
import { useUserStore } from '@/stores/userStore';

//수입, 지출 카테고리
const incomeCategories = ['월급', '보너스', '용돈', '투자수익', '기타'];
const expenseCategories = [
  '식비',
  '교통',
  '카페&디저트',
  '쇼핑',
  '문화생활',
  '공과금',
  '병원',
  '기타',
];

const userStore = useUserStore();

//props & emit
const props = defineProps({
  show: Boolean,
});
const emit = defineEmits(['close']);
const close = () => emit('close');

//form 상태
const form = reactive({
  date: new Date().toISOString().slice(0, 10),
  type: '수입',
  category: '',
  price: '',
  memo: '',
});

//날짜 포맷 변환 함수  (yyyy-mm-dd -> {year, month,day})

function parseDate(dateStr) {
  const [year, month, day] = dateStr.split('-');
  return { year, month, day };
}

//데이터 저장 함수
const saveTransaction = async () => {
  const transaction = {
    id: `txn${Date.now()}`,
    userId: userStore.currentUser.id, // Todo: 로그인된 사용자 ID로 동적 변경 기능 추가
    date: parseDate(form.date),
    type: form.type === '수입' ? 'income' : 'expense',
    price: parseInt(form.price),
    category: form.category,
    memo: form.memo,
  };

  try {
    await axios.post('http://localhost:3000/transactions', transaction);
    alert('저장 완료!');
    close();
    window.location.reload(); // 전체 페이지 새로고침
  } catch (error) {
    console.error('저장 실패:', error);
    alert('오류 발생');
  }
};
</script>

<style>
/*TransitionForm & TransitionDetailModal: 모달 페이지 공통 속성*/

label {
  font-weight: 600;
  color: #003366;
  margin-bottom: 0.25rem;
}

input[type='date'],
input[type='text'],
input[type='number'],
select {
  padding: 0.5rem;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 0.95rem;
  transition: border-color 0.2s;
}

input:focus,
select:focus {
  border-color: #3366cc;
  outline: none;
}

.modal-body div input[type='radio'] {
  margin-right: 5px;
}

.modal-actions {
  margin-top: 1.5rem;
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
}

.cancel-button {
  background: white;
  color: #003366;
  border: 1px solid #003366;
  padding: 0.5rem 1.2rem;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: 0.2s ease;
}

.cancel-button:hover {
  background: #f0f6ff;
}

.save-button {
  background: #003366;
  color: white;
  border: none;
  padding: 0.5rem 1.2rem;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s ease;
}

.save-button:hover {
  background: #002855;
}
</style>
