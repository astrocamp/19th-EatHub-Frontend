<template>
  <div class="min-h-screen">
    <Navbar />
    <div class="bg-white">
      <div class="flex justify-center items-center mx-auto py-5">
        <h1 class="text-2xl font-bold mb-4">
          {{ t('restaurantList.title') }}
          <span v-if="dishResult">：{{ dishResult }}</span>
        </h1>
      </div>
      <section class="px-4 sm:px-0 pb-8">
        <ul
          class="mx-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 place-items-center p-0 list-none"
        >
          <li
            v-for="r in topTenRestaurants"
            :key="r.placeId"
            class="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl"
          >
            <RestaurantCard
              :restaurant="r"
              @click="handleRecentViewedRestaurant(r)"
            />
          </li>
        </ul>
      </section>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import RestaurantCard from '@/components/RestaurantCard.vue';
import { computed, onMounted } from 'vue';
import { useRestaurantStore } from '@/stores/restaurant';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const store = useRestaurantStore();
const topTenRestaurants = computed(() => store.restaurants.slice(0, 12));

const dishResult = computed(() => store.dishResult);

const handleRecentViewedRestaurant = (r) => {
  store.addRecentViewedUuid(r.uuid);
};

onMounted(() => {
  window.scrollTo(0, 0);
});
</script>

<style scoped>
.min-h-screen {
  position: relative;
  top: 0;
}

.card {
  border-radius: 12px;
  padding: 16px;
  background-color: #fff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  gap: 20px;
}

.card:hover {
  transform: scale(1.05);
  transition:
    transform 0.2s ease-in-out,
    box-shadow 0.2s ease-in-out;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.25);
}

p {
  display: inline;
  text-align: left;
  line-height: 36px;
}
</style>
