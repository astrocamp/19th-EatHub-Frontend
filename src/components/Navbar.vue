<template>
  
  <div
    class="navbar bg-white px-4 py-10 shadow-md flex justify-between items-center fixed z-50 top-0 left-0 w-full h-16"
  >
    
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

    <!-- 右邊 漢堡選單 (小螢幕顯示) - 純 Vue 實作 -->
    <div class="flex-none lg:hidden relative" ref="hamburgerContainer">
      <!-- 漢堡按鈕 - 使用 button  -->
      <button
        @click="toggleMobileMenu"
        class="btn btn-ghost btn-circle hamburger-button"
        :aria-expanded="isMobileMenuOpen"
        aria-label="開啟選單"
        type="button"
      >
        <font-awesome-icon
          :icon="['fas', 'bars']"
          class="text-3xl text-primary mr-4"
        />
      </button>
      
      <!-- 選單內容 - 使用 v-if 控制 -->
      <div v-if="isMobileMenuOpen" class="mobile-menu-container">
        <!-- 已登入用戶選單 -->
        <ul
          v-if="user"
          class="mobile-menu bg-base-100 rounded-box w-52 p-2 shadow-lg"
        >
          <li>
            <a href="#" class="text-sm text-neutral font-medium menu-item" @click.prevent>{{
              t('navbar.loggedInAs', { userName: user.userName })
            }}</a>
          </li>
          <li>
            <a
              href="/users/recent"
              class="flex items-center hover:text-primary mobile-nav-link text-neutral font-medium menu-item"
              @click="closeMobileMenu"
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
              class="flex items-center hover:text-primary mobile-nav-link text-neutral font-medium menu-item"
              @click="closeMobileMenu"
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
              class="flex items-center hover:text-primary mobile-nav-link text-neutral font-medium menu-item"
              @click="closeMobileMenu"
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
              class="flex items-center w-full text-left hover:text-primary mobile-nav-link text-neutral font-medium menu-item"
              @click="handleMobileLogout"
            >
              <font-awesome-icon
                :icon="['fas', 'sign-out-alt']"
                class="nav-icon mr-2 text-neutral"
              />
              {{ t('navbar.logout') }}
            </button>
          </li>
        </ul>
        
        <!-- 未登入用戶選單 -->
        <ul
          v-else
          class="mobile-menu bg-base-100 rounded-box w-52 p-2 shadow-lg"
        >
          <li>
            <a
              href="/signup"
              class="flex items-center hover:text-primary mobile-nav-link text-neutral font-medium menu-item"
              @click="closeMobileMenu"
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
              class="flex items-center hover:text-primary mobile-nav-link text-neutral font-medium menu-item"
              @click="closeMobileMenu"
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
              class="flex items-center hover:text-primary mobile-nav-link text-neutral font-medium menu-item"
              @click="closeMobileMenu"
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
              class="flex items-center hover:text-primary mobile-nav-link text-neutral font-medium menu-item"
              @click="closeMobileMenu"
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
import { ref, onMounted, onUnmounted } from 'vue';
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

// 移動選單狀態
const isMobileMenuOpen = ref(false);
const hamburgerContainer = ref(null);

// 切換移動選單
const toggleMobileMenu = () => {
  console.log('切換選單，當前狀態:', isMobileMenuOpen.value);
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
  console.log('切換後狀態:', isMobileMenuOpen.value);
};

// 關閉移動選單
const closeMobileMenu = () => {
  console.log('關閉選單');
  isMobileMenuOpen.value = false;
};

// 處理移動端登出
const handleMobileLogout = async () => {
  closeMobileMenu();
  await handleLogout();
};

// 原有的登出處理
const handleLogout = async () => {
  await auth.logout();
  if (window.google?.accounts?.id) {
    window.google.accounts.id.disableAutoSelect();
  }
  alert.trigger(t('navbar.logoutSuccess'), 'success');
  router.push('/');
};

// 點擊外部關閉選單
const handleClickOutside = (event) => {
  if (isMobileMenuOpen.value && 
      hamburgerContainer.value && 
      !hamburgerContainer.value.contains(event.target)) {
    console.log('點擊外部，關閉選單');
    closeMobileMenu();
  }
};


const handleEscKey = (event) => {
  if (event.key === 'Escape' && isMobileMenuOpen.value) {
    console.log('ESC 鍵關閉選單');
    closeMobileMenu();
  }
};

// 視窗大小變化時關閉選單
const handleResize = () => {
  if (window.innerWidth >= 1024 && isMobileMenuOpen.value) {
    console.log('視窗變大，關閉選單');
    closeMobileMenu();
  }
};


onMounted(() => {
  document.addEventListener('click', handleClickOutside);
  document.addEventListener('keydown', handleEscKey);
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
  document.removeEventListener('keydown', handleEscKey);
  window.removeEventListener('resize', handleResize);
});

defineProps({});
</script>

<style scoped>
.read-the-docs {
  color: #888;
}

/* 漢堡按鈕樣式 */
.hamburger-button {
 
  background: none;
  border: none;
  padding: 0.5rem;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease;
  
  /* Safari 兼容性 */
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  user-select: none;
}

.hamburger-button:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.hamburger-button:focus {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

/* 移動選單容器 */
.mobile-menu-container {
  position: absolute;
  top: 100%;
  right: 0;
  z-index: 60;
  margin-top: 0.25rem;
}

/* 移動選單樣式 */
.mobile-menu {
  background: white;
  border: 1px solid #e5e7eb;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  list-style: none;
  margin: 0;
  padding: 0.5rem;
}

.mobile-menu li {
  margin: 0;
  padding: 0;
}

/* 選單項目樣式 */
.menu-item {
  display: block;
  width: 100%;
  padding: 0.75rem 1rem;
  text-decoration: none;
  color: inherit;
  border-radius: 0.375rem;
  transition: all 0.2s ease;
  border: none;
  background: none;
  text-align: left;
  cursor: pointer;
}

.menu-item:hover {
  background-color: #ffffff;
  color: #ffffff;
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
  background-color: #f67b00;
  transition: background-color 0.2s ease;
}

/* Safari 特殊處理 */
@supports (-webkit-touch-callout: none) {
  .hamburger-button {
    -webkit-appearance: none;
  }
  
  .mobile-menu-container {
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
  }
}

/* 響應式調整 */
@media (min-width: 1024px) {
  .mobile-menu-container {
    display: none;
  }
}
</style>