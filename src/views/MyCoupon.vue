<template>
  <Navbar />
  <div class="p-6 min-h-screen">
    <h1 class="text-2xl font-bold mb-4">{{ t('myCoupons.title') }}</h1>

    <!-- 分頁按鈕 -->
    <div class="tabs mb-6">
      <button
        class="tab"
        :class="{ 'tab-active': activeTab === 'unused' }"
        @click="activeTab = 'unused'"
      >
        {{ t('myCoupons.unused') }}
      </button>
      <button
        class="tab"
        :class="{ 'tab-active': activeTab === 'used' }"
        @click="activeTab = 'used'"
      >
        {{ t('myCoupons.used') }}
      </button>
      <button
        class="tab"
        :class="{ 'tab-active': activeTab === 'expired' }"
        @click="activeTab = 'expired'"
      >
        {{ t('myCoupons.expired') }}
      </button>
    </div>

    <!-- 空狀態 -->
    <div
      v-if="filteredCoupons.length === 0"
      class="text-center text-gray-400 mt-8"
    >
      {{ t('myCoupons.empty') }}
    </div>

    <!-- 優惠券清單 -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <CouponCard
        v-for="coupon in filteredCoupons"
        :key="coupon.uuid"
        :coupon="coupon"
      />
    </div>
  </div>
  <Footer />
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from '@/axios';
import CouponCard from '@/components/CouponCard.vue';
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const coupons = ref([]);
const activeTab = ref('unused');

onMounted(async () => {
  try {
    const res = await axios.get('/user-coupons/');
    coupons.value = res.data;
  } catch (err) {}
});

const now = new Date();

const filteredCoupons = computed(() => {
  return coupons.value.filter((c) => {
    const isExpired = new Date(c.coupon.endedAt) < now;
    if (activeTab.value === 'unused') {
      return !c.isUsed && !isExpired;
    }
    if (activeTab.value === 'used') {
      return c.isUsed;
    }
    if (activeTab.value === 'expired') {
      return !c.isUsed && isExpired;
    }
    return true;
  });
});
</script>
