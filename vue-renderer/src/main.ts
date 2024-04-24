import './assets/main.css'

import { createApp } from './renderer-simple/renderer-temp'
import App from './views/Simple.vue'
//import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(router)
app.mount(document.querySelector('#react'))
