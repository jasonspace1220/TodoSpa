import Vue from 'vue';
import VueRouter from 'vue-router';

import Dashboard from './components/Dashboard.vue';
import Home from './pages/Home.vue';
import Register from './components/Register.vue';
import LoginPage from './pages/LoginPage.vue';

import TodoIndexPage from './pages/TodoIndexPage.vue';

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
            meta: {
                auth: true
            },
            children: [{
                path: 'login',
                name: 'login',
                component: LoginPage,
                meta: {
                    auth: false
                }
            }, {
                path: 'register',
                name: 'register',
                component: Register,
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
            },{
                path: 'todo',
                name: 'todo',
                component: TodoIndexPage,
                meta: {
                    auth: true
                }
            }]
        }
    ]
})

export default router;
