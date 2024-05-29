<script>
import axios from "axios"
import dayjs from "dayjs";
axios.defaults.baseURL = "http://localhost:3005";
export default {
    data() {
        return {
            link: document.createElement('a')
        }
    },
    methods: {
        no(){
            
            this.$router.push({ name: 'game' })
        }
    },
    mounted() {
    },
}
</script>

<template>

    <body>
        <div class="text">По сколько пиратство не очень законно то здесь вы не сможете скачать эти игры, но вы можете скачать мою
            пародию на <b>flappy bird</b> и поиграть в нее вмето этого</div>
        <img class="flapp" src="/src/assets/flapp.png">
        <button @click="no()" class="btn btn-danger">
        <img class="cross"
                src="/src/assets/cross-svgrepo-com.svg"></button>
        <a href="src/assets/flapybird.exe" download @click="
            this.$router.push({ name: 'game' })">
            <button class="btn btn-success">Скачать </button>
        </a>
    </body>
</template>

<style scoped>
body {
    padding: 15px;
}

.cross {
    width: 120px;
}
.btn{
    height: 150px;
    border-radius:15px ;
    
}
.btn-danger{
    text-align: center;
    width: 150px;
    margin-right:20px ;
}
.btn-success{
    width:70%;
    font-size: 100px;
    padding-top: 0px;
}
.text{
    font-size: 25px;
}
.flapp{
    width: 100%;
    margin: 5px 0px 20px 0px;
}
</style>