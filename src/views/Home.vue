<template>
  <Navbar></Navbar>
  <div>
    <input type="checkbox" id="my-modal" class="modal-toggle" />
    <div class="modal">
      <div class="modal-box">
        <!-- Tabs -->
        <div role="tablist" class="tabs tabs-bordered mb-4">
          <button
            role="tab"
            class="tab text-base md:text-xl font-medium text-neutral"
            :class="{ 'tab-active': activeTab === 'flavors' }"
            @click="activeTab = 'flavors'"
          >
            {{ t('index.flavorTab') }}
          </button>
          <button
            role="tab"
            class="tab text-base md:text-xl font-medium text-neutral"
            :class="{ 'tab-active': activeTab === 'mains' }"
            @click="activeTab = 'mains'"
          >
            {{ t('index.mainTab') }}
          </button>
          <button
            role="tab"
            class="tab text-base md:text-xl font-medium text-neutral"
            :class="{ 'tab-active': activeTab === 'staples' }"
            @click="activeTab = 'staples'"
          >
            {{ t('index.stapleTab') }}
          </button>
        </div>

        <!-- 全選 / 全取消 -->
        <div class="flex justify-end gap-2 mb-4">
          <button class="btn rounded-xl" @click="selectAll">
            {{ t('index.selectAll') }}
          </button>
          <button class="btn rounded-xl" @click="clearAll">
            {{ t('index.clearAll') }}
          </button>
        </div>

        <!-- 選項按鈕 -->
        <div
          class="flex flex-wrap gap-2 justify-center min-h-[160px] max-w-lg mx-auto"
        >
          <button
            v-for="item in currentOptions"
            :key="item"
            class="btn md:btn-lg rounded-full font-normal text-base md:text-lg"
            @click="toggleCurrent(item)"
            :class="{
              'bg-[var(--color-neutral)] text-white':
                currentSelections.includes(item),
              'btn-outline': !currentSelections.includes(item),
            }"
          >
            {{ t(`options.${item}`) }}
          </button>
        </div>

        <div class="modal-action mt-6">
          <button class="btn btn-primary w-full text-white rounded-xl text-base md:text-xl py-6 hover:btn-secondary" @click="confirmSelections">
            {{ t('index.confirm') }}
          </button>
        </div>
      </div>
    </div>

    <input
      type="checkbox"
      id="validation-modal"
      class="modal-toggle"
      v-model="showValidationModal"
    />
    <div class="modal">
      <div class="modal-box">
        <h3 class="font-bold text-lg text-error mb-4">
          <font-awesome-icon
            :icon="['fas', 'exclamation-triangle']"
            class="mr-2"
          />
          {{ t('index.completeSelection') }}
        </h3>
        <div class="space-y-2">
          <p class="text-gray-700 text-base md:tex-xl">{{ t('index.ensureSelection') }}</p>
          <ul class="list-disc list-inside space-y-1 ml-4 text-base md:text-xl">
            <li v-if="flavors.length === 0" class="text-error">
              {{ t('index.atLeastOneFlavor') }}
            </li>
            <li v-if="mains.length === 0" class="text-error">
              {{ t('index.atLeastOneMain') }}
            </li>
            <li v-if="staples.length === 0" class="text-error">
              {{ t('index.atLeastOneStaple') }}
            </li>
          </ul>
        </div>
        <div class="modal-action">
     
          <button class="btn btn-outline text-base md:text-xl rounded-xl" @click="closeValidationModal">
            {{ t('index.close') }}
          </button>
        </div>
      </div>
    </div>

    <input type="checkbox" id="food-modal" class="modal-toggle" />
    <div class="modal">
      <div class="modal-box w-11/12 max-w-2xl">
        <h3 class="font-bold text-lg mb-4">
          {{ t('index.chooseDishOptions') }}
        </h3>
      </div>
    </div>

    <div
      class="md:pt-5 pt-20 pb-20 space-y-4 text-center bg-page-bg bg-no-repeat bg-auto bg-left-top lg:bg-[left_1000px_top_0]"
    >
      <Slogan />
      <div
        class="w-full max-w-[340px] md:max-w-[700px] mx-auto px-4 bg-white rounded-xl text-white shadow-[0_0_12px_rgba(0,0,0,0.2)] md:mt-5"
      >
        <div class="flex gap-2 md:gap-4">
          <div class="w-1/3 card bg-secondary text-neutral-content mt-4">
            <div
              class="card-body flex items-center justify-center md:text-5xl text-3xl"
            >
              <font-awesome-icon
                :icon="flavorIcon"
                :style="{ color: 'var(--color-neutral)' }"
              />
            </div>
          </div>
          <div class="w-1/3 card bg-secondary text-neutral-content mt-4">
            <div
              class="card-body flex items-center justify-center md:text-5xl text-3xl"
            >
              <font-awesome-icon
                :icon="mainIcon"
                :style="{ color: 'var(--color-neutral)' }"
              />
            </div>
          </div>
          <div class="w-1/3 card bg-secondary text-neutral-content mt-4">
            <div
              class="card-body flex items-center justify-center md:text-5xl text-3xl"
            >
              <font-awesome-icon
                :icon="typeIcon"
                :style="{ color: 'var(--color-neutral)' }"
              />
            </div>
          </div>
        </div>
        <div class="max-w-[960px] mx-auto px-4 mt-6">
          <div class="flex justify-center items-center gap-3 flex-wrap">
            <!-- 主按鈕 -->
            <button
              @click="runSlotMachine"
              class="btn bg-primary text-white rounded-xl font-bold text-lg md:text-2xl p-6 hover:bg-neutral tracking-wider min-w-[120px] sm:min-w-[240px] md:min-w-[360px]"
            >
              {{ t('index.ctaButton') }}
            </button>

            <label
              for="my-modal"
              class="btn bg-gray-200 text-gray-800 border border-gray-200 rounded-lg text-lg md:text-xl p-6 hover:bg-gray-400"
            >
              <font-awesome-icon :icon="['fas', 'sliders']" />
            </label>
          </div>
        </div>

        <br />
      </div>
    </div>
    <div class="p-6 md:p-4 text-center relative">
      <h2
        v-if="restaurants.length > 0"
        class="text-2xl md:text-3xl font-bold mb-4 text-neutral md:pb-10 pd-8"
      >
        {{ t('index.recommendResultTitle') }}
        <span v-if="dishResult">：{{ dishResult }}</span>
      </h2>
      <div
        v-if="isLoading"
        class="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10"
      >
        <span class="loading loading-spinner loading-lg text-primary"></span>
      </div>
      <div v-if="restaurants.length > 0" class="grid gap-4">
        <RestaurantCard
          v-for="r in restaurants"
          :key="r.placeId"
          :restaurant="r"
          @click="handleRecentViewedRestaurant(r)"
          class="w-full max-w-[700px] mx-auto"
        />
      </div>
      <br v-if="restaurants.length > 0" />
      <router-link v-if="restaurants.length > 0" to="/restaurants">
        <br />
        <button
          class="btn btn-primary btn-lg text-white rounded-xl mb-20 mt-5 hover:bg-[rgb(87,57,33)]"
        >
          {{ t('index.seeMoreButton') }}
        </button>
      </router-link>
    </div>
    <IntroductionCard />
    <Footer></Footer>
  </div>
