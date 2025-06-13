<template>
  <MerchantNavBar />
  <div class="p-6 max-w-md mx-auto pt-28">
    <h2
      class="font-bold border-brown-800 pl-2 mb-6 text-2xl md:text-3xl text-center text-neutral"
    >
      {{ t('promotionCreate.pageTitle') }}
    </h2>

    <form
      v-if="isMerchant"
      @submit.prevent="submitPromotion"
      enctype="multipart/form-data"
      class="space-y-5"
    >
      <input
        v-model="form.title"
        type="text"
        :placeholder="t('promotionCreate.titlePlaceholder')"
        required
        class="w-full border border-gray-400 rounded px-4 py-2"
      />

      <textarea
        v-model="form.description"
        :placeholder="t('promotionCreate.descriptionPlaceholder')"
        rows="5"
        required
        class="w-full border border-gray-400 rounded px-4 py-2"
      ></textarea>

      <div class="flex gap-4">
        <div class="w-1/2">
          <label
            class="font-medium block text-neutral text-base md:text-xl mb-1"
            >{{ t('promotionCreate.startDateLabel') }}</label
          >
          <input
            v-model="form.started_at"
            type="date"
            :min="today"
            required
            class="w-full border border-gray-400 rounded px-4 py-2"
          />
        </div>
        <div class="w-1/2">
          <label
            class="font-medium block text-neutral text-base md:text-xl mb-1"
            >{{ t('promotionCreate.endDateLabel') }}</label
          >
          <input
            v-model="form.ended_at"
            type="date"
            :min="form.started_at"
            required
            class="w-full border border-gray-400 rounded px-4 py-2"
          />
        </div>
      </div>

      <div class="border border-gray-400 rounded p-4 text-center">
        <label class="block mb-2 text-gray-600 text-sm">{{
          t('promotionCreate.imageUploadHint')
        }}</label>
        <label
          class="inline-block bg-gray-200 text-gray-700 px-4 py-2 cursor-pointer hover:bg-gray-300 transition rounded-xl"
        >
          {{ t('promotionCreate.chooseImageButton') || '選擇圖片' }}
          <input
            type="file"
            @change="handleImage"
            accept="image/*"
            class="hidden"
          />
        </label>
        <div class="mt-4 w-full h-48 overflow-hidden rounded shadow">
          <img
            v-if="previewUrl"
            :src="previewUrl"
            class="mt-4 w-full object-cover"
          />
        </div>
      </div>
      <button
        type="submit"
        class="w-full bg-primary text-white py-2 rounded-xl font-bold text-base md:text-lg hover:bg-neutral"
      >
        {{ t('promotionCreate.submitButton') }}
      </button>
    </form>

    <div v-else class="text-center text-red-500 mt-10 font-semibold">
      {{ t('promotionCreate.notMerchantWarning') }}
    </div>
  </div>
  <base-footer />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';
import MerchantNavBar from '@/components/MerchantNavBar.vue';
import BaseFooter from '@/components/BaseFooter.vue';
import axios from '@/axios';
import { useI18n } from 'vue-i18n';
import { useAlertStore } from '@/stores/alert';

const { t } = useI18n();
const auth = useAuthStore();
const router = useRouter();

const form = ref({
  title: '',
  description: '',
  started_at: '',
  ended_at: '',
  image: null,
});

const previewUrl = ref(null);
const isMerchant = ref(false);
const today = new Date().toISOString().slice(0, 10);
const alert = useAlertStore();

onMounted(() => {
  form.value.started_at = today;
  if (!auth.user || !['merchant', 'vip_merchant'].includes(auth.user.role)) {
    alert.trigger(t('promotionCreate.authWarning'), 'warning');
    router.push('/');
  } else {
    isMerchant.value = true;
  }
});

function handleImage(event) {
  const file = event.target.files[0];
  if (file) {
    form.value.image = file;
    previewUrl.value = URL.createObjectURL(file);
  }
}

async function submitPromotion() {
  const formData = new FormData();
  formData.append('title', form.value.title);
  formData.append('description', form.value.description);
  formData.append('started_at', form.value.started_at);
  formData.append('ended_at', form.value.ended_at);
  if (form.value.image) {
    formData.append('image', form.value.image);
  }

  try {
    await axios.post(`/promotions/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    alert.trigger(t('promotionCreate.createSuccess'), 'success');
    form.value.title = '';
    form.value.description = '';
    form.value.image = null;
    previewUrl.value = null;
    router.push({ name: 'MerchantDashboard' });
  } catch (error) {
    if (error.response?.data) {
      const errors = error.response.data;
      if (typeof errors.error === 'string') {
        alert.trigger(
          t('promotionCreate.createFailedPrefix') + errors.error,
          'error',
        );
        return;
      }
      let message = '';
      for (const key in errors) {
        const value = Array.isArray(errors[key]) ? errors[key][0] : errors[key];
        message += `${key}：${value}\n`;
      }
      alert.trigger(
        t('promotionCreate.createFailedPrefix') + '\n' + message,
        'error',
      );
    } else {
      alert.trigger(t('promotionCreate.genericError'), 'error');
    }
  }
}
</script>

<style scoped>
.border-brown-800 {
  border-color: #4b2e2e;
}
</style>
