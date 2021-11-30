
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/auth', component: () => import('pages/Auth.vue') },
      {
        path: '/forgot-password',
        component: () => import('src/pages/ForgotPassword.vue')
      },
      {
        path: '/reset-password',
        component: () => import('src/pages/ResetPassword.vue')
      },
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