</template>

<script setup>
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import RestaurantCard from '@/components/RestaurantCard.vue';
import Slogan from '@/components/Slogan.vue';
import IntroductionCard from '@/components/IntroductionCard.vue';
import { ref, onMounted, computed } from 'vue';
import axios from '@/axios';
import { useRestaurantStore } from '@/stores/restaurant';
import { useAlertStore } from '@/stores/alert';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const alert = useAlertStore();
const latitude = ref(null);
const longitude = ref(null);
const error = ref(null);
const store = useRestaurantStore();
const restaurants = computed(() => store.restaurants.slice(0, 3));
const dishResult = computed(() => store.dishResult);
const isLoading = ref(false);
const showValidationModal = ref(false);

onMounted(() => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        latitude.value = pos.coords.latitude;
        longitude.value = pos.coords.longitude;
      },
      (err) => {
        error.value = err.message;
      },
    );
  } else {
    error.value = '此瀏覽器不支援 Geolocation';
  }
});

const flavorsOptions = [
  '中式',
  '台式',
  '日式',
  '泰式',
  '韓式',
  '越式',
  '港式',
  '椒麻',
  '咖哩',
  '麻辣',
  '酸辣',
  '碳烤',
  '番茄',
  '水煮',
  '滷/燉',
  '清蒸',
  '泡菜',
  '什錦',
  '酥炸',
  '味增',
  '香煎',
];
const mainsOptions = ['牛肉', '豬肉', '雞肉', '羊肉', '鮮魚', '海鮮', '蔬菜'];
const staplesOptions = [
  '火鍋',
  '燉飯',
  '便當',
  '炒飯',
  '丼飯',
  '酸菜魚',
  '湯麵',
  '乾麵',
  '義大利麵',
  '刀削麵',
  '水餃',
  '健康餐',
  '冬粉',
  '漢堡',
  '壽司',
  '鐵板燒',
  '比薩',
  '通心麵',
  '排餐',
  '板條',
  '包子',
];

