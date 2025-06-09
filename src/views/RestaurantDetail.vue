<template>
  <Navbar class="w-full" />
  <div class="w-full pt-20">
    <!-- 餐廳主圖片 -->
    <div class="relative w-full overflow-hidden mb-4">
      <!-- 背景模糊圖（僅限 md 以上顯示） -->
      <img
        :src="restaurant.imageUrl || 'https://picsum.photos/1200/400'"
        class="hidden md:block absolute inset-0 w-full h-full object-cover blur-sm scale-110 opacity-60"
        alt="模糊背景"
      />

      <!-- 前景主圖片 -->
      <div class="relative z-10 flex justify-center">
        <img
          :src="restaurant.imageUrl || 'https://picsum.photos/1200/400'"
          :alt="restaurant.name"
          class="w-full md:max-w-screen-md h-auto max-h-[300px] md:max-h-[540px] object-cover shadow-lg"
        />
      </div>
    </div>

    <!-- 餐廳名稱與操作按鈕 -->
    <div
      class="flex flex-col md:flex-row items-start md:items-center justify-start md:justify-between mb-1 max-w-screen-lg mx-auto px-4"
    >
      <div class="flex items-center">
        <h1
          class="text-2xl md:text-4xl font-bold md:mt-4 truncate max-w-[14em] md:truncate-none md:max-w-none mb-2"
        >
          {{ restaurant.name }}
        </h1>
      </div>
      <div class="flex md:space-x-2 space-x-1.5 gap-0.5">
        <ShareButton
          :restaurant-name="restaurant.name"
          :restaurant-rating="restaurant.googleRating || '4.5'"
        />
        <button @click="toggleFavorite" class="btn px-6 rounded-xl bg-gray-200">
          <font-awesome-icon
            :icon="[isFavorite ? 'fas' : 'far', 'heart']"
            :class="isFavorite ? 'text-red-500' : 'text-gray-400'"
            class="text-xl md:text-2xl"
          />
        </button>
        <button @click="navigateToAddress" class="btn px-6 rounded-xl bg-primary">
          <font-awesome-icon
            :icon="['fas', 'location-arrow']"
            class="text-xl md:text-2xl text-white"
          />
        </button>
      </div>
    </div>

    <!-- 評分與地址 -->
    <div class="flex items-center mb-1 max-w-screen-lg mx-auto px-4">
      <font-awesome-icon :icon="['fas', 'star']" class="text-yellow-400" />
      <span class="ml-2 text-base md:text-xl my-2 text-gray-600">{{
        restaurant.googleRating
      }}</span>
      <span class="ml-2 text-sm text-gray-500 md:text-xl my-2"
        >({{ restaurant.userRatingsTotal
        }}{{ $t('restaurantDetail.ratingCountSuffix') }})</span
      >
    </div>
    <div class="flex items-start mb-4 max-w-screen-lg mx-auto px-4">
      <font-awesome-icon
        :icon="['fas', 'map-marker-alt']"
        class="text-gray-500 md:text-xl my-2"
      />
      <span class="ml-2 text-base text-gray-700 md:text-xl my-2">{{
        restaurant.address
      }}</span>
    </div>

    <!-- 地圖區塊 -->
    <div class="w-full h-48 overflow-hidden mb-4 max-w-screen-lg mx-auto px-4">
      <GoogleMapEmbed
        :mapUrl="mapUrl"
        :alt="$t('restaurantDetail.location')"
        class="w-full h-full object-cover"
      />
    </div>

    <!-- 營業時間 -->

    <div class="mb-6 px-4 max-w-screen-lg mx-auto">
      <h3 class="text-lg md:text-2xl font-bold mb-3 md:mt-10">
        {{ $t('restaurantDetail.businessHours') }}
      </h3>
      <div class="space-y-1 text-sm">
        <div
          v-for="(hours, dayKey) in formattedOpenHours"
          :key="dayKey"
          class="flex justify-between text-base md:text-lg"
        >
          <span
            :class="[
              'text-gray-700',
              {
                'underline underline-offset-5 font-bold text-primary':
                  dayKey === todayKey,
              },
            ]"
          >
            {{ $t(`restaurantDetail.${dayKey}`) }}
          </span>
          <span
            :class="[
              'text-gray-700',
              {
                'underline underline-offset-5 font-bold text-primary':
                  dayKey === todayKey,
              },
            ]"
          >
            {{ hours || $t('restaurantDetail.noData') }}
          </span>
        </div>
      </div>
    </div>

    <!-- 優惠券輪播 -->
    <div class="mb-6 px-4 max-w-screen-lg mx-auto mt-6">
      <CouponCarousel
        v-if="coupons.length"
        :coupons="coupons"
        :claimedStatus="claimedStatus"
        class="mb-6"
      />
    </div>

    <!-- 最新動態輪播 -->
    <PromotionCarousel
      v-if="promotions.length"
      :promotions="promotions"
      class="mb-6"
    />

    <!-- 評論區塊 -->
    <div class="mb-6 max-w-screen-lg mx-auto">
      <div
        class="flex justify-between items-center mb-3 max-w-screen-lg mx-auto px-4"
      >
        <h3 class="text-lg font-bold md:text-2xl md:mt-6">
          {{ $t('restaurantDetail.review') }}
          <span class="text-sm text-gray-500 font-normal md:text-lg"
            >（ {{ $t('restaurantDetail.reviewCountPrefix') }}
            {{ reviews.length }}
            {{ $t('restaurantDetail.ratingCountSuffix') }} ）</span
          >
        </h3>
        <button
          :disabled="hasReviewed"
          @click="handleAddReviewClick"
          class="btn btn-sm  border bg-gray-100 border-gray-200 text-gray-500 rounded-xl px-4 md:px-6 cursor-pointer hover:bg-gray-300 hover:text-white transition disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base py-2 md:py-5 md:mt-6"
        >
          {{
            hasReviewed
              ? $t('restaurantDetail.hasReviewed')
              : $t('restaurantDetail.addReview')
          }}
        </button>
      </div>

      <div class="space-y-3">
        <div
          v-if="reviews.length === 0"
          class="text-center py-8 text-gray-500 text-base md:text-xl"
        >
          {{ $t('restaurantDetail.noReviews') }}
        </div>
        <ReviewModal
          v-if="showModal"
          :show="showModal"
          :userName="user?.userName || ''"
          userAvatar="https://cdn-icons-png.flaticon.com/512/266/266033.png"
          @close="showModal = false"
          @submit="submitReview"
        />
        <div
          v-for="(review, index) in displayedReviews"
          :key="index"
          class="bg-gray-100 rounded-lg max-w-screen-lg mx-4 p-4"
        >
          <div class="flex items-start">
            <div class="avatar">
              <div class="w-10 rounded-full">
                <img
                  :src="
                    review.user?.imageUrl ||
                    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
                  "
                />
              </div>
            </div>
            <div class="ml-3 flex-1">
              <div class="flex flex-col items-left mb-1">
                <h4 class="font-semibold text-base md:text-xl text-black">
                  {{ review.user.userName }}
                </h4>
                <div class="flex items-center">
                  <font-awesome-icon
                    :icon="['fas', 'star']"
                    class="text-yellow-400 text-xs"
                  />
                  <span class="ml-1 text-gray-600 text-sm md:text-lg">{{
                    review.rating
                  }}</span>
                </div>
              </div>
              <p class="text-gray-700 text-sm md:text-lg">
                {{ review.content }}
              </p>
              <img
                v-if="review.imageUrl"
                :src="review.imageUrl"
                :alt="$t('restaurantDetail.imageAlt')"
                class="mt-2 max-w-xs w-full rounded-lg object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      <button
        v-if="displayedCount < reviews.length"
        @click="displayedCount += 10"
        class="mt-4 mb-6 px-4 py-1 border border-gray-400 text-gray-600 rounded-full text-sm hover:bg-gray-100 transition mx-auto block"
      >
        {{ $t('restaurantDetail.viewMore') }}
        <font-awesome-icon :icon="['fas', 'chevron-right']" class="ml-1" />
        <span class="text-xs text-gray-500 ml-1">
          ({{ $t('restaurantDetail.reviewCountPrefix') }}
          {{ reviews.length - displayedCount }}
          {{ $t('restaurantDetail.ratingCountSuffix') }})
        </span>
      </button>

      <div
        v-else-if="reviews.length > 5"
        class="text-center text-sm text-gray-500 mt-4"
      >
        {{ $t('restaurantDetail.viewAll') }}
      </div>
    </div>
  </div>
  <Footer />
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
import axios from '@/axios';
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import GoogleMapEmbed from '@/components/GoogleMapEmbed.vue';
import PromotionCarousel from '@/components/PromotionCarousel.vue';
import CouponCarousel from '@/components/CouponCarousel.vue';
import ReviewModal from '@/components/AddReview.vue';
import ShareButton from '@/components/ShareButton.vue';
import { useAuthStore } from '../stores/auth';
import { useAlertStore } from '@/stores/alert';
import { storeToRefs } from 'pinia';
import { useRestaurantStore } from '@/stores/restaurant';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const route = useRoute();
const alert = useAlertStore();
const auth = useAuthStore();
const { user } = storeToRefs(auth);
const restaurant = reactive({});
const openHours = reactive({});
const mapUrl = ref('');
const placeId = ref('');
const store = useRestaurantStore();
const isFavorite = ref(false);
const promotions = ref([]);
const coupons = ref([]);
const claimedStatus = ref({});
const reviews = ref([]);
const showModal = ref(false);
const hasReviewed = ref(false);
const router = useRouter();

