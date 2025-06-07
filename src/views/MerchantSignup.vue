<template>
  <div class="">
    <Navbar></Navbar>
    <section
      class="min-h-screen flex items-center justify-center bg-base-200 p-4"
    >
      <div class="w-full max-w-md">
        <form
          @submit.prevent="handleSignup"
          class="bg-base-100 shadow-xl rounded-xl p-8 space-y-4"
        >
          <h1 class="text-2xl md:text-3xl text-neutral font-bold text-center mb-6">店家註冊</h1>


          <section>
            <input
              v-model="userName"
              class="input input-bordered w-full"
              placeholder="餐廳名稱"
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
              placeholder="設定密碼"
              required
            />
          </section>

          <button class="btn btn-primary w-full rounded-xl text-white text-base md:text-lg">註冊</button>
          <p v-if="errorMessage" class="text-red-500 text-sm text-lift whitespace-pre-line">
            {{ errorMessage }}
          </p>
          <div class="text-center space-x-2">
            <router-link to="/merchant/login" class="link link-hover text-primary"
              >登入</router-link
            >
            <span>/</span>
            <router-link to="/" class="link link-hover text-primary"
              >回首頁</router-link
            >
          </div>

          <p v-if="error" class="text-red-500 text-center">{{ error }}</p>
          <p v-if="success" class="text-green-500 text-center">{{ success }}</p>
        </form>
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


const router = useRouter();
const authStore = useAuthStore();
const userName = ref('');
const email = ref('');
const password = ref('');
const error = ref('');
const success = ref('');
const role = ref('merchant');
const errorMessage = ref('');

const errorMap = {
  'user with this email already exists.': '此信箱已被註冊，請重新輸入。',
  'Enter a valid email address.': '信箱格式錯誤。',
  'This password is too short. It must contain at least 8 characters.': '密碼太短，至少 8 字元。',
  'This password is too common.': '密碼太常見，請換一個更安全的密碼。',
  'This password is entirely numeric.': '密碼不能全為數字。',
};

const handleSignup = async () => {
  errorMessage.value = '';
  try {
    await authStore.merchantSignup( 
      userName.value,
      email.value,
      password.value,
      role.value
    );
    success.value = '註冊成功！請前往登入';
    router.push('/merchant/login');
    
  } catch (err) {
    const errors = err.response?.data;
    if (errors && typeof errors === 'object') {
      const allMessages = Object.values(errors)
        .flat() // 把多欄位陣列展平
        .map(msg => errorMap[msg] || msg); // 對每條訊息做中文翻譯

      errorMessage.value = allMessages.join('\n'); // 換行顯示所有錯誤
    } else {
      errorMessage.value = '註冊失敗，請稍後再試';
    }
    success.value = '';
  }
};
</script>
