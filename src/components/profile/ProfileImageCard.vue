<template>
  <div class="card p-3 text-center">
    <img
      :src="`/assets/profile-images/${userStore.currentUser?.profileImage}`"
      class="rounded-circle mx-auto mb-3"
      style="width: 206px; height: 206px; object-fit: cover"
      alt="프로필 이미지"
    />
    <button class="btn btn-outline-primary" @click="showModal = true">
      프로필 사진 수정하기
    </button>

    <!-- 모달 -->
    <EditProfileImage v-if="showModal" @close="showModal = false" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "@/stores/userStore";
import EditProfileImage from "@/components/profile/EditProfileImage.vue";

const showModal = ref(false);
const userStore = useUserStore();
</script>
<!--  -->
