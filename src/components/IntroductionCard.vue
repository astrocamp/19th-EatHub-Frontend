<template>
  <div class="relative bg-secondary pt-10 pb-30 px-6 overflow-hidden">
    <!-- 頂部波浪 -->
    <div class="absolute top-0 left-0 w-full overflow-hidden leading-none">
      <svg class="relative block w-full h-16" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" class="fill-white"></path>
      </svg>
    </div>
    
    <!-- 內容 -->
    <div class="relative z-10">
      <h2 class="text-2xl md:text-4xl font-bold text-center text-neutral mb-4 mt-10">功能介紹</h2>
      <p class="text-center text-neutral mb-10 text-lg md:text-2xl mt-6">探索 EatHub 為你準備的強大功能</p>
      <div class="flex flex-wrap md:gap-6 max-w-4xl mx-auto">
        <div
          v-for="(feature, index) in features"
          :key="index"
          class="bg-white rounded-xl shadow-md overflow-hidden text-neutral w-full max-w-sm mx-auto m-4"
        >
          <img
            :src="feature.img"
            alt="功能圖片"
            class="w-full h-auto object-cover"
          />
          <div class="p-6 space-y-2">
            <h3 class="text-lg font-bold text-neutral">{{ feature.title }}</h3>
            <p class="text-sm">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </div>
    
  
  </div>
</template>

<script setup>
import card01 from '@/assets/images/home_card01.jpg';
import card02 from '@/assets/images/home_card02.jpg';
import card03 from '@/assets/images/home_card03.jpg';
import card04 from '@/assets/images/home_card04.jpg';

const features = [
  {
    title: '智慧推薦在地美食',
    description:
      '整合 Google Map API 和 Open AI 的 API 進行智慧推薦，讓使用者輕鬆找到在地適合美食！',
    img: card01,
  },
  {
    title: '收藏和瀏覽餐廳紀錄',
    description:
      '使用者可以蒐藏並記錄瀏覽過的推薦美食餐廳，不用煩惱下一餐吃什麼，治癒你的選擇性障礙！',
    img: card02,
  },
  {
    title: '導航餐廳和評論分享',
    description:
      '透過一鍵式導航，可以直接導航享受美食，同時留下評論，紀錄和分享美食心得！',
    img: card03,
  },
  {
    title: '商家動態和優惠行銷',
    description:
      '提供後台讓商家可以上傳優惠券和商家動態，帶來整合行銷功效，吸引來客數量。',
    img: card04,
  },
];
</script>
