<template>
  <!-- 頂部導航欄 -->
  <div
    class="navbar bg-white px-4 py-10 shadow-md flex justify-between items-center fixed z-50 top-0 left-0 w-ful h-16"
  >
    <!-- 左邊 Logo 區 -->
    <div class="flex items-center">
      <a href="/">
        <img
          src="@/assets/images/logo.png"
          alt="Logo"
          class="w-40 mr-2 md:ml-10 "
        />
      </a>
    </div>

    <!-- 中間選單項目 (大螢幕顯示) -->
    <nav class="hidden lg:flex items-center space-x-10 flex-1 justify-end mr-10">
      <template v-if="user">
        <span class="text-primary font-medium">{{
          t('navbar.loggedInAs', { userName: user.userName })
        }}</span>
        <a
          href="/users/recent"
          class="font-medium text-neutral hover:text-primary transition-colors flex items-center nav-link "
        >
          
          {{ t('navbar.recentViews') }}
        </a>
        <a
          href="/users/favorites"
          class="font-medium text-neutral hover:text-primary transition-colors flex items-center nav-link"
        >
          
          {{ t('navbar.favorites') }}
        </a>
        <a
          href="/users/coupons"
          class="font-medium text-neutral hover:text-primary transition-colors flex items-center nav-link"
        >
          
          {{ t('navbar.myCoupons') }}
        </a>
        <button
          @click="handleLogout"
          class="font-medium text-neutral hover:text-primary transition-colors flex items-center cursor-pointer nav-link"
        >
          
          {{ t('navbar.logout') }}
        </button>
      </template>
      <template v-else>
        <a
          href="/signup"
          class="font-medium text-neutral hover:text-primary  transition-colors flex items-center nav-link"
        >
        
          {{ t('navbar.signup') }}
        </a>
        <a
          href="/login"
          class="font-medium text-neutral hover:text-primary transition-colors flex items-center nav-link"
        >
      
          {{ t('navbar.login') }}
        </a>
        <a
          href="/merchant/signup"
          class="font-medium text-neutral hover:text-primary transition-colors flex items-center nav-link"
        >
     
          {{ t('navbar.merchantSignup') }}
        </a>
        <a
          href="/merchant/login"
          class="font-medium text-neutral hover:text-primary transition-colors flex items-center nav-link"
        >
          {{ t('navbar.merchantLogin') }}
        </a>
      </template>
    </nav>

    <!-- 右邊 漢堡選單 (小螢幕顯示) -->
    <div class="flex-none lg:hidden">
      <div class="dropdown dropdown-end">
        <label tabindex="0" class="btn btn-ghost btn-circle">
          <font-awesome-icon
            :icon="['fas', 'bars']"
            class="text-3xl text-primary mr-4"
          />
        </label>
        <ul
          v-if="user"
          tabindex="0"
          class="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
        >
          <li>
            <a href="#" class="text-sm text-neutral font-medium">{{
              t('navbar.loggedInAs', { userName: user.userName })
            }}</a>
          </li>
          <li>
            <a
              href="/users/recent"
              class="flex items-center hover:text-primary mobile-nav-link text-neutral font-medium"
            >
              <font-awesome-icon
                :icon="['fas', 'clock']"
                class="nav-icon mr-2 text-neutral"
              />
              {{ t('navbar.recentViews') }}
            </a>
          </li>
          <li>
            <a
              href="/users/favorites"
              class="flex items-center hover:text-primary mobile-nav-link text-neutral font-medium"
            >
              <font-awesome-icon
                :icon="['fas', 'heart']"
                class="nav-icon mr-2 text-neutral"
              />
              {{ t('navbar.favorites') }}
            </a>
          </li>
          <li>
            <a
              href="/users/coupons"
              class="flex items-center hover:primary mobile-nav-link text-neutral font-medium"
            >
              <font-awesome-icon
                :icon="['fas', 'ticket']"
                class="nav-icon mr-2 text-neutral"
              />
              {{ t('navbar.myCoupons') }}
            </a>
          </li>
          <li>
            <button
              class="flex items-center w-full text-left hover:text-primary mobile-nav-link text-neutral font-medium"
              @click="handleLogout"
            >
              <font-awesome-icon
                :icon="['fas', 'sign-out-alt']"
                class="nav-icon mr-2 text-neutral"
              />
              {{ t('navbar.logout') }}
            </button>
          </li>
        </ul>
        <ul
          v-else
          tabindex="0"
          class="dropdown-content menu bg-base-100 rounded-box z-50 w-52 p-2 shadow-lg"
        >
          <li>
            <a
              href="/signup"
              class="flex items-center hover:text-primary  mobile-nav-link text-neutral font-medium"
            >
              <font-awesome-icon
                :icon="['fas', 'user-plus']"
                class="nav-icon mr-2 text-neutral"
              />
              {{ t('navbar.signup') }}
            </a>
          </li>
          <li>
            <a
              href="/login"
              class="flex items-center hover:text-primary mobile-nav-link text-neutral font-medium"
            >
              <font-awesome-icon
                :icon="['fas', 'right-to-bracket']"
                class="nav-icon mr-2 text-neutral"
              />
              {{ t('navbar.login') }}
            </a>
          </li>
          <li>
            <a
              href="/merchant/signup"
              class="flex items-center hover:text-primary mobile-nav-link text-neutral font-medium" 
            >
              <font-awesome-icon
                :icon="['fas', 'store']"
                class="nav-icon mr-2 text-neutral"
              />
              {{ t('navbar.merchantSignup') }}
            </a>
          </li>
          <li>
            <a
              href="/merchant/login"
              class="flex items-center hover:text-primary mobile-nav-link text-neutral font-medium"
            >
              <font-awesome-icon
                :icon="['fas', 'shop']"
                class="nav-icon mr-2 text-neutral"
              />
              {{ t('navbar.merchantLogin') }}
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import { useAlertStore } from '@/stores/alert';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const alert = useAlertStore();
const auth = useAuthStore();
const { user } = storeToRefs(auth);
const router = useRouter();

const handleLogout = async () => {
  await auth.logout();
  if (window.google?.accounts?.id) {
    window.google.accounts.id.disableAutoSelect();
  }
  alert.trigger(t('navbar.logoutSuccess'), 'success');
  router.push('/');
};

defineProps({});
</script>

<style scoped>
.read-the-docs {
  color: #888;
}

/* 確保下拉選單在高 z-index 層級 */
.dropdown-content {
  z-index: 50;
}

/* 圖標跳動動畫 */
@keyframes iconBounce {
  0%,
  100% {
    transform: translateY(0);
  }
  25% {
    transform: translateY(-3px);
  }
  50% {
    transform: translateY(-6px);
  }
  75% {
    transform: translateY(-3px);
  }
}

/* 懸停時觸發圖標動畫 - 大螢幕導航 */
.nav-link:hover .nav-icon {
  animation: iconBounce 0.6s ease-in-out;
}

/* 懸停時觸發圖標動畫 - 漢堡選單 */
.mobile-nav-link:hover .nav-icon {
  animation: iconBounce 0.6s ease-in-out;
}

/* 平滑的懸停效果 */
nav a:hover,
nav button:hover {
  transform: translateY(-1px);
}

/* 漢堡選單項目懸停效果 */
.mobile-nav-link:hover {
  background-color: rgb(87, 57, 33);
  transition: background-color 0.2s ease;
}
</style>
