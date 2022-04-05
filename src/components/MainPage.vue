<template>
  <div class="p-d-flex p-jc-center p-ai-center">
    <InputText type="text" v-model="word" class="p-col-6 p-mt-3" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      word: "",
    };
  },
};
</script>
