
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
  {
    path: '/dashboard',
    redirect: '/dashboard/profile',
    component: () => import('layouts/CMS.vue'),
    children: [
      { path: '/dashboard/profile', name: 'profile', component: () => import('src/pages/CMS/Profile.vue') },
      { path: '/dashboard/post-home', name: 'posthome', component: () => import('src/pages/CMS/PostsHome.vue') },
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
