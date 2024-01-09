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
  console.log(JSON.stringify(data));
  const patchBody = { interests: data.interests, skills: data.skills };

  try {
    const response = await patchUserByUser(username, patchBody);
    console.log(response);
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
    <div class="mt-5">
      <FormKit
        :value="userProfile.interests"
        type="checkbox"
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
    </div>
  </FormKit>
</template>
