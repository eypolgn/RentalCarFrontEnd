import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';


axios.defaults.baseURL = 'http://localhost:8080';
axios.defaults.headers.common['Content-Type'] = 'application/json';


const app = createApp(App);
app.config.globalProperties.$axios = axios;
app.use(router);
app.mount('#app');
