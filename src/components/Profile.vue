<script lang="ts">
import { RouteLocationNormalizedLoaded, useRoute } from "vue-router";
import { getUserById } from "./axios.ts";
import { onMounted, ref, Ref } from "vue";

export default {
  setup() {
    interface UserPreference {
      username: string;
      interest: string[];
      skills: string[];
    }
    const route: RouteLocationNormalizedLoaded = useRoute();
    const userProfile: Ref<UserPreference | undefined> = ref();
    const loading: Ref = ref(false);

    onMounted(() => {
      loading.value = true;
      const id: string | string[] = route.params.user_id;
      getUserById(id).then((res: any) => {
        loading.value = false;
        console.log(res.data);
        userProfile.value = res.data;
      });
    });
    console.log(userProfile);
    return { userProfile, loading };
  },
};
</script>
<template>
  <div
    class="flex flex-col items-center justify-center min-h-screen bg-gray-100"
  >
    <p v-if="loading" class="text-xl font-bold">Loading...</p>
    <div
      class="flex-grow max-w-md p-4 bg-gray-200 rounded-lg shadow-lg text-gray-800"
    >
      <div class="flex flex-col items-center">
        <img />
        <h1 v-if="userProfile" class="mt-4 text-2xl font-bold">
          {{ userProfile?.username }} Profile
        </h1>
        <img
          :src="userProfile?.img_url"
          alt="User Image"
          class="rounded-full h-16 w-16 mb-4"
        />
        <p class="mt-2 text-gray-600">Web Developer</p>
      </div>
      <div class="mt-8">
        <h2 class="text-lg font-bold">Bio</h2>
        <p class="mt-2 text-gray-600">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non
          risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec,
          ultricies sed, dolor.
        </p>
      </div>
      <div class="mt-8">
        <h2 class="text-lg font-bold">Contact Information</h2>
        <ul v-if="userProfile" class="mt-2 text-gray-600">
          <li v-if="userProfile.email">Email: {{ userProfile.email }}</li>
          <li v-else="userProfile.email">Email: No Email</li>
        </ul>
      </div>
      <div class="mt-8">
        <h2 class="text-lg font-bold">skills</h2>
        <ul v-if="userProfile">
          <li v-for="skill in userProfile?.skills" :key="skill">{{ skill }}</li>
        </ul>
      </div>
      <div class="mt-8">
        <h2 class="text-lg font-bold">interests</h2>
        <ul v-if="userProfile">
          <li v-for="interest in userProfile?.interests" :key="interest">
            {{ interest }}
          </li>
        </ul>
        <p>
          <button
            @click="comments"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
          >
            View Comments
          </button>
        </p>
      </div>
    </div>
  </div>
</template>
