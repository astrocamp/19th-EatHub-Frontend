<template>
  <div
    class="navbar bg-white px-4 py-10 shadow-md flex justify-between items-center fixed z-50 top-0 left-0 w-full h-16"
  >
    <!-- Logo  -->
    <div class="flex items-center">
      <RouterLink :to="{ name: 'MerchantDashboard' }">
        <img
          src="@/assets/images/logo.png"
          alt="EatHub Logo"
          class="w-40 mr-2 md:ml-10"
        />
      </RouterLink>
    </div>
    <div class="flex items-center space-x-3 md:pr-10">
        <RouterLink
      v-if="storeId"
      :to="{ path: `/restaurants/${storeId}` }"
      class="bg-primary text-white text-sm font-semibold px-4 py-2 hover:bg-neutral transition text-center cursor-pointer rounded-xl justify-center inline-flex items-center gap-1"
>


  <!-- 手機版：只顯示圖示 -->
  <font-awesome-icon 
    :icon="['fas', 'shop']" 
    class="md:hidden"
  />
  
  <!-- 平板和電腦版：只顯示文字 -->
  <span class="hidden md:inline">
    {{ t('navbar.myStore') }}
  </span>
</RouterLink>
      
      <button
        class=" bg-gray-300 text-gray-800 text-xs md:text-sm font-semibold px-4 py-2  hover:bg-gray-400 transition cursor-pointer rounded-xl whitespace-nowrap"
        @click="handleLogout"
      >
        {{ t('navbar.logout') }}
      </button>
    </div>
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


defineProps({
  storeId: String
})


</script>
