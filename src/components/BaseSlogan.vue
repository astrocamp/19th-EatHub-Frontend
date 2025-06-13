<template>
  <div class="px-6 pt-10 md:pt-20">
    <div
      class="w-full max-w-[1024px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-col items-center justify-between gap-1"
    >
      <!-- 左邊：大標 -->
      <div
        class="text-3xl md:text-5xl font-bold text-center leading-relaxed text-white max-w-[600px] mx-auto md:mx-0"
      >
        <p>{{ t('slogan.titleLine1') }}</p>
        <p>{{ t('slogan.titleLine2') }}</p>
      </div>

      <!-- 右邊：內文說明 -->
      <div
        class="text-base md:text-xl text-center leading-relaxed text-white max-w-[600px] mx-auto px-4"
      >
        <p>
          {{ t('slogan.description') }}
        </p>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>
