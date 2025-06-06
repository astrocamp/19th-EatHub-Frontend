<template>
  <Navbar />
  <div class="p-6 min-h-screen">
    <h1 class="text-2xl font-bold mb-4">我的優惠券</h1>

    <!-- 分頁按鈕 -->
    <div class="tabs mb-6">
      <button
        class="tab"
        :class="{ 'tab-active': activeTab === 'unused' }"
        @click="activeTab = 'unused'"
      >
        未使用
      </button>
      <button
        class="tab"
        :class="{ 'tab-active': activeTab === 'used' }"
        @click="activeTab = 'used'"
      >
        已使用
      </button>
      <button
        class="tab"
        :class="{ 'tab-active': activeTab === 'expired' }"
        @click="activeTab = 'expired'"
      >
        已過期
      </button>
    </div>

    <!-- 空狀態 -->
    <div
      v-if="filteredCoupons.length === 0"
      class="text-center text-gray-400 mt-8"
    >
      此分類下尚無優惠券
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
