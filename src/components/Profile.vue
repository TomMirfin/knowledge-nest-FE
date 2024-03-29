<script lang="ts">
import { RouteLocationNormalizedLoaded, useRoute } from "vue-router";
import { getUserByUsername } from "./axios.ts";
import { onMounted, ref, Ref, watch } from "vue";
import ProfileForm from "./ProfileForm.vue";
import { UserPreference } from "./../types/type";
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
    const userStored: any | null = JSON.parse(localStorage.getItem("user")!);
    const username: string | string[] | any = route.params.username;
    const handleFormSubmitted = async () => {
      try {
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
      if (username) {
        getUserByUsername(username).then((res: any) => {
          loading.value = false;
          userProfile.value = res.data;
        });
      }
    });

    const toggleEdit = (): void => {
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
      class="flex-grow lg:max-w-lg p-4 bg-[#073b1748] rounded-lg text-white shadow-2xl w-full mx-auto"
    >
      <div class="flex flex-col items-center">
        <p v-if="loading" class="text-xl font-bold">Loading...</p>
        <h1 v-if="userProfile" class="mt-4 text-2xl font-bold pt-20 pb-5">
          {{
            userProfile
              ? userProfile.username[0].toUpperCase() +
                userProfile.username.slice(1)
              : ""
          }}'s Profile
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
        <div
          class="mt-4 p-4 border border-grey-900 border-t-1 border-l-0 border-r-0 border-b-0"
        >
          <h2 class="text-lg font-bold">Bio</h2>
          <p v-if="!userProfile?.bio">Bio Empty</p>
          <p v-else class="mt-2 text-gray-100">
            {{ userProfile?.bio }}
          </p>
        </div>
        <div
          class="mt-4 p-4 border border-grey-900 border-t-1 border-l-0 border-r-0 border-b-0"
        >
          <h2 class="text-lg font-bold">Contact Information</h2>
          <ul v-if="userProfile" class="mt-2 text-gray-100">
            <li v-if="userProfile.email">Email: {{ userProfile.email }}</li>
            <li v-else="userProfile.email">Email: No Email</li>
          </ul>
        </div>
        <div
          class="mt-4 p-4 border border-grey-900 border-t-1 border-l-0 border-r-0 border-b-0"
        >
          <h2 class="text-lg font-bold">Skills</h2>
          <ul v-if="userProfile && userProfile.skills.length > 0">
            <li
              class="mt-2 text-gray-100"
              v-for="skill in userProfile?.skills"
              :key="skill"
            >
              {{ skill }}
            </li>
          </ul>
          <p v-else>No Skills Selected</p>
        </div>
        <div
          class="mt-4 p-4 border border-grey-900 border-t-1 border-l-0 border-r-0 border-b-1"
        >
          <h2 class="text-lg font-bold">Interests</h2>
          <ul v-if="userProfile && userProfile.interests.length > 0">
            <li
              class="mt-2 text-gray-100"
              v-for="interest in userProfile?.interests"
              :key="interest"
            >
              {{ interest }}
            </li>
          </ul>
          <p v-else>No Interests Selected</p>
        </div>
      </div>
      <p v-if="userProfile?.username === userStored">
        <button
          @click="toggleEdit"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
        >
          {{ edit ? "Save Changes" : "Edit Profile" }}
        </button>
      </p>
      <Reviews />
    </div>
  </div>
</template>
