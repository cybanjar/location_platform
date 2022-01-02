<template>
    <q-dialog v-model="dialogModel">
        <q-card style="width: 364px;">
            <q-card-section class="row items-center">
              <div class="col-3">
                <q-avatar icon="mdi-help" color="primary" text-color="white" />
              </div>
              <div class="col-9">
                <span class="text-left">Are you sure you want</span>
              </div>
            </q-card-section>

            <q-card-actions align="right">
                <q-btn flat class="text-capitalize" label="Cancel" @click="$emit('onCancelAddPost')" color="primary" />
                <q-btn label="Ok" color="primary" @click="onClickOK" />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script>
import {defineComponent, computed, watch, reactive, toRefs,} from 'vue';
import { date, Notify } from 'quasar';

export default defineComponent({
  props: {
    dialogAddPost: { type: Boolean, required: true },
  },
  setup(props, { emit, root: { $api } }) {
    
    const state = reactive({
      isLoading: false,
      dataDetail: [],
      title: '',
      confirm: false,
      dataSelected: {},
      dataPrepare: {},
      dataFromPage: {},
    });
    
    const onClickOK = () => {
        emit('onCancelAddPost', false)
    }

    watch(
      () => props.dialogAddPost, (show) => {
        if ((props.dialogAddPost)) {
          state.title = 'Merge Item';
        }
      }
    );

    const dialogModel = computed({
        get: () => props.dialogAddPost,
        set: (val) => {
            emit('onOkDialogAddPost', val);
        },
    });


    return {
        ...toRefs(state),
      dialogModel,
      onClickOK,
    };
  },
});
</script>
