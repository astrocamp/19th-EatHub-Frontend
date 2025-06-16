<template>
  <div class="min-h-screen flex flex-col">
    <NavBar />
    <div class="flex-1 p-6 max-w-screen-lg mx-auto pt-30">
      <h1 class="text-2xl md:text-3xl text-neutral text-center font-bold mb-4">
        {{ t('myCoupons.title') }}
      </h1>

      <!-- 分頁按鈕 - 始終置中 -->
      <div class="flex justify-center mb-6">
        <div class="tabs gap-2">
          <button
            class="tab text-sm md:text-xl font-medium text-neutral focus:bg-neutral focus:text-white border border-neutral rounded-xl"
            :class="{ 'tab-active': activeTab === 'unused' }"
            @click="activeTab = 'unused'"
          >
            {{ t('myCoupons.unused') }}
          </button>
          <button
            class="tab text-sm md:text-xl font-medium text-neutral focus:bg-neutral focus:text-white border border-neutral rounded-xl"
            :class="{ 'tab-active': activeTab === 'used' }"
            @click="activeTab = 'used'"
          >
            {{ t('myCoupons.used') }}
          </button>
          <button
            class="tab text-sm md:text-xl font-medium text-neutral focus:bg-neutral focus:text-white border border-neutral rounded-xl"
            :class="{ 'tab-active': activeTab === 'expired' }"
            @click="activeTab = 'expired'"
          >
            {{ t('myCoupons.expired') }}
          </button>
        </div>
      </div>

      <!-- 空狀態 -->
      <div
        v-if="filteredCoupons.length === 0"
        class="text-center text-gray-400 mt-8 text-base md:text-xl"
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
    <base-footer />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from '@/axios';
import CouponCard from '@/components/CouponCard.vue';
import NavBar from '@/components/NavBar.vue';
import BaseFooter from '@/components/BaseFooter.vue';
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
