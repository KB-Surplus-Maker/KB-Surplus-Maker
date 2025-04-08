import { createApp } from "vue";
import { createPinia } from "pinia";
import "bootstrap/dist/css/bootstrap.css";
import { useUserStore } from "@/stores/userStore";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(router);

const userStore = useUserStore();
userStore.initializeUserFromStorage(); // ✅ localStorage에서 사용자 정보 복원

app.mount("#app");
