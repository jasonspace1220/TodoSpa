<template>
    <v-app dark>
        <Header />
        <v-container grid-list-md fluid>
            <v-content>
                <router-view></router-view>
            </v-content>
        </v-container>
        <Footer />
    </v-app>
</template>
<script>
    import Header from './components/layouts/Header.vue';
    import Footer from './components/layouts/Footer.vue';
    export default {
        name: 'APP',
        components: {
            Header,
            Footer
        },
        data() {
            return {

            }
        },

    }

</script>
