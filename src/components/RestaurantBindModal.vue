<template>
  <div
    class="fixed inset-0 bg-[rgba(0,0,0,0.9)] z-50 flex justify-center items-center"
  >
    <div class="bg-white p-6 rounded-lg shadow-md max-w-md w-full mx-4">
      <!-- 提示標題 -->
      <div class="mb-4 text-lg md:text-xl font-semibold text-primary">
        {{ t('restaurantBindModal.title') }}
      </div>

      <!-- 提示內容 -->
      <div class="mb-4 text-base md:text-lg text-gray-700 leading-relaxed">
        <p>{{ t('restaurantBindModal.intro') }}</p>
        <ul class="list-disc ml-5 my-3">
          <li>{{ t('restaurantBindModal.item.business') }}</li>
          <li>{{ t('restaurantBindModal.item.name') }}</li>
          <li>{{ t('restaurantBindModal.item.address') }}</li>
          <li>{{ t('restaurantBindModal.item.phone') }}</li>
          <li>{{ t('restaurantBindModal.item.email') }}</li>
        </ul>
        <p v-html="t('restaurantBindModal.contact',{ email: 'eathubtw@gmail.com' })"></p>
        <p>{{ t('restaurantBindModal.bindProcessingTime') }}</p>
      </div>

      <!-- 關閉 -->
      <div class="mt-6 text-right">
        <button class="btn btn-base rounded-xl" @click="$emit('close')">
          {{ t('restaurantBindModal.close') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
</script>