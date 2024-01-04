<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "vue-router";

const isLoggedIn = ref(false);

let auth: any;

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

const handleSignOut = (): void => {
  signOut(auth).then(() => {
    router.push("/");
  });
};
</script>

<template>
  <nav
    class="background h-20 flex justify-between items-center p-5 absolute w-full"
  >
    <img src="../src/assets/logo.png" alt="" class="w-14" />
    <router-link to="/"> Home </router-link>

    <span v-if="isLoggedIn">
      <router-link to="/feed"> Feed </router-link>
      <router-link to="/userProfile"> Profile </router-link>
      <button @click="handleSignOut">Sign out</button>
    </span>
    <span v-else-if="!isLoggedIn">
      <router-link to="/login"> login |</router-link>
      <router-link to="/register"> Register </router-link>
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
