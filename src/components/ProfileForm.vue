<script setup lang="ts">
import { ref } from "vue";
import { UserPreference } from "./../types/type";
import { patchUserByUser } from "./axios.ts";
import { RouteLocationNormalizedLoaded, useRoute } from "vue-router";

const form = ref(null);
const prop = defineProps(["userProfile"]);
console.log(prop.userProfile);
const route: RouteLocationNormalizedLoaded = useRoute();
const username: string | string[] = route.params.username;

async function handleFormSubmitted(data: UserPreference) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log(JSON.stringify(data));
  const patchBody = {
    bio: data.bio,
    interests: data.interests,
    skills: data.skills,
  };

  try {
    const response = await patchUserByUser(username, patchBody);
    console.log(response);
  } catch (error) {
    console.error("Error updating user:", error);
  }
}
</script>

<template>
  <FormKit
    type="form"
    @submit="handleFormSubmitted"
    ref="form"
    :classes="{
      outer: 'mb-5',
      label: 'block mb-1 font-bold text-sm',
      inner:
        'max-w-md border border-gray-400 rounded-lg mb-1 overflow-hidden focus-within:border-blue-500',
      input:
        'w-full h-10 px-3 border-none text-base text-gray-700 placeholder-gray-400',
      help: 'text-xs text-gray-500',
    }"
  >
    <FormKit
      :value="userProfile.bio"
      type="text"
      label="Bio"
      name="Bio"
      help="Enter Your Bio"
      :classes="{
        outer: 'mb-5',
        label: 'block mb-1 font-bold text-sm',
        inner:
          'max-w-md border border-gray-400 rounded-lg mb-1 overflow-hidden focus-within:border-blue-500',
        input:
          'w-full h-10 px-3 border-none text-base text-gray-700 placeholder-gray-400',
        help: 'text-xs text-gray-500',
      }"
    />
    <FormKit
      :value="userProfile.skills"
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
      help="Select your skills"
    />
    <FormKit
      :value="userProfile.interests"
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
  color: #000;
}

.toast li {
  margin-bottom: 0 !important;
  color: #000;
}
</style>
