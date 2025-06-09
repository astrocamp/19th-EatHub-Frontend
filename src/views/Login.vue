<template>
  <div>
    <Navbar></Navbar>
    <section
      class="min-h-screen flex items-center justify-center bg-base-200 p-6 pt-28"
    >
      <div class="w-full max-w-md">
        <section class="bg-base-100 shadow-xl rounded-xl p-8 space-y-6">
          <h1 class="text-2xl md:text-3xl font-bold text-center text-neutral">{{ t('login.title') }}</h1>

          <form @submit.prevent="handleLogin" class="space-y-4">
            <input
              v-model="email"
              class="input input-bordered w-full"
              placeholder="Email"
              required
            />
            <input
              class="input input-bordered w-full"
              v-model="password"
              type="password"
              placeholder="Password"
              required
            />

            <!-- 按鈕區域：忘記密碼 + 登入按鈕 -->
            <div class="flex gap-3">
              <router-link
                to="/forgot-password"
                class="btn btn-outline btn-primary flex-1 text-sm md:text-lg rounded-xl"
              >
                {{ t('login.forgotPassword') }}
              </router-link>
              <button class="btn btn-primary flex-1 text-white text-sm md:text-lg rounded-xl hover:bg-neutral" type="submit">
                {{ t('login.submit') }}
              </button>
            </div>
          </form>
          <p v-if="errorMessage" class="text-red-500 text-sm text-center">
            {{ errorMessage }}
          </p>

          <div class="divider">{{ t('login.orDivider') }}</div>
          <GoogleLoginButton />

          <div class="text-center space-y-2">
            <p>
              {{ t('login.noAccount') }}
              <router-link to="/signup" class="link link-hover text-primary">{{
                t('login.signupLink')
              }}</router-link>
            </p>
            <router-link to="/" class="link link-hover text-primary">{{
              t('login.backHome')
            }}</router-link>
          </div>
        </section>
      </div>
    </section>
    <Footer></Footer>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import GoogleLoginButton from '@/components/GoogleLoginButton.vue';
import { useAlertStore } from '@/stores/alert';
import { useI18n } from 'vue-i18n';

const alert = useAlertStore();
const { t } = useI18n();
const email = ref('');
const password = ref('');
const router = useRouter();
const errorMessage = ref('');

const handleLogin = async () => {
  const authStore = useAuthStore();
  errorMessage.value = '';
  try {
    await authStore.login(email.value, password.value);
    alert.trigger(t('alert.loginSuccess'), 'success');
    router.push('/');
  } catch (error) {
    errorMessage.value = error?.response?.data?.error;
  }
};
</script>
