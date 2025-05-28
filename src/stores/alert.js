// src/stores/alert.js
import { defineStore } from 'pinia';

export const useAlertStore = defineStore('alert', {
  state: () => ({
    message: '',
    type: 'info', // 'success' | 'error' | 'warning' | 'info'
    show: false,
  }),
  actions: {
    trigger(message, type = 'info') {
      this.message = message;
      this.type = type;
      this.show = true;
      setTimeout(() => {
        this.show = false;
      }, 2000);
    },
  },
});
