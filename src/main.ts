import { createApp } from 'vue'
import { createPinia } from 'pinia'

import VButton from '@components/ui/VButton.vue'
import VInput from '@components/ui/VInput.vue'
import VIcon from '@components/ui/VIcon.vue'

import App from './App.vue'
import router from './router/index.ts'

import 'reset-css';
import './style.css'

const pinia = createPinia()
const app = createApp(App)

app
    .component('VButton', VButton)
    .component('VInput', VInput)
    .component('VIcon', VIcon)
    .use(router)
    .use(pinia)
    .mount('#app')
