import { createApp } from "vue";
import { createPinia } from "pinia";
import { useUserStore } from "@/stores/userStore";

// ✅ v-calendar 공식 사용법
import VCalendar from "v-calendar";
import "v-calendar/style.css";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(router);

// ✅ 사용자 정보 복원
const userStore = useUserStore();
userStore.initializeUserFromStorage();

// ✅ v-calendar 플러그인 등록
app.use(VCalendar, {}); // ← ✅ 이렇게만 하세요

app.mount("#app");
