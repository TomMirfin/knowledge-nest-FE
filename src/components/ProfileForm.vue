<script setup lang="ts">
import { ref } from "vue";
import { UserPreference } from "./../types/type";
import { patchUserByUser } from "./axios.ts";
import { RouteLocationNormalizedLoaded, useRoute } from "vue-router";

const form = ref(null);
defineProps(["userProfile"]);
const route: RouteLocationNormalizedLoaded = useRoute();
const username: string | string[] = route.params.username;

async function handleFormSubmitted(data: UserPreference) {
  const patchBody = {
    bio: data.bio,
    interests: data.interests,
    skills: data.skills,
  };

  try {
    await patchUserByUser(username, patchBody).then(() => {
      alert("Profile Edited");
      window.location.reload();
    });
  } catch (error) {
    console.error("Error updating user:", error);
  }
}
</script>

<template>
  <FormKit type="form" @submit="handleFormSubmitted" ref="form">
    <FormKit
      :value="userProfile.bio"
      type="textarea"
      label="Bio"
      name="bio"
      help="Enter Your Bio"
      :classes="{
        outer: 'mb-5',
        label: 'block mb-1 font-bold text-sm',
        inner:
          'max-w-md border border-gray-400 rounded-lg mb-1 overflow-hidden focus-within:border-blue-500',
        input: 'w-full text-white placeholder-gray-400',
        help: 'text-xs text-gray-500',
      }"
    />
    <FormKit
      :value="userProfile.skills"
      type="checkbox"
      validation-label="skills"
      name="skills"
      :options="[
        'Website Developer',
        'Graphic Designer',
        'Math Teacher',
        'Fashion Designer',
        'Tour Guide',
        'Plumber',
        'Personal Chef',
      ]"
      help="Select your skills"
    />
    <div class="mt-5">
      <FormKit
        :value="userProfile.interests"
        type="checkbox"
        validation-label="interests"
        name="interests"
        :options="[
          'Website Developer',
          'Graphic Designer',
          'Math Teacher',
          'Fashion Designer',
          'Tour Guide',
          'Plumber',
          'Personal Chef',
        ]"
        help="Select your Interest"
      />
    </div>
    <FormKit
      type="submit"
      label="Submit"
      :classes="{
        outer: {
          'my-button': true,
        },
        input: {
          $reset: true,
        },
      }"
    />
    <div class="mt-5"></div>
  </FormKit>
</template>

<style scoped>
.my-button {
  background-color: #c1c1c1;
  border-radius: 1rem;
  text-align: center;
  padding: 5px;
}
</style>
