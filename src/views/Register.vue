<script setup lang="ts">
import { Ref, ref } from "vue";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  UserCredential,
} from "firebase/auth";

import { useRouter } from "vue-router";

const email: Ref<string> = ref("");
const password: Ref<string> = ref("");
const router: any = useRouter();

const register = (): void => {
  createUserWithEmailAndPassword(getAuth(), email.value, password.value)
    .then(() => {
      console.log("Successfully registered");
      router.push("/feed");
    })
    .catch((err: any) => {
      console.log(err.code);
      alert(err.message);
    });
};

const signUpWithGoogle = (): void => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(getAuth(), provider)
    .then((result: UserCredential) => {
      // const credential = GoogleAuthProvider.credentialFromResult(result);
      // const token = credential?.accessToken;

      const user = result.user;
      alert(user.displayName);
      // console.log(result.user);
      if (result.user.uid) {
        Promise.reject;
      }
      router.push("/feed");
    })
    .catch((err: any) => {
      console.log(err.code, "Error here");
      alert(err.message);
      // const credential = GoogleAuthProvider.credentialFromError(err);
    });
};
</script>

<template>
  <section
    class="bg-[url('https://images.unsplash.com/photo-1552353617-3bfd679b3bdd?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] w-full min-h-screen bg-center bg-no-repeat flex items-center justify-center"
  >
    <div class="bg-slate-200 w-1/4 text-black p-5 rounded-lg shadow-xl">
      <h1>Create an Account</h1>
      <p><input type="text" placeholder="Email" v-model="email" /></p>
      <p><input type="password" placeholder="Password" v-model="password" /></p>
      <p><button @click="register">Submit</button></p>
      <p><button @click="signUpWithGoogle">Sign In With Google</button></p>
    </div>
  </section>
</template>
