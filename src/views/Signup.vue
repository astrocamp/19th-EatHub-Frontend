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
          <h1 class="text-2xl font-bold text-center mb-6">會員註冊</h1>

          <section>
            <input
              v-model="firstName"
              class="input input-bordered w-full"
              placeholder="Firstname"
              required
            />
          </section>
          <section>
            <input
              v-model="lastName"
              class="input input-bordered w-full"
              placeholder="Lastname"
              required
            />
          </section>
          <section>
            <input
              v-model="userName"
              class="input input-bordered w-full"
              placeholder="Username"
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
              placeholder="Password"
              required
            />
          </section>

          <button class="btn btn-primary w-full">註冊</button>

          <div class="divider">或</div>
          <GoogleLoginButton />
          <div class="text-center space-x-2">
            <router-link to="/login" class="link link-hover text-primary"
              >登入</router-link
            >
            <span>/</span>
            <router-link to="/" class="link link-hover text-primary"
              >回首頁</router-link
            >
          </div>
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
import GoogleLoginButton from '@/components/GoogleLoginButton.vue';
import { useAlertStore } from '@/stores/alert';

const alert = useAlertStore();
const router = useRouter();
const authStore = useAuthStore();
const firstName = ref('');
const lastName = ref('');
const userName = ref('');
const email = ref('');
const password = ref('');

const handleSignup = async () => {
  try {
    await authStore.signup(
      firstName.value,
      lastName.value,
      userName.value,
      email.value,
      password.value,
    );
    alert.trigger('註冊成功！請前往登入', 'success');
    router.push('/login');
  } catch (err) {
    if (err.response && err.response.data) {
      alert.trigger(`註冊失敗：${JSON.stringify(err.response.data)}`, 'error');
      router.push('/login');
    } else {
      alert.trigger('註冊失敗', 'error');
    }
  }
};
</script>
