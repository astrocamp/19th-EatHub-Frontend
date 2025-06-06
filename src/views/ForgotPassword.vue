<template>
  <Navbar></Navbar>
  <section class="min-h-screen flex items-center justify-center bg-base-200 p-4">
      <div class="w-full max-w-md">
        <section class="bg-base-100 shadow-xl rounded-xl p-8 space-y-6">
        <!-- 標題區域 -->
        <div class=" text-black px-6 pt-4 rounded-t-lg">
          <h1 class="text-2xl font-bold text-center">忘記密碼</h1>
        </div>
        
        <!-- 表單內容區域 -->
        <div class="p-4">
          <!-- 說明文字 -->
          <div class="text-center mb-8">
            <p class="text-gray-700 text-base leading-relaxed">
              請輸入註冊時的 Email 📩，<br>我們會寄送重設密碼的連結給您。
            </p>
          </div>
          
          <!-- 郵件輸入區域 -->
          <div class="mb-8">
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2v10a2 2 0 002 2z"/>
                </svg>
              </div>
              <input
                v-model="email"
                type="email"
                class="input input-bordered w-full"
                placeholder="Email"
              />
            </div>
          </div>
          
          <!-- 確認送出按鈕 -->
          <div>
            <button 
              @click="handleSubmit"
              class="w-full bg-primary hover:bg-[rgb(87,57,33)] text-white font-medium py-4 px-6 rounded-lg cursor-pointer"
            >
              確認送出
            </button>
          </div>
          </div>
        </section>
      </div>
    </section>
    <Footer></Footer>

</template>

<script setup>
import { ref } from 'vue';
import axios from '@/axios';
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import { useAlertStore } from '@/stores/alert';

const email = ref('');
const alert = useAlertStore();

const handleSubmit = async () => {
  if (!email.value) {
    alert.trigger('請輸入郵件地址', 'warning');
    return;
  }
  
  try {
    await axios.post('/auth/forgot-password/', {
      email: email.value
    });
    
    alert.trigger('重設密碼郵件已發送，請檢查您的郵箱📬', 'success');
    email.value = '';
    
  } catch (error) {
    if (error.response?.status === 404) {
      alert.trigger('找不到此郵件地址的用戶', 'warning');
    } else {
      alert.trigger('發送郵件失敗，請稍後再試', 'error');
    }
  }
};
</script>