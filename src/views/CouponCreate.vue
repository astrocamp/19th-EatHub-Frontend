<template>
  <MerchantNavBar />
  <div class="p-6 max-w-xl mx-auto pt-28">
    <h1 class="text-2xl font-bold mb-6 md:text-3xl text-center text-neutral">{{ t('couponCreate.title') }}</h1>

    <form @submit.prevent="submit" class="space-y-4">
      <input
        v-model="form.serial_number"
        type="text"
        :placeholder="t('couponCreate.serialNumberPlaceholder')"
        class="input input-bordered w-full"
        required
      />
      <input
        v-model="form.title"
        type="text"
        :placeholder="t('couponCreate.titlePlaceholder')"
        class="input input-bordered w-full"
        required
      />

      <div class="flex gap-2">
        <select
          v-model="form.discount_type"
          class="select select-bordered w-1/2"
          required
        >
          <option :value="t('couponCreate.discountTypeAmount')">
            {{ t('couponCreate.discountTypeAmount') }}
          </option>
          <option :value="t('couponCreate.discountTypePercent')">
            {{ t('couponCreate.discountTypePercent') }}
          </option>
        </select>
        <input
          v-model.number="form.discount_value"
          type="number"
          :placeholder="t('couponCreate.discountValuePlaceholder')"
          class="input input-bordered w-1/2"
          required
        />
      </div>

      <div class="mb-4">
        <label class="block font-medium mb-1">{{
          t('couponCreate.startDateLabel')
        }}</label>
        <input
          v-model="form.started_at"
          type="datetime-local"
          class="input input-bordered w-full"
          required
        />
      </div>

      <div class="mb-4">
        <label class="block font-medium mb-1">{{
          t('couponCreate.endDateLabel')
        }}</label>
        <input
          v-model="form.ended_at"
          type="datetime-local"
          class="input input-bordered w-full"
          required
        />
      </div>

      <input
        v-model.number="form.total"
        type="number"
        :placeholder="t('couponCreate.totalPlaceholder')"
        class="input input-bordered w-full"
        required
      />

      <textarea
        v-model="form.description"
        :placeholder="t('couponCreate.descriptionPlaceholder')"
        class="textarea textarea-bordered w-full"
        rows="3"
      ></textarea>

      <div class="text-center">
        <button
          type="submit"
          class="btn w-full bg-primary text-base md:text-lg hover:bg-neutral text-white rounded-xl"
        >
          {{ t('couponCreate.submitButton') }}
        </button>
      </div>
    </form>
  </div>
  <Footer />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import axios from '@/axios';
import { useAuthStore } from '@/stores/auth';
import Footer from '@/components/Footer.vue';
import MerchantNavBar from '@/components/MerchantNavBar.vue';
import { useAlertStore } from '@/stores/alert';

const { t } = useI18n();
const router = useRouter();
const auth = useAuthStore();
const alert = useAlertStore();

const form = ref({
  serial_number: '',
  title: '',
  discount_type: t('couponCreate.discountTypeAmount'), // 預設為金額
  discount_value: null,
  total: null,
  started_at: '',
  ended_at: '',
  description: '',
});

onMounted(() => {
  if (!auth.user || !['merchant', 'vip_merchant'].includes(auth.user.role)) {
    alert.trigger(t('alert.merchantOnly'), 'warning');
    router.push('/merchant/login');
  }
});

const submit = async () => {
  try {
    await axios.post('/coupons/', form.value);
    alert.trigger(t('alert.createSuccess'), 'success');
    router.push({ name: 'MerchantDashboard' });
  } catch (error) {
    if (error.response?.status === 403) {
      alert.trigger(error.response.data.error || t('alert.createForbidden'), 'warning');
    } else if (error.response?.data ) {
      const messages = Object.values(error.response.data).flat().join('\n');
      alert.trigger(messages, 'warning');
    } else {
      alert.trigger(t('alert.createFailed'), 'error');
    }
  }
};
</script>