const flavors = ref([...flavorsOptions]);
const mains = ref([...mainsOptions]);
const staples = ref([...staplesOptions]);

const handleRecentViewedRestaurant = (r) => {
  store.setRecentViewedRestaurant(r);
};

// 驗證選項函數
const validateSelections = () => {
  const missingSelections = [];

  if (flavors.value.length === 0) {
    missingSelections.push(t('index.atLeastOneFlavor'));
  }
  if (mains.value.length === 0) {
    missingSelections.push(t('index.atLeastOneMain'));
  }
  if (staples.value.length === 0) {
    missingSelections.push(t('index.atLeastOneStaple'));
  }

  return {
    isValid: missingSelections.length === 0,
    missingSelections,
  };
};

const confirmSelections = () => {
  const validation = validateSelections();

  if (!validation.isValid) {
    showValidationModal.value = true;
    return;
  }

  document.getElementById('my-modal').checked = false;
};

const closeValidationModal = () => {
  showValidationModal.value = false;
};

const getRecommendations = async () => {
  isLoading.value = true;

  const payload = {
    flavors: flavors.value,
    mains: mains.value,
    staples: staples.value,
    userLocation: {
      latitude: latitude.value,
      longitude: longitude.value,
    },
  };

  try {
    const { data } = await axios.post('restaurants/', payload);
    store.setSelections(payload);
    store.setResults(data.result);
  } catch {
    const alert = useAlertStore();
    alert.trigger(t('index.getRecommendationsFailed'), 'error');
  } finally {
    isLoading.value = false;
  }
};

const flavorIcon = ref(['fas', 'utensils']);
const mainIcon = ref(['fas', 'utensils']);
const typeIcon = ref(['fas', 'utensils']);

const icons = [
  ['fas', 'mug-saucer'],
  ['fas', 'fish'],
  ['fas', 'lemon'],
  ['fas', 'shrimp'],
  ['fas', 'pizza-slice'],
  ['fas', 'pepper-hot'],
  ['fas', 'ice-cream'],
  ['fas', 'hotdog'],
  ['fas', 'egg'],
  ['fas', 'drumstick-bite'],
  ['fas', 'cookie'],
  ['fas', 'burger'],
  ['fas', 'bone'],
];

let flavorInterval, mainInterval, typeInterval;

const runSlotMachine = async () => {
  flavorInterval = setInterval(() => {
    flavorIcon.value = icons[Math.floor(Math.random() * icons.length)];
  }, 100);
  mainInterval = setInterval(() => {
    mainIcon.value = icons[Math.floor(Math.random() * icons.length)];
  }, 100);
  typeInterval = setInterval(() => {
    typeIcon.value = icons[Math.floor(Math.random() * icons.length)];
  }, 100);

  await getRecommendations();

  clearInterval(flavorInterval);
  clearInterval(mainInterval);
  clearInterval(typeInterval);

  flavorIcon.value = ['fas', 'lightbulb'];
  mainIcon.value = ['fas', 'lightbulb'];
  typeIcon.value = ['fas', 'lightbulb'];
};

const activeTab = ref('flavors');

const currentOptions = computed(() => {
  if (activeTab.value === 'flavors') return flavorsOptions;
  if (activeTab.value === 'mains') return mainsOptions;
  return staplesOptions;
});

const currentSelections = computed(() => {
  if (activeTab.value === 'flavors') return flavors.value;
  if (activeTab.value === 'mains') return mains.value;
  return staples.value;
});

const toggleCurrent = (item) => {
  const listRef =
    activeTab.value === 'flavors'
      ? flavors
      : activeTab.value === 'mains'
        ? mains
        : staples;
  const idx = listRef.value.indexOf(item);
  if (idx >= 0) listRef.value.splice(idx, 1);
  else listRef.value.push(item);
};

const selectAll = () => {
  if (activeTab.value === 'flavors') flavors.value = [...flavorsOptions];
  if (activeTab.value === 'mains') mains.value = [...mainsOptions];
  if (activeTab.value === 'staples') staples.value = [...staplesOptions];
};

const clearAll = () => {
  if (activeTab.value === 'flavors') flavors.value = [];
  if (activeTab.value === 'mains') mains.value = [];
  if (activeTab.value === 'staples') staples.value = [];
};
</script>

<style>
.bg-page-bg {
  background-image: url('@/assets/images/background.jpg');
}
</style>
