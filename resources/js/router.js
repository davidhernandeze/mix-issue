import Dashboard from "./views/Dashboard"
import Laboratories from "./views/Laboratories"
import Brands from "./views/Brands"
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
    },
    {
        path: "/marcas",
        name: "brands.index",
        component: Brands,
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
