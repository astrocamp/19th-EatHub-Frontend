<template>
  <div
    class="fixed inset-0 bg-[rgba(0,0,0,0.9)] z-50 flex justify-center items-center"
  >
    <div class="bg-white p-6 rounded-lg shadow-md max-w-md w-full mx-4">
      <!-- 升級訊息 -->
      <div
        v-if="message"
        class="mb-4 text-base md:text-lg text-orange-600 bg-orange-100 p-2 rounded"
      >
        ⚠️ {{ message }}
      </div>

      <!-- 升級固定說明 -->
      <div class="mb-4 text-base md:text-lg text-gray-700 flex items-center gap-2">
        <font-awesome-icon
          :icon="['fa-solid', 'fa-crown']"
          class="text-yellow-500"
        />
        <span>
          <div>{{ t('merchantUpgradeModal.vipBenefitsLine1') }}</div>
          <div>{{ t('merchantUpgradeModal.vipBenefitsLine2') }}</div>
        </span>
      </div>
      <div v-if="showPaymentOptions">
        <!-- 付款方案 Tab -->
        <div class="flex gap-4 mb-4">
          <button
            v-for="plan in plans"
            :key="plan.planType"
            class="btn"
            :class="activePlan === plan.planType ? 'btn-primary' : 'btn-outline'"
            @click="activePlan = plan.planType"
          >
            {{
              plan.planType === 'monthly'
                ? t('merchantUpgradeModal.monthlyPlan')
                : t('merchantUpgradeModal.yearlyPlan')
            }}
          </button>
        </div>

        <!-- 顯示價格 -->
        <div class="mb-2 text-sm md:text-base">
          {{ t('merchantUpgradeModal.price') }}
          <template v-if="currentPlan">NT${{ currentPlan.amount }}</template>
          <template v-else>
            <span class="text-gray-500">
              {{ t('merchantUpgradeModal.noPlans') }}
            </span>
          </template>
        </div>

        <!-- 選擇付款方式 -->
        <div v-if="currentPlan" class="flex gap-3 mb-2">
          <button
            class="btn"
            :class="selectedGateway === 'linepay' ? 'btn-success' : 'btn-outline'"
            @click="selectedGateway = 'linepay'"
          >
            {{ t('merchantUpgradeModal.linePay') }}
          </button>
          <button
            class="btn"
            :class="selectedGateway === 'ecpay' ? 'btn-success' : 'btn-outline'"
            @click="selectedGateway = 'ecpay'"
          >
            {{ t('merchantUpgradeModal.ecpay') }}
          </button>
        </div>

        <!-- 前往付款 -->
        <div v-if="currentPlan" class="mb-6">
          <button
            class="btn btn-primary w-full"
            :disabled="!selectedGateway || isPaying"
            @click="pay"
          >
            {{ t('merchantUpgradeModal.goToPayment') }}
          </button>
        </div>
      </div>
      <!-- 關閉 -->
      <div class="mt-6 text-right">
        <button class="btn btn-base" @click="$emit('close')">
          {{ t('merchantUpgradeModal.close') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from '@/axios';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
// 傳入 props
const props = defineProps({ 
  message: String,
  role: String
});

// 如果不是商家角色，則不顯示付款選項
const showPaymentOptions = computed(() => props.role === 'merchant');

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
    alert(
      err.response?.data?.error || t('merchantUpgradeModal.createOrderError'),
    );
  } finally {
    isPaying.value = false;
  }
};

onMounted(async () => {
  const res = await axios.get('/payments/products/');
  plans.value = res.data;
});
</script>
