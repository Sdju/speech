import './assets/main.css'

import { createApp } from './renderer'
//import App from './views/Simple.vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(router)
app.mount('#app')
