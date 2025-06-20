// router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import axios from '@/axios';
import NotFound from '@/views/NotFound.vue';

const routes = [
  { path: '/', component: () => import('../views/HomePage.vue') },
  { path: '/login', component: () => import('../views/LoginPage.vue') },
  { path: '/signup', component: () => import('../views/SignupPage.vue') },
  {
    path: '/forgot-password',
    component: () => import('../views/ForgotPassword.vue'),
  },
  {
    path: '/reset-password',
    component: () => import('../views/ResetPassword.vue'),
  },
  {
    path: '/merchant/signup',
    component: () => import('../views/MerchantSignup.vue'),
  },
  {
    path: '/merchant/login',
    component: () => import('../views/MerchantLogin.vue'),
  },

  {
    path: '/users/recent',
    component: () => import('../views/MyRecentViewedPage.vue'),
    meta: { requiresAuth: true, requiresNotMerchant: true },
  },
  {
    path: '/users/favorites',
    component: () => import('../views/MyFavorite.vue'),
    meta: { requiresAuth: true, requiresNotMerchant: true },
  },
  {
    path: '/users/coupons',
    component: () => import('../views/MyCoupon.vue'),
    meta: { requiresAuth: true, requiresNotMerchant: true },
  },
  {
    path: '/restaurants/:id',
    component: () => import('../views/RestaurantDetail.vue'),
  },
  {
    path: '/restaurants',
    component: () => import('../views/RestaurantsList.vue'),
    meta: { requiresNotMerchant: true },
  },
  {
    path: '/merchant/dashboard',
    name: 'MerchantDashboard',
    component: () => import('../views/MerchantDashboard.vue'),
    meta: { requiresAuth: true, requiresMerchant: true },
  },
  {
    path: '/merchant/coupons/:uuid/usage',
    name: 'CouponUsage',
    component: () => import('../views/CouponUsage.vue'),
    meta: { requiresAuth: true, requiresMerchant: true },
  },
  {
    path: '/merchant/coupons/:uuid/',
    name: 'CouponDetail',
    component: () => import('../views/CouponDetail.vue'),
    meta: { requiresAuth: true, requiresMerchant: true },
  },
  {
    path: '/user/coupons/:uuid/confirm',
    name: 'CouponConfirm',
    component: () => import('@/views/CouponConfirm.vue'),
    meta: { requiresAuth: true, requiresMerchant: true },
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
  {
    path: '/merchant/coupons/create',
    name: 'CouponCreate',
    component: () => import('../views/CouponCreate.vue'),
    meta: { requiresAuth: true, requiresMerchant: true },
  },
  {
    path: '/merchant/promotions/create',
    name: 'PromotionsCreate',
    component: () => import('../views/PromotionsCreate.vue'),
    meta: { requiresAuth: true, requiresMerchant: true },
  },
  {
    path: '/merchant/promotions/:uuid',
    name: 'PromotionDetail',
    component: () => import('../views/PromotionDetail.vue'),
    meta: { requiresAuth: true, requiresMerchant: true },
  },
  {
    path: '/payments/success',
    name: 'PaymentSuccess',
    component: () => import('@/views/PaymentSuccess.vue'),
  },
  {
    path: '/payments/ecpay-submit',
    name: 'EcpaySubmit',
    component: () => import('@/views/EcpaySubmit.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();

  let user = authStore.user;

  try {
    await axios.get('/auth/me');
  } catch {
    authStore.clearUser();
    user = null;
  }

  if (to.meta.requiresNotMerchant) {
    if (user && (user.role === 'merchant' || user.role === 'vip_merchant')) {
      return next('/merchant/dashboard');
    }
    return next();
  }

  if (!to.meta.requiresAuth) {
    return next();
  }

  if (!user) {
    return next('/login');
  }

  if (to.meta.requiresMerchant) {
    if (user.role === 'merchant' || user.role === 'vip_merchant') {
      return next();
    } else {
      return next('/');
    }
  }

  return next();
});

export default router;
