<script lang="ts">
import { getArticleByArticleId } from "../components/axios";
import ChatButton from "../components/ChatButton.vue";

export default {
  name: "Article",
  data() {
    return {
      post: { id: "", username: "", title: "", topic: "", body: "" },
      loading: true,
    };
  },
  mounted() {
    //GET POST BY POST ID
    getArticleByArticleId(this.$route.params.article_id).then((res) => {
      this.post = res.data;
      this.loading = false;
    });
  },
  components: { ChatButton },
};
</script>

<template>
  <section
    class="w-full h-screen bg-[#073B3A] flex flex-col justify-start-center items-center pt-28"
    id="feed"
  >
    <div v-if="loading" class="w-screen px-4 flex justify-around mt-14">
      <div class="max-w-lg mx-4 px-4 ml-10">
        <p class="text-green-400 font-bold pb-3">Loading topic</p>
        <h1 class="text-4xl pt-4 font-bold">Loading title</h1>
        <p class="mt-4 pt-4 my-4">by: username</p>

        <div class="rounded-md bg-slate-50 text-black lg:w-5/6 lg:h-44">
          ...
        </div>
      </div>
      <div class="max-w-lg mx-4 px-4 g:block hidden">
        <img
          src="../assets/poly.svg
        "
          alt=""
        />
      </div>
    </div>
    <div
      v-else
      class="w-screen lg:px-4 flex lg:justify-around items-center lg:items-start justify-centermt-14"
    >
      <div class="max-w-lg lg:mx-4 lg:px-4 lg:ml-10 w-full px-5">
        <p class="text-green-400 font-bold pb-3 text-center lg:text-left">
          {{ post.topic }}
        </p>
        <h1 class="text-4xl pt-4 font-bold text-center lg:text-left">
          {{ post.title }}
        </h1>
        <p class="lg:mt-4 pt-4 lg:my-4 text-center lg:text-left">
          by:
          <router-link
            class="hover:border-b-2 text-2xl hover:border-green-400"
            :to="`/user/${post.username}`"
            >{{ post.username }}</router-link
          >
        </p>

        <div
          class="rounded-md bg-slate-50 text-black lg:w-5/6 lg:h-44 my-5 p-3"
        >
          {{ post.body }}
        </div>
        <div
          class="flex items-center justify-center lg:items-start lg:justify-start"
        >
          <button
            class="flex items-center justify-center mt-4 relative rounded px-5 py-2.5 overflow-hidden group bg-green-500 hover:bg-gradient-to-r hover:from-green-500 hover:to-green-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300"
          >
            <span
              class="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"
            ></span>
            <router-link :to="`/chatapp`"
              >Chat to {{ post.username }}</router-link
            >
          </button>
        </div>
      </div>
      <div class="max-w-lg mx-4 px-4 hidden lg:flex items-start">
        <img
          src="../assets/poly.svg
        "
          class="lg:w-[600px]"
          alt=""
        />
      </div>
    </div>
  </section>
</template>
