<template>
  <!-- 頂部導航欄 -->
  <div
    class="navbar bg-white shadow-sm px-4 py-3 border-b flex justify-between items-center"
  >
    <!-- 左邊 Logo 區 -->
    <div class="flex items-center">
      <a href="/">
        <img src="@/assets/images/logo.png" alt="Logo" class="w-25 h-12 mr-2" />
      </a>
    </div>

    <!-- 右邊 漢堡選單 -->
    <div class="flex-none">
      <div class="dropdown dropdown-end">
        <label tabindex="0" class="btn btn-ghost btn-circle">
          <font-awesome-icon
            :icon="['fas', 'bars']"
            class="text-3xl text-red-500"
          />
        </label>
        <ul
          v-if="user"
          tabindex="0"
          class="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
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
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import axios from '@/axios';
import { useAlertStore } from '@/stores/alert';

const alert = useAlertStore();
const auth = useAuthStore();
const { user } = storeToRefs(auth);

onMounted(async () => {
  if (user.value) {
    try {
      const res = await axios.get('auth/me');
      Object.assign(auth.user, {
        uuid: res.data.user_uuid,
        userName: res.data.userName,
        email: res.data.email,
      });
    } catch (error) {
      if (error.response?.status === 401) {
        auth.user = null;
      }
    }
  }
});

const handleLogout = async () => {
  await auth.logout();
  if (window.google?.accounts?.id) {
    window.google.accounts.id.disableAutoSelect();
  }
  alert.trigger('登出成功', 'success');
};

defineProps({});
</script>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
