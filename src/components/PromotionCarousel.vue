<template>
  <div
    v-if="promotions.length > 0"
    class="relative overflow-hidden max-w-screen-lg mx-auto"
  >
    <h3 class="text-base md:text-2xl font-bold px-4">
      {{ t('promotionCarousel.latestPromotions') }}
    </h3>
    <div
      class="flex transition-transform duration-500"
      :style="`transform: translateX(-${currentIndex * 100}%);`"
    >
      <div
        v-for="(promotion, index) in promotions"
        :key="index"
        class="w-full flex-shrink-0 p-4"
      >
        <div
          class="bg-white rounded-lg overflow-hidden shadow-[0_0_10px_rgba(0,0,0,0.15)]"
        >
          <img
            v-if="promotion.imageUrl"
            :src="promotion.imageUrl"
            class="w-full max-h-100 object-contain mx-auto"
            :alt="promotion.title"
          />
          <div class="p-4">
            <h3 class="text-base font-bold mb-1 md:text-xl">
              {{ promotion.title }}
            </h3>
            <p class="text-base text-gray-700 mb-1 md:text-lg">
              {{ promotion.description }}
            </p>
            <p class="text-base text-gray-500 md:text-lg">
              {{ t('promotionCarousel.eventPeriod') }}
              {{ formatDate(promotion.startedAt) }} ~
              {{ formatDate(promotion.endedAt) }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- 點點控制器 -->
    <div
      v-if="promotions.length > 1"
      class="flex justify-center mt-3 space-x-2"
    >
      <button
        v-for="(dot, index) in promotions.length"
        :key="index"
        class="w-3 h-3 rounded-full"
        :class="currentIndex === index ? 'bg-black' : 'bg-gray-300'"
        @click="goToSlide(index)"
      ></button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const props = defineProps({
  promotions: { type: Array, required: true },
});

const currentIndex = ref(0);
const isAnimating = ref(false);
let intervalId = null;

const nextSlide = () => {
  if (isAnimating.value || props.promotions.length === 0) return;
  isAnimating.value = true;
  currentIndex.value = (currentIndex.value + 1) % props.promotions.length;
  setTimeout(() => {
    isAnimating.value = false;
  }, 500);
};

const goToSlide = (index) => {
  if (isAnimating.value || index === currentIndex.value) return;
  isAnimating.value = true;
  currentIndex.value = index;
  setTimeout(() => {
    isAnimating.value = false;
  }, 500);
};

onMounted(() => {
  intervalId = setInterval(nextSlide, 10000);
});

onUnmounted(() => {
  clearInterval(intervalId);
});

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString();
}
</script>
