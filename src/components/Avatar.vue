<template>
  <img class="avatar h-20" :src="src" />
</template>

<script lang="ts">
export default {
  props: { src: { type: String, default: "" } },
};
</script>
