<template>
  <MerchantNavBar />
  <div class="max-w-3xl w-full mx-auto p-6">
    <h1 class="text-2xl font-bold mb-4">{{ coupon.title }}</h1>

    <p class="w-full mb-2">
      {{ t('couponDetail.validPeriod') }}
      {{ formatDate(coupon.startedAt) }} ~ {{ formatDate(coupon.endedAt) }}
    </p>

    <h2 class="text-lg font-semibold mb-2">
      {{ t('couponDetail.storeName') }}{{ coupon.restaurant?.name }}
    </h2>
    <p class="mb-2">
      {{ t('couponDetail.description') }}{{ coupon.description }}
    </p>
    <p class="mb-2">{{ t('couponDetail.discount') }}{{ coupon.discount }}</p>

    <div class="mb-4">
      <p>{{ t('couponDetail.total') }}{{ coupon.total }}</p>
      <p>{{ t('couponDetail.claimed') }}{{ coupon.totalClaimed }}</p>
      <p>{{ t('couponDetail.used') }}{{ coupon.totalUsed }}</p>
    </div>

    <div class="flex justify-between gap-4">
      <button
        class="flex-1 bg-black text-white py-2 px-4 rounded hover:bg-gray-800"
        @click="goToUsage"
      >
        {{ t('couponDetail.viewUsage') }}
      </button>
      <button
        class="flex-1 border border-black text-black py-2 px-4 rounded hover:bg-gray-100"
        @click="goMerchantDashboard"
      >
        {{ t('couponDetail.backToList') }}
      </button>
    </div>
  </div>
  <Footer />
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import axios from '@/axios';
import MerchantNavBar from '@/components/MerchantNavBar.vue';
import Footer from '@/components/Footer.vue';

const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const coupon = ref({});

const fetchCoupon = async () => {
  const res = await axios.get(`/coupons/${route.params.uuid}/`);
  coupon.value = res.data.result;
};

const goToUsage = () => {
  router.push(`/merchant/coupons/${route.params.uuid}/usage`);
};

const goMerchantDashboard = () => {
  router.push({ name: 'MerchantDashboard' });
};

const formatDate = (isoString) => {
  if (!isoString) return t('common.notProvided');
  const date = new Date(isoString);
  return date.toLocaleDateString('zh-TW');
};

onMounted(() => {
  fetchCoupon();
});
</script>
