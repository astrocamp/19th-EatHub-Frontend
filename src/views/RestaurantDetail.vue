<template>
  <div class="bg-gray-100">
    <!-- Navbar - 全寬 -->
    <Navbar class="w-full" />

    <!-- 整體內容容器 - 只有微小留白 -->
    <div class="w-full px-2 bg-white">
      <!-- 餐廳主圖片 - 固定高度，寬度自適應 -->
      <div class="w-full h-64 bg-gray-200 overflow-hidden mb-4">
        <img
          :src="restaurant.imageUrl || 'https://picsum.photos/1200/400'"
          :alt="restaurant.name"
          class="w-full h-full object-cover"
        />
      </div>

      <!-- 餐廳名稱和按鈕 -->
      <div class="flex justify-between items-center mb-1">
        <div class="flex items-center">
          <font-awesome-icon
            :icon="['fas', 'home']"
            class="text-blue-500 mr-2"
          />
          <h1 class="text-xl font-bold">{{ restaurant.name }}</h1>
        </div>

        <!-- 功能按鈕 -->
        <div class="flex space-x-2">
          <button @click="toggleFavorite" class="btn btn-circle">
            <font-awesome-icon
              :icon="[isFavorite ? 'fas' : 'far', 'heart']"
              :class="isFavorite ? 'text-red-500' : 'text-gray-500'"
              class="text-2xl"
            />
          </button>
          <button @click="navigateToAddress" class="btn btn-circle">
            <font-awesome-icon
              :icon="['fas', 'location-arrow']"
              class="text-3xl"
            />
          </button>
        </div>
      </div>

      <!-- 評分和地址 -->
      <div class="flex items-center mb-1">
        <font-awesome-icon :icon="['fas', 'star']" class="text-yellow-400" />
        <span class="ml-2 text-sm text-gray-600">{{
          restaurant.googleRating || '4.5'
        }}</span>
        <span class="ml-1 text-xs text-gray-500"
          >({{ restaurant.userRatingsTotal || 0 }})</span
        >
      </div>

      <div class="flex items-start mb-4">
        <font-awesome-icon
          :icon="['fas', 'map-marker-alt']"
          class="text-gray-500 mt-0.5 mr-2"
        />
        <span class="text-sm text-gray-700">{{
          restaurant.address || '地址載入中...'
        }}</span>
      </div>

      <!-- 地圖區塊 - 固定高度，寬度自適應 -->
      <div class="w-full h-48 bg-gray-200 overflow-hidden mb-4">
        <GoogleMapEmbed
          :mapUrl="mapUrl"
          alt="地圖"
          class="w-full h-full object-cover"
        />
      </div>

      <!-- 營業時間區塊 -->
      <div class="mb-6">
        <h3 class="text-base font-bold mb-3">營業時間</h3>
        <div class="space-y-1 text-sm">
          <div
            v-for="(hours, day) in formattedOpenHours"
            :key="day"
            class="flex justify-between"
          >
            <span class="text-gray-700">{{ day }}</span>
            <span class="text-gray-700">{{ hours }}</span>
          </div>
        </div>
      </div>

      <!-- 優惠券按鈕 - 全寬 -->
      <button
        v-if="hasCouponData"
        @click="handleCouponClick"
        :class="[
          'btn w-full rounded-lg mb-2 border transition-colors duration-300',
          couponClaimed
            ? 'bg-white text-black border-black'
            : isExpired
              ? 'bg-gray-300 text-gray-700'
              : isNotStarted
                ? 'bg-gray-300 text-gray-700'
                : 'bg-black text-white',
        ]"
        :disabled="isExpired || isNotStarted"
      >
        <font-awesome-icon :icon="couponIcon" class="mr-2" />
        {{ couponButtonText }}
      </button>

      <!-- 優惠券詳細資訊 -->
      <div
        v-if="hasCouponData && coupon"
        class="bg-gray-50 rounded-lg p-4 mb-6"
      >
        <h4 class="text-sm font-bold mb-2">優惠券詳細資訊</h4>

        <div class="space-y-2 text-sm">
          <div v-for="(value, key) in couponDetails" :key="key">
            <span class="text-gray-500">{{ key }}：</span>
            <span
              :class="
                key === '折扣值' ? 'font-medium text-red-500' : 'font-medium'
              "
              >{{ value }}</span
            >
          </div>

          <div v-if="coupon.description">
            <span class="text-gray-500">使用說明：</span>
            <p class="mt-1 text-gray-700">{{ coupon.description }}</p>
          </div>
        </div>

        <div class="mt-3 text-xs text-gray-500">
          {{ couponStatusText }}
        </div>
      </div>

      <!-- 最新動態區塊 -->
      <div v-if="hasPromotionData" class="mb-6">
        <h3 class="text-base font-bold mb-3">最新動態</h3>

        <div class="card bg-base-100 shadow-sm border">
          <!-- 有後端圖片時顯示圖片 -->
          <figure v-if="promotion.imageUrl" class="h-40">
            <img
              :src="promotion.imageUrl"
              :alt="promotion.title"
              class="w-full h-full object-cover"
            />
          </figure>
          <!-- 文字內容 -->
          <div class="card-body p-3">
            <h4 class="font-semibold text-sm">{{ promotion.title }}</h4>
            <p class="text-sm">{{ promotion.description }}</p>
            <p v-if="promotion.startedAt" class="text-xs text-gray-500 mt-1">
              活動期間：{{ formatDate(promotion.startedAt) }} -
              {{ formatDate(promotion.endedAt) }}
            </p>
          </div>
        </div>
      </div>

      <!--  評論區塊 -->
      <div class="mb-6">
        <div class="flex justify-between items-center mb-3">
          <h3 class="text-base font-bold">
            評論
            <span class="text-sm text-gray-500 font-normal">
              (共 {{ reviews.length }} 則)
            </span>
          </h3>
          <button
            @click="handleAddReviewClick"
            class="btn btn-sm bg-gray-300 border-0 rounded-3xl px-6 cursor-pointer"
          >
            ＋ 新增
          </button>
        </div>

        <div class="space-y-3">
          <div
            v-if="reviews.length === 0"
            class="text-center py-8 text-gray-500"
          >
            暫無評論
          </div>

          <ReviewModal
            v-if="showModal"
            :show="showModal"
            :userName="user?.userName || ''"
            userAvatar="https://cdn-icons-png.flaticon.com/512/266/266033.png"
            @close="showModal = false"
            @submit="submitReview"
          />

          <!--  顯示在畫面上的樣式 -->
          <div
            v-for="(review, index) in reviews"
            :key="index"
            class="bg-gray-100 rounded-lg p-4"
          >
            <div class="flex items-start">
              <div class="avatar">
                <div class="w-10 rounded-full">
                  <img
                    :src="'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'"
                  />
                </div>
              </div>
              <div class="ml-3 flex-1">
                <div class="flex flex-col items-left mb-1">
                  <div v-if="review.user">
                    <h4 class="font-semibold text-sm text-black">
                      {{ review.user.userName }}
                    </h4>
                  </div>
                  <div class="flex items-center">
                    <font-awesome-icon
                      :icon="['fas', 'star']"
                      class="text-yellow-400 text-xs"
                    />
                    <span class="ml-1 text-xs text-gray-600">{{
                      review.rating
                    }}</span>
                  </div>
                </div>

                <p class="text-sm text-gray-700">{{ review.content }}</p>
                <img
                  v-if="review.imageUrl"
                  :src="review.imageUrl"
                  alt="上傳圖片"
                  class="mt-2 max-w-xs w-full rounded-lg object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 查看更多按鈕 -->
    <button
      v-if="hasMoreReviews"
      @click="loadMoreReviews"
      class="btn btn-outline btn-sm w-full mt-4"
    >
      查看更多
      <font-awesome-icon :icon="['fas', 'chevron-right']" class="ml-1" />
      <span class="text-xs text-gray-500 ml-1">
        (還有 {{ reviews.length - displayedReviewsCount }} 則)
      </span>
    </button>

    <div
      v-else-if="reviews.length > 5"
      class="text-center text-sm text-gray-500 mt-4"
    >
      已顯示所有評論
    </div>
  </div>
  <!-- </div> -->

  <Footer />
  <!-- </div> -->
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import GoogleMapEmbed from '@/components/GoogleMapEmbed.vue';
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import axios from '@/axios';
import ReviewModal from '@/components/AddReview.vue';

