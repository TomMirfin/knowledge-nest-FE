<script lang="ts">
export default {
  props: ["props"],
};
</script>
<template>
  <div
    class="h-32 rounded-lg bg-[#073B3A] text-white shadow-md overflow-hidden"
  >
    <div class="flex justify-between px-2 pt-2">
      <p class="font-bold text-xl">{{ props.title }}</p>
      <span
        class="whitespace-nowrap rounded-full bg-green-400 px-2.5 py-0.5 text-sm text-[#073B3A]"
      >
        {{ props.topic }}
      </span>
    </div>

    <p class="mt-2 px-3">by: {{ props.username }}</p>
    <div
      v-if="props.body.length > 50"
      class="bg-white mt-2 h-32 text-black px-2 pt-2"
    >
      <p>{{ props.body.slice(0, 25) + "..." }}</p>
    </div>
    <div v-else class="bg-white mx-0 mt-2 h-32 text-black px-2 pt-2">
      <p>{{ props.body }}</p>
    </div>
  </div>
</template>

<!-- <div class="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
    <div class="h-32 rounded-lg bg-gray-200"></div>
    <div class="h-32 rounded-lg bg-gray-200"></div>
    <div class="h-32 rounded-lg bg-gray-200"></div>
  </div> -->
