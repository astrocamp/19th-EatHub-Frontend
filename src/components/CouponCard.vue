<template>
  <div class="relative">
    <!-- 卡片 -->
    <div
      class="flex border border-gray-300 rounded-xl p-6 bg-white text-black hover:shadow-lg gap-4"
      :class="{
        'cursor-pointer': !isUsed && !isExpired,
        'cursor-not-allowed opacity-70': isUsed || isExpired,
      }"
      :title="
        isUsed
          ? t('couponCard.tooltipUsed')
          : isExpired
            ? t('couponCard.tooltipExpired')
            : ''
      "
      @click="handleClick"
    >
      <!-- 圖片區／預設 icon -->
      <div
        class="w-24 h-24 bg-gray-100 flex items-center justify-center rounded-md overflow-hidden"
      >
        <img
          v-if="couponData.restaurant?.imageUrl"
          :src="couponData.restaurant.imageUrl"
          alt="店家圖片"
          class="w-full h-full object-cover"
        />
        <font-awesome-icon
          v-else
          :icon="['fas', 'receipt']"
          class="text-gray-400 text-3xl"
        />
      </div>

      <!-- 文字區 -->
      <div class="flex-1 flex flex-col justify-between">
        <div class="text-lg font-bold">
          {{ couponData.restaurant?.name || '（無餐廳名稱）' }}
        </div>
        <div class="text-sm mt-2">
          {{ t('couponCard.discountLabel')
          }}{{ couponData.discount || '（無折扣資料）' }}
        </div>
        <div class="text-sm">
          {{ t('couponCard.validUntil')
          }}{{ formatDate(couponData.endedAt) || '（未提供）' }}
        </div>
        <p>
          {{ t('couponCard.statusLabel') }}
          <span v-if="isExpired" class="badge bg-gray-400 text-white">{{
            t('couponCard.statusExpired')
          }}</span>
          <span v-else-if="isUsed" class="badge badge-success">{{
            t('couponCard.statusUsed')
          }}</span>
          <span v-else class="badge badge-warning">{{
            t('couponCard.statusUnused')
          }}</span>
        </p>
      </div>
    </div>

    <!-- QR Code 彈窗 -->
    <div
      v-if="showQr && !isUsed && !isExpired"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      @click.self="showQr = false"
    >
      <div
        class="bg-white text-black p-6 rounded-xl w-[280px] flex flex-col items-center text-center"
      >
        <div class="text-lg font-bold mb-4">{{ t('couponCard.qrTitle') }}</div>
        <img
          v-if="qrCodeDataUrl"
          :src="qrCodeDataUrl"
          alt="QR Code"
          class="w-48 h-48 border rounded-lg object-contain"
        />
        <p class="text-sm mt-3">
          {{ t('couponCard.qrValidUntil')
          }}{{ formatDate(couponData.endedAt) || '（未提供）' }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import QRCode from 'qrcode';
import { useAlertStore } from '@/stores/alert';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const alert = useAlertStore();
const qrCodeDataUrl = ref('');

const props = defineProps({
  coupon: Object,
});

const { coupon: couponData, uuid, isUsed } = props.coupon;

const now = new Date();
const isExpired = new Date(couponData.endedAt) < now;

const showQr = ref(false);

const formatDate = (str) => {
  if (!str) return '';
  return new Date(str).toLocaleDateString();
};

const handleClick = () => {
  if (!isUsed && !isExpired) {
    showQr.value = true;
  }
};

onMounted(async () => {
  try {
    qrCodeDataUrl.value = await QRCode.toDataURL(
      `${window.location.origin}/user/coupons/${uuid}/confirm`,
    );
  } catch {
    alert.trigger(t('couponCard.qrError'), 'error');
  }
});
</script>
