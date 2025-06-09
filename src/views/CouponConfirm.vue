<template>
  <div class="max-w-md mx-auto mt-10">
    <div v-if="loading" class="flex justify-center items-center">
      <span class="loading loading-spinner loading-md"></span>
    </div>

    <div v-else-if="coupon" class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title">
          {{ t('couponConfirm.title') }}{{ coupon.serialNumber }}
        </h2>

        <p>
          {{ t('couponConfirm.status') }}
          <span v-if="isUsed" class="badge badge-success">
            {{ t('couponConfirm.used') }}
          </span>
          <span v-else class="badge badge-warning">
            {{ t('couponConfirm.unused') }}
          </span>
        </p>

        <div class="card-actions justify-end mt-4">
          <button
            class="btn btn-primary"
            :disabled="isUsed"
            @click="confirmUse"
          >
            {{ t('couponConfirm.confirmUse') }}
          </button>
        </div>
      </div>
    </div>

    <div v-else class="text-center text-red-500">
      {{ t('couponConfirm.loadFailed') }}
    </div>

    <br />
    <button
      class="flex-1 border border-black text-black py-2 px-4 rounded hover:bg-gray-100"
      @click="goMerchantDashboard"
    >
      {{ t('couponConfirm.backToList') }}
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import axios from '@/axios';
import { useAlertStore } from '@/stores/alert';

const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const couponUuid = route.params.uuid;

const coupon = ref(null);
const loading = ref(true);
const isUsed = ref(false);
const alert = useAlertStore();

const fetchCoupon = async () => {
  loading.value = true;
  try {
    const res = await axios.get(`/user-coupons/${couponUuid}/`);
    coupon.value = res.data.coupon;
    isUsed.value = res.data.isUsed;
  } catch {
    alert.trigger(t('couponConfirm.loadFailed'), 'error');
  } finally {
    loading.value = false;
  }
};

const confirmUse = async () => {
  try {
    const res = await axios.patch(`/user-coupons/${couponUuid}/`, {
      isUsed: true,
    });
    coupon.value.isUsed = res.data.isUsed || true;
    await fetchCoupon();
  } catch {
    alert.trigger(t('couponConfirm.confirmUse') + '失敗', 'error');
  }
};

const goMerchantDashboard = () => {
  router.push({ name: 'MerchantDashboard' });
};

onMounted(() => {
  fetchCoupon();
});
</script>
