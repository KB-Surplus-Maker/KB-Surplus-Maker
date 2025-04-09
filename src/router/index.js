import { createRouter, createWebHistory } from "vue-router";
import Home from "@/pages/Home.vue";
import DashBoard from "@/pages/DashBoard.vue";
import History from "@/pages/History.vue";
import ProfileView from "@/pages/ProfileView.vue";
import LoginView from "@/pages/LoginView.vue";
import SignupView from "@/pages/SignupView.vue";
import { useUserStore } from "@/stores/userStore";
import NotFound from "@/pages/NotFound.vue";
import CalendarPage from "@/pages/CalendarPage.vue";
import TransactionRangeView from "@/pages/TransactionRangeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Login",
      component: LoginView,
    },
    {
      path: "/home",
      name: "home",
      component: Home,
      meta: { requiresAuth: true },
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: DashBoard,
      meta: { requiresAuth: true },
    },
    {
      path: "/history",
      name: "history",
      component: History,
      meta: { requiresAuth: true },
    },
    {
      path: "/profile",
      name: "Profile",
      component: ProfileView,
      meta: { requiresAuth: true },
    },
    {
      path: "/signup",
      name: "Signup",
      component: SignupView,
    },
    {
      path: "/calendar",
      name: "Calendar",
      component: CalendarPage,
      meta: { requiresAuth: true },
    },
    {
      path: "/transaction-range",
      name: "TransactionRange",
      component: TransactionRangeView,
      meta: { requiresAuth: true },
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: NotFound,
    },
  ],
});

router.beforeEach((to, from, next) => {
  const userStore = useUserStore();

  // 사용자 정보가 없고, 로그인 요구되는 페이지에 접근 시
  if (to.meta.requiresAuth && !userStore.currentUser) {
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      userStore.currentUser = JSON.parse(savedUser); // ✅ 자동 로그인 복원
      next(); // 통과
    } else {
      alert("로그인이 필요한 페이지입니다.");
      next("/"); // ✅ 로그인 페이지로 이동
    }
  } else {
    next(); // ✅ 조건 만족 → 통과
  }
});

export default router;
