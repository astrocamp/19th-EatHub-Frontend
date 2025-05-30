<template>
  <MerchantNavBar />

  <div class="px-4 py-6 max-w-6xl mx-auto">
    <h1 class="text-2xl font-bold mb-4">{{ restaurantName }}</h1>

    <!-- Tab 與新增按鈕 -->
    <div class="flex justify-between items-center mb-6">
      <!-- 左側：Tab 切換按鈕 -->
      <div class="flex gap-4">
        <button
          class="btn w-[110px]"
          :class="activeTab === 'coupon' ? 'btn-primary' : 'btn-outline'"
          @click="setTab('coupon')"
        >
          優惠券
        </button>
        <button
          class="btn w-[110px]"
          :class="activeTab === 'promotion' ? 'btn-primary' : 'btn-outline'"
          @click="setTab('promotion')"
        >
          商家活動
        </button>
      </div>

      <!-- 右側：新增按鈕 -->
      <button
        class="btn btn-accent"
        @click="
          router.push(
            activeTab === 'coupon'
              ? '/merchant/coupons/create'
              : '/merchant/promotions/create',
          )
        "
      >
        新增{{ activeTab === 'coupon' ? '優惠券' : '商家活動' }}
      </button>
    </div>

    <!-- 清單元件切換 -->
    <component
      :is="activeTab === 'coupon' ? MerchantCouponList : MerchantPromotionList"
      v-bind="activeTab === 'coupon' ? { coupons } : { promotions }"
      @refresh="fetchDashboard"
    />
  </div>

  <component :is="Footer" />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from '@/axios';
import MerchantNavBar from '@/components/MerchantNavBar.vue';
import Footer from '@/components/Footer.vue';
import MerchantCouponList from '@/components/MerchantCouponList.vue';
import MerchantPromotionList from '@/components/MerchantPromotionList.vue';

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

const fetchDashboard = async () => {
  try {
    const res = await axios.get('/merchants/me/');
    const result = res.data.result;
    restaurantName.value = result.restaurant.name;
    coupons.value = result.coupons;
    promotions.value = result.promotions;
  } catch (err) {
    console.error('取得商家資料失敗:', err);
  }
};

onMounted(fetchDashboard);
</script>
