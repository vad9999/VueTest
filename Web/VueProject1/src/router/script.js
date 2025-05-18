import Home from '../View/Home.vue'
import { createRouter } from 'vue-router'
import { createWebHistory} from 'vue-router'
import PostIdView from '../View/PostIdView.vue'
import HomeWithStore from '../View/HomeWithStore.vue'

const routes = [
    {
        path: '/',
        component: Home,
        name: 'Home'
    },
    {
        path: '/:id',
        component: PostIdView,
        name: 'PostIdView'
    },
    {
        path: '/HomeWithStore',
        component: HomeWithStore,
        name: 'HomeWithStore'
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;