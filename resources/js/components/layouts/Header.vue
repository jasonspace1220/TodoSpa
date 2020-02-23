<template>
    <v-card id="keep">

        <v-app-bar app clipped-left color="light-blue">

            <v-app-bar-nav-icon @click="drawer = !drawer" class="white--text"/>
            <span class="title ml-3 mr-5 white--text">Todo&nbsp;<span class="font-weight-light">Spa</span></span>
            <!-- <v-text-field solo-inverted flat hide-details label="Search" /> -->

            <v-spacer />
            <v-progress-linear  :height="4" :active="loading" :indeterminate="loading" absolute bottom color="orange darken-3">
            </v-progress-linear>
        </v-app-bar>

        <v-navigation-drawer v-model="drawer" app clipped color="grey lighten-4" class="white--text">

            <LeftSide></LeftSide>
        </v-navigation-drawer>
    </v-card>
</template>
<script>
    import LeftSide from './LeftSide.vue';
    export default {
        components: {
            LeftSide,
        },
        props: {
            source: String,
        },
        data() {
            return {
                loading: false,
                drawer: null,
            }
        },

        created() {
            this.$router.beforeEach((to, from, next) => {
                this.loading = true;
                next();
            })
            this.$router.afterEach(() => {
                setTimeout(() => {
                    this.loading = false;
                }, 1000)
            })
        }
    }

</script>
<style>
    #keep .v-navigation-drawer__border {
        display: none
    }

</style>
