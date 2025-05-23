// stores/auth.js
import { defineStore } from 'pinia';
import axios from '../axios';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
  }),
  actions: {
    async login(email, password) {
      const response = await axios.post('/auth/login', { email, password });
      this.user = response.data.user;
    },
    async signup(firstName, lastName, userName, email, password) {
      try {
        await axios.post('/auth/signup', {
          firstName,
          lastName,
          userName,
          email,
          password,
        });
      } catch (error) {
        throw error;
      }
    },
    async merchantSignup(userName, email, password) {
      await axios.post('/auth/merchant/signup/', {
        user_name: userName,
        email: email,
        password: password,
        license_url: '' // 可留空，日後支援上傳
      }, { withCredentials: true });
    },
    async logout() {
      await axios.post('/auth/logout');
      this.user = null;
    },
    clearUser() {
      this.user = null;
    },
  },
  persist: {
    key: 'auth', // localStorage key
    paths: ['user'], // value key
  },
});
