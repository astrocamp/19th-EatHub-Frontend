<template>
  <Navbar></Navbar>
  <div class="p-6 min-h-screen">
    <h1 class="text-2xl font-bold mb-4">我的最近瀏覽</h1>

    <div v-if="restaurants.length === 0">尚未有瀏覽</div>
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
import { useRestaurantStore } from '@/stores/restaurant';
import { storeToRefs } from 'pinia';

const store = useRestaurantStore();
const { recentViewedRestaurants } = storeToRefs(store);
const restaurants = recentViewedRestaurants;
</script>
