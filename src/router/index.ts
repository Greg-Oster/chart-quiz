import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PieChartView from '../views/PieChartView.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/pie-chart',
        name: 'pie-chart',
        component: PieChartView
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default  router
