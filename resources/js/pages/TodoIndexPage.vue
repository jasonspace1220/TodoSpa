<template>
    <div>
        Todo index {{user}}
    </div>
</template>
<script>
export default {
    data(){
        return {
            user : this.$auth.user().name
        }
    }
}
</script>
