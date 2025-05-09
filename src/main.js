
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

// Import Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
})
// i18n-lang
import i18n from './i18n'
createApp(App).use(vuetify).use(i18n).mount('#app')

