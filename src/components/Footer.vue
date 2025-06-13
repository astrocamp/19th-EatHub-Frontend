<template>
  <footer class="bg-[#573921] text-white py-12 px-8">
    <div class="max-w-screen-2xl mx-auto">
      <!-- 主要內容區域 -->
      <div class="grid grid-cols-1 md:grid-cols-5 gap-8 mb-8 md:justify-items-center">
        <!-- Logo 和聯絡資訊 -->
        <div class="col-span-1 md:col-start-2 md:col-span-1">
          <div class="flex items-center mb-6">
            <img
              src="@/assets/images/logo_w.png"
              alt="Logo"
              class="w-40 mr-2"
            />
          </div>

          <div class="text-sm leading-relaxed md:ml-2">
            <p>{{ t('footer.phone') }}</p>
            <p></p>
            <p>{{ t('footer.hours') }}</p>
            <p></p>
            <p>{{ t('footer.address') }}</p>
            <p></p>
          </div>
        </div>

        <!-- 手機版：關於我們和語言選擇並排，電腦版：各佔一欄 -->
        <div class="col-span-1 grid grid-cols-2 gap-4 md:contents">
          <!-- 關於我們 -->
          <div class="md:mt-6">
            <h4 class="font-bold mb-4 text-base">
              {{ t('footer.about') || '關於我們' }}
            </h4>
            <ul class="text-sm space-y-2">
              <li>
                <a
                  href="mailto:eathubtw@gmail.com"
                  class="hover:text-orange-300 transition-colors"
                >
                  {{ t('footer.contact') }}
                </a>
              </li>
              <li>
                <RouterLink
                  to="/terms-of-service"
                  class="hover:text-orange-300 transition-colors"
                >
                  {{ t('footer.terms') }}
                </RouterLink>
              </li>
              <li>
                <RouterLink
                  to="/privacy-policy"
                  class="hover:text-orange-300 transition-colors"
                >
                  {{ t('footer.privacy') }}
                </RouterLink>
              </li>
            </ul>
          </div>

          <!-- 語言選擇 -->
          <div class="md:col-span-1 md:mt-6">
            <h4 class="font-bold mb-4 text-base">
              {{ t('footer.language') || '語言選擇' }}
            </h4>
            <div class="relative">
              <select
                v-model="locale"
                class="bg-transparent border border-orange-300 text-orange-300 px-4 py-2 rounded-lg text-sm focus:outline-none focus:border-orange-200 hover:border-orange-200 transition-colors cursor-pointer min-w-[120px]"
              >
                <option value="zh-TW" class="bg-[#573921] text-white">
                  繁體中文
                </option>
                <option value="en" class="bg-[#573921] text-white">
                  English
                </option>
                <option value="ja" class="bg-[#573921] text-white">日本語</option>
                <option value="ko" class="bg-[#573921] text-white">한국어</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <!-- 版權聲明 -->
      <div class="border-t border-white/20 pt-6">
        <div class="text-center text-sm text-white/80">
          © 2025 EatHub. All rights reserved.
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { watch } from 'vue';

const { locale, t } = useI18n();

watch(locale, (newLocale) => {
  localStorage.setItem('locale', newLocale);
});
defineProps({});
</script>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
