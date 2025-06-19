import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAlertStore = defineStore('alert', () => {
  const message = ref('');
  const type = ref('info'); // 'success' | 'error' | 'warning' | 'info'
  const show = ref(false);

  const trigger = (newMessage, newType = 'info') => {
    message.value = newMessage;
    type.value = newType;
    show.value = true;
    setTimeout(() => {
      show.value = false;
    }, 2000);
  };

  return {
    message,
    type,
    show,
    trigger,
  };
});
