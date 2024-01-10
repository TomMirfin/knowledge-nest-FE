<script setup lang="ts">
import { onMounted, ref, provide } from "vue";
import { Auth, getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { Router, useRouter } from "vue-router";

const isLoggedIn = ref(false);

let auth: Auth;
const storedUser = JSON.parse(localStorage.getItem("user"));

const router: Router = useRouter();
const user = ref({
  id: "",
  username: storedUser.username,
  token: "",
  img_url: "https://i.imgur.com/z7eiLjV.png",
});
onMounted(() => {
  auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isLoggedIn.value = true;
    } else {
      isLoggedIn.value = false;
    }
  });
});

const handleSignOut = (): void => {
  signOut(auth).then(() => {
    router.push("/");
  });
};

const refreshPage = () => {
  router.push({ path: `/user/${storedUser.username}`, force: true });
};
provide("user", user);
</script>

<template>
  <nav
    class="background h-24 flex justify-between items-center justify-center p-5 absolute w-full"
  >
    <router-link
      to="/"
      class="ml-52 flex items-center px-1 pr-1 rounded-md hover:bg-[#073B3A]"
    >
      <img src="../src/assets/logo.svg" alt="" class="max-w-8" />
      <p class="font-bold">Skill Share</p>
    </router-link>

    <span v-if="isLoggedIn" class="px-2">
      <router-link to="/feed">
        <button
          class="mx-2 relative rounded px-5 py-2.5 overflow-hidden group bg-green-500 relative hover:bg-gradient-to-r hover:from-green-500 hover:to-green-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300"
        >
          <span
            class="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"
          ></span>
          <span class="relative">Feed</span>
        </button>
      </router-link>
      <router-link :to="`/user/${storedUser.username}`" @click="refreshPage">
        <button
          class="mx-2 mr-3 relative rounded px-5 py-2.5 overflow-hidden group bg-green-500 relative hover:bg-gradient-to-r hover:from-green-500 hover:to-green-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300"
        >
          <span
            class="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"
          ></span>
          <span class="relative">Profile</span>
        </button>
      </router-link>
      <button
        @click="handleSignOut"
        class="relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-green-500 transition duration-300 ease-out border-2 border-green-500 hover:border-red-600 hover:bg-red-600 rounded-full shadow-md group"
      >
        <span
          class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-red-500-500 group-hover:translate-x-0 ease"
        >
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            ></path>
          </svg>
        </span>
        <span
          class="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease"
          >Sign out</span
        >
        <span class="relative invisible">Sign out</span>
      </button>
    </span>
    <span class="flex w-56 justify-around" v-else-if="!isLoggedIn">
      <router-link to="/login">
        <button
          class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800"
        >
          <span
            class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0"
          >
            Login
          </span>
        </button>
      </router-link>
      <router-link to="/register">
        <button
          class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
        >
          <span
            class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0"
          >
            Register
          </span>
        </button>
      </router-link>
    </span>
  </nav>
  <router-view></router-view>
</template>

<style>
.background {
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.8) 0%,
    rgba(0, 0, 0, 0) 100%
  );
}
</style>
