<template>
  <q-page>
    <q-tab-panels v-model="tab">
      <q-tab-panel name="home">
        <div class="text-h6">Mails</div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.sdf
      </q-tab-panel>

      <q-tab-panel name="explore">
        <div class="text-h6">Alarms</div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.aa
      </q-tab-panel>

      <q-tab-panel name="movies">
        <div class="text-h6">Movies</div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.ss
      </q-tab-panel>
    </q-tab-panels>

    <div class="bottom-nav">
      <q-tabs
        dense
        v-model="tab"
        indicator-color="transparent"
        active-color="primary"
        class="bg-white"
        align="justify"
      >
        <q-tab class="text-capitalize" name="home" icon="home" label="Home" />
        <q-tab
          class="text-capitalize"
          name="explore"
          icon="explore"
          label="Explore"
        />
        <q-tab
          class="text-capitalize"
          name="movies"
          icon="person"
          label="Profile"
        />
      </q-tabs>
    </div>
  </q-page>
</template>

<script>
  import { defineComponent, ref } from "vue";

  export default defineComponent({
    name: "PageIndex",
    setup() {
      return {
        tab: ref("home"),
      };
    },
  });
</script>

<style scoped>
  .q-tab--inactive {
    opacity: 0.2;
  }

  .bottom-nav {
    position: fixed;
    bottom: 0;
    width: 100vw;
  }

  .q-tab__label {
    font-size: 12px !important;
    line-height: 1.7em !important;
    font-weight: 300 !important;
  }
</style>