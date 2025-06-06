<template>
  <div
    class="fixed inset-0 bg-[rgba(0,0,0,0.9)] z-50 flex justify-center items-center"
  >
    <div class="bg-white p-6 rounded-lg shadow-md max-w-md w-full">
      <!-- 升級訊息 -->
      <div
        v-if="message"
        class="mb-4 text-sm text-orange-600 bg-orange-100 p-2 rounded"
      >
        ⚠️ {{ message }}
      </div>

      <!-- 升級固定說明 -->
      <div class="mb-4 text-sm text-gray-700 flex items-center gap-2">
        <font-awesome-icon
          :icon="['fa-solid', 'fa-crown']"
          class="text-yellow-500"
        />
        <span>
          <div>升級為 VIP 店家可發佈更多優惠券與動態，享更多專屬權益</div>
          <div>VIP 店家優惠券與動態可各發佈至多 3 則</div>
        </span>
      </div>

      <!-- Tab 切換 -->
      <div class="flex gap-4 mb-4">
        <button
          v-for="plan in plans"
          :key="plan.planType"
          class="btn"
          :class="activePlan === plan.planType ? 'btn-primary' : 'btn-outline'"
          @click="activePlan = plan.planType"
        >
          {{ plan.planType === 'monthly' ? '按月付款' : '按年付款' }}
        </button>
      </div>

      <!-- 價格顯示 -->
      <div class="mb-2 text-sm">
        價格：
        <template v-if="currentPlan"> NT${{ currentPlan.amount }} </template>
        <template v-else>
          <span class="text-gray-500">目前尚未開放購買方案，請稍後再試。</span>
        </template>
      </div>

      <!-- 選擇付款方式 -->
      <div v-if="currentPlan" class="flex gap-3 mb-2">
        <button
          class="btn"
          :class="selectedGateway === 'linepay' ? 'btn-success' : 'btn-outline'"
          @click="selectedGateway = 'linepay'"
        >
          LINEPAY
        </button>
        <button
          class="btn"
          :class="selectedGateway === 'ecpay' ? 'btn-success' : 'btn-outline'"
          @click="selectedGateway = 'ecpay'"
        >
          綠界支付
        </button>
      </div>

      <!-- 前往付款 -->
      <div v-if="currentPlan" class="mb-6">
        <button
          class="btn btn-primary w-full"
          :disabled="!selectedGateway || isPaying"
          @click="pay"
        >
          前往付款
        </button>
      </div>

      <!-- 關閉按鈕 -->
      <div class="mt-6 text-right">
        <button class="btn btn-sm" @click="$emit('close')">關閉</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from '@/axios';

// 傳入 props
defineProps({ message: String });

// 狀態管理
const activePlan = ref('monthly');
const plans = ref([]);

// 動態計算目前方案
const currentPlan = computed(() =>
  plans.value.find((p) => p.planType === activePlan.value),
);

const selectedGateway = ref(null); // 使用者選擇的付款方式（linepay / ecpay）
const isPaying = ref(false); // 防止重複送出

const pay = async () => {
  if (!currentPlan.value || !selectedGateway.value) return;

  try {
    isPaying.value = true;

    if (selectedGateway.value === 'linepay') {
      const res = await axios.post('/payments/linepay/subscribe/', {
        product_id: currentPlan.value.uuid,
        amount: currentPlan.value.amount,
      });
      const paymentUrl = res.data.paymentUrlWeb;
      window.location.href = paymentUrl;
    } else if (selectedGateway.value === 'ecpay') {
      const params = new URLSearchParams({
        productId: currentPlan.value.uuid,
        amount: currentPlan.value.amount,
      });
      window.location.href = `/payments/ecpay-submit?${params.toString()}`;
    }
  } catch (err) {
    alert(err.response?.data?.error || '建立訂單時發生錯誤，請稍後再試');
  } finally {
    isPaying.value = false;
  }
};

onMounted(async () => {
  const res = await axios.get('/payments/products/');
  plans.value = res.data;
});
</script>
