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
          <p><strong>날짜:</strong> {{ formatDate(transaction.date) }}</p>
          <p><strong>분류:</strong> {{ transaction.type }}</p>
          <p>
            <strong>금액:</strong> {{ transaction.price.toLocaleString() }} 원
          </p>
          <p><strong>카테고리:</strong> {{ transaction.category }}</p>
          <p><strong>메모:</strong> {{ transaction.memo }}</p>
        </div>

        <!-- 하단 버튼 -->
        <div class="modal-actions">
          <button class="cancel-button" @click="$emit('close')">닫기</button>
          <button class="save-button" @click="$emit('edit', transaction)">
            수정
          </button>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import '@/assets/modal.css';
defineProps({
  show: Boolean,
  transaction: Object,
});
defineEmits(['close', 'edit']);

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
  line-height: 1.8;
  color: #333;
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
