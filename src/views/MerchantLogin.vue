<template>
  <div>
    <NavBar />
    <section
      class="min-h-screen flex items-center justify-center bg-base-200 p-4"
    >
      <div class="w-full max-w-md">
        <section class="bg-base-100 shadow-xl rounded-xl p-8 space-y-6">
          <h1 class="text-2xl md:text-3xl text-neutral font-bold text-center">
            {{ t('merchantLogin.title') }}
          </h1>

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
              :placeholder="t('merchantLogin.passwordPlaceholder')"
              required
            />
            <div class="flex gap-3">
              <router-link
                to="/forgot-password"
                class="btn btn-outline btn-primary flex-1 rounded-xl text-sm md:text-lg"
              >
                {{ t('merchantLogin.forgotPassword') }}
              </router-link>
              <button
                class="btn btn-primary flex-1 rounded-xl text-white text-sm md:text-lg"
                type="submit"
              >
                {{ t('merchantLogin.login') }}
              </button>
            </div>
          </form>
          <p v-if="errorMessage" class="text-red-500 text-sm text-center mt-2">
            {{ errorMessage }}
          </p>

          <div class="text-center space-y-2">
            <p>
              {{ t('merchantLogin.noAccount') }}
              <router-link
                to="/merchant/signup"
                class="link link-hover text-primary"
              >
                {{ t('merchantLogin.signup') }}
              </router-link>
            </p>
            <router-link to="/" class="link link-hover text-primary">
              {{ t('merchantLogin.backHome') }}
            </router-link>
          </div>
        </section>
      </div>
    </section>
    <base-footer />
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import NavBar from '@/components/NavBar.vue';
import BaseFooter from '@/components/BaseFooter.vue';

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
    router.push({ name: 'MerchantDashboard' });
  } catch (error) {
    errorMessage.value =
      error?.response?.data?.error || t('merchantLogin.loginFailed');
  }
};
</script>
