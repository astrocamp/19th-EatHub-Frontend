<template>
  <router-link :to="`/restaurants/${restaurant.uuid}`">
    <div class="card rounded-xl relative shadow-[0_0_10px_rgba(0,0,0,0.25)] p-4 flex flex-col sm:flex-row gap-4 transition-transform duration-300 hover:scale-105 hover:-translate-y-1">
      <div
        v-if="restaurant.hasAvailableCoupon"
        class="absolute bottom-3 right-3 bg-[rgb(226,102,55)] text-white text-xs px-2 py-1 rounded-full shadow"
      >
      <font-awesome-icon :icon="['fas', 'ticket']" /> 優惠券
      </div>
      <div class="w-full sm:w-32 h-32 flex-shrink-0">
        <img
          :src="restaurant.imageUrl"
          alt=""
          class="w-full h-full object-cover rounded"
        />
      </div>

      <div class="flex flex-col justify-between w-full text-left pl-4 py-2">
        <h4 class="text-lg md:text-2xl font-semibold line-clamp-1" :title="restaurant.name">
          {{ restaurant.name }}
        </h4>
        <p class="text-sm md:text-lg text-gray-600 line-clamp-2">
          {{ restaurant.address }}
        </p>
        <p class="text-sm md:text-lg">
          ⭐️ {{ t('index.ratingLabel') }}：{{ restaurant.googleRating }}
        </p>
      </div>
    </div>
  </router-link>
</template>

<script setup>
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
defineProps({
  restaurant: {
    type: Object,
    required: true,
  },
});


</script>
