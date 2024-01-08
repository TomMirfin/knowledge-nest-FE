<script setup lang="ts">
import { ref, inject } from "vue";
import { UserPreference } from "./../types/type";
import { postUser } from "./axios";
import { useRouter } from "vue-router";

const form = ref(null);
const user = inject("user", { default: {} });
const router: any = useRouter();

let token = user.value.token;

function handleFormSubmitted(data) {
  //post request to create a new user with the form details
  const postBody = {
    username: data.username,
    interests: data.interests,
    skills: data.skills,
    token: token,
    img_url: user.value.img_url,
  };
  //   console.log(postBody);
  user.value.username = postBody.username;
  postUser(postBody).then((res) => {
    localStorage.setItem("user", JSON.stringify(postBody));

    console.log(res);
    console.log(res.data);

    router.push("/feed");
  });
  //after post body

  //router push to the feed
}
</script>

<template>
  <h1>Hello Tim</h1>
  <FormKit type="form" @submit="handleFormSubmitted" ref="form">
    <FormKit
      type="text"
      name="username"
      placeholder="Type your new username"
      validation="required"
    />
    <FormKit
      type="checkbox"
      label="skills"
      validation-label="skills"
      name="skills"
      :options="[
        'Website Developer',
        'Car Mechanic',
        'Maths Tutor',
        'English Tutor',
        'Accountant',
        'Local Tour Guide',
        'Baby Sitter',
      ]"
      help="Select your skills to add"
    />
    <FormKit
      type="checkbox"
      label="interests"
      validation-label="interests"
      name="interests"
      :options="[
        'Website Developer',
        'Car Mechanic',
        'Maths Tutor',
        'English Tutor',
        'Accountant',
        'Local Tour Guide',
        'Baby Sitter',
      ]"
      help="Select your Interest"
    />
  </FormKit>
</template>

<style>
.toast {
  position: fixed;
  top: 0;
  right: 0;
  width: 300px;
  padding: 1rem;
}

.toast > * {
  padding: 0.75em;
  border-radius: 0.25em;
  box-shadow: 0 0 1em rgba(0, 0, 0, 0.1);
  background-color: #8d2c2c;
}

.toast li {
  margin-bottom: 0 !important;
  color: white !important;
}
</style>
