/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router/auto'
import { setupLayouts } from 'virtual:generated-layouts'
import { routes } from 'vue-router/auto-routes'
import { useCurrentUserStore } from '@/stores/current-user'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: setupLayouts(routes),
})


// Global guards
router.beforeEach( async (to, from, next) => {

  // Login path always allowed
  if(to.path === '/login') {
    return next()
  }

  // Other routes have to verity token
  try {
    const currentUser = useCurrentUserStore()
    await currentUser.verityToken()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    // console.error('Error verifying token', error)
    return next({
      path: '/login',
    })
  }

  return next()
})

// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (!localStorage.getItem('vuetify:dynamic-reload')) {
      console.log('Reloading page to fix dynamic import error')
      localStorage.setItem('vuetify:dynamic-reload', 'true')
      location.assign(to.fullPath)
    } else {
      console.error('Dynamic import error, reloading page did not fix it', err)
    }
  } else {
    console.error(err)
  }
})

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})

export default router
