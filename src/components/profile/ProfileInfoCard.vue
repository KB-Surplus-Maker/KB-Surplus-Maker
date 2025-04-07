<template>
  <div class="card p-4">
    <h5 class="mb-3">프로필</h5>
    <ProfileInfoItem
      v-for="item in profileItems"
      :key="item.field"
      :label="item.label"
      :field="item.field"
    />
  </div>
</template>

<script setup>
import ProfileInfoItem from "./ProfileInfoItem.vue";

const profileItems = [
  { label: "이름", field: "name" },
  { label: "생년월일", field: "birth" },
  { label: "전화번호", field: "phone" },
  { label: "이메일", field: "email" },
  { label: "비밀번호", field: "password" },
];
</script>
