<template>
  <div
    class="navbar bg-white shadow-sm px-4 py-3 border-b flex justify-between items-center"
  >
    <!-- Logo  -->
    <div class="flex items-center">
      <RouterLink :to="{ name: 'MerchantDashboard' }">
        <img
          src="@/assets/images/logo.png"
          alt="EatHub Logo"
          class="w-25 h-12 mr-2"
        />
      </RouterLink>
    </div>

    <button
      class="bg-gray-300 text-gray-800 text-sm font-semibold px-4 py-1 rounded hover:bg-gray-400 transition"
      @click="handleLogout"
    >
      {{ t('navbar.logout') }}
    </button>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth';
import { useAlertStore } from '@/stores/alert';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const auth = useAuthStore();
const alert = useAlertStore();
const router = useRouter();

const handleLogout = async () => {
  await auth.logout();
  alert.trigger('登出成功', 'success');
  router.push('/');
};
</script>
