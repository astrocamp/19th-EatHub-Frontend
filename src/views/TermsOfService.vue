<template>
  <div class="min-h-screen bg-base-100 text-base-content">
    <Navbar></Navbar>

    <main class="max-w-3xl mx-auto px-4 py-10 text-left">
      <h1 class="text-2xl md:text-3xl font-bold mb-6 text-center">
        {{ t('termsOfService.title') }}
      </h1>

      <section class="mb-6">
        <h2 class="text-xl font-semibold mb-2">
          {{ t('termsOfService.sections.introductionTitle') }}
        </h2>
        <p class="leading-relaxed text-lg">
          {{ t('termsOfService.sections.introductionContent') }}
        </p>
      </section>

      <section class="mb-6">
        <h2 class="text-xl font-semibold mb-2">
          {{ t('termsOfService.sections.eligibilityTitle') }}
        </h2>
        <p class="leading-relaxed text-lg">
          {{ t('termsOfService.sections.eligibilityContent') }}
        </p>
      </section>

      <section class="mb-6">
        <h2 class="text-xl font-semibold mb-2">
          {{ t('termsOfService.sections.privacyTitle') }}
        </h2>
        <p class="mt-2 leading-relaxed text-lg mb-2">
          {{ t('termsOfService.sections.privacyCollected') }}
        </p>
        <ul class="list-disc ml-6 text-lg space-y-1 mb-4">
          <li>{{ t('termsOfService.sections.privacyItems.email') }}</li>
          <li>{{ t('termsOfService.sections.privacyItems.name') }}</li>
          <li>{{ t('termsOfService.sections.privacyItems.content') }}</li>
        </ul>
        <p class="mt-2 leading-relaxed text-lg mb-2">
          {{ t('termsOfService.sections.privacyUsage') }}
        </p>
        <ul class="list-disc ml-6 text-lg space-y-1 mb-4">
          <li>{{ t('termsOfService.sections.privacyPurposes.verify') }}</li>
          <li>{{ t('termsOfService.sections.privacyPurposes.service') }}</li>
          <li>{{ t('termsOfService.sections.privacyPurposes.optimize') }}</li>
        </ul>
        <p class="leading-relaxed text-lg">
          {{ t('termsOfService.sections.privacyNote') }}
        </p>
      </section>

      <section class="mb-6">
        <h2 class="text-xl font-semibold mb-2">
          {{ t('termsOfService.sections.contentLicenseTitle') }}
        </h2>
        <p class="leading-relaxed">
          {{ t('termsOfService.sections.contentLicenseContent') }}
        </p>
      </section>

      <section class="mb-6">
        <h2 class="text-xl font-semibold mb-2">
          {{ t('termsOfService.sections.prohibitedTitle') }}
        </h2>
        <ul class="list-disc ml-6 space-y-1 text-lg">
          <li>{{ t('termsOfService.sections.prohibitedItems.illegal') }}</li>
          <li>
            {{ t('termsOfService.sections.prohibitedItems.unauthorized') }}
          </li>
          <li>{{ t('termsOfService.sections.prohibitedItems.attack') }}</li>
        </ul>
      </section>

      <section class="mb-6">
        <h2 class="text-xl font-semibold mb-2">
          {{ t('termsOfService.sections.thirdPartyTitle') }}
        </h2>
        <p class="leading-relaxed text-lg">
          {{ t('termsOfService.sections.thirdPartyContent') }}
        </p>
      </section>

      <section class="mb-6">
        <h2 class="text-xl font-semibold mb-2">
          {{ t('termsOfService.sections.disclaimerTitle') }}
        </h2>
        <p class="leading-relaxed text-lg">
          {{ t('termsOfService.sections.disclaimerContent') }}
        </p>
      </section>

      <section>
        <h2 class="text-xl font-semibold mb-2">
          {{ t('termsOfService.sections.updateTitle') }}
        </h2>
        <p class="leading-relaxed text-lg">
          {{ t('termsOfService.sections.updateContent') }}
        </p>
      </section>
    </main>

    <Footer></Footer>
  </div>
</template>

<script setup>
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<style scoped>
.fade-enter-active {
  transition: opacity 0.5s;
}
.fade-enter-from {
  opacity: 0;
}
</style>
