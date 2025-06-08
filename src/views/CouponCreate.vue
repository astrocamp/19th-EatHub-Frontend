<template>
  <MerchantNavBar />
  <div class="p-6 max-w-xl mx-auto pt-28">
    <h1 class="text-2xl font-bold mb-6 md:text-3xl text-center text-neutral">新增優惠券</h1>

    <form @submit.prevent="submit" class="space-y-4">
      <input
        v-model="form.serial_number"
        type="text"
        placeholder="優惠券序號"
        class="input input-bordered w-full"
        required
      />
      <input
        v-model="form.title"
        type="text"
        placeholder="優惠券標題"
        class="input input-bordered w-full"
        required
      />

      <div class="flex gap-2">
        <select
          v-model="form.discount_type"
          class="select select-bordered w-1/2"
          required
        >
          <option value="金額">金額</option>
          <option value="百分比">百分比</option>
        </select>
        <input
          v-model.number="form.discount_value"
          type="number"
          placeholder="折扣數值"
          class="input input-bordered w-1/2"
          required
        />
      </div>

      <div class="mb-4">
        <label class="block font-medium mb-1">開始日期</label>
        <input
          v-model="form.started_at"
          type="datetime-local"
          class="input input-bordered w-full"
          required
        />
      </div>

      <div class="mb-4">
        <label class="block font-medium mb-1">結束日期</label>
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
        placeholder="張數"
        class="input input-bordered w-full"
        required
      />

      <textarea
        v-model="form.description"
        placeholder="優惠券詳細內容"
        class="textarea textarea-bordered w-full"
        rows="3"
      ></textarea>

      <div class="text-center">
        <button
          type="submit"
          class="btn w-full bg-primary text-base md:text-lg hover:bg-neutral text-white rounded-xl"
        >
          確認送出
        </button>
      </div>
    </form>
  </div>
  <Footer />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from '@/axios';
import { useAuthStore } from '@/stores/auth';
import Footer from '@/components/Footer.vue';
import MerchantNavBar from '@/components/MerchantNavBar.vue';
import { useAlertStore } from '@/stores/alert';

const router = useRouter();
const auth = useAuthStore();
const alert = useAlertStore();

const form = ref({
  title: '',
  discount_type: '金額',
  discount_value: null,
  total: null,
  started_at: '',
  ended_at: '',
  description: '',
});

onMounted(() => {
  if (!auth.user || !['merchant', 'vip_merchant'].includes(auth.user.role)) {
    alert.trigger('僅限商家使用者新增優惠券', 'warning');
    router.push('/merchant/login');
  }
});

const submit = async () => {
  try {
    await axios.post('/coupons/', form.value);
    alert.trigger('新增成功', 'success');
    router.push({ name: `MerchantDashboard` });
  } catch (error) {
    if (error.response?.status === 403) {
      alert.trigger(error.response.data.error || '您無權新增更多優惠券', 'warning');
    } else if (error.response?.data) {
      const messages = Object.values(error.response.data).flat().join('\n');
      alert.trigger(messages, 'warning');
    } else {
      alert.trigger('新增失敗，請稍後再試', 'error');
    }
  }
};
</script>
