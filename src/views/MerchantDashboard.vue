<template>
  <MerchantNavBar />

  <div class="px-4 py-6 max-w-6xl mx-auto">
    <h1 class="text-2xl font-bold mb-4">
      {{ restaurantName }}
      <span v-if="role === 'vip_merchant'" class="badge badge-primary">
        <font-awesome-icon :icon="['fa-solid', 'fa-crown']" /> VIP
      </span>
      <span
        v-else-if="role === 'merchant'"
        class="px-2 py-0.5 text-xs font-semibold text-gray-600 bg-gray-200 rounded-full"
      >
        {{ t('merchantDashboard.regularBadge') }}
      </span>
    </h1>

    <!-- VIP 顯示區塊 -->
    <div v-if="role === 'vip_merchant'" class="mb-4 text-sm text-green-700">
      <span
        v-html="
          t('merchantDashboard.vipHint', { vipExpiry: formatDate(vipExpiry) })
        "
      />

      <!-- 倒數提示區塊 -->
      <div
        v-if="isExpiringSoon"
        class="mt-2 bg-yellow-100 text-yellow-800 px-3 py-2 rounded-md text-sm flex items-center justify-between"
      >
        <div>
          {{ t('merchantDashboard.vipExpireSoon', { days: daysLeft }) }}
        </div>
        <button
          @click="openUpgradeModal(t('merchantDashboard.upgradeNow'))"
          class="ml-4 text-sm font-semibold text-white bg-primary hover:bg-orange-300 px-3 py-1 rounded"
        >
          <font-awesome-icon :icon="['fa-solid', 'fa-crown']" />
          {{ t('merchantDashboard.upgradeNow') }}
        </button>
      </div>
    </div>

    <p v-if="role === 'merchant'" class="text-sm text-gray-600 mb-4">
      <span v-html="t('merchantDashboard.regularHint')" />
      <button
        @click="openUpgradeModal()"
        class="inline-flex items-center gap-1 text-xs font-semibold text-white bg-orange-500 px-3 py-1 rounded-full hover:bg-orange-600 transition ml-2"
      >
        <font-awesome-icon :icon="['fa-solid', 'fa-crown']" />
        {{ t('merchantDashboard.upgradeButton') }}
      </button>
    </p>

    <!-- Tab 與新增按鈕 -->
    <div class="flex justify-between items-center mb-6">
      <!-- 左側：Tab 切換按鈕 -->
      <div class="flex gap-4">
        <button
          class="btn w-[110px]"
          :class="activeTab === 'coupon' ? 'btn-primary' : 'btn-outline'"
          @click="setTab('coupon')"
        >
          {{ t('merchantDashboard.tab.coupon') }}
        </button>
        <button
          class="btn w-[110px]"
          :class="activeTab === 'promotion' ? 'btn-primary' : 'btn-outline'"
          @click="setTab('promotion')"
        >
          {{ t('merchantDashboard.tab.promotion') }}
        </button>
      </div>

      <!-- 右側：新增按鈕 -->
      <button class="btn btn-accent" @click="handleCreateClick">
        {{
          activeTab === 'coupon'
            ? t('merchantDashboard.create.coupon')
            : t('merchantDashboard.create.promotion')
        }}
      </button>
    </div>

    <!-- 清單元件切換 -->
    <component
      :is="activeTab === 'coupon' ? MerchantCouponList : MerchantPromotionList"
      v-bind="activeTab === 'coupon' ? { coupons } : { promotions }"
      @refresh="fetchDashboard"
    />
  </div>

  <UpgradeModal
    v-if="showUpgradeModal"
    :message="upgradeMessage"
    @close="showUpgradeModal = false"
  />

  <component :is="Footer" />
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from '@/axios';
import MerchantNavBar from '@/components/MerchantNavBar.vue';
import Footer from '@/components/Footer.vue';
import MerchantCouponList from '@/components/MerchantCouponList.vue';
import MerchantPromotionList from '@/components/MerchantPromotionList.vue';
import UpgradeModal from '@/components/MerchantUpgradeModal.vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const route = useRoute();
const router = useRouter();

const activeTab = ref(route.query.tab === 'promotion' ? 'promotion' : 'coupon');
const setTab = (tab) => {
  activeTab.value = tab;
  router.replace({ query: { ...route.query, tab } });
};

const restaurantName = ref('');
const coupons = ref([]);
const promotions = ref([]);
const role = ref('');
const merchantStatus = ref({});
const vipExpiry = ref(null);

const fetchDashboard = async () => {
  try {
    const res = await axios.get('/merchants/me/');
    const result = res.data.result;
    restaurantName.value = result.restaurant.name;
    coupons.value = result.coupons;
    promotions.value = result.promotions;
    role.value = result.merchantStatus.role;
    merchantStatus.value = result.merchantStatus;
    vipExpiry.value = result.merchantStatus.vipExpiry;
  } catch (err) {
    console.error('取得商家資料失敗:', err);
  }
};

const handleCreateClick = () => {
  const isCouponTab = activeTab.value === 'coupon';
  const isLimitReached = isCouponTab
    ? merchantStatus.value.isCouponLimitReached
    : merchantStatus.value.isPromotionLimitReached;

  if (isLimitReached) {
    const message =
      merchantStatus.value.role === 'vip_merchant'
        ? isCouponTab
          ? t('merchantDashboard.limitReached.vip.coupon')
          : t('merchantDashboard.limitReached.vip.promotion')
        : isCouponTab
          ? t('merchantDashboard.limitReached.regular.coupon')
          : t('merchantDashboard.limitReached.regular.promotion');
    openUpgradeModal(message);
    return;
  }

  // 否則正常跳轉
  const routePath = isCouponTab
    ? '/merchant/coupons/create'
    : '/merchant/promotions/create';
  router.push(routePath);
};

const showUpgradeModal = ref(false);
const upgradeMessage = ref(null);
const openUpgradeModal = (message = null) => {
  upgradeMessage.value = message;
  showUpgradeModal.value = true;
};

const today = new Date();

const daysLeft = computed(() => {
  if (!vipExpiry.value) return null;
  const diffTime = new Date(vipExpiry.value) - today;
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
});

const isExpiringSoon = computed(() => {
  return daysLeft.value !== null && daysLeft.value <= 7 && daysLeft.value >= 0;
});

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('zh-TW', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
}

onMounted(fetchDashboard);
</script>