const displayedCount = ref(5);
const displayedReviews = computed(() =>
  reviews.value.slice(0, displayedCount.value),
);

const todayKey = computed(() => {
  const weekday = new Date()
    .toLocaleDateString('en-US', { weekday: 'long' })
    .toLowerCase();
  return weekday;
});

const formattedOpenHours = computed(() => {
  const result = {};
  for (const [key, value] of Object.entries(openHours)) {
    result[key] = value || t('common.notProvided');
  }
  return result;
});

const fetchRestaurantData = async () => {
  try {
    const restaurantUuid = route.params.id;
    const response = await axios.get(`/restaurants/${restaurantUuid}`);
    const data = response.data.result;

    Object.assign(restaurant, data.restaurant);
    Object.assign(openHours, data.restaurant.openHours || {});
    placeId.value = data.restaurant.placeId;
    mapUrl.value = `https://www.google.com/maps?q=${restaurant.latitude},${restaurant.longitude}&z=18&output=embed`;

    promotions.value = data.promotion || [];
    coupons.value = data.coupon || [];
    claimedStatus.value = data.userStatus?.hasClaimedCoupon || {};
    isFavorite.value = data.userStatus?.hasFavorited || false;
    reviews.value = data.reviews || [];
    hasReviewed.value = data.userStatus?.hasReviewed || false;

    store.addRecentViewedUuid(restaurantUuid);
  } catch (error) {
    if (error.response && error.response.status === 404) {
      router.push({ name: 'NotFound' }); 
    } else {
      alert.trigger(t('restaurantDetail.loadRestaurantFailed'), 'error');
    }
  }
};

