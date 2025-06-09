<template>
  <div class="min-h-screen flex flex-col">
  <Navbar></Navbar>
  <div class="flex-1 p-6 max-w-screen-lg mx-auto pt-30 mb-20">
    <h1 class="text-2xl md:text-3xl text-neutral text-center font-bold mb-8">{{ t('myFavorites.title') }}</h1>

    <div v-if="restaurants.length === 0" class="text-center text-base md:text-xl text-gray-400">{{ t('myFavorites.empty') }}</div>
    <div v-else class="grid gap-6 grid-cols-1 md:grid-cols-2">
      <RestaurantCard
        v-for="r in restaurants"
        :key="r.placeId"
        :restaurant="r"
      />
    </div>
  </div>
  <Footer></Footer>
</div>
</template>

<script setup>
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import RestaurantCard from '@/components/RestaurantCard.vue';
import axios from '@/axios';
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const restaurants = ref([]);

onMounted(async () => {
  try {
    const res = await axios.get('/favorites/');
    restaurants.value = res.data.restaurants;
  } catch (err) {}
});
</script>
