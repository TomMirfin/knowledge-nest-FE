<script lang="ts">
import { getArticleByArticleId } from "../components/axios";

export default {
  name: "Article",
  data() {
    return { post: undefined };
  },
  mounted() {
    console.log(this.$route.params.article_id);

    //GET POST BY POST ID
    getArticleByArticleId(this.$route.params.article_id).then((res) => {
      console.log("yippie!");
      this.post = res.data;
    });
  },
};
</script>

<template>
  <section>Hello From Articles</section>
</template>
