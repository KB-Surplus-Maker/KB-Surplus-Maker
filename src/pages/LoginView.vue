<template>
  <div class="container mt-5" style="max-width: 400px">
    <h2 class="mb-4" style="text-align: center">로그인</h2>
    <form @submit.prevent="handleLogin">
      <input
        v-model="email"
        type="email"
        placeholder="이메일"
        class="form-control my-2"
      />
      <input
        v-model="password"
        type="password"
        placeholder="비밀번호"
        class="form-control my-2"
      />
      <button class="btn btn-success w-100 mt-3">로그인</button>
    </form>

    <!-- ✅ 회원가입 버튼 -->
    <div class="text-center mt-3">
      <p>아직 회원이 아니신가요?</p>
      <router-link to="/signup" class="btn btn-outline-primary"
        >회원가입</router-link
      >
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/userStore";

const email = ref("");
const password = ref("");
const userStore = useUserStore();
const router = useRouter();

const handleLogin = async () => {
  try {
    await userStore.login(email.value, password.value);
    alert("로그인 성공!");
    router.push("/dashboard"); // 로그인 후 메인 페이지 등으로 이동
  } catch (err) {
    alert(err.message);
  }
};
</script>
