<template>
 <div class="min-h-screen flex flex-col max-w-5xl mx-auto">
  <MerchantNavBar />
  
  <div class="flex-1   px-4 pt-28">
    <!-- 返回按鈕 -->
    <button class="btn btn-sm btn-outline mb-4 rounded-xl text-base md:text-xl py-5 text-neutral" @click="goBack">←  {{ t('couponUsage.back') }}</button>

    <!-- Coupon券名稱 -->
    <h1 class="text-2xl font-bold mb-4 text-neutral md:text-3xl">{{ couponTitle }}</h1>

    <!-- 篩選 -->
    <div class="mb-4">
      <input
        v-model="searchKeyword"
        type="text"
        :placeholder="t('couponUsage.searchEmailPlaceholder')"
        class="input input-bordered w-full"
      />
    </div>

    <!-- 表格 -->
    <div class="overflow-x-auto border border-gray-300 rounded-lg mb-8">
      <table class="table table-bordered w-full border border-gray-300">
        <thead class="bg-gray-100 border-b border-gray-300">
          <tr>
            <th class="text-left border-r border-gray-300">
              {{ t('couponUsage.table.uuid') }}
            </th>
            <th class="text-left border-r border-gray-300">
              {{ t('couponUsage.table.userEmail') }}
            </th>
            <th class="text-center">{{ t('couponUsage.table.status') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="usage in filteredUsages"
            :key="usage.uuid"
            class="border-b border-gray-300"
          >
            <td class="text-left border-r border-gray-300">
              {{ usage.uuid.slice(0, 8) }}
            </td>
            <td class="text-left border-r border-gray-300">{{ usage.user }}</td>
            <td class="text-center">
              <span
                class="badge"
                :class="usage.isUsed ? 'badge-success' : 'badge-outline'"
              >
                {{
                  usage.isUsed ? t('couponUsage.used') : t('couponUsage.unused')
                }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
  <component :is="Footer" />

</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import MerchantNavBar from '@/components/MerchantNavBar.vue';
import Footer from '@/components/Footer.vue';
import axios from '@/axios';

const { t } = useI18n();

const route = useRoute();
const router = useRouter();
const uuid = route.params.uuid;

const couponTitle = ref('');
const usages = ref([]);
const searchKeyword = ref('');

const goBack = () => {
  router.push({ name: 'CouponDetail', params: { uuid } });
};

onMounted(async () => {
  try {
    const res = await axios.get(`/coupons/${uuid}/usage/`);
    couponTitle.value = res.data.title;
    usages.value = res.data.usages;
  } catch (err) {
    const status = err.response?.status;

    if (status === 403) {
      alert(t('alert.noPermission'));
      router.push({ name: 'MerchantDashboard' });
    } else {
      router.replace({ name: 'NotFound' });
    }
  }
});

const filteredUsages = computed(() => {
  if (!searchKeyword.value) return usages.value;
  return usages.value.filter((usage) =>
    usage.user.toLowerCase().includes(searchKeyword.value.toLowerCase()),
  );
});
</script>
