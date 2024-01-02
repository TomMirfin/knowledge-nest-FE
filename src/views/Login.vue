import { errorMessages } from 'vue/compiler-sfc';
<script setup lang="ts">
import { ref } from "vue"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { useRouter } from "vue-router"

const email: string = ref("")
const password: string = ref("")
const router: any = useRouter()
const errMsg: Ref<any> = ref()

const register: void = () => {
  signInWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((data: any) => {
      console.log("Successfully registered")
      router.push("/feed")
    })
    .catch((err: any) => {
      console.log(err.code)
      switch (err.code) {
        case "auth/invalid-email":
          errMsg.value = "Invalid email"
          break
        case "auth/user-not-found":
          errMsg.value = "No account with that email was found"
          break
        case "auth/wrong-password":
          errMsg.value = "Incorrect password"
          break
        default:
          errMsg.value = "Email or password was incorrect"
          break
      }
      alert(err.message)
    })
}

const signInWithGoogle: void = () => {}
</script>

<template>
  <h1>Sign In to an Account</h1>
  <p><input type="text" placeholder="Email" v-model="email" /></p>
  <p><input type="password" placeholder="Password" v-model="password" /></p>
  <p v-if="errMsg">{{ errMsg }}</p>
  <p><button @click="register">Submit</button></p>
  <p><button @click="signInWithGoogle">Sign In With Google</button></p>
</template>
