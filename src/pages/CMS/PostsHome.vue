<template>
  <q-page>
    <div>
      <q-table
        class="my-sticky-header-table"
        :rows="rows"
        :columns="tableHeaders"
        :filter="filter"
        no-data-label="No data"
        row-key="name"
        flat
      >
        <template v-slot:top-right>
          <q-btn
            flat
            round
            color="primary"
            icon="add"
            no-caps
            @click="dialog.addPost = true"
          >
            <q-tooltip>Add</q-tooltip>
          </q-btn>
          <q-btn
            flat
            round
            class="q-mr-md"
            color="primary"
            icon="archive"
            no-caps
          >
            <q-tooltip>Download CSV</q-tooltip>
          </q-btn>
          <q-input dense debounce="300" v-model="filter" placeholder="Search">
            <template v-slot:append>
              <q-icon color="primary" name="search" />
            </template>
          </q-input>
        </template>

        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="id" :props="props">
              {{ props.row.id }}
            </q-td>
            <q-td key="user_id" :props="props">
              {{ props.row.user.name }}
            </q-td>
            <q-td key="category" :props="props">
              {{ props.row.category }}
            </q-td>
            <q-td key="isPublished" :props="props">
              {{ props.row.isPublished }}
            </q-td>
            <q-td key="image" :props="props">
              <q-img class="rounded-borders w-50p" :src="`${api.baseStorage}/${props.row.image}`" />
            </q-td>
            <q-td key="created_at" :props="props">
              {{ props.row.created_at }}
            </q-td>
          </q-tr>
        </template>
      </q-table>

      <!-- Modal Add Post Home -->
      <q-dialog v-model="dialog.addPost" persistent transition-hide="jump-up" transition-show="jump-up">
        <q-card style="min-width: 350px">
          <q-toolbar>
            <q-toolbar-title class="text-white text-weight-medium">{{ title }}</q-toolbar-title>
          </q-toolbar>

          <q-card-section class="q-gutter-md scroll" style="max-height: 70vh;">
            <q-select dense v-model="dialog.category" :options="dialog.optionsCategory" label="Category" />
            <q-input dense v-model="dialog.locationName" placeholder="Ex: Mangrove Pandansari" />
            <q-input dense v-model="dialog.regional" placeholder="Ex: Brebes" />
            <input
              type="file"
              id="file"
              ref="file"
              @change="onChangeImage"
              name="file"
            />
            <q-input dense type="textarea" v-model="dialog.desc" placeholder="Description.." />
          </q-card-section>

          <q-card-actions align="right" class="text-primary">
            <q-btn flat label="Cancel" v-close-popup />
            <q-btn color="primary" label="Save" class="q-py-sm" v-close-popup @click="onSubmit" />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>

<script>
import {
  defineComponent,
  reactive,
  toRefs,
  onMounted,
  computed
} from "vue"
import { useStore } from "vuex"
import { useQuasar, SessionStorage } from "quasar"
import { mapOU } from 'src/helpers/mapSelectItems.helpers'
import api from 'src/api/fetch.api'
import axios from 'axios'

export default defineComponent({
  setup(props, { root }) {
    const store = useStore();
    const $q = useQuasar();

    let charts = [];
    
    const state = reactive({
      rows: [],
      filter: '',
      dialog: {
        addPost: false,
        category: '',
        flagCategory: null,
        locationName: '',
        optionsCategory: [
          {value: 'hutan', label: 'Hutan'},
          {value: 'pantai', label: 'Pantai'},
        ],
        regional: '',
        desc: '',
        file: '',
      },
      category: [],
      title: 'Add Post'
    });
    
    const getDataHome = async () => {
      $q.loading.show()

      let handleDataHome = await store.dispatch("auth/handleDataHome");
      charts = handleDataHome.data.data.data;
      state.rows = charts;

      $q.loading.hide()
    }

    const getCategory = async () => {
      let handleCategory = await store.dispatch("auth/handleCategories")

      let prepareDataObject = handleCategory.data.data
      state.dialog.optionsCategory = mapOU(
        prepareDataObject,
        'id',
        'name'
      )
    }

    onMounted(() => {
      getDataHome()
      getCategory()
    })

    function onChangeImage(e) {
      state.dialog.file = e.target.files[0];
    }

    async function onSubmit(e) {
      e.preventDefault()
      let existingObj = state
      
      const token = SessionStorage.getItem('auth')
      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `${token}`,
        },
      };
      let data = new FormData()
      data.append("category", state.dialog.category['value'])
      data.append("flagCategory", state.dialog.category['value'])
      data.append("locationName", state.dialog.locationName)
      data.append("regional", state.dialog.regional)
      data.append("image", state.dialog.file)
      data.append("description", state.dialog.desc)
      
      await axios
        .post(`${api.baseUrl}post-home`, data, config)
        .then((response) => {
          console.log('response', response)
          existingObj.success = response.data.success
          state.dialog.addPost = false
          getDataHome()
        })
        .catch((error) => {
          existingObj.output = error;
        });
    }

    const tableHeaders = [
      {
        label: "ID",
        field: "id",
        name: "id",
        sortable: true,
        align: "right",
      },
      {
        label: "User",
        field: "user_id",
        name: "user_id",
        sortable: true,
        align: "left",
      },
      {
        label: "Category",
        field: "category",
        name: "category",
        sortable: false,
        align: "left",
      },
      {
        label: "Published",
        field: "isPublished",
        name: "isPublished",
        sortable: false,
        align: "left",
      },
      {
        label: "Image",
        field: "image",
        name: "image",
        sortable: false,
        align: "left",
      },
      {
        label: "Create at",
        field: "created_at",
        name: "created_at",
        sortable: true,
        align: "left",
      },
    ];
    return {
      ...toRefs(state),
      tableHeaders,
      onSubmit,
      api,
      onChangeImage
    };
  },
});
</script>