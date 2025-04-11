<template>
  <div class="modal-overlay">
    <div class="modal-content p-4">
      <h5 class="mb-3">{{ label }} 수정</h5>

      <!-- ✅ 비밀번호 입력창 -->
      <div class="position-relative mb-3">
        <input
          v-model="newValue"
          :type="inputType"
          class="form-control"
          :placeholder="label"
        />
        <span
          v-if="props.field === 'password'"
          class="password-toggle"
          @click="showPassword = !showPassword"
        >
          {{ showPassword ? "🙈" : "👁️" }}
        </span>
      </div>

      <!-- ✅ 비밀번호 확인 입력창 -->
      <div v-if="props.field === 'password'" class="position-relative mb-3">
        <input
          v-model="confirmPassword"
          :type="inputType"
          class="form-control"
          placeholder="비밀번호 확인"
        />
        <span class="password-toggle" @click="showPassword = !showPassword">
          {{ showPassword ? "🙈" : "👁️" }}
        </span>
      </div>

      <div class="d-flex justify-content-end mt-4 gap-2">
        <button class="btn btn-secondary" @click="$emit('close')">취소</button>
        <button class="btn btn-primary" @click="saveChange">저장</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useUserStore } from "@/stores/userStore";

const props = defineProps({
  label: String,
  field: String,
  currentValue: String,
});

const emit = defineEmits(["close"]);
const newValue = ref(props.currentValue);
const confirmPassword = ref(""); // ✅ 비밀번호 확인값
const showPassword = ref(false);
const userStore = useUserStore();

const inputType = computed(() =>
  props.field === "password" && !showPassword.value ? "password" : "text"
);

const saveChange = async () => {
  if (props.field === "password" && newValue.value !== confirmPassword.value) {
    alert("비밀번호가 일치하지 않습니다.");
    return;
  }

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

.password-toggle {
  position: absolute;
  top: 50%;
  right: 12px;
  transform: translateY(-50%);
  cursor: pointer;
  font-size: 1.2rem;
  color: #666;
}
</style>
