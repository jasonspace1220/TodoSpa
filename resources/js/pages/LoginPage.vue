<template>
    <v-card class="mx-auto" max-width="600">
        <v-card-text>
            <v-card-title class="headline font-weight-bold text-center">
                登入Todo Spa
            </v-card-title>
            <div class="text--primary">
                <v-form ref="form" v-model="valid" lazy-validation>

                    <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>

                    <v-text-field :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :type="show1 ? 'text' : 'password'"
                        @click:append="show1 = !show1"
                        v-model="password" :rules="passwordRules" label="密碼" required></v-text-field>


                    <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">
                        登入
                    </v-btn>

                    <v-btn color="error" class="mr-4" @click="reset">
                        清除
                    </v-btn>

                </v-form>
            </div>
        </v-card-text>
        <v-overlay :absolute="absolute" :value="overlay" color="light-blue lighten-5">
            <v-progress-circular indeterminate size="80" color="teal accent-3">
                登入中
            </v-progress-circular>
        </v-overlay>
    </v-card>

</template>
<script>
    export default {
        data: () => ({
            valid: true,
            email: '',
            password: '',
            show1: false,
            overlay: false,
            absolute: false,
            emailRules: [
                v => !!v || 'E-mail為必填',
                v => /.+@.+\..+/.test(v) || 'Email格式不正確',
            ],
            passwordRules: [
                v => !!v || '密碼為必填',
                v => v.length > 6 || '密碼至少為6碼',
            ],

        }),

        methods: {
            validate() {
                this.overlay = true;
                if (this.$refs.form.validate()) {
                    this.login();
                } else {
                    this.overlay = false;
                }
            },
            reset() {
                this.$refs.form.reset()
            },
            resetValidation() {
                this.$refs.form.resetValidation()
            },
            login() {
                var app = this
                this.$auth.login({
                    params: {
                        email: app.email,
                        password: app.password
                    },
                    success: function () {

                    },
                    error: function () {
                        this.overlay = false;
                    },
                    rememberMe: true,
                    redirect: '/dashboard',
                    fetchUser: true,
                });
            },
        },

    }

</script>
