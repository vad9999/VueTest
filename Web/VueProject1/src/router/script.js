import Home from '../View/Home.vue'
import { createRouter } from 'vue-router'
import { createWebHistory} from 'vue-router'

const routes = [
    {
        path: '/',
        component: Home,
        name: 'Home'
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;