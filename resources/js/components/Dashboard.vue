<template>
    <div>
        <h1>Laravel 5 – 酷炫的后台</h1>
        <button @click="user()">使用者</button>
    </div>
</template>

<script>
    export default {
        methods: {
            user() {
                console.log(this.$auth.user());

            }
        }
    }

</script>
