<template>
  <button
    @click="handleGoogleLogin"
    class="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-full py-3 text-gray-700 hover:bg-gray-100 transition"
  >
    <font-awesome-icon :icon="['fab', 'google']" />
    <span class="font-medium">使用 Google 帳號</span>
  </button>
</template>

<script setup>
import axios from '@/axios';
import { useAuthStore } from '@/stores/auth';
import { useAlertStore } from '@/stores/alert';

const alert = useAlertStore();
const authStore = useAuthStore();

function loadGoogleSdk() {
  return new Promise((resolve) => {
    if (document.getElementById('google-oauth-script')) return resolve();

    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.id = 'google-oauth-script';
    script.onload = resolve;
    document.head.appendChild(script);
  });
}

const handleGoogleLogin = async () => {
  await loadGoogleSdk();

  window.google.accounts.oauth2
    .initTokenClient({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      scope: 'profile email',
      callback: async (res) => {
        const access_token = res.access_token;
        if (!access_token)
          return alert.trigger('無法取得 Google access_token', 'error');

        try {
          const loginRes = await axios.post('auth/google-login/', {
            access_token,
          });
          const meRes = await axios.get('auth/me');
          if (!authStore.user) {
            authStore.user = {};
          }
          Object.assign(authStore.user, {
            uuid: meRes.data.user_uuid,
            userName: loginRes.data.user.userName,
            email: loginRes.data.user.email,
          });

          alert.trigger('Google 登入成功', 'success');
          window.location.href = '/';
        } catch {
          alert.trigger('登入失敗，請稍後再試', 'error');
        }
      },
    })
    .requestAccessToken();
};
</script>
