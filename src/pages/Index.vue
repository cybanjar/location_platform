<template>
  <q-page>
    <q-tab-panels v-model="tab">
      <!-- panel home -->
      <q-tab-panel class="window-height" name="home">
        <div>
          <div class="q-pa-md">
            <div class="text-h4 text-weight-bolder text-primary">
              Discover<span class="text-green">.</span>
            </div>
            <div class="text-weight-light">
              Explore the best places in brebes city!
            </div>
          </div>
          <q-scroll-area class="q-mx-md" style="height: 36px; max-width: 100vw">
            <div class="row no-wrap">
              <q-btn
                v-for="index in 7"
                :key="index"
                class="text-capitalize q-mr-xs"
                unelevated
                rounded
                color="primary"
                text-color="white"
                label="Hutan"
              />
            </div>
          </q-scroll-area>

          <div class="q-mt-md" v-for="index in 7" :key="index">
            <q-card square flat>
              <img src="https://placeimg.com/300/300/people" />
              <q-card-section>
                <div class="text-h6">Hutan Mangrove</div>
                <div class="text-subtitle2">John Doe</div>
                <q-btn flat dense round color="negative" icon="favorite" />
                <span class="text-grey-5"> 2k</span>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </q-tab-panel>

      <!-- panel explore -->
      <q-tab-panel name="explore">
        <div class="q-pa-md">
          <div class="text-h5 q-mt-md">
            <span class="text-weight-light">Best</span>
            <span class="text-weight-bolder"> Adventure</span>
            <span class="text-green text-weight-bolder">.</span>
          </div>
          <q-input
            class="q-mt-sm"
            dense
            placeholder="Search location"
            bg-color="grey-3"
            borderless
            color="grey-3"
            label-color="grey-3"
            outlined
            v-model="search"
          >
            <template v-slot:append>
              <q-icon name="search" color="primary" />
            </template>
          </q-input>
        </div>
        <ImageMix />
      </q-tab-panel>

      <!-- panel profile -->
      <q-tab-panel name="profile">
        <div>
          <q-toolbar class="bg-white text-primary">
            <q-toolbar-title class="text-center text-weight-bold">
              Profile
            </q-toolbar-title>
          </q-toolbar>
          <div class="q-py-md">
            <div class="wrap-img">
              <q-img
                class="img-profile"
                src="https://placeimg.com/300/300/people"
                :ratio="1"
              >
                <div class="absolute-bottom text-caption text-center">Edit</div>
              </q-img>
            </div>
            <div class="bg-white q-mt-md">
              <div class="row justify-between q-pa-md">
                <div class="col-6 q-gutter-sm">
                  <div>Nama</div>
                  <div>Username</div>
                  <div>Verfication</div>
                  <div>Change Password</div>
                </div>
                <div class="col-6 text-right q-gutter-sm">
                  <div>Syamsul Amin <q-icon name="chevron_right" /></div>
                  <div>syamsulamin <q-icon name="chevron_right" /></div>
                  <div>
                    27/09/2020 <q-icon name="check" class="text-positive" />
                  </div>
                  <div>
                    <span>*********</span>
                    <q-icon name="chevron_right" />
                  </div>
                </div>
              </div>
            </div>
            <div class="bg-white q-mt-md">
              <div class="row justify-between q-pa-md">
                <div class="col-6 q-gutter-sm">
                  <div>Jenis Kelamin</div>
                  <div>Tanggal Lahir</div>
                  <div>No. Telp</div>
                  <div>Alamat</div>
                </div>
                <div class="col-6 text-right q-gutter-sm">
                  <div>Syamsul Amin</div>
                  <div>syamsulamin</div>
                  <div>27/09/2020</div>
                  <div>
                    <span>Brebes</span>
                    <q-icon name="chevron_right" />
                  </div>
                </div>
              </div>
            </div>
            <div class="q-ma-md">
              <q-btn
                rounded
                unelevated
                class="full-width text-weight-bold q-py-sm text-capitalize"
                label="Update Profile"
                color="primary"
              />
            </div>
          </div>
        </div>
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
        <q-tab
          :ripple="false"
          class="text-capitalize"
          name="home"
          icon="home"
          label="Home"
        />
        <q-tab
          :ripple="false"
          class="text-capitalize"
          name="explore"
          icon="explore"
          label="Explore"
        />
        <q-tab
          :ripple="false"
          class="text-capitalize"
          name="profile"
          icon="person"
          label="Profile"
        />
      </q-tabs>
    </div>
  </q-page>
</template>

<script>
  import { defineComponent, reactive, toRefs } from "vue";
  import ImagePost from "../components/ImagePost.vue";
  import ImageMix from "../components/ImageMix.vue";

  export default defineComponent({
    name: "PageIndex",
    components: {
      ImagePost,
      ImageMix,
    },
    setup() {
      const state = reactive({
        tab: "home",
        search: "",
      });
      return {
        ...toRefs(state),
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

  .q-tab-panel {
    background-color: #fafafc;
    padding: 0;
  }

  .q-field--outlined .q-field__control {
    border-radius: 10px;
  }

  .img-profile {
    width: 20%;
    border-radius: 50%;
  }

  .wrap-img {
    display: flex;
    justify-content: center;
  }

  .q-img__content > div {
    padding: 0 !important;
  }

  .card-like {
    margin-bottom: 58px;
  }
</style>