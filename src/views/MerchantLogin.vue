<template>
  <div>
    <Navbar></Navbar>
    <section
      class="min-h-screen flex items-center justify-center bg-base-200 p-4"
    >
      <div class="w-full max-w-md">
        <section class="bg-base-100 shadow-xl rounded-xl p-8 space-y-6">
          <h1 class="text-2xl md:text-3xl text-neutral font-bold text-center">店家登入</h1>

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
              placeholder="密碼"
              required
            />
            <div class="flex gap-3">
            <router-link 
                to="/forgot-password" 
                class="btn btn-outline btn-primary flex-1 rounded-xl text-sm md:text-lg"
              >
                忘記密碼
              </router-link>
            <button class="btn btn-primary flex-1 rounded-xl text-white text-sm md:text-lg" type="submit">登入</button>
            </div>
          </form>
          <p v-if="errorMessage" class="text-red-500 text-sm text-center mt-2">
            {{ errorMessage }}
          </p>  

          <div class="text-center space-y-2">
            <p>
              還沒有帳號？
              <router-link to="/merchant/signup" class="link link-hover text-primary"
                >註冊</router-link
              >
            </p>
            <router-link to="/" class="link link-hover text-primary"
              >回首頁</router-link
            >
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


const email = ref('');
const password = ref('');
const router = useRouter();
const errorMessage = ref('');

const handleLogin = async () => {
  const authStore = useAuthStore();
  errorMessage.value = '';
  try{
    await authStore.login(email.value, password.value);
    router.push({ name: 'MerchantDashboard' });
  } catch (error) {
    errorMessage.value = error?.response?.data?.error || '登入失敗，請確認帳號密碼';
  }
};
</script>