import { useAuthStore } from '../stores/auth';
import { storeToRefs } from 'pinia';
import { useAlertStore } from '@/stores/alert';

const alert = useAlertStore();

const auth = useAuthStore();
const { user } = storeToRefs(auth);

//-----
const showModal = ref(false);
const reviews = ref([]);

const handleAddReviewClick = async () => {
  const isLoggedIn = await checkAuth();
  if (!isLoggedIn) {
    alert.trigger('請先登入才能評論', 'error');
    return;
  }
  showModal.value = true;
};

// 將評論同步到後端

const submitReview = async (data) => {
  try {
    const restaurantUuid = route.params.id;

    // 使用 FormData 建立表單資料
    const formData = new FormData();
    formData.append('content', data.content);
    formData.append('rating', Number(data.rating) || 5);

    // 若有圖片則附加
    if (data.imageFile) {
      formData.append('image', data.imageFile);
    }

    const response = await axios.post(
      `/restaurants/${restaurantUuid}/reviews/`,
      formData,
    );

    // 成功後加入評論列表最前面
    reviews.value.unshift(response.data);
    alert.trigger('評論送出成功', 'success');
    showModal.value = false;
  } catch {
    alert.trigger('評論失敗', 'error');
  }
};

//-----

const route = useRoute();
const isFavorite = ref(false);
const couponClaimed = ref(false);
const displayedReviewsCount = ref(5);
const mapUrl = ref('');
const placeId = ref('');

