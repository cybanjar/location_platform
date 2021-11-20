<template>
  <q-layout>
    <q-page-container class="">
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

<style scoped>
  .q-page-container {
    background-color: #fafafc;
  }
</style>