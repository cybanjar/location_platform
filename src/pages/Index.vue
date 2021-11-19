<template>
  <q-page>
    <q-tab-panels v-model="tab">
      <q-tab-panel name="mails">
        <div class="text-h6">Mails</div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.sdf
      </q-tab-panel>

      <q-tab-panel name="alarms">
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
        v-model="tab"
        indicator-color="transparent"
        active-color="primary"
        class="bg-white"
        align="justify"
      >
        <q-tab class="text-capitalize" name="mails" icon="home" label="Home" />
        <q-tab
          class="text-capitalize"
          name="alarms"
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
        tab: ref("mails"),
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
</style>