<template>
  <div class="modal-overlay">
    <div class="modal-content p-4">
      <h5 class="mb-3">프로필 이미지를 선택하세요</h5>

      <div class="image-grid">
        <img
          v-for="img in imageList"
          :key="img"
          :src="`/assets/profile-images/${img}`"
          @click="selectImage(img)"
          :class="{ selected: img === selectedImage }"
          class="profile-option"
        />
      </div>

      <div class="d-flex justify-content-end mt-4 gap-2">
        <button class="btn btn-secondary" @click="$emit('close')">취소</button>
        <button class="btn btn-primary" @click="saveImage">저장</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "@/stores/userStore";

const emit = defineEmits(["close"]);

const userStore = useUserStore();
const imageList = [
  "profile1.png",
  "profile2.png",
  "profile3.png",
  "profile4.png",
];
const selectedImage = ref(userStore.currentUser?.profileImage);

const selectImage = (img) => {
  selectedImage.value = img;
};

const saveImage = async () => {
  await userStore.updateUser({
    ...userStore.currentUser,
    profileImage: selectedImage.value,
  });
  emit("close"); // 모달 닫기
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
.image-grid {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
}
.profile-option {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  cursor: pointer;
  object-fit: cover;
  transition: 0.3s ease;
  border: 2px solid transparent;
}
.profile-option:hover {
  opacity: 0.8;
}
.selected {
  border: 3px solid #007bff;
}
</style>
