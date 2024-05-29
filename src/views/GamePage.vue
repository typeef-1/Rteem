<script>
import axios from "axios"
import dayjs from "dayjs";
axios.defaults.baseURL = "http://localhost:3005";
export default {
    data() {
        return {
            game: {},
            name: "",
            comm: "",
            iscomm: true,
            date:""
        }
    },
    methods: {
        async loadGame() {
            let res = await axios.get("/lgame");
            this.game = res.data;
            this.date=this.game.updatedAt;
            
            this.date=dayjs(this.date).format('HH:mm:ss DD/MM/YYYY');
        },
        async send() {
            if (this.name != "" && this.comm != "") {
                await axios.put('/comm', {
                    name: this.name,
                    comm: this.comm
                })
                this.name = "";
                this.comm = "";
            }
            this.loadGame();
        },
        async delcomm(index) {
            await axios.delete("/del", {
                index: index
            })
            this.loadGame();
        },
        async download() {
            this.$router.push({ name: 'download' })
        }
    },
    mounted() {
        this.loadGame();
        setInterval(()=>{
            
        this.loadGame();
        },1000)
    },
}
</script>

<template>

    <body>
        <button class="back btn btn-info" @click="this.$router.push({ name: 'games' })">назад</button>
        <h1 class="title">{{ game.title }} ({{ game.year }})</h1>
        <iframe width="560" height="315" :src="game.trailer" title="YouTube video player" frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        <br>
        <div v-if="Number(game.age) < 16" style="background-color: rgb(87, 161, 13);" class="age">{{ game.age }}+</div>
        <div v-else-if="Number(game.age) < 18 && Number(game.age) > 16" style="background-color: #fddd25;" class="age">
            {{
                game.age }}+</div>

        <div v-else style="background-color: #aa0303;" class="age">{{ game.age }}+</div>
        <div style="margin:15px">{{ game.description }}</div>
        <button @click="download()" class="btn btn-success">Скачать</button>
        <div class="form-check">
            <input @change=" console.log('Отображение коментариев изменено')" v-model="iscomm" checked
                class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
            <label class="form-check-label" for="flexCheckDefault">
                Отображать коментарии
            </label>
        </div>
        <div v-if="iscomm">
            <form @submit.prevent="send">
                <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">Ник коментатора</label>
                    <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="typeef"
                        v-model="name">
                </div>
                <div class="mb-3">
                    <label for="exampleFormControlTextarea1" class="form-label">Коментарий</label>
                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="comm"></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Коментировать</button>
            </form>
            <div>{{ this.date}}</div>
            <div class="card" style="width:100%-30px">
                <ul class="list-group list-group-flush">
                    <li v-for="(comm, index) in game.comms" class="list-group-item">{{ index + 1 }}. {{ comm.name }} :
                        {{
                            comm.comm }} <span></span><button style="margin-left:100px; " type="button"
                            class="btn btn-secondary" @click="delcomm(index)">Удалить</button></li>

                </ul>
            </div>
        </div>

    </body>
</template>

<style scoped>
body {
    padding: 25px;
}

.form-check {
    margin-top: 15px;
}

.back {
    position: fixed;
    right: 5px;
    color: aliceblue;
}

.title {
    text-align: center
}

iframe {
    font-family: "Times New Roman";
}

.age {
    --w: 100px;
    font-size: 55px;
    border-radius: 50px;
    width: var(--w);
    vertical-align: middle;
    height: var(--w);
    display: flex;
}

form {
    padding: 15px;
    padding-left: 0px;
    padding-bottom: 35px;
}

.btn-success {

    width: 75%;
}
</style>
