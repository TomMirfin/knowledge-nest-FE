<template>
  <div class="container-sm">
    <div class="mx-auto h-[500px] overflow-auto">
      <Message
        v-for="{ id, text, userPhotoURL, userName, userId } in messages"
        :key="id"
        :name="userName"
        :photo-url="userPhotoURL"
        :sender="userId === user?.uid"
      >
        {{ text }}
      </Message>
    </div>
  </div>

  <div ref="bottom" class="mt-5" />

  <div class="bottom">
    <div class="container-sm mb-[100px]">
      <form v-if="isLogin" @submit.prevent="send">
        <input
          v-model="message"
          placeholder="Message"
          class="h-40 w-1/2 absolute left-[120px] rounded-2xl ml-2"
          required
        />
        <button type="submit">
          <SendIcon />
        </button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import SendIcon from "@mui/icons-material/Send";
import { ref, watch, nextTick } from "vue";
import { useAuth, useChat } from "../main";

import Message from "./Message.vue";

export default {
  components: { Message, SendIcon },
  setup() {
    const { user, isLogin } = useAuth();
    const { messages, sendMessage } = useChat();

    const bottom = ref(null);
    watch(
      messages,
      () => {
        nextTick(() => {
          bottom.value?.scrollIntoView({ behavior: "smooth" });
        });
      },
      { deep: true }
    );

    const message = ref("");
    const send = () => {
      sendMessage(message.value);
      message.value = "";
    };

    return { user, isLogin, messages, bottom, message, send };
  },
};
</script>
