<template>
  <div class="login-wrapper d-flex justify-content-center pt-5">
    <div class="login-box p-5 rounded">
      <h2 class="mb-4 text-center">로그인</h2>
      <form @submit.prevent="handleLogin">
        <input
          v-model="email"
          type="email"
          placeholder="이메일"
          class="form-control my-3"
        />
        <input
          v-model="password"
          type="password"
          placeholder="비밀번호"
          class="form-control my-3"
        />
        <button class="btn btn-success w-100 mt-4">로그인</button>
      </form>

      <!-- ✅ 회원가입 버튼 -->
      <div class="text-center mt-4">
        <p>아직 회원이 아니신가요?</p>
        <router-link to="/signup" class="btn btn-outline-primary">
          회원가입
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/userStore';

const email = ref('');
const password = ref('');
const userStore = useUserStore();
const router = useRouter();

const handleLogin = async () => {
  try {
    await userStore.login(email.value, password.value);
    alert('로그인 성공!');
    router.push('/dashboard'); // 로그인 후 메인 페이지 등으로 이동
  } catch (err) {
    alert(err.message);
  }
};
</script>

<style scoped>
.login-wrapper {
  min-height: 50vh;
}

.login-box {
  width: 100%;
  max-width: 500px;
  background-color: #ffffff;
  border: 1px solid #dee2e6;
}
</style>
