<template>
  <div class="max-w-md mx-auto mt-10">
    <div v-if="loading" class="flex justify-center items-center">
      <span class="loading loading-spinner loading-md"></span>
    </div>

    <div v-else-if="coupon" class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title">優惠券序號：{{ coupon.serialNumber }}</h2>

        <p>
          狀態：
          <span v-if="isUsed" class="badge badge-success">已使用</span>
          <span v-else class="badge badge-warning">未使用</span>
        </p>

        <div class="card-actions justify-end mt-4">
          <button
            class="btn btn-primary"
            :disabled="isUsed"
            @click="confirmUse"
          >
            確認使用
          </button>
        </div>
      </div>
    </div>
    <div v-else class="text-center text-red-500">資料載入失敗</div>
    <br />
    <button
      class="flex-1 border border-black text-black py-2 px-4 rounded hover:bg-gray-100"
      @click="goMerchantDashboard"
    >
      返回列表
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import axios from '@/axios';

const route = useRoute();
const couponUuid = route.params.uuid;
import { useAlertStore } from '@/stores/alert';

const coupon = ref(null);
const loading = ref(true);
const isUsed = ref(false);
const alert = useAlertStore();
const router = useRouter();

const fetchCoupon = async () => {
  loading.value = true;
  try {
    const res = await axios.get(`/user-coupons/${couponUuid}/`);
    coupon.value = res.data.coupon;
    isUsed.value = res.data.isUsed;
  } catch {
    alert.trigger('載入失敗', 'error');
  } finally {
    loading.value = false;
  }
};

const confirmUse = async () => {
  try {
    const res = await axios.patch(`/user-coupons/${couponUuid}/`, {
      isUsed: true,
    });
    coupon.value.isUsed = res.data.isUsed || '使用成功';
    await fetchCoupon();
  } catch {
    alert.trigger('更新失敗', 'error');
  }
};

const goMerchantDashboard = () => {
  router.push({ name: 'MerchantDashboard' });
};

onMounted(() => {
  fetchCoupon();
});
</script>
