<!-- src/components/AlertCenter.vue -->
<template>
  <div
    v-if="show"
    :class="[
      'alert shadow-lg fixed top-10 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300',
      'text-lg px-6 py-4 min-w-[280px] max-w-sm rounded-lg',
      typeClass,
    ]"
    role="alert"
  >
    <font-awesome-icon :icon="iconClass" />
    <span>{{ message }}</span>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useAlertStore } from '@/stores/alert';
import { computed } from 'vue';

const store = useAlertStore();
const { show, message, type } = storeToRefs(store);

const iconClass = computed(
  () =>
    ({
      success: ['fas', 'fa-check-circle'],
      error: ['fas', 'fa-times-circle'],
      warning: ['fas', 'fa-exclamation-triangle'],
      info: ['fas', 'fa-info-circle'],
    })[type.value] || ['fas', 'fa-info-circle'],
);

const typeClass = computed(
  () =>
    ({
      success: 'alert-success',
      error: 'alert-error',
      warning: 'alert-warning',
      info: 'alert-info',
    })[type.value] || 'alert-info',
);
</script>
