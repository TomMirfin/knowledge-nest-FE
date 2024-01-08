import {
  RouteRecordRaw,
  Router,
  createRouter,
  createWebHistory,
} from "vue-router";
import Register from "../views/Register.vue";
import Login from "../views/Login.vue";
import Home from "../views/Home.vue";
import Feed from "../views/Feed.vue";
import Article from "../views/Article.vue";
import Profile from "../components/Profile.vue";
import { Unsubscribe, getAuth, onAuthStateChanged } from "firebase/auth";
import ErrorPage from "../views/ErrorPage.vue";
import Success from "../views/Success.vue";
import chatapp from "../components/chatapp.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/success",
    name: "Success",
    component: Success,
  },
  {
    path: "/error",
    name: "Error",
    component: ErrorPage,
  },
  {
    path: "/feed",
    name: "Feed",
    component: Feed,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/user/:user_id",
    name: "Profile",
    component: Profile,
    props: true,
  },
  {
    path: "/userProfile",
    name: "userProfile",
    component: Profile,
    props: true,
  },
  {
    path: "/articles/:article_id",
    name: "Article",
    component: Article,
  },
  {
    path: "/chatapp",
    name: "ChatApp",
    component: chatapp,
  },
];

const router: Router = createRouter({
  history: createWebHistory(),
  routes,
});

const getCurrentUser = (): Promise<any> => {
  return new Promise((resolve, reject) => {
    const removeListener: Unsubscribe = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener();
        resolve(user);
      },
      reject
    );
  });
};

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    try {
      const user = await getCurrentUser();
      if (user) {
        next();
      } else {
        alert("You don't have access!");
        next("/");
      }
    } catch (error) {
      console.error("Error getting current user:", error);
      alert("An error occurred while checking authentication.");
      next("/");
    }
  } else {
    next();
  }
});

export default router;
