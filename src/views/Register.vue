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

const signUpWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(getAuth(), provider)
    .then((result: UserCredential) => {
      // const credential = GoogleAuthProvider.credentialFromResult(result);
      // const token = credential?.accessToken;

      const user = result.user;
      alert(user.displayName);
      console.log(result.user);
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
  <h1>Create an Account</h1>
  <p><input type="text" placeholder="Email" v-model="email" /></p>
  <p><input type="password" placeholder="Password" v-model="password" /></p>
  <p><button @click="register">Submit</button></p>
  <p><button @click="signUpWithGoogle">Sign In With Google</button></p>
</template>
