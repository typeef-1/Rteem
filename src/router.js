import { createRouter, createWebHistory } from 'vue-router'
import GamesPage from './views/GamesPage.vue'
import GamePage from './views/GamePage.vue'
import DownLoadPage from './views/DownLoadPage.vue'
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name:"games",
      path:"/games",
      component :GamesPage
    },
    {
      name:"game",
      path:"/game",
      component :GamePage
    },
    {
      name:"download",
      path:"/download",
      component :DownLoadPage
    },
  ]
})

export default router
