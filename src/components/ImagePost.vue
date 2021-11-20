<template>
  <div></div>
</template>

<script>
  import { defineComponent, reactive, toRefs } from "vue";

  export default defineComponent({
    name: "TabHome",
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
</style>