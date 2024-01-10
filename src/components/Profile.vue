<script lang="ts">
import { RouteLocationNormalizedLoaded, useRoute } from "vue-router";
import { getUserByUsername } from "./axios.ts";
import { onMounted, ref, Ref, watch } from "vue";
import ProfileForm from "./ProfileForm.vue";
import { SignIn, UserPreference } from "./../types/type";
import Reviews from "../views/Reviews.vue";

export default {
  components: {
    ProfileForm,
    Reviews,
  },
  setup() {
    const route: RouteLocationNormalizedLoaded = useRoute();
    const userProfile: Ref<UserPreference | undefined> = ref<UserPreference>();
    const loading: Ref<boolean> = ref(false);
    const edit: Ref<boolean> = ref(false);
    const userStored = JSON.parse(localStorage.getItem("user")!) as SignIn;
    const handleFormSubmitted = async (formData: any) => {
      try {
        const username: string | string[] = route.params.username;
        if (username) {
          const res = await getUserByUsername(username);
          userProfile.value = res.data;
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      } finally {
        loading.value = false;
      }
    };
    watch(
      () => route.params.username,
      async (newUsername) => {
        if (newUsername) {
          loading.value = true;
          const res = await getUserByUsername(newUsername);
          userProfile.value = res.data;
          loading.value = false;
        }
      }
    );

    onMounted(() => {
      loading.value = true;
      const username: string | string[] = route.params.username;
      if (username) {
        getUserByUsername(username).then((res: any) => {
          loading.value = false;
          userProfile.value = res.data;
        });
      }
    });

    const toggleEdit = () => {
      edit.value = !edit.value;
    };

    return {
      userProfile,
      loading,
      edit,
      toggleEdit,
      handleFormSubmitted,
      userStored,
    };
  },
};
</script>
<template>
  <div
    class="flex flex-col items-center justify-center min-h-screen bg-[#073b3a] text-center"
  >
    <div
      class="flex-grow max-w-lg p-4 bg-[#073b1748] rounded-lg text-white shadow-2xl"
    >
      <div class="flex flex-col items-center">
        <p v-if="loading" class="text-xl font-bold">Loading...</p>
        <h1 v-if="userProfile" class="mt-4 text-2xl font-bold pt-20 pb-5">
          {{ userProfile?.username }} 's Profile
        </h1>
        <img
          :src="userProfile?.img_url"
          alt="User Image"
          class="rounded-full h-16 w-16 mb-4"
        />
        <p class="mt-2 text-white">Web Developer</p>
      </div>
      <ProfileForm v-if="edit" :userProfile="userProfile" />
      <div v-else-if="userProfile">
        <div class="mt-8">
          <h2 class="text-lg font-bold">Bio</h2>
          <p class="mt-2 text-gray-600">
            {{ userProfile?.bio }}
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
          <h2 class="text-lg font-bold">Skills</h2>
          <ul v-if="userProfile">
            <li v-for="skill in userProfile?.skills" :key="skill">
              {{ skill }}
            </li>
          </ul>
        </div>
        <div class="mt-8">
          <h2 class="text-lg font-bold">Interests</h2>
          <ul v-if="userProfile">
            <li v-for="interest in userProfile?.interests" :key="interest">
              {{ interest }}
            </li>
          </ul>
        </div>
      </div>
      <p v-if="userProfile?.username === userStored">
        <button
          @click="toggleEdit"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
        >
          {{ edit ? "Save Changes" : "Edit: Skills/Interests" }}
        </button>
      </p>
      <p></p>
      <Reviews />
    </div>
  </div>
</template>
