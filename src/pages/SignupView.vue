<template>
  <div class="container mt-5" style="max-width: 400px">
    <h2 style="text-align: center">회원가입</h2>
    <form @submit.prevent="handleSignup">
      <input v-model="form.name" placeholder="이름" class="form-control my-2" />
      <input
        v-model="form.email"
        type="email"
        placeholder="이메일"
        class="form-control my-2"
      />
      <input
        v-model="form.birth"
        type="date"
        placeholder="생년월일"
        class="form-control my-2"
      />
      <input
        v-model="form.phone"
        placeholder="전화번호"
        class="form-control my-2"
      />
      <input
        v-model="form.password"
        type="password"
        placeholder="비밀번호"
        class="form-control my-2"
      />
      <button class="btn btn-primary w-100 mt-3">회원가입</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/userStore";

const form = ref({
  name: "",
  email: "",
  birth: "",
  phone: "",
  password: "",
});

const userStore = useUserStore();
const router = useRouter();

const handleSignup = async () => {
  try {
    await userStore.signup(form.value);
    alert("회원가입 완료! 로그인되었습니다.");
    router.push("/");
  } catch (err) {
    alert(err.message);
  }
};
</script>
