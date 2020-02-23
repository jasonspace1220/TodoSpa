require('./bootstrap');

import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import router from './router.js';

// import Vuetify from 'vuetify'

import App from './App.vue';


import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
// import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '@mdi/font/css/materialdesignicons.css'
import '@fortawesome/fontawesome-free/css/all.css'
Vue.use(Vuetify)

Vue.use(VueAxios, axios);

axios.defaults.baseURL = process.env.MIX_AXIOS_BASE_URL;
// axios.defaults.baseURL = 'http://localhost/TodoSpa/public/api';


Vue.router = router
Vue.use(require('@websanova/vue-auth'), {
    auth: require('@websanova/vue-auth/drivers/auth/bearer.js'),
    http: require('@websanova/vue-auth/drivers/http/axios.1.x.js'),
    router: require('@websanova/vue-auth/drivers/router/vue-router.2.x.js'),
});
App.router = Vue.router

// new Vue(App).$mount('#app');
// new Vue({
//     el: '#app',
//     router: router,
//     render: h => h(App)
// })
new Vue({
    el: '#app',
    vuetify: new Vuetify(),
    router: router,
    render: h => h(App)
  });
