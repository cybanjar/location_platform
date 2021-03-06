import { boot } from 'quasar/wrappers'
import { createI18n } from 'vue-i18n'
import messages from 'src/i18n'

export default boot(({ app }) => {
  const i18n = createI18n({
    locale: 'en-US',
    messages
  })

  const language = i18n.global.locale
  console.info(language);

  // Set i18n instance on app
  app.use(i18n)
})
