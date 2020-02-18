<template>
    <v-app class="panel panel-default">
        <div class="panel-heading">
            <nav>
                <ul class="list-inline">
                    <li>
                        <router-link :to="{ name: 'home' }">首页</router-link>
                    </li>
                    <li v-if="!$auth.check()" class="pull-right">
                        <router-link :to="{ name: 'login' }">登录</router-link>
                    </li>
                    <li v-if="!$auth.check()" class="pull-right">
                        <router-link :to="{ name: 'register' }">注册</router-link>
                    </li>
                    <li v-if="$auth.check()" class="pull-right">
                        <a href="#" @click.prevent="$auth.logout()">退出</a>
                    </li>
                </ul>
            </nav>
        </div>
        <div class="panel-body">

        </div>



    </v-app>
</template>


                            <v-card>
                    <v-navigation-drawer permanent expand-on-hover>
                        <v-list>
                            <v-list-item class="px-2">
                                <v-list-item-avatar>
                                    <v-img src="https://randomuser.me/api/portraits/women/85.jpg"></v-img>
                                </v-list-item-avatar>
                            </v-list-item>

                            <v-list-item link>
                                <v-list-item-content>
                                    <v-list-item-title class="title">Sandra Adams</v-list-item-title>
                                    <v-list-item-subtitle>sandra_a88@gmail.com</v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list>

                        <v-divider></v-divider>

                        <v-list nav dense>
                            <v-list-item link>
                                <v-list-item-icon>
                                    <v-icon>mdi-folder</v-icon>
                                </v-list-item-icon>
                                <v-list-item-title>My Files</v-list-item-title>
                            </v-list-item>
                            <v-list-item link>
                                <v-list-item-icon>
                                    <v-icon>mdi-account-multiple</v-icon>
                                </v-list-item-icon>
                                <v-list-item-title>Shared with me</v-list-item-title>
                            </v-list-item>
                            <v-list-item link>
                                <v-list-item-icon>
                                    <v-icon>mdi-star</v-icon>
                                </v-list-item-icon>
                                <v-list-item-title>Starred</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-navigation-drawer>
                </v-card>

            <router-view></router-view>
