<template>
  <NavBar />
  <section
    class="min-h-screen flex items-center justify-center bg-base-200 p-4"
  >
    <div class="w-full max-w-md">
      <section class="bg-base-100 shadow-xl rounded-xl p-8 space-y-6">
        <h1 class="text-2xl md:text-3xl text-neutral font-bold text-center">
          重設密碼
        </h1>

        <div class="space-y-4">
          <div>
            <p class="text-base md:text-lg text-gray-600 mb-1">請輸入新密碼</p>
            <input
              type="password"
              v-model="newPassword"
              class="input input-bordered w-full"
            />
          </div>

          <div>
            <p class="text-base md:text-lg text-gray-600 mb-1">
              再次確認新密碼
            </p>
            <input
              type="password"
              v-model="confirmPassword"
              class="input input-bordered w-full"
            />
          </div>

          <button
            @click="handleReset"
            class="btn btn-primary w-full rounded-xl text-white text-sm md:text-lg hover:bg-neutral py-6"
          >
            確定重設
          </button>
        </div>
      </section>
    </div>
  </section>
  <base-footer />
</template>

<script setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import axios from '@/axios';
import NavBar from '@/components/NavBar.vue';
import BaseFooter from '@/components/BaseFooter.vue';
import { useAlertStore } from '@/stores/alert';

const router = useRouter();
const route = useRoute();
const alert = useAlertStore();

const newPassword = ref('');
const confirmPassword = ref('');

const handleReset = async () => {
  if (!newPassword.value || !confirmPassword.value) {
    alert.trigger('請輸入所有欄位', 'warning');
    return;
  }

  if (newPassword.value !== confirmPassword.value) {
    alert.trigger('兩次密碼輸入不一致', 'error');
    return;
  }

  const token = route.query.token;
  const userId = route.query.user_id;
  if (!token) {
    alert.trigger('缺少驗證資訊，請重新從信箱開啟連結', 'error');
    return;
  }

  try {
    await axios.post('/auth/reset-password/', {
      token,
      userId,
      new_password: newPassword.value,
    });

    alert.trigger('密碼已重設成功，請重新登入', 'success');
    router.push('/');
  } catch (error) {
    alert.trigger('重設失敗，請稍後再試', 'error');
  }
};
</script>
