<script lang="ts">
import CreateProfileForm from "../components/CreateProfileForm.vue";

export default {
  components: { CreateProfileForm },
};
</script>
<template>
  <section
    class="w-full h-screen bg-[#073B3A] flex flex-col justify-start-center items-center pt-28"
    id="feed"
  >
    <CreateProfileForm />
  </section>
</template>
