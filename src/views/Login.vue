<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="handleLogin">
      <input v-model="email" placeholder="Email" />
      <input
        class="input"
        v-model="password"
        type="password"
        placeholder="Password"
      />
      <button class="btn btn-primary" type="submit">Login</button>
    </form>
    <p>還沒有帳號？<router-link to="/signup">註冊</router-link></p>
    <router-link to="/">回首頁</router-link>
  </div>
</template>

<script>
import { useAuthStore } from '../stores/auth';

export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    async handleLogin() {
      const authStore = useAuthStore();
      await authStore.login(this.username, this.password);
      this.$router.push('/');
    },
  },
};
</script>
