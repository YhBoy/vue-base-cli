import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import 'amfe-flexible'
import './assets/css/reset.css';
import './assets/css/index.css'
import Vant from 'vant';
import 'vant/lib/index.css';
const app = createApp(App);
app.use(Vant).use(router).use(store);

app.mount('#app')
