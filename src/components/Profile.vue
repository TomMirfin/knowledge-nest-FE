<script lang="ts">
import { RouteLocationNormalizedLoaded, useRoute } from "vue-router";
import { getUserByUsername } from "./axios.ts";
import { onMounted, ref, Ref } from "vue";
import ProfileForm from "./ProfileForm.vue";
import { UserPreference } from "./../types/type";

export default {
  components: {
    ProfileForm,
  },
  setup() {
    const route: RouteLocationNormalizedLoaded = useRoute();
    const userProfile: Ref<UserPreference | undefined> = ref();
    const loading: Ref<boolean> = ref(false);
    const edit: Ref<boolean> = ref(false);

    const handleFormSubmitted = (formData: any) => {
      console.log("Form submitted:", formData);
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
    };

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
    };
  },
};
</script>
<template>
  <div
    class="flex flex-col items-center justify-center min-h-screen bg-gray-100"
  >
    <div
      class="flex-grow max-w-md p-4 bg-gray-200 rounded-lg shadow-lg text-gray-800"
    >
      <div class="flex flex-col items-center">
        <p v-if="loading" class="text-xl font-bold">Loading...</p>
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
      <ProfileForm v-if="edit" :userProfile="userProfile" />
      <div v-else>
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
      <p>
        <button
          @click="toggleEdit"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
        >
          {{ edit ? "Save Changes" : "Edit: Skills/Interests" }}
        </button>
      </p>

      <p>
        <!-- <button
          @click="comments"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
        >
          View Comments
        </button> -->
      </p>
    </div>
  </div>
</template>
