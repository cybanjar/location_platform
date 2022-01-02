<template>
  <div class="fullscreen bg-primary text-white text-center q-pa-md flex flex-center">
    <div>
      <div style="font-size: 30vh">
        404
      </div>

      <div class="text-h2" style="opacity:.4">
        {{ $t('page.blong') }}
      </div>

      <q-btn
        class="q-mt-xl"
        color="white"
        text-color="primary"
        unelevated
        to="/"
        label="Go Home"
        no-caps
      />

      <q-select
        v-model="locale"
        :options="localeOptions"
        label="Quasar Language"
        dense
        borderless
        emit-value
        map-options
        options-dense
        style="min-width: 150px"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'Error404',
  setup() {
    const { locale } = useI18n({ useScope: 'global' })

    return {
      locale,
      localeOptions: [
        { value: 'en-US', label: 'English' },
        { value: 'id', label: 'Indonesia' }
      ],
    }
  }
})
</script>