const handleAddReviewClick = async () => {
  try {
    await axios.get('/auth/me');
    showModal.value = true;
  } catch {
    alert.trigger(t('restaurantDetail.pleaseLoginToReview'), 'error');
  }
};

const submitReview = async (data) => {
  try {
    const restaurantUuid = route.params.id;
    const formData = new FormData();
    formData.append('content', data.content);
    formData.append('rating', Number(data.rating) || 5);
    if (data.imageFile) formData.append('image', data.imageFile);

    const response = await axios.post(
      `/restaurants/${restaurantUuid}/reviews/`,
      formData,
    );
    reviews.value.unshift(response.data);
    hasReviewed.value = true;
    alert.trigger(t('restaurantDetail.addReviewSuccess'), 'success');
    showModal.value = false;
  } catch {
    alert.trigger(t('restaurantDetail.addReviewFailed'), 'error');
  }
};

const toggleFavorite = async () => {
  try {
    await axios.get('/auth/me');
    const restaurantUuid = route.params.id;
    if (isFavorite.value) {
      await axios.delete(`/restaurants/${restaurantUuid}/favorites/`);
    } else {
      await axios.post(`/restaurants/${restaurantUuid}/favorites/`);
    }
    isFavorite.value = !isFavorite.value;
  } catch {
    alert.trigger(t('restaurantDetail.pleaseLoginToFavorite'), 'error');
  }
};

const navigateToAddress = () => {
  if (placeId.value) {
    window.open(
      `https://www.google.com/maps/place/?q=place_id:${placeId.value}`,
      '_blank',
    );
  } else if (restaurant.latitude && restaurant.longitude) {
    window.open(
      `https://www.google.com/maps?q=${restaurant.latitude},${restaurant.longitude}`,
      '_blank',
    );
  }
};

onMounted(fetchRestaurantData);

onMounted(() => {
  window.scrollTo(0, 0);
});
</script>
