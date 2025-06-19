// stores/auth.js
import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from '@/axios';

export const useAuthStore = defineStore(
  'auth',
  () => {
    const user = ref(null);

    const login = async (email, password) => {
      const response = await axios.post('/auth/login', { email, password });
      user.value = response.data.user;
    };

    const signup = async (firstName, lastName, userName, email, password) => {
      await axios.post('/auth/signup', {
        firstName,
        lastName,
        userName,
        email,
        password,
      });
    };

    const merchantSignup = async (userName, email, password) => {
      await axios.post(
        '/auth/merchant/signup/',
        {
          user_name: userName,
          email,
          password,
          license_url: '',
        },
        { withCredentials: true },
      );
    };

    const logout = async () => {
      await axios.post('/auth/logout');
      user.value = null;
    };

    const setUser = (newUser) => {
      user.value = newUser;
    };

    const clearUser = () => {
      user.value = null;
    };

    return {
      user,
      login,
      signup,
      merchantSignup,
      logout,
      setUser,
      clearUser,
    };
  },
  {
    persist: {
      key: 'auth',
      paths: ['user'],
    },
  },
);
