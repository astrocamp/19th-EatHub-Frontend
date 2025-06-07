import { createI18n } from 'vue-i18n';
import en from './locales/en.json';
import zhTW from './locales/zh-TW.json';
import ja from './locales/ja.json';
import ko from './locales/ko.json';
const savedLocale = localStorage.getItem('locale') || 'zh-TW';
const i18n = createI18n({
  legacy: false,
  locale: savedLocale,
  globalInjection: true,
  fallbackLocale: 'zh-TW',
  messages: {
    en,
    'zh-TW': zhTW,
    ja,
    ko,
  },
});

export default i18n;
