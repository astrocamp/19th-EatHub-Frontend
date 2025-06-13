<template>
  <div class="">
    <NavBar />
    <section
      class="min-h-screen flex items-center justify-center bg-base-200 p-6 pt-30"
    >
      <div class="w-full max-w-md">
        <form
          @submit.prevent="handleSignup"
          class="bg-base-100 shadow-xl rounded-xl p-8 space-y-4"
        >
          <h1
            class="text-2xl md:text-3xl text-neutral font-bold text-center mb-6"
          >
            {{ t('signup.title') }}
          </h1>

          <section>
            <input
              v-model="firstName"
              class="input input-bordered w-full"
              :placeholder="t('signup.firstNamePlaceholder')"
              required
            />
          </section>
          <section>
            <input
              v-model="lastName"
              class="input input-bordered w-full"
              :placeholder="t('signup.lastNamePlaceholder')"
              required
            />
          </section>
          <section>
            <input
              v-model="userName"
              class="input input-bordered w-full"
              :placeholder="t('signup.userNamePlaceholder')"
              required
            />
          </section>
          <section>
            <input
              v-model="email"
              class="input input-bordered w-full"
              placeholder="Email"
              required
            />
          </section>
          <section>
            <input
              v-model="password"
              class="input input-bordered w-full"
              type="password"
              :placeholder="t('signup.passwordPlaceholder')"
              required
            />
          </section>

          <button
            class="btn btn-primary w-full rounded-xl text-white text-base md:text-lg"
          >
            {{ t('signup.submitButton') }}
          </button>
          <p
            v-if="errorMessage"
            class="text-red-500 text-sm text-lift whitespace-pre-line"
          >
            {{ errorMessage }}
          </p>

          <div class="divider">{{ t('signup.orDivider') }}</div>
          <GoogleLoginButton class="cursor-pointer" />
          <div class="text-center space-x-2">
            <router-link to="/login" class="link link-hover text-primary">{{
              t('signup.loginLink')
            }}</router-link>
            <span>/</span>
            <router-link to="/" class="link link-hover text-primary">{{
              t('signup.homeLink')
            }}</router-link>
          </div>
        </form>
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
import GoogleLoginButton from '@/components/GoogleLoginButton.vue';
import { useAlertStore } from '@/stores/alert';

const { t } = useI18n();
const alert = useAlertStore();
const router = useRouter();
const authStore = useAuthStore();
const firstName = ref('');
const lastName = ref('');
const userName = ref('');
const email = ref('');
const password = ref('');
const errorMessage = ref('');

const errorMap = {
  'user with this email already exists.': '此信箱已被註冊，請重新輸入。',
  'Enter a valid email address.': '信箱格式錯誤。',
  'This password is too short. It must contain at least 8 characters.':
    '密碼太短，至少 8 字元。',
  'This password is too common.': '密碼太常見，請換一個更安全的密碼。',
  'This password is entirely numeric.': '密碼不能全為數字。',
};

const handleSignup = async () => {
  errorMessage.value = '';

  try {
    await authStore.signup(
      firstName.value,
      lastName.value,
      userName.value,
      email.value,
      password.value,
    );
    alert.trigger(t('signup.success'), 'success');
    router.push('/login');
  } catch (err) {
    const errors = err.response?.data;

    if (errors && typeof errors === 'object') {
      const allMessages = Object.values(errors)
        .flat() // 把多欄位陣列展平
        .map((msg) => errorMap[msg] || msg); // 對每條訊息做中文翻譯

      errorMessage.value = allMessages.join('\n'); // 換行顯示所有錯誤
    } else {
      errorMessage.value = t('alert.signupFailed');
    }
  }
};
</script>
