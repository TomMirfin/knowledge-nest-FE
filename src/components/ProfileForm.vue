<script setup lang="ts">
import { ref } from "vue";
import { FormKitMessages } from "@formkit/vue";
import { UserPreference } from "./../types/type";
import { patchUserByUser } from "./axios";
import { RouteLocationNormalizedLoaded, useRoute } from "vue-router";

const form = ref(null);
defineProps(["userProfile"]);
const route: RouteLocationNormalizedLoaded = useRoute();
const username: string | string[] = route.params.username;

async function handleFormSubmitted(data: UserPreference, node: any) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log(JSON.stringify(data));

  try {
    const response = await patchUserByUser(username.value, data);
    console.log(response.data);
  } catch (error) {
    console.error("Error updating user:", error);
  }
}
</script>

<template>
  <FormKit type="form" @submit="handleFormSubmitted" ref="form">
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
      help="Select your skills to add"
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
}

.toast li {
  margin-bottom: 0 !important;
  color: white !important;
}
</style>
