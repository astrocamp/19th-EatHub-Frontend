// router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import axios from '../axios';
import NotFound from '@/views/NotFound.vue';

const routes = [
  { path: '/', component: () => import('../views/Home.vue') },
  { path: '/login', component: () => import('../views/Login.vue') },
  { path: '/signup', component: () => import('../views/Signup.vue') },
  { path: '/merchant/signup', component: () => import('../views/MerchantSignup.vue') },
  { path: '/merchant/login', component: () => import('../views/MerchantLogin.vue') },

  {
    path: '/users/recent',
    component: () => import('../views/MyRecentViewedPage.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/users/favorites',
    component: () => import('../views/MyFavorite.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/users/coupons',
    component: () => import('../views/MyCoupon.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/restaurants/:id',
    component: () => import('../views/RestaurantDetail.vue'),
  },
  {
    path: '/restaurants',
    component: () => import('../views/RestaurantsList.vue'),
  },
  {
    path: '/merchant/coupons/:uuid/usage',
    name: 'CouponUsage',
    component: () => import('../views/CouponUsage.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/privacy-policy',
    name: 'PrivacyPolicy',
    component: () => import('../views/PrivacyPolicy.vue'),
  },
  {
    path: '/terms-of-service',
    name: 'TermsOfService',
    component: () => import('../views/TermsOfService.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth) {
    try {
      await axios.get('/auth/me');
      next();
    } catch {
      const authStore = useAuthStore();
      authStore.clearUser();
      next('/login');
    }
  } else {
    next();
  }
});

export default router;
