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
              <label
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
              <option>식비</option>
              <option>교통</option>
              <option>카페&디저트</option>
              <option>뷰티</option>
              <option>쇼핑</option>
              <option>기타</option>
            </select>

            <label>메모</label>
            <input
              type="text"
              v-model="form.memo"
              placeholder="추가 메모를 입력하세요"
            />

            <div class="modal-actions">
              <button type="submit">저장</button>
              <button type="button" @click="close">취소</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import { defineProps, defineEmits, reactive } from 'vue';

const props = defineProps({
  show: Boolean,
});
const emit = defineEmits(['close']);

const close = () => emit('close');

const form = reactive({
  date: new Date().toISOString().slice(0, 10),
  type: '수입',
  category: '',
  subCategory: '',
  memo: '',
});

const saveTransaction = () => {
  console.log(form); // 나중에 저장 로직 연결
  close();
};
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-container {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  width: 400px;
  max-width: 90%;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-actions {
  margin-top: 1rem;
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}
</style>
