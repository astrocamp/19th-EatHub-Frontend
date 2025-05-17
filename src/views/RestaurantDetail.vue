<template>
  <!-- 外層容器設定固定寬度模擬手機螢幕 -->
  <div class="bg-gray-300 sm:flex sm:justify-center">
    <div class="w-full sm:w-[390px] bg-white shadow-lg">

    <Navbar></Navbar>

      <!-- 主要內容區域 -->
      <div class="min-h-[calc(100vh-64px)]">
        <div class="px-4 py-4">
          <!-- 餐廳主圖片 -->
          <div
            class="w-full aspect-[16/9] bg-gray-200 rounded-lg overflow-hidden mb-4"
          >
            <img
              :src="restaurant.imageUrl || 'https://picsum.photos/400/250'"
              :alt="restaurant.name"
              class="w-full h-full object-cover"
            />
          </div>

        <!-- 餐廳名稱和導航按鈕 -->
          <div class="flex justify-between items-center mb-1">
        <!-- 左側：icon + 商家名稱 -->
            <div class="flex items-center">
              <font-awesome-icon
                :icon="['fas', 'home']"
                class="text-blue-500 mr-2"
              />
              <h1 class="text-xl text-black font-bold">
                {{ restaurant.name || '藤原豆腐店' }}
              </h1>
            </div>
        <!-- 最愛按鈕 -->
      <div class="flex items-center space-x-2"></div>
        <button @click="toggleFavorite" class="btn btn-circle btn-lg">
        <font-awesome-icon 
        :icon="[isFavorite ? 'fas' : 'far', 'heart']" 
        class="text-2xl" 
        :class="isFavorite ? 'text-red-500' : 'text-gray-500'" 
         />
         </button>

        <!-- 導航按鈕 -->
            <button @click="navigateToAddress" class="btn btn-circle btn-lg flex items-center space-x-1">
            <font-awesome-icon :icon="['fas', 'location-arrow']" class="text-3xl" />
            </button>
      </div>            

          <!-- 評分區塊 -->
          <div class="flex items-center mb-1">
            <font-awesome-icon
              :icon="['fas', 'star']"
              class="text-yellow-400"
            />
            <span class="ml-2 text-sm text-gray-600">{{
              restaurant.googleRating || '4.5'
            }}</span>
            <span class="ml-1 text-xs text-gray-500"
              >({{ restaurant.userRatingsTotal || 0 }})</span
            >
          </div>

          <!-- 地址區塊 -->
          <div class="flex items-start mb-4">
            <font-awesome-icon
              :icon="['fas', 'map-marker-alt']"
              class="text-gray-500 mt-0.5 mr-2"
            />
            <span class="text-sm text-gray-700">{{
              restaurant.address || '地址載入中...'
            }}</span>
          </div>

          <!-- 地圖區塊 -->
          <div
            class="w-full aspect-[2/1] bg-gray-200 rounded-lg overflow-hidden mb-4"
          >
            <GoogleMapEmbed
              :mapUrl="'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.123456789012!2d-122.4194156846815!3d37.7749292797594!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085808c8c8c8c8c%3A0x8c8c8c8c8c8c8c8c!2sMy+Coffee+Shop!5e0!3m2!1sen!2sus!4v1631234567890'"
              alt="地圖"
              class="w-full h-full object-cover"
            />
          </div>

          <!-- 營業時間區塊 -->

          <div class="mb-6">
            <h3 class="text-base font-bold mb-3">營業時間</h3>
            <div class="space-y-1 text-sm">
              <div class="flex justify-between">
                <span class="text-gray-700">星期一</span>
                <span class="text-gray-700">{{
                  openHours.monday || '未提供'
                }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-700">星期二</span>
                <span class="text-gray-700">{{
                  openHours.tuesday || '未提供'
                }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-700">星期三</span>
                <span class="text-gray-700">{{
                  openHours.wednesday || '未提供'
                }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-700">星期四</span>
                <span class="text-gray-700">{{
                  openHours.thursday || '未提供'
                }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-700">星期五</span>
                <span class="text-gray-700">{{
                  openHours.friday || '未提供'
                }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-700">星期六</span>
                <span class="text-gray-700">{{
                  openHours.saturday || '未提供'
                }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-700">星期日</span>
                <span class="text-gray-700">{{
                  openHours.sunday || '未提供'
                }}</span>
              </div>
            </div>
          </div>

          <!-- 領取優惠券按鈕 -->
<button 
    @click="handleCouponClick"
    :class="[
      'btn w-full rounded-lg mb-2 border transition-colors duration-300',
      couponClaimed ? 'bg-white text-black border-black' : 
        isExpired ? 'bg-gray-300 text-gray-700 border-gray-400' : 
        isNotStarted ? 'bg-gray-300 text-gray-700 border-gray-400' : 'bg-black text-white border-black'
    ]"
    :disabled="isExpired || isNotStarted"
  >
    <font-awesome-icon 
      :icon="couponClaimed ? ['fas', 'check'] : isExpired ? ['fas', 'clock'] : isNotStarted ? ['fas', 'clock'] : ['fas', 'ticket']" 
      class="mr-2" 
    />
    {{ couponButtonText }}
  </button>

<!-- 優惠券詳細資訊 (新增區塊) -->
<div v-if="coupon" class="bg-gray-50 rounded-lg p-4 mb-6">
    <div class="mb-2 flex justify-between items-center">
      <h4 class="text-sm font-bold">優惠券詳細資訊</h4>
    </div>
    
    <div class="space-y-2 text-sm">
      <div>
        <span class="text-gray-500">序號：</span>
        <span class="font-medium">{{ coupon.serialNumber }}</span>
      </div>
      <div>
        <span class="text-gray-500">折扣類型：</span>
        <span class="font-medium">
          {{ coupon.discountType === 'percentage' ? '折扣' : '金額折抵' }}
        </span>
      </div>
      <div>
        <span class="text-gray-500">折扣值：</span>
        <span class="font-medium text-red-500">
          {{ coupon.discountType === 'percentage' ? `${coupon.discountValue}%` : `${coupon.discountValue}元` }}
        </span>
      </div>
      <div>
        <span class="text-gray-500">有效期間：</span>
        <span class="font-medium">{{ formatDate(coupon.startedAt) }} - {{ formatDate(coupon.endedAt) }}</span>
      </div>
      <div v-if="coupon.description">
        <span class="text-gray-500">使用說明：</span>
        <p class="mt-1 text-gray-700">{{ coupon.description }}</p>
      </div>
    </div>
    
    <div v-if="!isExpired && !isNotStarted && !couponClaimed" class="mt-3 text-xs text-gray-500">
      點擊上方按鈕領取優惠券
    </div>
    <div v-else-if="couponClaimed" class="mt-3 text-xs text-gray-500">
      使用時向店家出示此頁面
    </div>
    <div v-else-if="isNotStarted" class="mt-3 text-xs text-gray-500">
      請於活動開始後再來領取
    </div>
    <div v-else-if="isExpired" class="mt-3 text-xs text-gray-500">
      此優惠券已過期
    </div>
  </div>

          <!-- 最新動態區塊 -->
          <div class="mb-6">
            <h3 class="text-base font-bold mb-3">最新動態</h3>
            <div class="space-y-3">
              <div class="card bg-base-100 shadow-sm border">
                <figure v-if="promotion.imageUrl" class="h-40">
                  <img
                    :src="promotion.imageUrl"
                    :alt="promotion.title"
                    class="w-full h-full object-cover"
                  />
                </figure>
                <div class="card-body p-3">
                  <h4 class="font-semibold text-sm">
                    {{ promotion?.title || '暫無活動' }}
                  </h4>
                  <p class="text-sm">
                    {{ promotion?.description || '目前沒有特別活動' }}
                  </p>
                  <p
                    v-if="promotion?.startedAt"
                    class="text-xs text-gray-500 mt-1"
                  >
                    活動期間：{{ formatDate(promotion.startedAt) }} -
                    {{ formatDate(promotion.endedAt) }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- 評論區塊 -->
          <div class="mb-6">
            <div class="flex justify-between items-center mb-3">
              <h3 class="text-base font-bold">
                評論
                <span class="text-sm text-gray-500 font-normal">
                  (共 {{ reviews.length }} 則)
                </span>
              </h3>
              <button class="btn btn-sm bg-red-200 border-0 rounded-3xl px-6">
                <font-awesome-icon :icon="['far', 'clipboard']" /> 新增
              </button>
            </div>

            <div class="space-y-3">
              <div
                v-if="reviews.length === 0"
                class="text-center py-8 text-gray-500"
              >
                暫無評論
              </div>

              <!-- 使用 displayedReviews  -->
              <div
                v-for="review in displayedReviews"
                :key="review.createdAt"
                class="bg-gray-50 rounded-lg p-4"
              >
                <div class="flex items-start">
                  <div class="avatar">
                    <div class="w-10 rounded-full">
                      <img
                        :src="
                          review.user.imageUrl || 'https://picsum.photos/40/40'
                        "
                        :alt="review.user.userName"
                      />
                    </div>
                  </div>
                  <div class="ml-3 flex-1">
                    <div class="flex items-center mb-1">
                      <h4 class="font-semibold text-sm">
                        {{ review.user.userName }}
                      </h4>
                      <div class="ml-2 flex items-center">
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
                    <p class="text-xs text-gray-400 mt-1">
                      {{ formatDate(review.createdAt) }}
                    </p>
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
              <font-awesome-icon
                :icon="['fas', 'chevron-right']"
                class="ml-1"
              />
              <span class="text-xs text-gray-500 ml-1">
                (還有 {{ reviews.length - displayedReviewsCount }} 則)
              </span>
            </button>

            <!-- 已經顯示所有評論時的提示 -->
            <div
              v-else-if="reviews.length > 5"
              class="text-center text-sm text-gray-500 mt-4"
            >
              已顯示所有評論
            </div>
          </div>
        </div>

      </div>
      <Footer></Footer>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import GoogleMapEmbed from '@/components/RecommendDetail/GoogleMapEmbed.vue';
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import axios from '@/axios';

// 添加變量定義
  const reviews = ref([])
  const isFavorite = ref(false)
// 切換最愛狀態的方法
  const toggleFavorite = async () => {
  // 先檢查登入狀態
  const isLoggedIn = await checkAuth()
  if (!isLoggedIn) {
    alert('請先登入才能收藏餐廳')
    return
  }
  try {
    const restaurantId = route.params.id
    
  if (isFavorite.value) {
  await axios.delete(`/restaurants/${restaurantId}/favorite/`)
} else {
  await axios.post(`/restaurants/${restaurantId}/favorite/`)
}
    // 更新本地狀態
  isFavorite.value = !isFavorite.value
    
  } catch (error) {
    console.error('Error updating favorite status:', error)
    alert('更新最愛狀態失敗，請稍後再試')
  }
}
// 使用 useRoute 取得路由資訊
const route = useRoute();

const restaurant = reactive({
  name: '',
  imageUrl: '',
  googleRating: 0,
  address: '',
  latitude: null,
  longitude: null,
  phone: '02-2361-1000',
  userRatingsTotal: 328,
  placeId: 'ChIJpabH4qapQjQRqmx_I-V8sUg',
  website: 'https://example.com',
});

// 預設優惠券資料
const coupon = ref({
  serialNumber: 'COUP2025001',
  startedAt: '2025-01-01T00:00:00Z',
  endedAt: '2025-12-31T23:59:59Z',
  title: '新客優惠 - 九折優惠券',
  description: '首次消費享有九折優惠',
  discountType: 'percentage',
  discountValue: 10,
  uuid: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
});

// 預設優惠活動資料
const promotion = ref({
  title: '週年慶特別活動',
  description: '本月壽星來店消費，出示證件即可獲得免費甜點一份！',
  startedAt: '2025-01-01T00:00:00Z',
  endedAt: '2025-01-31T23:59:59Z',
  imageUrl: 'https://picsum.photos/400/160?random=promo',
});

const openHours = reactive({
  monday: null,
  tuesday: null,
  wednesday: null,
  thursday: null,
  friday: null,
  saturday: null,
  sunday: null,
});



reviews.value = [
  {
    user: {
      userName: '美食喜相逢',
      imageUrl: 'https://picsum.photos/40/40?random=1',
      uuid: 'user-uuid-1',
    },
    rating: 2,
    content: '這裡的拉麵真的超級好吃！...',
    createdAt: '2025-01-15T14:30:00Z',
    imageUrl: null,
  },
  
]

const displayedReviewsCount = ref(3);
const reviewsIncrement = 15;

// 計算屬性：當前應該顯示的評論
const displayedReviews = computed(() => {
  return reviews.value.slice(0, displayedReviewsCount.value);
});

// 計算屬性：是否還有更多評論可以顯示
const hasMoreReviews = computed(() => {
  return displayedReviewsCount.value < reviews.value.length;
});

// 載入更多評論的方法
const loadMoreReviews = () => {
  displayedReviewsCount.value += reviewsIncrement;
};

const couponClaimed = ref(false);
const mapUrl = ref('');

// 定義方法
const fetchRestaurantData = async () => {
  try {
    const restaurantId = route.params.id;

    // 從後端取得資料
const response = await axios.get(`/restaurants/${restaurantId}`)
    const data = response.data
    
    // 更新餐廳資料
    if (data && data.result) {
      // 更新餐廳資料
      if (data.result.restaurant) {
        Object.assign(restaurant, data.result.restaurant);

        // 判斷是否有經緯度
        if (
          data.result.restaurant.latitude &&
          data.result.restaurant.longitude
        ) {
          mapUrl.value = `https://www.google.com/maps?q=${data.result.restaurant.latitude},${data.result.restaurant.longitude}&z=18&output=embed`;
        } else {
          // 預設使用台北車站座標
          mapUrl.value =
            'https://www.google.com/maps?q=25.0459993,121.5170414&z=18&output=embed';
        }
      }

      // 更新營業時間
      if (data.result.restaurant.openHours) {
        Object.assign(openHours, data.result.restaurant.openHours);
      }

      // 設定優惠活動（如果有資料才覆蓋）
      if (data.result.promotion) {
        promotion.value = data.result.promotion;
      }
      
      // 設定優惠券（如果有資料才覆蓋）
        if (data.result.coupon) {
        coupon.value = data.result.coupon
        // 檢查後端回傳的已領取狀態（這裡假設後端會回傳 isClaimed 欄位）
        if (data.result.coupon.isClaimed) {
          couponClaimed.value = true
        }
      }

      // 設定評論（如果有資料才覆蓋）
      if (data.result.reviews && data.result.reviews.length > 0) {
        reviews.value = data.result.reviews;
        displayedReviewsCount.value = 5;
      }

      // 設定最愛狀態（如果後端有提供）
      if (data.result.isFavorite !== undefined) {
        isFavorite.value = data.result.isFavorite;
      }
    }
  } catch (error) {
    console.error('Error fetching restaurant data:', error);
  }
};


// 領取優惠券的方法
const claimCoupon = async () => {
  try {
    const restaurantId = route.params.id
    await axios.post(`/coupons/${coupon.value.uuid}/claim/`) 
    couponClaimed.value = true
  } catch (error) {
       console.error('Error claiming coupon:', error)
    if (error.response) {
    if (error.response.status === 401) {
      alert('請先登入')
    } else if (error.response.status === 403) {
      alert('您已領取過此優惠券')
    } else {
      alert('領取優惠券失敗：' + (error.response.data.message || '請稍後再試'))
    }
  } else {
    alert('網路連線問題，請稍後再試')
  }
}
}

// 計算屬性：優惠券是否已過期
const isExpired = computed(() => {
  if (!coupon.value || !coupon.value.endedAt) return false
  const endDate = new Date(coupon.value.endedAt)
  return endDate < new Date()
})

// 計算屬性：優惠券活動是否尚未開始
const isNotStarted = computed(() => {
  if (!coupon.value || !coupon.value.startedAt) return false
  const startDate = new Date(coupon.value.startedAt)
  return startDate > new Date()
})

// 計算屬性：優惠券按鈕文字
const couponButtonText = computed(() => {
  if (couponClaimed.value) return '已領取優惠券'
  if (isExpired.value) return '活動已結束'
  if (isNotStarted.value) return '活動尚未開始'
  return coupon.value?.title || '領取優惠券'
})

// 處理優惠券按鈕點擊事件
const handleCouponClick = async () => { 
  if (isExpired.value) {
     alert('活動已結束')
     return
  }
  if (isNotStarted.value) {
    alert('活動尚未開始')
    return
  }
  if (!couponClaimed.value) {
    // 檢查登入狀態
    const isLoggedIn = await checkAuth()
    if (!isLoggedIn) {
      alert('請先登入才能領取優惠券')
      return
    }
    await claimCoupon()
  } else {
    alert('您已領取過此優惠券')
  }
}


const navigateToAddress = () => {
  if (restaurant.address) {
    window.open(
      `https://maps.google.com?q=${encodeURIComponent(restaurant.address)}`,
      '_blank'
    );
  }
};

// 日期格式化函數
const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('zh-TW', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
};

// 組件載入時執行
onMounted(() => {
  fetchRestaurantData()
})

// 當要使用收藏我的最愛與優惠券功能時，檢查是否已經登入
const checkAuth = async () => {
  try {
    const response = await axios.get('/auth/me')
    return true // 認證有效
  } catch (error) {
    return false // 認證無效
  }
}
</script>

<style scoped>
/* 確保按鈕在點擊時顏色變化正確 */
.btn:focus {
  outline: none;
}

/* 優惠券按鈕樣式 */
.btn.bg-black {
  background-color: rgb(252, 88, 0);
  border-color: rgb(255, 255, 255);
}

.btn.bg-white {
  background-color: rgb(255, 255, 255);
  border: 1px solid black;
}

/* 導航欄高度固定 */
.navbar {
  height: 64px;
}

/* 內容區域高度計算 */
.min-h-\[calc\(100vh-64px\)\] {
  min-height: calc(100vh - 64px);
}
</style>
