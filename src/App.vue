<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "vue-router";

const isLoggedIn = ref(false);

let auth;

const router: any = useRouter();

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

const handleSignOut = () => {
  signOut(auth).then(() => {
    router.push("/");
  });
};
</script>

<template>
  <nav>
    <router-link to="/"> Home </router-link> |
    <span v-if="isLoggedIn">
      <button @click="handleSignOut">Sign out</button> |
      <router-link to="/feed"> Feed </router-link>
    </span>
    <span v-else-if="!isLoggedIn">
      <router-link to="/login"> login |</router-link>
      <router-link to="/register"> Register </router-link>
    </span>
  </nav>
  <router-view></router-view>
</template>
