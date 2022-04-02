import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'

const routes: RouteRecordRaw[] = []

const modules = import.meta.globEager('./module/*.ts')

for (const path in modules) {
  routes.push(...modules[path].default)
}
const router = createRouter({
  history: createWebHistory(),
  routes: routes,
})

export default router
