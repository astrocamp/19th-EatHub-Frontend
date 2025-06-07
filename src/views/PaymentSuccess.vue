<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 px-4">
    <div class="max-w-md w-full bg-white rounded-2xl shadow-xl p-6 text-center">
      <!-- 載入中 -->
      <div v-if="isLoading" class="animate-pulse text-gray-500">
        {{ t('paymentResult.loading') }}
      </div>

      <!-- 成功畫面 -->
      <div v-else-if="isSuccess && orderData">
        <h2 class="text-2xl font-bold text-green-600 mb-2">
          {{ t('paymentResult.successTitle') }}
        </h2>
        <p class="text-gray-700">{{ t('paymentResult.successMessage') }}</p>
        <div class="mt-4 text-sm text-gray-600">
          {{ t('paymentResult.orderId') }}
          <span class="font-mono">{{ orderData.orderId }}</span>
          <p class="text-gray-700 mt-1">
            {{ t('paymentResult.vipExpiry') }}
            <span class="font-mono">{{ orderData.vipExpiry }}</span>
          </p>
        </div>
        <button
          @click="goHome"
          class="mt-6 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow transition"
        >
          {{ t('paymentResult.backHome') }}
        </button>
      </div>

      <!-- 錯誤畫面 -->
      <div v-else class="text-red-600">
        <h2 class="text-xl font-bold mb-2">
          {{ t('paymentResult.errorTitle') }}
        </h2>
        <p>{{ errorMsg }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import axios from '@/axios';

const { t } = useI18n();
const route = useRoute();
const router = useRouter();

const isLoading = ref(true);
const isSuccess = ref(false);
const errorMsg = ref('');
const orderData = ref(null);

onMounted(async () => {
  const orderId = route.query.orderId;
  if (!orderId) {
    errorMsg.value = t('paymentResult.noOrderId');
    isLoading.value = false;
    return;
  }

  try {
    const res = await axios.get(`/payments/order/${orderId}/`);
    orderData.value = res.data.result;
    isSuccess.value = true;
  } catch (err) {
    errorMsg.value = t('paymentResult.fetchFailed');
  } finally {
    isLoading.value = false;
  }
});

const goHome = () => {
  router.push({ name: 'MerchantDashboard' });
};
</script>
