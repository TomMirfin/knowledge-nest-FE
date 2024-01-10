<script setup lang="ts">
import { ref } from "vue";
import { postUser } from "./axios";
import { useRouter } from "vue-router";

const form = ref(null);
const router: any = useRouter();

function handleFormSubmitted(data) {
  //post request to create a new user with the form details
  const postBody = {
    username: data.username.toLowerCase(),
    interests: data.interests,
    skills: data.skills,
  };
  console.log(postBody.username);

  postUser(postBody).then((res) => {
    if (res.data.username)
      localStorage.setItem("user", JSON.stringify(res.data.username));
    router.push("/feed");
  });
  //after post body

  //router push to the feed
}
</script>

<template>
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
