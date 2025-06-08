<template>
  <div class="relative">
    <!-- 刪除按鈕 -->
    <button
      class="absolute top-3 right-3 z-10 bg-white/80 backdrop-blur-sm rounded-full p-1"
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
        class="card rounded-xl relative shadow-[0_0_10px_rgba(0,0,0,0.25)] p-4 flex flex-col sm:flex-row gap-4"
      >
        <div v-if="promotion.imageUrl" class="w-full sm:w-32 h-32 flex-shrink-0">
          <img
            :src="promotion.imageUrl"
            alt="活動圖片"
            class="w-full h-full object-cover rounded"
          />
        </div>

        <div class="flex flex-col justify-between w-full">
          <h4
            class="text-lg font-semibold line-clamp-1 text-neutral"
            :title="promotion.title"
          >
            {{ promotion.title }}
          </h4>
          <p class="text-sm text-neutral line-clamp-2">
            {{ promotion.description || '（無描述）' }}
          </p>
          <p class="text-sm text-neutral">
            活動期間：
            {{ formatDate(promotion.startedAt) }} ~
            {{ formatDate(promotion.endedAt) }}
          </p>
        </div>
      </div>
    </router-link>

    <!-- 刪除確認彈窗 -->
    <div
      v-if="showConfirm"
      class="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
      @click.self="showConfirm = false"
    >
      <div class="bg-white text-neutral p-6 rounded-xl text-center w-[260px] md:w-[320px] ">
        <div class="text-xl font-bold mb-4">確認刪除？</div>
        <font-awesome-icon
          :icon="['fas', 'trash']"
          class="text-6xl text-neutral mb-4"
        />
        <div class="flex justify-center gap-2 md:gap-4">
          <button
            class="border border-neutral text-neutral px-4 py-2 rounded-xl text-sm md:text-lg"
            @click="showConfirm = false"
          >
            取消
          </button>
          <button
            class="bg-neutral text-white px-4 py-2 rounded-xl text-sm md:text-lg"
            @click="confirmDelete"
          >
            確認刪除
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from '@/axios';

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
    alert('刪除失敗，請稍後再試');
  } finally {
    showConfirm.value = false;
  }
};
</script>
