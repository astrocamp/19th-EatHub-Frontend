<template>
  <div class="relative">
    <!-- 刪除按鈕 -->
    <button
      class="absolute top-3 right-3 z-10 bg-white/80 backdrop-blur-sm rounded-full p-1"
      @click.stop="showConfirm = true"
    >
      <font-awesome-icon
        :icon="['fas', 'trash']"
        class="text-xl text-gray-500 hover:text-red-500"
      />
    </button>

    <!-- 卡片內容 -->
    <router-link :to="`/merchant/coupons/${coupon.uuid}`">
      <div
        class="border border-gray-300 rounded-xl p-6 bg-white text-neutral shadow-[0_0_10px_rgba(0,0,0,0.25)]"
      >
        <div class="text-lg font-bold">{{ coupon.title }}</div>
        <div class="text-sm mt-1 text-neutral">
          {{ t('merchantCouponCard.discount') }}：{{ coupon.discount }}
        </div>
        <div class="text-sm text-neutral">
          {{ t('merchantCouponCard.validUntil') }}：{{
            formatDate(coupon.endedAt)
          }}
        </div>

        <div class="text-sm text-neutral mt-2">
          {{ t('merchantCouponCard.total') }}：
          {{ coupon.total ?? t('merchantCouponCard.notSet') }}
          {{ t('merchantCouponCard.coupons') }}
        </div>
        <div class="text-sm text-neutral">
          {{ t('merchantCouponCard.claimed') }}：{{ coupon.redeemedCount }}
          {{ t('merchantCouponCard.coupons') }} ・
          {{ t('merchantCouponCard.used') }}：{{ coupon.usedCount }}
          {{ t('merchantCouponCard.coupons') }}
        </div>
      </div>
    </router-link>

    <!-- 刪除確認彈窗 -->
    <div
      v-if="showConfirm"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      @click.self="showConfirm = false"
    >
      <div class="bg-white text-neutral p-6 rounded-xl text-center w-[260px] md:w-[320px]">
        <div class="text-xl font-bold mb-4">
          {{ t('merchantCouponCard.confirmDelete') }}
        </div>
        <font-awesome-icon
          :icon="['fas', 'trash']"
          class="text-6xl text-neutral mb-4"
        />
        <div class="flex justify-center gap-2 md:gap-4">
          <button
            class="border border-neutral text-neutral px-4 py-2 rounded-xl text-sm md:text-lg"
            @click="showConfirm = false"
          >
            {{ t('merchantCouponCard.cancel') }}
          </button>
          <button
            class="bg-neutral text-white px-4 py-2 rounded-xl text-sm md:text-lg"
            @click="confirmDelete"
          >
            {{ t('merchantCouponCard.confirm') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import axios from '@/axios';

const { t } = useI18n();
const props = defineProps({
  coupon: Object,
});
const emit = defineEmits(['deleted']);

const showConfirm = ref(false);

const formatDate = (str) => {
  if (!str) return '';
  return new Date(str).toLocaleDateString('zh-TW', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

const confirmDelete = async () => {
  try {
    await axios.patch(`/coupons/${props.coupon.uuid}/`, {
      isArchived: true,
    });
    emit('deleted');
  } catch {
    alert(t('merchantCouponCard.deleteFailed'));
  } finally {
    showConfirm.value = false;
  }
};
</script>

<style scoped></style>
