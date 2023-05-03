import { createApp } from 'vue'
import App from './App.vue'

import './assets/main.css'

// Import Bootstrap and BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

createApp(App).mount('#app');
