<template>
  <!-- 頂部導航欄 -->
  <div
    class="navbar bg-white  px-4 py-10 shadow-md flex justify-between items-center fixed z-50  top-0 left-0 w-ful h-16" 
  >
    <!-- 左邊 Logo 區 -->
    <div class="flex items-center">
      <a href="/">
        <img src="@/assets/images/logo.png" alt="Logo" class="w-40 mr-2  md:ml-10 mt-4" />
      </a>
    </div>

    <!-- 右邊 漢堡選單 -->
    <div class="flex-none">
      <div class="dropdown dropdown-end">
        <label tabindex="0" class="btn btn-ghost btn-circle">
          <font-awesome-icon
            :icon="['fas', 'bars']"
            class="text-3xl text-[rgb(226,102,55)] mt-4"
          />
        </label>
        <ul
          v-if="user"
          tabindex="0"
          class="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm "
        >
          <li>
            <a href="#">目前登入者：{{ user.userName }}</a>
          </li>
          <li>
            <a href="/users/recent">我的最近瀏覽</a>
          </li>
          <li>
            <a href="/users/favorites">我的收藏</a>
          </li>
          <li>
            <a href="/users/coupons">我的優惠券</a>
          </li>
          <li><button class="" @click="handleLogout">登出</button></li>
        </ul>
        <ul
          v-else
          tabindex="0"
          class="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
        >
          <li>
            <a class="" href="/signup">
              <font-awesome-icon :icon="['fas', 'user-plus']" />
              註冊
            </a>
          </li>
          <li>
            <a class="" href="/login">
              <font-awesome-icon :icon="['fas', 'right-to-bracket']" />
              登入
            </a>
          </li>
          <li>
            <a class="" href="/merchant/signup">
              <font-awesome-icon :icon="['fas', 'user-plus']" />
              店家註冊
            </a>
          </li>
          <li>
            <a class="" href="/merchant/login">
              <font-awesome-icon :icon="['fas', 'right-to-bracket']" />
              店家登入
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

const alert = useAlertStore();
const auth = useAuthStore();
const { user } = storeToRefs(auth);
const router = useRouter();

const handleLogout = async () => {
  await auth.logout();
  if (window.google?.accounts?.id) {
    window.google.accounts.id.disableAutoSelect();
  }
  alert.trigger('登出成功', 'success');
  router.push('/');
};

defineProps({});
</script>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
