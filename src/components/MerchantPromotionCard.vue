<template>
  <div class="relative">
    <!-- 刪除按鈕 -->
    <button
      class="absolute top-3 right-3 z-10 bg-white/80 backdrop-blur-sm rounded-full p-1 shadow"
      @click.stop="showConfirm = true"
    >
      <font-awesome-icon
        :icon="['fas', 'trash']"
        class="text-xl text-gray-500 hover:text-red-500"
      />
    </button>

    <!-- 卡片主體 -->
    <router-link :to="`/merchant/promotions/${promotion.uuid}`">
      <div
        class="card shadow-md p-4 flex flex-col sm:flex-row gap-4 bg-white text-black"
      >
        <div
          v-if="promotion.imageUrl"
          class="w-full sm:w-32 h-32 flex-shrink-0"
        >
          <img
            :src="promotion.imageUrl"
            alt="活動圖片"
            class="w-full h-full object-cover rounded"
          />
        </div>

        <div class="flex flex-col justify-between w-full">
          <h4
            class="text-lg font-semibold line-clamp-1"
            :title="promotion.title"
          >
            {{ promotion.title }}
          </h4>
          <p class="text-sm text-gray-600 line-clamp-2">
            {{ promotion.description || '（無描述）' }}
          </p>
          <p class="text-sm text-gray-600">
            {{ t('merchantPromotionCard.activePeriod') }}
            {{ formatDate(promotion.startedAt) }} ~
            {{ formatDate(promotion.endedAt) }}
          </p>
        </div>
      </div>
    </router-link>

    <!-- 刪除確認彈窗 -->
    <div
      v-if="showConfirm"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      @click.self="showConfirm = false"
    >
      <div class="bg-white text-black p-6 rounded-xl text-center w-[260px]">
        <div class="text-xl font-bold mb-4">
          {{ t('merchantPromotionCard.confirmDelete') }}
        </div>
        <font-awesome-icon
          :icon="['fas', 'trash']"
          class="text-6xl text-gray-500 mb-4"
        />
        <div class="flex justify-center gap-4">
          <button
            class="border border-black text-black px-4 py-1 rounded"
            @click="showConfirm = false"
          >
            {{ t('merchantPromotionCard.cancel') }}
          </button>
          <button
            class="bg-black text-white px-4 py-1 rounded"
            @click="confirmDelete"
          >
            {{ t('merchantPromotionCard.confirm') }}
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
  promotion: Object,
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
    await axios.patch(`/promotions/${props.promotion.uuid}/`, {
      isArchived: true,
    });
    emit('deleted');
  } catch {
    alert(t('merchantPromotionCard.deleteFailed'));
  } finally {
    showConfirm.value = false;
  }
};
</script>
