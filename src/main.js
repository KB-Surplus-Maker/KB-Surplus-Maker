import { createApp } from "vue";
import { createPinia } from "pinia";
import { useUserStore } from "@/stores/userStore";

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

app.mount("#app");
