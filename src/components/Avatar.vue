<template>
  <img class="avatar" :src="src" />
</template>

<script lang="ts">
export default {
  props: { src: { type: String, default: '' } }
}
</script>
