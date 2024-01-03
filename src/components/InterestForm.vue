<script  lang="ts">
export default {
  data() {
    return {
      name: "InterestForm",
    };
  },
};
</script>
<template>
  <div class="bg-white text-black p-2">
    <FormKit
      type="form"
      #default="{ value }"
      @submit="handleSubmit"
      :value="data"
    >
      <FormKit
        type="text"
        label="Create your username"
        name="username"
        placeholder="Sean_D_Paul"
        validation="required"
      />
      <FormKit
        type="textarea"
        name="skills"
        label="What type of skills are you interested in?"
        placeholder="Plumbing, coding, Singing, etc"
        validation="length:0,120"
        validation-visibility="live"
        :validation-messages="{
          length: 'Skills cannot be more than 120 characters.',
        }"
      />

      <pre wrap>{{ value }}</pre>
    </FormKit>
  </div>
</template>
