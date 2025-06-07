<template>
  <div
    v-if="show"
    class="fixed top-0 left-0 w-full h-full bg-black/60 flex justify-center items-center z-50 backdrop-blur-sm"
    @click.self="closeModal"
  >
    <div
      class="bg-white p-6 rounded-xl w-[90%] max-w-md max-h-[90vh] overflow-y-auto shadow-2xl mx-4"
    >
      <!-- 使用者頭像與名稱 -->
      <div class="flex items-center gap-3 mb-5 pb-4 border-b border-gray-200">
        <img
          :src="userAvatar"
          alt="頭像"
          class="w-12 h-12 rounded-full border-2 border-gray-300 object-cover"
        />
        <span class="font-semibold text-gray-800 text-sm md:text-lg">{{
          userName
        }}</span>
      </div>

      <!-- 星星評分 -->
      <div class="mb-5">
        <div class="font-medium text-gray-800 mb-2 text-sm md:text-lg">
          {{ t('addReview.ratingLabel') }}
        </div>
        <div class="flex gap-1 mb-2">
          <span
            v-for="star in 5"
            :key="star"
            @click="setRating(star)"
            @mouseover="hoverRating = star"
            @mouseleave="hoverRating = 0"
            :class="[
              'text-3xl cursor-pointer select-none transition-all duration-200 hover:scale-110',
              star <= rating
                ? 'text-yellow-400'
                : star <= hoverRating && hoverRating > 0
                  ? 'text-yellow-300'
                  : 'text-gray-300',
            ]"
          >
            ★
          </span>
        </div>
      </div>

      <!-- 評論區 -->
      <div class="mb-5">
        <label
          class="block font-medium text-gray-800 mb-2 text-sm md:text-lg"
          >{{ t('addReview.commentLabel') }}</label
        >
        <textarea
          v-model="content"
          :placeholder="t('addReview.commentPlaceholder')"
          class="w-full px-3 border-2 border-gray-200 rounded-lg resize-none focus:outline-none focus:border-neutral transition-colors duration-200 text-sm leading-relaxed"
          rows="4"
        ></textarea>
      </div>

      <!-- 圖片預覽 -->
      <div v-if="image" class="relative mb-5">
        <img
          :src="image"
          alt="預覽圖片"
          class="w-full max-h-48 object-cover rounded-lg border border-gray-200"
        />
        <button
          @click="removeImage"
          class="absolute top-2 right-2 w-6 h-6 rounded-full bg-neutral bg-opacity-60 text-white flex items-center justify-center text-base font-bold hover:bg-opacity-80 transition-all duration-200"
        >
          ×
        </button>
      </div>

      <!-- 操作按鈕 -->
      <div class="flex flex-col gap-2">
        <label
          class="flex items-center justify-center gap-2 p-2 border-2 border-neutral rounded-xl cursor-pointer hover:primary transition-all duration-200 text-neutral text-sm md:text-base"
        >
          {{ t('addReview.uploadPhoto') }}
          <input
            type="file"
            @change="handleFileUpload"
            accept="image/*"
            class="hidden"
          />
        </label>
        <button
          @click="submitReview"
          :disabled="!canSubmit"
          :class="[
            'w-full p-2 rounded-xl text-sm transition-all duration-200 md:text-base bg-neutral',
            canSubmit
              ? 'bg-neutral text-white hover:bg-primary hover:-translate-y-0.5 shadow-lg hover:shadow-xl'
              : 'bg-gray-300 text-white cursor-not-allowed',
          ]"
        >
          {{ t('addReview.submitButton') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useAlertStore } from '@/stores/alert';
import { onUnmounted } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const props = defineProps({
  show: Boolean,
  userName: String,
  userAvatar: String,
});

const emit = defineEmits(['close', 'submit']);

const content = ref('');
const rating = ref(0);
const hoverRating = ref(0);
const image = ref(null);
const file = ref(null);
const alert = useAlertStore();

// 計算是否可以提交
const canSubmit = computed(() => {
  return content.value.trim().length > 0 && rating.value > 0;
});

// 關閉 Modal
const closeModal = () => {
  emit('close');
};

// 設定評分
const setRating = (star) => {
  rating.value = star;
};

// 圖片上傳處理
const handleFileUpload = (event) => {
  const uploadedFile = event.target.files[0];
  if (uploadedFile) {
    // 檢查檔案大小 (限制 5MB)
    if (uploadedFile.size > 1 * 1024 * 1024) {
      alert.trigger(t('addReview.fileTooLarge'), 'error');
      return;
    }

    file.value = uploadedFile;
    image.value = URL.createObjectURL(uploadedFile);
  }
};

// 移除圖片
const removeImage = () => {
  if (image.value) {
    URL.revokeObjectURL(image.value);
  }
  image.value = null;
  file.value = null;
};

// 送出評論
const submitReview = () => {
  if (!canSubmit.value) return;

  emit('submit', {
    content: content.value.trim(),
    rating: rating.value,
    imageFile: file.value,
  });

  // 重置表單
  content.value = '';
  rating.value = 0;
  hoverRating.value = 0;
  removeImage();
  closeModal();
};

const cleanup = () => {
  if (image.value) {
    URL.revokeObjectURL(image.value);
  }
};

onUnmounted(cleanup);
</script>

<style scoped>
@media (max-width: 480px) {
  .bg-white {
    width: 95%;
    padding: 1.25rem;
  }
}
</style>
