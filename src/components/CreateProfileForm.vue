<script setup lang="ts">
import { ref } from "vue";
import { postUser } from "./axios";
import { useRouter } from "vue-router";

const form = ref(null);
const router: any = useRouter();
let skills = ref([]);
let interests = ref([]);

function handleFormSubmitted(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  console.log(formData);
  const postBody = {
    username: event.target.elements.username.value.toLowerCase(),
    skills: skills.value,
    interests: interests.value,
  };
  console.log(postBody);
  postBody.username = postBody.username.toLowerCase();

  console.log(postBody.username);

  postUser(postBody).then((res) => {
    if (res.data.username)
      localStorage.setItem("user", JSON.stringify(res.data.username));
  });
  router.push("/feed");
}
</script>

<template>
  <form
    @submit="handleFormSubmitted"
    class="max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
  >
    <div class="mb-4">
      <label
        class="block text-grey-darker text-sm font-bold mb-2 text-black"
        for="username"
      >
        Username
      </label>
      <input
        class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
        type="text"
        name="username"
        placeholder="Username.."
        required
      />
    </div>
    <fieldset class="mb-4">
      <legend class="block text-grey-darker text-sm font-bold mb-2 text-black">
        Skills
      </legend>
      <div class="flex items-start flex-col">
        <span class="text-gray-700 flex items-center">
          <input
            class="mr-2 form-checkbox h-5 w-5 text-gray-600"
            type="checkbox"
            name="skills"
            value="Website Developer"
            v-model="skills"
          />
          Website Developer</span
        >
        <span class="text-gray-700 flex items-center">
          <input
            class="mr-2 form-checkbox h-5 w-5 text-gray-600"
            type="checkbox"
            name="skills"
            value="Graphic Designer"
            v-model="skills"
          />
          Graphic Designer</span
        >
        <span class="text-gray-700 flex items-center">
          <input
            class="mr-2 form-checkbox h-5 w-5 text-gray-600"
            type="checkbox"
            name="skills"
            value="Math Teacher"
            v-model="skills"
          />
          Math Teacher</span
        >
        <span class="text-gray-700 flex items-center">
          <input
            class="mr-2 form-checkbox h-5 w-5 text-gray-600"
            type="checkbox"
            name="skills"
            value="Fashion Designer"
            v-model="skills"
          />
          Fashion Designer</span
        >
        <span class="text-gray-700 flex items-center">
          <input
            class="mr-2 form-checkbox h-5 w-5 text-gray-600"
            type="checkbox"
            name="skills"
            value="Tour Guide"
            v-model="skills"
          />
          Tour Guide</span
        >
        <span class="text-gray-700 flex items-center">
          <input
            class="mr-2 form-checkbox h-5 w-5 text-gray-600"
            type="checkbox"
            name="skills"
            value="Plumber"
            v-model="skills"
          />
          Plumber</span
        >
        <span class="text-gray-700 flex items-center">
          <input
            class="mr-2 form-checkbox h-5 w-5 text-gray-600"
            type="checkbox"
            name="skills"
            value="Personal Chef"
            v-model="skills"
          />
          Personal Chef</span
        >
      </div>
    </fieldset>
    <fieldset class="mb-4">
      <legend class="block text-grey-darker text-sm font-bold mb-2 text-black">
        Interests
      </legend>
      <div class="flex items-start flex-col">
        <span class="text-gray-700 flex">
          <input
            class="mr-2 form-checkbox h-5 w-5 text-gray-600"
            type="checkbox"
            name="interests"
            value="Website Developer"
            v-model="interests"
          />
          Website Developer</span
        >
        <span class="text-gray-700 flex items-center">
          <input
            class="mr-2 form-checkbox h-5 w-5 text-gray-600"
            type="checkbox"
            name="interests"
            value="Graphic Designer"
            v-model="interests"
          />
          Graphic Designer</span
        >
        <span class="text-gray-700 flex items-center">
          <input
            class="mr-2 form-checkbox h-5 w-5 text-gray-600"
            type="checkbox"
            name="interests"
            value="Math Teacher"
            v-model="interests"
          />
          Math Teacher</span
        >
        <span class="text-gray-700 flex items-center">
          <input
            class="mr-2 form-checkbox h-5 w-5 text-gray-600"
            type="checkbox"
            name="interests"
            value="Fashion Designer"
            v-model="interests"
          />
          Fashion Designer</span
        >
        <span class="text-gray-700 flex items-center">
          <input
            class="mr-2 form-checkbox h-5 w-5 text-gray-600"
            type="checkbox"
            name="interests"
            value="Tour Guide"
            v-model="interests"
          />
          Tour Guide</span
        >
        <span class="text-gray-700 flex items-center">
          <input
            class="mr-2 form-checkbox h-5 w-5 text-gray-600"
            type="checkbox"
            name="interests"
            value="Plumber"
            v-model="interests"
          />
          Plumber</span
        >
        <span class="text-gray-700 flex items-center">
          <input
            class="mr-2 form-checkbox h-5 w-5 text-gray-600"
            type="checkbox"
            name="interests"
            value="Personal Chef"
            v-model="interests"
          />
          Personal Chef</span
        >
      </div>
    </fieldset>
    <div class="flex items-center justify-between">
      <button
        class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="submit"
      >
        Submit
      </button>
    </div>
  </form>
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
