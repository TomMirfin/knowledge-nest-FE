<script lang="ts">
import { ref } from "vue";
import { getArticles, postArticle } from "../components/axios.js";
import ArticleCard from "../components/ArticleCard.vue";
import { Article, ArticleData } from "../types/type";

export default {
  name: "Feed",

  setup() {
    const user: string = JSON.parse(localStorage.getItem("user")!);
    const newArticle = ref<Article>({
      title: "",
      body: "",
      topic: "",
      username: user,
    });

    return { newArticle };
  },
  data() {
    return {
      isOpen: false,
      isLoaded: false,
      articles: [] as ArticleData[],
    };
  },
  mounted() {
    this.isLoaded = true;
    getArticles().then((res) => {
      this.articles = res.data.articles;
      this.isLoaded = false;
    });
  },
  methods: {
    addArticle() {
      //POST LOGIC
      postArticle(this.newArticle).then((response) => {
        this.articles.unshift(response.data);
        this.newArticle = { title: "", body: "", topic: "", username: "" };
        this.isOpen = !this.isOpen;
      });
    },

    changeForm() {
      this.isOpen = !this.isOpen;
    },
  },
  components: { ArticleCard },
};
</script>

<template>
  <section
    class="w-full bg-[#073B3A] flex flex-col justify-center items-center pt-28"
    id="feed"
  >
    <div
      class="lg:px-4 flex lg:justify-around justify-center items-center pb-6 mr-4 lg:mr-0"
    >
      <div class="max-w-lg lg:mx-4 lg:px-4 ml-10 mx-3">
        <h1 class="text-green-400 font-bold pb-3 lg:text-left text-center">
          Most recent posts
        </h1>
        <p
          class="lg:text-4xl lg:pt-4 font-bold text-3xl lg:text-left text-center"
        >
          Find out what users around you are looking for!
        </p>
        <p class="lg:mt-4 lg:pt-4 lg:text-left text-center">
          Explore the opportunities the community has for you, or find out how
          you could support someone with your set of skills!
        </p>
      </div>
      <div class="max-w-lg mx-4 px-4 lg:block hidden">
        <img
          src="../assets/poly.svg
        "
          alt=""
        />
      </div>
    </div>

    <div
      class="bg-white w-full mx-7 pb-5 lg:px-56 sm:px-3 flex flex-col items-center"
    >
      <p v-if="isLoaded">Loading...</p>

      <button
        v-on:click="changeForm"
        class="group inline-block rounded-full bg-green-400 p-[2px] hover:text-white focus:outline-none focus:ring active:text-opacity-75 lg:mt-4 my-5"
      >
        <span class="block rounded-full px-8 py-3 text-sm font-medium">
          {{ !isOpen ? "Add a post" : "Nevermind" }}
        </span>
      </button>
      <div v-if="isOpen">
        <form
          @submit.prevent="addArticle"
          class="mx-auto mb-0 mt-8 max-w-md space-y-4 bg-slate-200 p-3"
        >
          <div class="flex justify-between space-x-4">
            <div class="w-1/2">
              <label for="title" class="sr-only">Title</label>
              <div class="relative">
                <input
                  type="text"
                  class="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Title"
                  v-model="newArticle.title"
                  required
                />
              </div>
            </div>

            <div class="w-1/2">
              <label for="topic" class="sr-only">Topic</label>
              <div class="relative">
                <input
                  type="text"
                  class="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Topic"
                  v-model="newArticle.topic"
                  required
                />
              </div>
            </div>
          </div>

          <div>
            <label for="body" class="sr-only">Body</label>
            <div class="relative">
              <textarea
                class="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm resize-none"
                rows="4"
                placeholder="Body"
                v-model="newArticle.body"
                required
              ></textarea>
            </div>
          </div>

          <div class="flex items-center justify-between">
            <button
              type="submit"
              class="inline-block rounded-lg bg-green-500 px-5 py-3 text-sm font-medium text-white"
            >
              Submit
            </button>
          </div>
        </form>
      </div>

      <div class="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8 mx-9 w-full">
        <div v-for="post in articles" v-bind:key="post.id" class="px-3">
          <router-link :to="`/articles/${post.id}`">
            <article-card :props="post"></article-card>
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<style></style>
