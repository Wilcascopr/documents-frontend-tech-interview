import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DocumentsLayout from '../views/DocumentsLayout.vue'
import DocumentsView from '../views/DocumentsView.vue'
import AddDocumentView from '../views/AddDocumentView.vue'
import EditDocumentView from '../views/EditDocumentView.vue'
import ShowDocumentView from '../views/ShowDocumentView.vue'
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
      component: DocumentsLayout,
      children: [
        {
          path: 'todos',
          name: 'todos',
          component: DocumentsView
        },
        {
          path: 'crear',
          name: 'crear',
          component: AddDocumentView
        },
        {
          path: 'editar/:id',
          name: 'editar',
          component: EditDocumentView
        },
        {
          path: 'ver/:id',
          name: 'ver',
          component: ShowDocumentView
        }
      ],
      beforeEnter: (to, from, next) => {
        protectedRoutesMiddleware(to, from, next)
      }
    }
  ]
})

export default router
