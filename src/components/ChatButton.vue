<script setup lang="ts">
defineProps(["username"]);
</script>

<template>
  <router-link :to="`/chatapp`">Chat to {{ username }}</router-link>
</template>
