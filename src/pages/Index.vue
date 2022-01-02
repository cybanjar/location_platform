<template>
  <q-page>
    <q-tab-panels class="q-mb-xl" v-model="tab">
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
                v-for="(item, index) in category"
                :key="index"
                class="text-capitalize q-mr-xs"
                unelevated
                rounded
                color="primary"
                text-color="white"
                :label="item['name']"
              />
            </div>
          </q-scroll-area>
          <!-- <div>{{ dataHome }}</div> -->
          <div class="q-mt-md" v-for="(item, index) in dataHome" :key="index">
            <q-card square flat>
              <img 
                :src="`${api.baseStorage}${item['image']}`" />
              <q-card-section>
                <div class="text-h6 text-weight-bold">{{ item['locationName'] }}</div>
                <div class="text-subtitle2 text-grey-5">{{ item['user']['name'] }}</div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </q-tab-panel>

      <!-- Tab explore -->
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

      <!-- Tab profile -->
      <q-tab-panel name="profile">
        <div>
          <q-toolbar class="bg-white text-primary">
            <q-btn class="text-capitalize text-weight-bold" :label="$t('profile')" flat dense />
            <q-toolbar-title class="text-center text-weight-bold">
              <!-- Profile -->
            </q-toolbar-title>
            <q-select
              v-model="locale"
              :options="localeOptions"
              behavior="menu"
              standout
              dense
              borderless
              emit-value
              map-options
              options-dense
            >
              <template v-slot:append>
                <q-icon name="language" color="primary" />
              </template>
            </q-select>
          </q-toolbar>
          <div class="q-py-md">
            <!-- <div class="text-center text-weight-bold q-pb-sm">Profile</div> -->
            <div class="wrap-img">
              <input
                v-if="getUser['photo_profile'] == null"
                type="file"
                id="file"
                ref="file"
                @change="onChange"
                name="file"
              />
              <q-img
                v-if="getUser['photo_profile'] != null"
                class="img-profile"
                id="file"
                :ratio="1"
                :src="`${api.baseStorage}/${getUser['photo_profile']}`"
              >
              </q-img>
              <q-img
                v-else
                class="img-profile"
                :ratio="1"
                src="~/assets/icon_blank.jpeg"
              >
                <div class="absolute-bottom text-caption text-center">Edit</div>
              </q-img>
            </div>
            <div class="bg-white q-mt-md">
              <div class="row justify-between q-pa-md">
                <div class="col-4 q-gutter-sm">
                  <div>{{ $t('name') }}</div>
                  <div>Email</div>
                  <div>Verfication</div>
                </div>
                <div class="col-8 text-right q-gutter-sm">
                  <div> {{ getUser['name'] }} <q-icon name="chevron_right" /></div>
                  <div> {{ getUser['email'] }} <q-icon name="chevron_right" /></div>
                  <div>
                    {{ getUser['email_verified_at'] }}
                    <q-icon name="check" class="text-positive" />
                  </div>
                </div>
              </div>
            </div>
            <div class="bg-white q-mt-md">
              <div class="row justify-between q-pa-md">
                <div class="col-4 q-gutter-sm">
                  <q-toggle v-model="isLock" :label="isLock == false ? 'Locked' : 'Unlocked' "/>
                  <div>Jenis Kelamin</div>
                  <div>Tanggal Lahir</div>
                  <div>No. Telp</div>
                  <div>Alamat</div>
                </div>
                <div class="col-8 text-right q-gutter-sm">
                  <q-btn @click="warningUpdate = true" flat round color="pink" icon="error" />
                  <div>
                    {{
                      (getUser['jk'] == null ? form.jk : getUser['jk']) 
                    }}
                    <q-icon name="chevron_right" />
                  </div>
                  <div>
                    {{
                     (getUser['ttl'] == null ? form.ttl : getUser['ttl']) 
                    }}
                    <q-icon name="chevron_right" />
                  </div>
                  <div>
                    {{
                      (getUser['phoneNumber'] == null ? form.phoneNumber : getUser['phoneNumber'])
                    }}
                    <q-icon name="chevron_right" />
                  </div>
                  <div>
                    {{
                      (getUser['address'] == null ? form.address : getUser['address'])
                    }}
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
                :disable="form.jk && form.phoneNumber && form.ttl && form.address && form.file === '' "
                @click="onUpdateProfile"
              />
              <q-btn
                flat
                color="primary"
                class="full-width q-py-sm text-capitalize"
                label="Logout"
                @click="onLogout"
              />
            </div>
          </div>
        </div>

        <!-- Dialog Update Profile -->
        <q-dialog v-model="isLock" persistent position="bottom">
          <q-card style="width: 573px">
            <q-linear-progress :value="1" color="pink" />

            <q-card-section>
              <div class="text-h6 text-weight-bold text-primary">Update Profile!</div>
              <div class="text-grey-7">Please input data profile</div>
            </q-card-section>
            
            <form @submit.prevent="onDialogUpdate">
              <q-card-section class="q-pt-none">
                <q-select v-if="getUser['jk'] == null" behavior="menu" dense v-model="form.jk" :options="optionsJK" label="Jenis Kelamin" />
                
                <q-input v-if="getUser['ttl'] == null" class="q-mt-md" dense name="event" ref="qDateProxy" v-model="form.ttl" mask="date" :rules="['date']">
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy ref="qDateProxy" cover transition-show="scale" transition-hide="scale">
                        <q-date v-model="form.ttl">
                          <div class="row items-center justify-end">
                            <q-btn v-close-popup label="Submit" color="primary" flat />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>

                <q-input type="number" v-if="getUser['phoneNumber'] == null" dense v-model="form.phoneNumber" placeholder="62xxx" />

                <q-input v-if="getUser['address'] == null" class="q-mt-md" dense v-model="form.address" placeholder="Ex: Brebes" />
              </q-card-section>

              <q-card-actions align="right" class="text-primary q-px-md">
                <q-btn
                  flat
                  label="Cancel"
                  class="text-capitalize"
                  @click="onCancelDialogUpdate"
                />
                <q-btn
                  unelevated
                  label="Submit"
                  type="submit"
                  color="primary"
                  class="text-capitalize text-weight-bold"
                  @click="onDialogUpdate"
                  :disable="form.jk && form.phoneNumber && form.ttl && form.address === '' "
                />
              </q-card-actions>
            </form>
          </q-card>
        </q-dialog>

        <!-- Dialog Warning Update -->
        <q-dialog v-model="warningUpdate" transition-show="fade-in" transition-hide="fade-out">
          <q-card style="width: 350px">
            <q-card-section>
              <div class="text-h6 text-weight-bold text-primary">Update Profile!</div>
              <ul class="text-grey-7">
                <li v-if="getUser['photo_profile'] == null">Upload Foto</li>
                <li v-if="getUser['jk'] == null">Jenis Kelamin</li>
                <li v-if="getUser['ttl'] == null">Tanggal Lahir</li>
                <li v-if="getUser['phoneNumber'] == null">Nomer HP</li>
                <li v-if="getUser['address'] == null">Alamat</li>
              </ul>
              <p>Jika ada masalah silahkan <a href="mailto:cybanjar@gmail.com">email</a></p>
            </q-card-section>
          </q-card>
        </q-dialog>
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
  import { defineComponent, reactive, toRefs, onMounted, computed, watchEffect } from "vue";
  import ImagePost from "../components/ImagePost.vue";
  import ImageMix from "../components/ImageMix.vue";
  import { Notify, SessionStorage, useQuasar } from "quasar";
  import { useRouter, useRoute } from "vue-router";
  import { useStore } from "vuex";
  import axios from 'axios';
  import api from 'src/api/fetch.api'
  import { useI18n } from 'vue-i18n'

  export default defineComponent({
    name: "PageIndex",
    components: {
      ImagePost,
      ImageMix,
    },
    setup() {
      const router = useRouter();
      const store = useStore();
      const $q = useQuasar();
      const { locale } = useI18n({ useScope: 'global' })

      const state = reactive({
        tab: "profile",
        search: "",
        getUser: {},
        form: {
          file: '',
          jk: '',
          ttl: null,
          phoneNumber: '',
          address: ''
        },
        isLock: false,
        optionsJK: [
          'Laki-laki', 'Perempuan'
        ],
        warningUpdate: false,
        isValid: false,
        isDataUpdate: null,
        category: [],
        dataHome: []
      });

      const NotifyCreate = (type, mess) =>
        Notify.create({
          type: type,
          message: mess,
        });
      
      const getUser = async () => {
        $q.loading.show()

        const handleRefresh = await store.dispatch("auth/handleRefresh");
        if(handleRefresh.status == 401 || handleRefresh.status == 500) {
          router.replace({name: 'auth'})
        }
        state.getUser = handleRefresh.data;

        $q.loading.hide()
      }

      const getCategories = async () => {
        $q.loading.show()

        let handleCategories = await store.dispatch("auth/handleCategories");
        state.category = handleCategories.data.data;

        $q.loading.hide()
      }

      const getDataHome = async () => {
        $q.loading.show()

        let handleDataHome = await store.dispatch("auth/handleDataHome");
        state.dataHome = handleDataHome.data.data.data;

        $q.loading.hide()
      }

      onMounted(() => {
        getUser();
        getCategories();
        getDataHome();
      })
      
      const onLogout = async () => {
        $q.loading.show();

        const res = await store.dispatch("auth/revokeToken");
        if (res.status == 200) {
          NotifyCreate("positive", res.data.message);
          $q.loading.hide();
          SessionStorage.remove("auth");
          router.push({ path: "/auth" });
        } else {
          $q.loading.hide();
        }
        $q.loading.hide();
      };

      const onChange = (e) => {
        // state.imgPreview = URL.createObjectURL(e.target.files[0]);
        state.form.file = e.target.files[0];
      };

      const onUpdateProfile = async (e) => {
        e.preventDefault();
        let existingObj = state;
        
        const token = SessionStorage.getItem('auth');
        const config = {
          headers: {
            "content-type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        };
        let data = new FormData();
        data.append("photo_profile", state.form.file);
        data.append("jk", state.form.jk);
        data.append("ttl", state.form.ttl);
        data.append("phoneNumber", state.form.phoneNumber);
        data.append("address", state.form.address);
        
        await axios
          .post(`${api.baseUrl}user`, data, config)
          .then((response) => {
            existingObj.success = response.data.success;
            window.location.reload();
          })
          .catch((error) => {
            existingObj.output = error;
          });
      };

      const onDialogUpdate = () => {
        state.isLock = false;
      }

      const onCancelDialogUpdate = () => {
        state.isLock = false;

        state.form.jk = ''
        state.form.ttl = null
        state.form.phoneNumber = ''
        state.form.address = ''
      }

      return {
        ...toRefs(state),
        onLogout,
        onChange,
        onUpdateProfile,
        onDialogUpdate,
        onCancelDialogUpdate,
        api,
        locale,
        localeOptions: [
          { value: 'en-US', label: 'EN' },
          { value: 'id', label: 'ID' }
        ],
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
    max-width: 573px;
  }

  .q-tab-panel {
    background-color: #fafafc;
    padding: 0;
    margin-bottom: 60px;
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
    align-items: center;
  }

  .q-img__content > div {
    padding: 0 !important;
  }

  .card-like {
    margin-bottom: 58px;
  }
</style>