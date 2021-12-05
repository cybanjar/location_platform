
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'home', component: () => import('pages/Index.vue') },
      { path: '/auth', name: 'auth', component: () => import('pages/Auth.vue') },
      { path: '/forgot-password', name: 'forgot-password', component: () => import('src/pages/ForgotPassword.vue')},
      { path: '/reset-password', name: 'reset-password', component: () => import('src/pages/ResetPassword.vue')},
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
