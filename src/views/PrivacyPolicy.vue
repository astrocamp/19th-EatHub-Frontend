<template>
  <NavBar />
  <main class="max-w-3xl mx-auto px-4 py-10 text-left pt-28">
    <div class="max-w-3xl mx-auto px-4 text-black text-base leading-relaxed">
      <h1 class="text-2xl md:text-3xl text-center font-bold mb-6">
        {{ $t('privacyPolicy.title') }}
      </h1>

      <p class="mb-6">
        {{ $t('privacyPolicy.intro') }}
      </p>

      <section class="mb-8">
        <h2 class="text-xl font-semibold mb-2">
          {{ $t('privacyPolicy.section1Title') }}
        </h2>
        <ul class="list-disc pl-6 space-y-1">
          <li>{{ $t('privacyPolicy.section1List.registration') }}</li>
          <li>{{ $t('privacyPolicy.section1List.usage') }}</li>
          <li>{{ $t('privacyPolicy.section1List.interaction') }}</li>
          <li>{{ $t('privacyPolicy.section1List.device') }}</li>
        </ul>
      </section>

      <section class="mb-8">
        <h2 class="text-xl font-semibold mb-2">
          {{ $t('privacyPolicy.section2Title') }}
        </h2>
        <ul class="list-disc pl-6 space-y-1">
          <li>{{ $t('privacyPolicy.section2List.authentication') }}</li>
          <li>{{ $t('privacyPolicy.section2List.recommendation') }}</li>
          <li>{{ $t('privacyPolicy.section2List.support') }}</li>
          <li>{{ $t('privacyPolicy.section2List.notification') }}</li>
          <li>{{ $t('privacyPolicy.section2List.compliance') }}</li>
        </ul>
      </section>

      <section class="mb-8">
        <h2 class="text-xl font-semibold mb-2">
          {{ $t('privacyPolicy.section3Title') }}
        </h2>
        <p>
          {{ $t('privacyPolicy.section3Description') }}
        </p>
      </section>

      <section class="mb-8">
        <h2 class="text-xl font-semibold mb-2">
          {{ $t('privacyPolicy.section4Title') }}
        </h2>
        <p class="mb-2">
          {{ $t('privacyPolicy.section4Description1') }}
        </p>
        <p>
          {{ $t('privacyPolicy.section4Description2') }}
        </p>
      </section>

      <section class="mb-8">
        <h2 class="text-xl font-semibold mb-2">
          {{ $t('privacyPolicy.section5Title') }}
        </h2>
        <ul class="list-disc pl-6 space-y-1">
          <li>{{ $t('privacyPolicy.section5List.access') }}</li>
          <li>{{ $t('privacyPolicy.section5List.correction') }}</li>
          <li>{{ $t('privacyPolicy.section5List.withdrawal') }}</li>
        </ul>
        <p class="mt-2">
          {{ $t('privacyPolicy.section5Note') }}
        </p>
      </section>

      <section class="mb-8">
        <h2 class="text-xl font-semibold mb-2">
          {{ $t('privacyPolicy.section6Title') }}
        </h2>
        <p class="mb-2">
          {{ $t('privacyPolicy.section6Description1') }}
        </p>
        <ul class="list-disc pl-6 space-y-1">
          <li>{{ $t('privacyPolicy.section6List.encryption') }}</li>
          <li>{{ $t('privacyPolicy.section6List.access') }}</li>
          <li>{{ $t('privacyPolicy.section6List.deletion') }}</li>
        </ul>
        <p class="mt-2">
          {{ $t('privacyPolicy.section6Description2') }}
        </p>
      </section>

      <section>
        <h2 class="text-xl font-semibold mb-2">
          {{ $t('privacyPolicy.section7Title') }}
        </h2>
        <p>
          {{ $t('privacyPolicy.section7Description') }}
        </p>
      </section>

      <p class="mt-6 text-sm text-black">
        {{ $t('privacyPolicy.lastUpdated') }}
      </p>
    </div>
  </main>
  <base-footer />
</template>

<script setup>
import NavBar from '@/components/NavBar.vue';
import BaseFooter from '@/components/BaseFooter.vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>
