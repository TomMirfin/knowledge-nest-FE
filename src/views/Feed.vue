<script setup lang="ts">
import { fakePosts } from "../Test-data/Posts.js";
import { useRouter } from "vue-router";
</script>

<template>
  <section
    class="w-full bg-[#073B3A] flex flex-col justify-start items-center"
    id="feed"
  >
    <h1 class="text-red-600">Feed</h1>

    <div id="feed-filters">
      <select name="filter" id="filter">
        <option value="date">Date</option>
        <option value="date">Date</option>
      </select>
    </div>

    <div v-for="post in fakePosts" v-bind:key="post.id">
      <router-link :to="`/articles/${post._id}`">
        <div class="bg-black m-2 p-2 text-center">
          <p>{{ post.username }}</p>
          <p>{{ post.title }}</p>

          <br />
          <div v-if="post.body.length > 50">
            <p>{{ post.body.slice(0, 25) + "..." }}</p>
          </div>
          <div v-else>
            <p>{{ post.body }}</p>
          </div>
        </div>
      </router-link>
    </div>
  </section>
</template>

<style></style>
