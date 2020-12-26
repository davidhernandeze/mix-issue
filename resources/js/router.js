import Dashboard from "./views/Dashboard"
import Laboratories from "./views/Laboratories"
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
        component: Laboratories,
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
