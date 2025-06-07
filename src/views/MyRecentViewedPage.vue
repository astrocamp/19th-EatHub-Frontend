<template>
  <Navbar></Navbar>
  <div class="p-6 min-h-screen">
    <h1 class="text-2xl font-bold mb-4">{{ t('recentViews.title') }}</h1>

    <div v-if="restaurants.length === 0">{{ t('recentViews.empty') }}</div>
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
