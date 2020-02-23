<template>
    <v-card>
        <v-list v-if="$auth.check()">
            <v-list-item link>
                <v-list-item-content>
                    <v-list-item-title class="title">
                        <v-icon>fas fa-user</v-icon>
                        <span>&nbsp;</span>
                        {{userName.name}}
                    </v-list-item-title>

                </v-list-item-content>
                <!-- <v-list-item-action>
                    <v-icon>mdi-menu-down</v-icon>
                </v-list-item-action> -->
            </v-list-item>
        </v-list>
        <v-list dense class="grey lighten-4">
            <template v-for="(item, i) in items">
                <v-row v-if="item.heading && item.auth == $auth.check()" :key="i" align="center">
                    <v-col cols="6">
                        <v-subheader v-if="item.heading">
                            {{ item.heading }}
                        </v-subheader>
                    </v-col>
                </v-row>

                <v-divider v-else-if="item.divider && item.auth == $auth.check()" :key="i" dark class="my-4" />

                <v-list-item v-else-if="item.auth == $auth.check()" :key="i" link @click="linkTo(item.linkTo)">
                    <v-list-item-action>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title class="grey--text">
                            {{ item.text }}
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </template>
        </v-list>
    </v-card>

</template>

<script>
    export default {
        props: {
            source: String,
        },
        data() {
            return {
                drawer: null,
                items: [{
                        heading: '登入登出',
                        auth: false,
                    },
                    {
                        icon: 'fas fa-sign-in-alt',
                        text: '登入',
                        linkTo: 'login',
                        auth: false,
                    },
                    {
                        icon: 'fas fa-user-plus',
                        text: '註冊會員',
                        linkTo: 'register',
                        auth: false,
                    },
                    {
                        divider: true,
                        auth: false,
                    },
                    {
                        icon: 'fas fa-home',
                        text: '首頁',
                        linkTo: 'dashboard',
                        auth: true,
                    },
                    {
                        icon: 'fas fa-th-list',
                        text: '代辦清單',
                        linkTo: 'todo',
                        auth: true,
                    },
                    {
                        icon: 'fas fa-sign-out-alt',
                        text: '登出',
                        linkTo: 'logout',
                        auth: true,
                    },
                ],
            }
        },
        methods: {
            linkTo(to) {
                if (to == 'logout') {
                    this.$auth.logout();
                    this.$router.push('login');
                } else {
                    this.$router.push(to).catch(err => {
                        this.$router.go(0);
                    });
                }
            },
        },
        computed: {
            userName() {
                if (this.$auth.check()) {
                    return this.$auth.user();
                } else {
                    return '';
                }
            }
        },
        created() {
            this.$auth.ready(function () {
                console.log(this); // Will be proper context.
            });
        }
    }

</script>
