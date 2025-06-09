<template>
  <div class="min-h-screen flex flex-col">
  <Navbar></Navbar>
  <div class="flex-1 p-6 max-w-screen-lg mx-auto pt-30 mb-20">
    <h1 class="text-2xl md:text-3xl text-neutral text-center font-bold mb-8">{{ t('recentViews.title') }}</h1>

    <div v-if="restaurants.length === 0" class="text-center text-gray-400 text-base md:text-xl">{{ t('recentViews.empty') }}</div>
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
import { useRestaurantStore } from '@/stores/restaurant';
import { ref, onMounted } from 'vue';
import axios from '@/axios';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const store = useRestaurantStore();
const restaurants = ref([]);

onMounted(async () => {
  const uuids = store.recentViewedUuids;

  if (!uuids || uuids.length === 0) return;

  const params = new URLSearchParams();
  uuids.forEach((uuid) => {
    params.append('uuids', uuid);
  });

  try {
    const response = await axios.get('/restaurants/recent-viewed/', { params });
    console.log('取得的餐廳資料：', response.data);
    restaurants.value = response.data.result || [];
  } catch (err) {
    console.error('取得最近瀏覽餐廳失敗', err);
  }
});
</script>
