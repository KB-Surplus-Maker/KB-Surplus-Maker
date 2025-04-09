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

          <label><strong>분류:</strong></label>
          <template v-if="isEditing"
            ><input v-model="editableTransaction.type" type="text" />
          </template>
          <template v-else>
            <p>{{ editableTransaction.type }}</p>
          </template>

          <label><strong>금액:</strong></label>
          <template v-if="isEditing"
            ><input v-model.number="editableTransaction.price" type="number" />
          </template>
          <template v-else>
            <p>{{ editableTransaction.price.toLocaleString() }}</p>
          </template>

          <label><strong>카테고리:</strong></label>
          <template v-if="isEditing">
            <input v-model="editableTransaction.category" type="text" />
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
import { ref, watch } from 'vue';
import '@/assets/modal.css';

const props = defineProps({
  show: Boolean,
  transaction: Object,
});

const emit = defineEmits(['close', 'save']);
const editableTransaction = ref({ ...props.transaction });

// 편집 모드
const isEditing = ref(false);

// props 변경 시 데이터 초기화
watch(
  () => props.transaction,
  (newTransaction) => {
    editableTransaction.value = { ...newTransaction };
  },
  { immediate: true }
);

//수정 버튼 클릭 시 편집 모드 전환
const enableEdit = () => {
  isEditing.value = true;
};

// 저장버튼 클릭 시 상위로 emit
const saveChanges = () => {
  emit('save', editableTransaction.value);
};

const formatDate = (date) => {
  return `${date.year}.${date.month.padStart(2, '0')}.${date.day.padStart(
    2,
    '0'
  )}`;
};
</script>

<style scoped>
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
