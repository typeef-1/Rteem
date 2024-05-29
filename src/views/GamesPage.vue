<script>
import axios from "axios"
axios.defaults.baseURL = "http://localhost:3005";
export default {
    components: {
    },
    data() {
        return {
            games: [],
            game: {},
            isgame: false
        }
    },
    methods: {
        async loadGames() {
            let res = await axios.get("/games")
            this.games = res.data;
            console.log(res);
        },
        async toGame(id) {
            let res = await axios.post('/game', { id: id });

            this.$router.push({ name: 'game' })
        }
    },
    mounted() {
        this.loadGames();

    }
}
</script>

<template>
    <body>
        <div class="card" style="width: 18rem;" v-for="game in games">
            <img style="height: 200px" :src="game.image" class="card-img-top" alt="...">
            <div class="card-body">
                <span v-if="game.title.length < 20">
                    <h5 v-if="game.rate >= 80">{{ game.title }} <span class="badge text-bg-success">{{ game.rate
                            }}</span>
                    </h5>
                    <h5 v-else-if="game.rate >= 50">{{ game.title }} <span class="badge text-bg-warning">{{ game.rate
                            }}</span></h5>
                    <h5 v-else>{{ game.title }} <span class="badge text-bg-danger">{{ game.rate }}</span></h5>
                </span>
                <span v-else>
                    <h5 v-if="game.rate >= 80">{{ game.title.slice(0, 20) }}... <span class="badge text-bg-success">{{
                            game.rate }}</span>
                    </h5>
                    <h5 v-else-if="game.rate >= 50">{{ game.title.slice(0, 20) }}... <span
                            class="badge text-bg-warning">{{ game.rate
                            }}</span></h5>
                    <h5 v-else>{{ game.title.slice(0, 20) }}... <span class="badge text-bg-danger">{{ game.rate }}</span>
                    </h5>
                </span>
                <p class="card-text">Платформы: {{ game.platphorms }}</p>
                <a href="#" @click="this.toGame(game._id)" class="btn btn-primary">Подробнее</a>
            </div>
        </div>
    </body>
</template>

<style scoped>
body {
    padding: 5px;
    height: 100%;
}

.card {
    margin: 5px;
    display: inline-block;
}
</style>
