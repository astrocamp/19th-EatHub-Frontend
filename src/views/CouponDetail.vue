<template>
  <MerchantNavBar />
  <div class="max-w-3xl w-full mx-auto pt-28 pb-28 px-4">
    <h1 class="text-2xl md:text-3xl text-neutral font-bold mb-4">{{ coupon.title }}</h1>

    <p class="w-full mb-2 text-base md:text-xl text-neutral font-medium">
      有效期間：{{ formatDate(coupon.startedAt) }} ~
      {{ formatDate(coupon.endedAt) }}
    </p>

    <h2 class="text-base md:text-xl font-medium text-neutral mb-2">
      店家名稱：{{ coupon.restaurant?.name }}
    </h2>
    <p class="mb-2 text-base md:text-xl font-medium text-neutral">說明：{{ coupon.description }}</p>
    <p class="mb-2 text-base md:text-xl font-medium text-neutral">優惠內容：{{ coupon.discount }}</p>

    <div class="mb-4 text-base md:text-xl font-medium text-neutral">
      <p>總數：{{ coupon.total }}</p>
      <p>已領取：{{ coupon.totalClaimed }}</p>
      <p>已使用：{{ coupon.totalUsed }}</p>
    </div>

    <div class="flex justify-between gap-4">
     
      <button
        class="flex-1 border-1 border-primary text-primary py-2 px-4 rounded-xl hover:bg-gray-100"
        @click="goMerchantDashboard"
      >
        返回列表
      </button>
      <button
        class="flex-1 bg-primary text-white py-2 px-4 rounded-xl hover:bg-neutral text-base md:text-lg"
        @click="goToUsage"
      >
        查看使用狀態
      </button>
    </div>
  </div>
  <Footer />
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from '@/axios';
import MerchantNavBar from '@/components/MerchantNavBar.vue';
import Footer from '@/components/Footer.vue';

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
  if (!isoString) return '未提供';
  const date = new Date(isoString);
  return date.toLocaleDateString('zh-TW');
};

onMounted(() => {
  fetchCoupon();
});
</script>
