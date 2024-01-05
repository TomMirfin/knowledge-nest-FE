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
    class="bg-[url('./assets/pottery.jpg')] w-full min-h-screen bg-center bg-cover flex items-center justify-center"
  >
    <div class="bg-slate-200 w-1/4 text-black p-5 rounded-lg shadow-xl">
      <h1 class="font-bold text-2xl m-4">Sign in with an Account</h1>
      <p>
        <input
          class="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm my-3"
          type="text"
          placeholder="Email"
          v-model="email"
        />
      </p>
      <p>
        <input
          class="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm mb-3"
          type="password"
          placeholder="Password"
          v-model="password"
        />
      </p>
      <p v-if="errMsg">{{ errMsg }}</p>
      <div class="flex my-3 gap-3">
        <button
          @click="register"
          class="w-3/4 h-[50px] relative rounded px-5 py-2.5 overflow-hidden group bg-green-500 relative hover:bg-gradient-to-r hover:from-green-500 hover:to-green-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300"
        >
          <span
            class="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"
          ></span>
          <span class="relative">Submit</span>
        </button>
        <button
          @click="signInWithGoogle"
          class="w-3/4 h-[50px] flex items-center bg-white border border-gray-300 rounded-lg shadow-md max-w-xs px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          <svg
            class="h-6 w-6 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="-0.5 0 48 48"
            version="1.1"
          >
            <g
              id="Icons"
              stroke="none"
              stroke-width="1"
              fill="none"
              fill-rule="evenodd"
            >
              <g id="Color-" transform="translate(-401.000000, -860.000000)">
                <g id="Google" transform="translate(401.000000, 860.000000)">
                  <path
                    d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24"
                    id="Fill-1"
                    fill="#FBBC05"
                  ></path>
                  <path
                    d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333"
                    id="Fill-2"
                    fill="#EB4335"
                  ></path>
                  <path
                    d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667"
                    id="Fill-3"
                    fill="#34A853"
                  ></path>
                  <path
                    d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24"
                    id="Fill-4"
                    fill="#4285F4"
                  ></path>
                </g>
              </g>
            </g>
          </svg>
          <span>Sign with Google</span>
        </button>
      </div>
    </div>
  </section>
</template>
