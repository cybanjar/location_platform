<template>
  <q-layout>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
  import { defineComponent, ref } from "vue";

  export default defineComponent({
    name: "MainLayout",

    components: {},

    setup() {
      return {};
    },
  });
</script>

<style lang="scss" scoped>
  .q-page-container {
    background-color: #fafafc;
    max-width: 573px;
    margin-right: auto;
    margin-left: auto;
  }

  .q-layout,
  .q-header,
  .q-footer,
  .q-page {
    background-color: #fafafc;
  }
</style>