<script lang="ts">
export default {
  name: "Article",
  //   data(){
  //     return {post:undefined}
  //   }
  mounted() {
    console.log(this.$route.params.article_id);

    //GET POST BY POST ID
    // getPostDataByID(this.$route.params.article_id).then((res)=>{
    //     this.post = res.data
    // })
  },
};
</script>

<template>
  <section>Hello From Articles</section>
</template>
