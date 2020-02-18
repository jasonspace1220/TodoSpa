import Vue from 'vue';
import VueRouter from 'vue-router';

import Dashboard from './components/Dashboard.vue';
import Home from './components/Home.vue';
import Register from './components/Register.vue';
import Login from './components/Login.vue';

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    // base: 'TodoSpa/public/',
    base: process.env.MIX_VUE_ROUTER_BASE_URL,
    routes: [{
            path: '*',
            redirect: 'home'
        },
        {
            path: '/',
            name: 'home',
            component: Home,
            children: [{
                path: 'login',
                name: 'login',
                component: Login,
                meta: {
                    auth: false
                }
            }, {
                path: 'dashboard',
                name: 'dashboard',
                component: Dashboard,
                meta: {
                    auth: true
                }
            }]
        }
    ]
})

export default router;