// 餐廳基本信息
const restaurant = reactive({
  name: '',
  imageUrl: '',
  googleRating: 0,
  address: '',
  latitude: null,
  longitude: null,
  userRatingsTotal: 0,
  placeId: '',
});

// 計算屬性：檢查是否有優惠券數據
const hasCouponData = computed(() => {
  return coupon.value && coupon.value.uuid !== undefined;
});

// 有數據時才顯示優惠券
const coupon = ref(null);

const promotion = ref([]);

// 計算屬性：檢查是否有最新活動數據
const hasPromotionData = computed(() => {
  return (
    promotion.value && (promotion.value.title || promotion.value.description)
  );
});

// 營業時間
const openHours = reactive({
  monday: null,
  tuesday: null,
  wednesday: null,
  thursday: null,
  friday: null,
  saturday: null,
  sunday: null,
});

// 格式化天數顯示
const dayTranslation = {
  monday: '星期一',
  tuesday: '星期二',
  wednesday: '星期三',
  thursday: '星期四',
  friday: '星期五',
  saturday: '星期六',
  sunday: '星期日',
};

// 計算屬性：格式化後的營業時間
const formattedOpenHours = computed(() => {
  const result = {};
  for (const [key, value] of Object.entries(openHours)) {
    result[dayTranslation[key]] = value || '未提供';
  }
  return result;
});

// 計算屬性：優惠券詳細信息
const couponDetails = computed(() => {
  if (!coupon.value) return {};

  return {
    序號: coupon.value.serialNumber,
    折扣類型: coupon.value.discountType === 'percentage' ? '折扣' : '金額折抵',
    折扣值:
      coupon.value.discountType === 'percentage'
        ? `${coupon.value.discountValue}%`
        : `${coupon.value.discountValue}元`,
    有效期間: `${formatDate(coupon.value.startedAt)} - ${formatDate(
      coupon.value.endedAt,
    )}`,
  };
});

// 計算屬性：當前應該顯示的評論
const displayedReviews = computed(() =>
  reviews.value.slice(0, displayedReviewsCount.value),
);

// 計算屬性：是否還有更多評論可以顯示
const hasMoreReviews = computed(
  () => displayedReviewsCount.value < reviews.value.length,
);

// 計算屬性：優惠券是否已過期
const isExpired = computed(() => {
  if (!coupon.value?.endedAt) return false;
  return new Date(coupon.value.endedAt) < new Date();
});

// 計算屬性：優惠券活動是否尚未開始
const isNotStarted = computed(() => {
  if (!coupon.value?.startedAt) return false;
  return new Date(coupon.value.startedAt) > new Date();
});

// 計算屬性：優惠券按鈕文字
const couponButtonText = computed(() => {
  if (couponClaimed.value) return '已領取優惠券';
  if (isExpired.value) return '活動已結束';
  if (isNotStarted.value) return '活動尚未開始';
  return coupon.value?.title || '領取優惠券';
});

// 計算屬性：優惠券圖標
const couponIcon = computed(() => {
  if (couponClaimed.value) return ['fas', 'check'];
  if (isExpired.value || isNotStarted.value) return ['fas', 'clock'];
  return ['fas', 'ticket'];
});

