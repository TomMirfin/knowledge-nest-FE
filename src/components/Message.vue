<template>
  <div class="message pt-2 pb-10">
    <span v-if="!sender">{{ name }}</span>
    <div
      class="flex justify-evenly h-20"
      :class="sender ? 'flex-row-reverse' : ''"
    >
      <Avatar class="mt-1 mr-5" :src="photoUrl" />
      <div
        class="text w-3/4 h-fit rounded-xl p-2 m-5 border"
        :class="sender ? 'bg-green-800' : 'bg-gray-700'"
      >
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Avatar from "./Avatar.vue";
export default {
  components: { Avatar },
  props: {
    name: { type: String, default: "" },
    photoUrl: { type: String, default: "" },
    sender: { type: Boolean, default: false },
  },
};
</script>
