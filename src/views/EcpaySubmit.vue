<template>
  <div>
    <div v-if="!formHtml">正在導向綠界付款頁...</div>
    <div v-html="formHtml" />
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';
import { useRoute } from 'vue-router';
import axios from '@/axios';

const route = useRoute();
const formHtml = ref(null);

onMounted(async () => {
  const productId = route.query.productId;
  const amount = route.query.amount;

  try {
    const res = await axios.post('/payments/ecpay/subscribe/', {
      productId,
      amount,
    });
    formHtml.value = res.data.formHtml;

    await nextTick();
    const form = document.getElementById('data_set');
    if (form) form.submit();
  } catch (err) {
    alert('建立綠界付款頁失敗：' + (err.response?.data?.error || '未知錯誤'));
  }
});
</script>
