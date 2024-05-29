<script>
import { locale } from 'dayjs';
import { RouterView } from 'vue-router'
export default {
    components : {
        RouterView
    },
    methods:{
    },
    mounted(){
        this.$router.push({name:'games'})
    }
};

</script>

<template>
<router-view></router-view>
</template>

<style scoped>

</style>
