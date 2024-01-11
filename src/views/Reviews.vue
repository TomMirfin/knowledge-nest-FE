<script setup lang="ts">
import { getReviews, postReview } from "../components/axios";
import { ref } from "vue";
import { RouteLocationNormalizedLoaded, useRoute } from "vue-router";
import { Review, SignIn, EditReview } from "../types/type";
import { Ref } from "vue";
import { AxiosResponse } from "axios";

const route: RouteLocationNormalizedLoaded = useRoute();
const username: any = route.params.username;

const seeComments: Ref<boolean> = ref(false);
const addComments: Ref<boolean> = ref(false);
const reviewResponse = ref([]);
const loading: Ref<boolean> = ref(false);
const review: Ref<Review> = ref({ body: "", rating: 5, title: "" });
const userStored: SignIn = JSON.parse(localStorage.getItem("user")!) as SignIn;

const toggleComment = async (): Promise<void> => {
  seeComments.value = !seeComments.value;
  loading.value = true;
  await getReviews(username).then((res) => {
    reviewResponse.value = res.data.reviews;
    loading.value = false;
  });
};

const toggleAddComment = (): void => {
  addComments.value = !addComments.value;
};

const handleSubmit = async (): Promise<void> => {
  const postBody: EditReview = {
    username: userStored,
    created_about: username,
    title: review.value.title,
    body: review.value.body,
    rating: review.value.rating,
  };

  await postReview(postBody).then((res: AxiosResponse<any, any>) => {
    if (res.data.title) alert("review sent");
    else alert("Review Failed to Send");
    reviewResponse.value = [res.data, ...reviewResponse.value];
    review.value = { title: "", body: "", rating: 5 };
  });
};
</script>

<template>
  <div class="flex flex-col items-center justify-center mt-3 lg:mt-0">
    <button
      @click="toggleComment"
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline-blue active:bg-blue-800 lg:mt-5 lg:mb-2"
    >
      See Reviews
    </button>
    <button
      v-if="username !== userStored"
      @click="toggleAddComment"
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline-blue active:bg-blue-800 mt-5"
    >
      Add Review
    </button>
  </div>
  <section
    v-if="addComments"
    class="flex-grow max-w-lg p-4 bg-[#073b1748] rounded-lg text-white shadow-2xl"
  >
    <form class="justify-center" @submit.prevent="handleSubmit">
      <div class="flex flex-col">
        <strong class="mb-2"> Write A Review</strong>
        <input
          v-model="review.title"
          class="bg-white rounded-xl mb-4 ml-20 mr-20 text-black flex text-center pl-2"
          placeholder="Title"
        />
      </div>

      <div>
        <textarea
          class="bg-white w-80 h-80 mb-5 text-black rounded-xl mt-4 pl-2"
          placeholder="Review"
          v-model="review.body"
        />
      </div>
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
    <p v-if="loading">Loading...</p>
    <div v-if="reviewResponse.length > 0">
      <div
        v-for="reviews in reviewResponse"
        class="bg-white m-5 text-black h-20 w-90 rounded-lg"
      >
        <p class="font-bold bg-slate-400">Title: {{ reviews.title }}</p>
        <p class="bg-slate-400">Rating: {{ reviews.rating }} / 5</p>
        <p class="mt-2">{{ reviews.body }}</p>
      </div>
    </div>
    <p v-else>No Reviews Yet</p>
  </section>
</template>
