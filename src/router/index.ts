import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import store from '@/store';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('views/home/Home.vue'),
  },
  {
    path: '/:page',
    name: 'Page',
    component: () => import('views/home/Home.vue'),
  },
  {
    path: '/blog/:id',
    name: 'Blog',
    meta: { notKeepAlive: true },
    component: () => import('views/blog/Blog.vue'),
  },
  {
    path: '/timeline',
    name: 'Timeline',
    component: () => import('views/timeline/Timeline.vue'),
  },
  {
    path: '/msgboard',
    name: 'Msgboard',
    component: () => import('views/msgboard/Msgboard.vue'),
  },
  {
    path: '/photo',
    name: 'Photo',
    component: () => import('views/photo/Photo.vue'),
  },
  {
    path: '/link',
    name: 'Link',
    component: () => import('views/link/Link.vue'),
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('views/about/About.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('views/login/Login.vue'),
  },
  {
    path: '/cms',
    name: 'Cms',
    component: () => import('views/cms/Index.vue'),
    meta: {
      needLogin: true,
    },
    children: [
      {
        path: '',
        redirect: '/cms/info',
      },
      {
        path: 'info',
        name: 'info',
        component: () => import('views/cms/info.vue'),
      },
      {
        path: 'barrages',
        name: 'barrages',
        component: () => import('views/cms/barrages.vue'),
      },
      {
        path: 'blogs',
        name: 'blogs',
        component: () => import('views/cms/blogs.vue'),
      },
      {
        path: 'blog/:id',
        name: 'blog',
        component: () => import('views/cms/blog.vue'),
      },
      {
        path: 'imgs',
        name: 'imgs',
        component: () => import('views/cms/imgs.vue'),
      },
      {
        path: 'links',
        name: 'links',
        component: () => import('views/cms/links.vue'),
      },
    ],
  },
  {
    path: '/:pathMatch(.*)',
    name: '404',
    component: () => import('views/result/404.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 登录检测
router.beforeEach((to, from, next) => {
  const TITLE = to.meta.title as string;
  document.title = TITLE || "silvensn's blog";
  if (to.meta && to.meta.needLogin) {
    if (!store.state.login.token) {
      next({ path: 'login' });
      return;
    }
    store.dispatch('login/VerifyAction', {
      token: store.state.login.token,
    });
  }
  next();
});

export function relogin(): void {
  router.push({ path: '/login' });
}

export default router;
