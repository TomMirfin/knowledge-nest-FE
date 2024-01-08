<script lang="ts">
// import { fakePosts } from "../Test-data/Posts.js";
// import InterestForm from "../components/InterestForm.vue";
import { getArticles, postArticle } from "../components/axios.js";
import axios from "axios";
import ArticleCard from "../components/ArticleCard.vue";
interface ArticleData {
  id: string;
  username: string;
  title: string;
  topic: string;
  body: string;
  created_at: Date | String;
}
type newArticle = {
  title: String;
  body: String;
  topic: String;
  username: String;
};
export default {
  name: "Feed",

  data() {
    return {
      isOpen: false,
      isLoaded: false,
      articles: [],
      newArticle: {
        title: "",
        body: "",
        topic: "",
        username: "",
      },
    };
  },
  mounted() {
    this.isLoaded = true;
    getArticles().then((res: any) => {
      console.log(res);
      this.articles = res.data.articles;
      this.isLoaded = false;
    });
  },
  methods: {
    addArticle() {
      //POST LOGIC
      postArticle(this.newArticle).then((response: any) => {
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
    <div class="w-screen px-4 flex justify-around">
      <div class="max-w-lg mx-4 px-4 ml-10">
        <h1 class="text-green-400 font-bold pb-3">Most recent posts</h1>
        <p class="text-4xl pt-4 font-bold">
          Find out what users around you are looking for!
        </p>
        <p class="mt-4 pt-4">
          Explore the opportunities the community has for you, or find out how
          you could support someone with your set of skills!
        </p>
      </div>
      <div class="max-w-lg mx-4 px-4">
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
        class="group inline-block rounded-full bg-green-400 p-[2px] hover:text-white focus:outline-none focus:ring active:text-opacity-75 mt-4"
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

          <div>
            <label for="username" class="sr-only">Username</label>
            <div class="relative">
              <input
                type="text"
                class="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Username"
                v-model="newArticle.username"
                required
              />
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
      <div id="feed-filters" class="mx-9 flex py-3">
        <p class="text-red-600 pr-2">Sort By</p>
        <select name="filter" id="filter">
          <option value="date">Date</option>
          <option value="user">User</option>
        </select>
      </div>
      <div class="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8 mx-9 w-full">
        <div v-for="post in articles" v-bind:key="post.id">
          <router-link :to="`/articles/${post.id}`">
            <article-card :props="post"></article-card>
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<style></style>
