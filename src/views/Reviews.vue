<script setup lang="ts">
import { onMounted } from "vue";
import { getReviews, postReview } from "../components/axios";
import { ref } from "vue";
import { useRoute } from "vue-router";
import { watch } from "vue";

const route: RouteLocationNormalizedLoaded = useRoute();
const username: string | string[] = route.params.username;

const seeComments = ref(false);
const addComments = ref(false);
const reviewResponse = ref([]);
const review = ref({ body: "", rating: 5, title: "" });
const userStored = JSON.parse(localStorage.getItem("user"));

const toggleComment = () => {
  seeComments.value = !seeComments.value;
};

const toggleAddComment = () => {
  addComments.value = !addComments.value;
};

const handleSubmit = async () => {
  const postBody = {
    username: userStored,
    created_about: username,
    title: review.value.title,
    body: review.value.body,
    rating: review.value.rating,
  };

  await postReview(postBody).then((res) => {
    if (res.data.title) alert("review sent");
    else alert("review failed to send");
    reviewResponse.value = [res.data, ...reviewResponse.value];
  });
};

onMounted(async () => {
  const data = await getReviews(username);
  reviewResponse.value = data.data.reviews;
});
</script>

<template>
  <div>
    <button
      @click="toggleComment"
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline-blue active:bg-blue-800 mt-5 mr-5 mb-2"
    >
      Click To see Reviews
    </button>
    <button
      @click="toggleAddComment"
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline-blue active:bg-blue-800 mt-5"
    >
      Click To Add Review
    </button>
  </div>
  <section
    v-if="addComments"
    class="flex-grow max-w-lg p-4 bg-[#073b1748] rounded-lg text-white shadow-2xl"
  >
    <form class="justify-center" @submit.prevent="handleSubmit">
      <label> Title of Review</label>
      <input v-model="review.title" />
      <textarea
        class="bg-white w-80 h-80 mb-5 text-black rounded-xl"
        v-model="review.body"
      />
      <p class="font-bold mb-5">Please leave a Rating</p>
      <div class="flex justify-around">
        <label for="1" class="flex flex-col">
          1
          <input type="radio" name="rating" value="1" v-model="review.rating" />
        </label>
        <label for="2" class="flex flex-col">
          2
          <input type="radio" name="rating" value="2" v-model="review.rating" />
        </label>
        <label for="3" class="flex flex-col">
          3
          <input type="radio" name="rating" value="3" v-model="review.rating" />
        </label>
        <label for="4" class="flex flex-col">
          4
          <input type="radio" name="rating" value="4" v-model="review.rating" />
        </label>
        <label for="5" class="flex flex-col">
          5
          <input
            type="radio"
            name="rating"
            value="5"
            checked
            v-model="review.rating"
          />
        </label>
      </div>

      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline-blue active:bg-blue-800 mt-5"
      >
        Add a Review
      </button>
    </form>
  </section>

  <section
    v-if="seeComments"
    class="flex-grow max-w-lg p-4 bg-[#073b1748] rounded-lg text-white shadow-2xl"
  >
    <div
      v-for="reviews in reviewResponse"
      class="bg-white m-5 text-black h-20 w-90 rounded-lg"
    >
      <p class="font-bold bg-slate-400">Title: {{ reviews.title }}</p>
      <p class="bg-slate-400">Rating: {{ reviews.rating }} / 5</p>
      <p class="mt-2">{{ reviews.body }}</p>
    </div>
  </section>
</template>
