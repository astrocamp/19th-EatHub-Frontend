<template>
  <Navbar></Navbar>
  <div class="p-6 min-h-screen">
    <h1 class="text-2xl font-bold mb-4">>{{ t('myFavorites.title') }}</h1>

    <div v-if="restaurants.length === 0">{{ t('myFavorites.empty') }}</div>
    <div v-else class="grid gap-4">
      <RestaurantCard
        v-for="r in restaurants"
        :key="r.placeId"
        :restaurant="r"
      />
    </div>
  </div>
  <Footer></Footer>
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
