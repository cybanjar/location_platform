<template>
  <div class="image-mix">
    <div class="row">
      <div v-for="index in 50" :key="index" class="col-4">
        <q-img :ratio="1" src="https://placeimg.com/600/300/nature" />
      </div>
    </div>
  </div>
</template>

<script>
  import { defineComponent, reactive, toRefs } from "vue";

  export default defineComponent({
    name: "TabExplore",
    setup() {
      const state = reactive({
        search: "",
      });
      return {
        ...toRefs(state),
      };
    },
  });
</script>

<style scoped>
  .image-mix {
    margin-bottom: 56px;
  }

  .q-img__content > div {
    padding: 4px;
  }
</style>