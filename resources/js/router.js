import Dashboard from "./views/Dashboard"
import Laboratorios from "./views/Laboratorios"
import {createRouter, createWebHistory} from "vue-router"

const routes = [
    {
        path: "/",
        name: "dashboard",
        component: Dashboard,
    },
    {
        path: "/laboratorios",
        name: "laboratorios.index",
        component: Laboratorios,
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
