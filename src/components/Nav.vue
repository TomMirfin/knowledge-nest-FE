<template>
  <nav class="pt-20 flex align-items justify-center">
    <div class="text-center">
      <strong>Chat</strong>

      <div v-if="isLogin" class="login">
        <Avatar :src="user.photoURL" />
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import Avatar from "./Avatar.vue";
import { useAuth } from "../main";

export default {
  components: { Avatar },
  setup() {
    const { user, isLogin } = useAuth();
    return { user, isLogin };
  },
};
</script>
