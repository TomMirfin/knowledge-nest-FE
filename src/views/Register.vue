<script setup lang="ts">
import { ref } from "vue";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  UserCredential,
  getAdditionalUserInfo,
  getRedirectResult,
} from "firebase/auth";

import { useRouter } from "vue-router";
import firebase from "firebase/compat/app";

const email: string = ref("");
const password: string = ref("");
const router: any = useRouter();

const register: void = () => {
  createUserWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((data: any) => {
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
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;

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
  // const provider = new GoogleAuthProvider();
  // const auth = getAuth();
  // getRedirectResult(auth, provider)
  //   .then((result) => {
  //     // This gives you a Google Access Token. You can use it to access Google APIs.
  //     const credential = GoogleAuthProvider.credentialFromResult(result);
  //     const token = credential.accessToken;

  //     // The signed-in user info.
  //     const user = result.user;
  //     // IdP data available using getAdditionalUserInfo(result)
  //     // ...
  //     alert(user.displayName);
  //   })
  //   .catch((error) => {
  //     // Handle Errors here.
  //     const errorCode = error.code;
  //     const errorMessage = error.message;
  //     // The email of the user's account used.
  //     const email = error.customData.email;
  //     // The AuthCredential type that was used.
  //     const credential = GoogleAuthProvider.credentialFromError(error);
  //     // ...
  //   });
};

//  const signUpWithGoogle = ():void => {
//    const provider = new GoogleAuthProvider();
//   firebase.auth().signInWithPopup(provider).then(function (result) {
//     const { isNewUser } = getAdditionalUserInfo(result)
//   const {additionalUserInfo: {isNewUser}} = result;

//   console.log(isNewUser ? "This user just registered" : "Existing User")
// })
//  }
</script>

<template>
  <h1>Create an Account</h1>
  <p><input type="text" placeholder="Email" v-model="email" /></p>
  <p><input type="password" placeholder="Password" v-model="password" /></p>
  <p><button @click="register">Submit</button></p>
  <p><button @click="signUpWithGoogle">Sign In With Google</button></p>
</template>
