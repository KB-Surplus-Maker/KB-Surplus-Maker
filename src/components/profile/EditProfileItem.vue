<template>
  <div class="modal-overlay">
    <div class="modal-content p-4">
      <h5 class="mb-3">{{ label }} 수정</h5>
      <input
        v-model="newValue"
        type="text"
        class="form-control"
        :placeholder="label"
      />

      <div class="d-flex justify-content-end mt-4 gap-2">
        <button class="btn btn-secondary" @click="$emit('close')">취소</button>
        <button class="btn btn-primary" @click="saveChange">저장</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "@/stores/userStore";

const props = defineProps({
  label: String,
  field: String,
  currentValue: String,
});

const emit = defineEmits(["close"]);
const newValue = ref(props.currentValue);
const userStore = useUserStore();

const saveChange = async () => {
  await userStore.updateUser({
    ...userStore.currentUser,
    [props.field]: newValue.value,
  });
  emit("close");
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}
.modal-content {
  background: #fff;
  border-radius: 10px;
  width: 400px;
  max-width: 90%;
}
</style>
