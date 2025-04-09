<!-- ./components/TransactionDetailModal.vue -->
<template>
  <teleport to="body">
    <div v-if="show" class="modal-backdrop">
      <div class="modal-container">
        <!-- 헤더 -->
        <div class="modal-header">
          <h3>거래 상세 정보</h3>
          <button @click="$emit('close')">X</button>
        </div>

        <!-- 내용 -->
        <div class="modal-body">
          <p>
            <strong>날짜:</strong> {{ formatDate(editableTransaction.date) }}
          </p>
          <!--분류: 라디오 버튼-->
          <label><strong>분류:</strong></label>
          <template v-if="isEditing">
            <div>
              <label>
                <input
                  type="radio"
                  value="income"
                  v-model="editableTransaction.type"
                />
                수입
              </label>
              <label style="margin-left: 1rem">
                <input
                  type="radio"
                  value="expense"
                  v-model="editableTransaction.type"
                />
                지출
              </label>
            </div>
          </template>
          <template v-else>
            <p>{{ typeText(editableTransaction.type) }}</p>
          </template>

          <label><strong>금액:</strong></label>
          <template v-if="isEditing"
            ><input v-model.number="editableTransaction.price" type="number" />
          </template>
          <template v-else>
            <p>{{ editableTransaction.price.toLocaleString() }}원</p>
          </template>
          <!--카테고리: select -->
          <label><strong>카테고리:</strong></label>
          <template v-if="isEditing">
            <select v-model="editableTransaction.category">
              <option disabled value="">-- 선택 --</option>
              <option
                v-for="option in categoryOptions"
                :key="option"
                :value="option"
              >
                {{ option }}
              </option>
            </select>
          </template>
          <template v-else>
            <p>{{ editableTransaction.category }}</p>
          </template>

          <label><strong>메모:</strong></label>
          <template v-if="isEditing">
            <input v-model="editableTransaction.memo" type="text" />
          </template>
          <template v-else>
            <p>{{ editableTransaction.memo }}</p>
          </template>
        </div>

        <!-- 하단 버튼 -->
        <div class="modal-actions">
          <button class="cancel-button" @click="$emit('close')">닫기</button>
          <template v-if="isEditing">
            <button class="save-button" @click="saveChanges">저장</button>
          </template>
          <template v-else>
            <button class="save-button" @click="enableEdit">수정</button>
          </template>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import axios from 'axios';
import '@/assets/modal.css';

const props = defineProps({
  show: Boolean,
  transaction: Object,
});

const emit = defineEmits(['close', 'save']);
const editableTransaction = ref({ ...props.transaction }); // ✅ 먼저 선언!

const isEditing = ref(false);

// 분류에 따라 카테고리 옵션 반환
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

const categoryOptions = computed(() => {
  if (editableTransaction.value.type === 'income') return incomeCategories;
  if (editableTransaction.value.type === 'expense') return expenseCategories;
  return [];
});

//  type 변경 시 category 초기화
watch(
  () => editableTransaction.value.type,
  (newType) => {
    if (newType === 'income' || newType === 'expense') {
      editableTransaction.value.category = '';
    }
  }
);

// props.transaction이 바뀌면 재설정
watch(
  () => props.transaction,
  (newTransaction) => {
    editableTransaction.value = { ...newTransaction };
    isEditing.value = false;
  },
  { immediate: true }
);

const enableEdit = () => {
  isEditing.value = true;
};

//저장
const saveChanges = async () => {
  try {
    const cleanedData = {
      id: editableTransaction.value.id,
      userId: editableTransaction.value.userId,
      date: {
        year: String(editableTransaction.value.date.year),
        month: String(Number(editableTransaction.value.date.month)),
        day: String(Number(editableTransaction.value.date.day)),
      },
      type: editableTransaction.value.type,
      price: editableTransaction.value.price,
      category: editableTransaction.value.category,
      memo: editableTransaction.value.memo,
    };

    await axios.put(
      `http://localhost:3000/transactions/${cleanedData.id}`,
      cleanedData
    );

    emit('updateSuccess');
    isEditing.value = false;
    emit('close');
    window.location.reload(); // 전체 페이지 새로고침
  } catch (error) {
    console.error('수정 실패:', error);
    alert('서버에 저장 실패!');
  }
};

const formatDate = (date) => {
  return `${date.year}.${date.month.padStart(2, '0')}.${date.day.padStart(
    2,
    '0'
  )}`;
};

const typeText = (val) =>
  val === 'income' ? '수입' : val === 'expense' ? '지출' : '';
</script>

<style scoped>
@import '@/assets/modal.css';
.modal-header button {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  color: #999;
}

.modal-body {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  color: #333;
}

.modal-body input {
  padding: 0.4rem;
  border: 1px solid #ccc;
  border-radius: 4px;
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
}

.save-button:hover {
  background: #002855;
}
</style>
