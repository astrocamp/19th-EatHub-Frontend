<template>
  <div class="min-h-screen bg-gray-50 pt-28">
    <MerchantNavBar />

    <div class="container mx-auto px-4 py-8 max-w-2xl">
      <!-- 動態名稱標題 -->
      <div class="bg-white rounded-lg shadow-sm mb-6">
        <div class="bg-neutral text-white px-6 py-4 rounded-t-lg">
          <h1 class="text-xl font-bold text-center md:text-2xl">
            {{ t('promotionDetail.title') }}
          </h1>
        </div>

        <!-- 活動圖片區域 -->
        <div class="p-6">
          <div
            class="w-full h-48 bg-gray-300 rounded-lg mb-6 flex items-center justify-center"
          >
            <img
              v-if="promotion?.imageUrl"
              :src="promotion.imageUrl || promotion.image"
              :alt="promotion.title || t('promotionDetail.imageAlt')"
              class="w-full h-full object-cover rounded-lg"
            />
            <span v-else class="text-gray-500 text-sm">
              {{ t('promotionDetail.imageLoading') }}
            </span>
          </div>

          <!-- 動態詳細內容 -->
          <div class="space-y-4">
            <h2 class="text-lg font-semibold text-neutral">
              {{ t('promotionDetail.sectionTitle') }}
            </h2>
            <div class="text-neutral leading-relaxed">
              <p>{{ promotion?.description }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 返回按鈕 -->
      <div class="flex justify-center">
        <button
          @click="goBack"
          class="btn btn-primary btn-wide bg-primary hover:bg-neutral text-base md:text-lg text-white rounded-xl px-8 py-3"
        >
          {{ t('promotionDetail.backButton') }}
        </button>
      </div>
    </div>

    <base-footer />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import axios from '@/axios';
import MerchantNavBar from '@/components/MerchantNavBar.vue';
import BaseFooter from '@/components/BaseFooter.vue';

const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const uuid = route.params.uuid;

const promotion = ref(null);

onMounted(async () => {
  try {
    const res = await axios.get(`/promotions/${uuid}/`);
    promotion.value = res.data.result;
  } catch (err) {
    console.error(t('promotionDetail.loadError'), err);
  }
});

const goBack = () => {
  router.push({ name: 'MerchantDashboard' });
};
</script>
