<template>
  <div class="">
    <NavBar />
    <RestaurantBindModal v-if="showBindModal" @close="showBindModal = false" />
    <section
      class="min-h-screen flex items-center justify-center bg-base-200 p-4"
    >
      <div class="w-full max-w-md">
        <form
          @submit.prevent="handleSignup"
          class="bg-base-100 shadow-xl rounded-xl p-8 space-y-4"
        >
          <h1
            class="text-2xl md:text-3xl text-neutral font-bold text-center mb-6"
          >
            {{ t('merchantSignup.title') }}
          </h1>

          <section>
            <input
              v-model="userName"
              class="input input-bordered w-full"
              :placeholder="t('merchantSignup.restaurantNamePlaceholder')"
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
              :placeholder="t('merchantSignup.passwordPlaceholder')"
              required
            />
          </section>

          <button
            class="btn btn-primary w-full rounded-xl text-white text-base md:text-lg"
          >
            {{ t('merchantSignup.signup') }}
          </button>
          <p
            v-if="errorMessage"
            class="text-red-500 text-sm text-lift whitespace-pre-line"
          >
            {{ errorMessage }}
          </p>
          <div class="text-center space-x-2">
            <router-link
              to="/merchant/login"
              class="link link-hover text-primary"
            >
              {{ t('merchantSignup.login') }}
            </router-link>
            <span>/</span>
            <router-link to="/" class="link link-hover text-primary"
              >{{ t('merchantSignup.backHome') }}
            </router-link>
          </div>

          <p v-if="error" class="text-red-500 text-center">{{ error }}</p>
          <p v-if="success" class="text-green-500 text-center">{{ success }}</p>
        </form>
      </div>
    </section>

    <base-footer />
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import NavBar from '@/components/NavBar.vue';
import BaseFooter from '@/components/BaseFooter.vue';
import RestaurantBindModal from '@/components/RestaurantBindModal.vue';

const { t } = useI18n();
const router = useRouter();
const authStore = useAuthStore();
const userName = ref('');
const email = ref('');
const password = ref('');
const error = ref('');
const success = ref('');
const role = ref('merchant');
const showBindModal = ref(false);
const errorMessage = ref('');

onMounted(() => {
  showBindModal.value = true;
});

const errorMap = {
  'user with this email already exists.': t(
    'merchantSignup.signupFailedEmailUsed',
  ),
  'Enter a valid email address.': t('merchantSignup.invalidEmail'),
  'This password is too short. It must contain at least 8 characters.': t(
    'merchantSignup.passwordTooShort',
  ),
  'This password is too common.': t('merchantSignup.passwordTooCommon'),
  'This password is entirely numeric.': t('merchantSignup.passwordNumericOnly'),
};

const handleSignup = async () => {
  errorMessage.value = '';
  try {
    await authStore.merchantSignup(
      userName.value,
      email.value,
      password.value,
      role.value,
    );
    success.value = t('merchantSignup.signupSuccess');
    router.push('/merchant/login');
  } catch (err) {
    const errors = err.response?.data;
    if (errors && typeof errors === 'object') {
      const allMessages = Object.values(errors)
        .flat() // 把多欄位陣列展平
        .map((msg) => errorMap[msg] || msg); // 對每條訊息做中文翻譯

      errorMessage.value = allMessages.join('\n'); // 換行顯示所有錯誤
    } else {
      errorMessage.value = t('merchantSignup.signupFailedGeneral');
    }
    success.value = '';
  }
};
</script>
