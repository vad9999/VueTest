import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/script'
import components from './components/UI'

const app = createApp(App)

components.forEach(component => {
    app.component(component.name, component)
})

app.use(router).mount('#app')
