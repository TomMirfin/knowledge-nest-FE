<script setup lang="ts">
import { ref, Ref } from "vue";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  UserCredential,
} from "firebase/auth";
import { useRouter } from "vue-router";

const email: Ref<string> = ref("");
const password: Ref<string> = ref("");
const router: any = useRouter();
const errMsg: Ref<any> = ref();

const register = (): void => {
  signInWithEmailAndPassword(getAuth(), email.value, password.value)
    .then(() => {
      console.log("Successfully registered");
      router.push("/feed");
    })
    .catch((err: any) => {
      console.log(err.code);
      switch (err.code) {
        case "auth/invalid-email":
          errMsg.value = "Invalid email";
          break;
        case "auth/user-not-found":
          errMsg.value = "No account with that email was found";
          break;
        case "auth/wrong-password":
          errMsg.value = "Incorrect password";
          break;
        default:
          errMsg.value = "Email or password was incorrect";
          break;
      }
      alert(err.message);
    });
};

const signInWithGoogle = (): void => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(getAuth(), provider)
    .then((result: UserCredential) => {
      console.log(result.user);
      router.push("/feed");
    })
    .catch((err: any) => {
      console.log(err.code);
      alert(err.message);
    });
};
</script>

<template>
  <section
    class="bg-[url('https://images.unsplash.com/photo-1552353617-3bfd679b3bdd?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] w-full min-h-screen bg-center bg-no-repeat flex items-center justify-center"
  >
    <div class="bg-slate-200 w-1/4 text-black p-5 rounded-lg shadow-xl">
      <h1 class="font-bold text-3xl m-4">Sign In to an Account</h1>
      <p><input type="text" placeholder="Email" v-model="email" /></p>
      <p><input type="password" placeholder="Password" v-model="password" /></p>
      <p v-if="errMsg">{{ errMsg }}</p>
      <p><button @click="register">Submit</button></p>
      <p><button @click="signInWithGoogle">Sign In With Google</button></p>
    </div>
  </section>
</template>
