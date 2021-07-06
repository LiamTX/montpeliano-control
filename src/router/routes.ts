import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/Public',
    component: () => import('layouts/PublicLayout.vue'),
    children: [
      {
        path: '/',
        component: () => import('pages/Public/Login.vue')
      }
    ]
  },

  {
    path: '/Private',
    component: () => import('layouts/PrivateLayout.vue'),
    children: [
      {
        path: '/home',
        component: () => import('pages/Private/Home.vue')
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
