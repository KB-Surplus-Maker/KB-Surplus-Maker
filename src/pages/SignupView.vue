<template>
  <div class="signup-wrapper d-flex justify-content-center pt-5">
    <div class="signup-box p-5 rounded">
      <h2 class="text-center mb-4">회원가입</h2>
      <form @submit.prevent="handleSignup">
        <input
          v-model="form.name"
          placeholder="이름"
          class="form-control my-3"
        />
        <input
          v-model="form.email"
          type="email"
          placeholder="이메일"
          class="form-control my-3"
        />
        <input
          v-model="form.birth"
          type="date"
          placeholder="생년월일"
          class="form-control my-3"
        />
        <input
          v-model="form.phone"
          placeholder="전화번호"
          class="form-control my-3"
        />
        <input
          v-model="form.password"
          type="password"
          placeholder="비밀번호"
          class="form-control my-3"
        />
        <button class="btn btn-success w-100 mt-4">회원가입</button>
      </form>
    </div>
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

    alert("회원가입 완료!");
    router.push("/");
  } catch (err) {
    alert(err.message);
  }
};
</script>

<style scoped>
.signup-wrapper {
  min-height: 70vh;
}

.signup-box {
  width: 100%;
  max-width: 500px;
  background-color: #ffffff;
  border: 1px solid #dee2e6;
}
</style>
