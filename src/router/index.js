import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { loginMiddleware, protectedRoutesMiddleware } from '../middleware/auth.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      beforeEnter: (to, from, next) => {
        loginMiddleware(to, from, next)
      }
    },
    {
      path: '/documentos',
      name: 'documentos',
      component: () => import('../views/DocumentsLayout.vue'),
      children: [
        {
          path: 'todos',
          name: 'todos',
          component: () => import('../views/DocumentsView.vue')
        },
        {
          path: 'crear',
          name: 'crear',
          component: () => import('../views/AddDocumentView.vue')
        },
        {
          path: 'editar/:id',
          name: 'editar',
          component: () => import('../views/EditDocumentView.vue')
        },
        {
          path: 'ver/:id',
          name: 'ver',
          component: () => import('../views/ShowDocumentView.vue')
        }
      ],
      beforeEnter: (to, from, next) => {
        protectedRoutesMiddleware(to, from, next)
      }
    }
  ]
})

export default router
