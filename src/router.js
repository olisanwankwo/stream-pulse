import { createRouter, createWebHistory } from 'vue-router'
import Login from './login.vue' 
import Home from './home.vue' 
import Rated from './rated.vue'
import Detail from './detail.vue'
import Details from './details.vue'
import Coming from './coming.vue'
import Wishlist from './wishlist.vue' 
import Register from './register.vue' 
import Animation from './animation.vue' 
import Movie from './movie.vue' 
import Series from './series.vue' 
import Action from './action.vue' 
import Adventure from './adventure.vue' 
import Comedy from './comedy.vue'
import Crime from './crime.vue'
import Documentary from './documentary.vue'
import Drama from './drama.vue'
import Family from './family.vue' 
import Fantasy from './fantasy.vue' 
import History from './history.vue' 
import Horror from './horror.vue' 
import Music from './music.vue' 
import Mystery from './mystery.vue'
import Romance from './romance.vue' 
import Sciencefiction from './sciencefiction.vue' 
import Thriller from './thriller.vue' 
import War from './war.vue' 
import Western from './western.vue'
import { supabase } from './supabase'

const routes = [
  { path: '/', redirect: '/register' }, 
  { path: '/register', component: Register },
  { path: '/login', component: Login },
  { path: '/home', component: Home },
  { path: '/rated', component: Rated },
  { path: '/coming', component: Coming },
  { path: '/detail/:id', component: Detail },
  { path: '/details/:id', component: Details },
  { path: '/wishlist', component: Wishlist },
  { path: '/animation', component: Animation },
  { path: '/movie', component: Movie },
  { path: '/series', component: Series },
  { path: '/action', component: Action },
  { path: '/adventure', component: Adventure },
  { path: '/comedy', component: Comedy },
  { path: '/crime', component: Crime },
  { path: '/documentary', component: Documentary },
  { path: '/drama', component: Drama },
  { path: '/family', component: Family },
  { path: '/fantasy', component: Fantasy },
  { path: '/history', component: History },
  { path: '/horror', component: Horror },
  { path: '/music', component: Music },
  { path: '/mystery', component: Mystery },
  { path: '/romance', component: Romance },
  { path: '/western', component: Western },
  { path: '/sciencefiction', component: Sciencefiction },
  { path: '/thriller', component: Thriller },
  { path: '/war', component: War },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: 'active'
})

export default router
