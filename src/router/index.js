import { createRouter, createWebHistory } from "vue-router";
import Home from "@/pages/Home.vue";
import DashBoard from "@/pages/DashBoard.vue";
import TransactionHistory from "@/pages/TransactionHistory.vue";
import ProfileView from "@/pages/ProfileView.vue";
import LoginView from "@/pages/LoginView.vue";
import SignupView from "@/pages/SignupView.vue";

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
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: DashBoard,
    },
    {
      path: "/history",
      name: "history",
      component: TransactionHistory,
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
  ],
});

export default router;