// 計算屬性：優惠券狀態文本
const couponStatusText = computed(() => {
  if (isExpired.value) return '此優惠券已過期';
  if (isNotStarted.value) return '請於活動開始後再來領取';
  if (couponClaimed.value) return '使用時向店家出示此頁面';
  return '點擊上方按鈕領取優惠券';
});

// 方法：導航到地址
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

// 方法：切換最愛狀態
const toggleFavorite = async () => {
  const isLoggedIn = await checkAuth();
  if (!isLoggedIn) {
    alert.trigger('請先登入才能收藏餐廳', 'error');
    return;
  }

  try {
    const restaurantUuid = route.params.id;
    if (isFavorite.value) {
      await axios.delete(`/restaurants/${restaurantUuid}/favorites/`);
    } else {
      await axios.post(`/restaurants/${restaurantUuid}/favorites/`);
    }
    isFavorite.value = !isFavorite.value;
  } catch (error) {
    alert.trigger('更新最愛狀態失敗，請稍後再試', 'error');
  }
};

// 方法：處理優惠券按鈕點擊
const handleCouponClick = async () => {
  if (isExpired.value) {
    alert.trigger('活動已結束', 'error');
    return;
  }
  if (isNotStarted.value) {
    alert.trigger('活動尚未開始', 'error');
    return;
  }
  if (couponClaimed.value) {
    alert.trigger('您已領取過此優惠券', 'error');
    return;
  }

  const isLoggedIn = await checkAuth();
  if (!isLoggedIn) {
    alert.trigger('請先登入才能領取優惠券', 'error');
    return;
  }

  try {
    await axios.post(`/coupons/${coupon.value.uuid}/claim/`);
    couponClaimed.value = true;
  } catch (error) {
    const message = error.response?.data?.message || '請稍後再試';
    alert.trigger(`領取優惠券失敗：${message}`, 'error');
  }
};

// 方法：載入更多評論
const loadMoreReviews = () => {
  displayedReviewsCount.value += 10;
};

// 方法：日期格式化
const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('zh-TW', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
};

// 方法：檢查認證狀態
const checkAuth = async () => {
  try {
    await axios.get('/auth/me');
    return true;
  } catch (error) {
    return false;
  }
};

// 方法：獲取餐廳數據
const fetchRestaurantData = async () => {
  try {
    const restaurantUuid = route.params.id;
    const response = await axios.get(`/restaurants/${restaurantUuid}`);
    const data = response.data;

    if (data?.result?.restaurant) {
      // 更新餐廳基本信息
      Object.assign(restaurant, data.result.restaurant);
      placeId.value = data.result.restaurant.placeId;

      // 設置地圖URL
      if (restaurant.latitude && restaurant.longitude) {
        mapUrl.value = `https://www.google.com/maps?q=${restaurant.latitude},${restaurant.longitude}&z=18&output=embed`;
      } else {
        mapUrl.value =
          'https://www.google.com/maps?q=25.0459993,121.5170414&z=18&output=embed';
      }

      // 更新營業時間
      if (data.result.restaurant.openHours) {
        Object.assign(openHours, data.result.restaurant.openHours);
      }
    }

    // 更新其他數據
    if (data.result.promotion) promotion.value = data.result.promotion;
    if (data.result.coupon) coupon.value = data.result.coupon;
    if (data.result.reviews?.length > 0) reviews.value = data.result.reviews;

    // 設定用戶狀態
    if (data.result.userStatus) {
      if (data.result.userStatus.hasClaimedCoupon !== undefined) {
        couponClaimed.value = data.result.userStatus.hasClaimedCoupon;
      }
      if (data.result.userStatus.hasFavorited !== undefined) {
        isFavorite.value = data.result.userStatus.hasFavorited;
      }
    }
  } catch (error) {
    if (error.response?.status === 404) {
      alert.trigger('找不到該餐廳資料', 'error');
    } else {
      alert.trigger('載入餐廳資料失敗，請稍後再試', 'error');
    }
  }
};

// 組件載入時執行
onMounted(fetchRestaurantData);
</script>

<style scoped>
.btn.bg-black {
  background-color: rgb(252, 88, 0);
  border-color: rgb(255, 255, 255);
}

.btn.bg-white {
  background-color: rgb(255, 255, 255);
  border: 1px solid black;
}
</style>
