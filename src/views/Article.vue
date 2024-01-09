<script lang="ts">
import { getArticleByArticleId } from "../components/axios";
import ChatButton from "../components/ChatButton.vue";
export default {
  name: "Article",
  data() {
    return { post: undefined, loading: true };
  },
  mounted() {
    //GET POST BY POST ID
    getArticleByArticleId(this.$route.params.article_id).then((res) => {
      console.log("is working!");
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
      <div class="max-w-lg mx-4 px-4">
        <img
          src="../assets/poly.svg
        "
          alt=""
        />
      </div>
    </div>
    <div v-else class="w-screen px-4 flex justify-around mt-14">
      <div class="max-w-lg mx-4 px-4 ml-10 w-full">
        <p class="text-green-400 font-bold pb-3">{{ post.topic }}</p>
        <h1 class="text-4xl pt-4 font-bold">{{ post.title }}</h1>
        <p class="mt-4 pt-4 my-4">
          by:
          <router-link
            class="hover:border-b-2 text-2xl hover:border-green-400"
            :to="`/user/${post.username}`"
            >{{ post.username }}</router-link
          >
        </p>

        <div class="rounded-md bg-slate-50 text-black lg:w-5/6 lg:h-44">
          {{ post.body }}
        </div>
        <div>
          <button
            class="mt-4 relative rounded px-5 py-2.5 overflow-hidden group bg-green-500 relative hover:bg-gradient-to-r hover:from-green-500 hover:to-green-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300"
          >
            <span
              class="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"
            ></span>
            <span class="relative">Get in Touch</span>
          </button>
          <ChatButton :username="post.username"></ChatButton>
        </div>
      </div>
      <div class="max-w-lg mx-4 px-4">
        <img
          src="../assets/poly.svg
        "
          alt=""
        />
      </div>
    </div>
  </section>
</template>
