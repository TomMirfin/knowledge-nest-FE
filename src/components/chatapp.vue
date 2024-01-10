<template>
  <Nav />

  <Chat />
</template>

<script lang="ts">
import Nav from "./Nav.vue";
import Chat from "./Chat.vue";

export default {
  name: "chatapp",
  components: { Nav, Chat },
};
</script>
