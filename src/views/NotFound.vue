<template>
  <NavBar />
  <!-- 響應式外層容器 -->
  <div
    class="w-full min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900"
  >
    <div class="w-full min-h-screen text-white relative overflow-hidden">
      <!-- 導航欄 -->
      <div
        class="navbar bg-gradient-to-r from-blue-900/90 to-indigo-900/90 backdrop-blur-sm h-16 border-b border-white/10 relative z-10"
      >
        <div class="flex-1 justify-center">
          <h1 class="text-xl font-bold text-center w-full">找不到頁面</h1>
        </div>
      </div>

      <!-- 星星背景容器 -->
      <div class="stars-container absolute inset-0 z-0"></div>

      <!-- 響應式主要內容區域 -->
      <div
        class="min-h-[calc(100vh-8rem)] relative z-10 flex items-center justify-center px-4 py-8"
      >
        <div class="text-center max-w-4xl mx-auto">
          <!-- 404 錯誤碼 - 響應式文字大小 -->
          <div
            class="text-9xl sm:text-8xl md:text-9xl lg:text-[12rem] font-bold text-cyan-400 mb-6 leading-none error-glow"
          >
            404
          </div>

          <!-- 主要訊息 - 響應式文字 -->
          <h1
            class="text-4xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white animate-pulse-text"
          >
            哎呀！您迷失在太空了
          </h1>

          <!-- 副訊息 - 響應式文字 -->
          <p
            class="text-2xl sm:text-3xl md:text-3xl lg:text-2xl mb-8 text-blue-200 max-w-2xl mx-auto"
          >
            您尋找的頁面似乎漂浮到了宇宙的另一端
          </p>

          <!-- 太空人圖標 - 響應式大小 -->
          <div class="astronaut mb-8 relative z-20" ref="astronaut">
            <svg
              class="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 mx-auto text-white drop-shadow-lg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M17,13L12,18L7,13H10V9H14V13H17Z"
              />
            </svg>
          </div>

          <!-- 返回按鈕 - 響應式大小 -->
          <button
            class="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-bold py-3 px-8 sm:py-4 sm:px-10 md:py-5 md:px-12 text-base sm:text-lg md:text-xl rounded-full transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-cyan-500/50 cursor-pointer"
            @click="navigateToHome"
          >
            返回主頁
          </button>
        </div>
      </div>

      <!-- 公司 Logo - 響應式定位 -->
      <div
        class="logo-container absolute top-16 sm:top-24 w-50 h-50 sm:w-60 sm:h-60 md:w-70 md:h-70 z-10"
      >
        <img
          src="/src/assets/images/logo.png"
          alt="EatHub Logo"
          class="w-full h-full object-contain"
        />
      </div>

      <!-- 行星 - 響應式定位和大小 -->
      <div
        class="planet absolute bottom-8 sm:bottom-12 md:bottom-16 right-8 sm:right-12 md:right-16 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 shadow-lg shadow-purple-500/50 z-10"
      ></div>
    </div>
    <base-footer />
  </div>
</template>

<script setup>
import { ref, onMounted, computed, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import NavBar from '@/components/NavBar.vue';
import BaseFooter from '@/components/BaseFooter.vue';

const router = useRouter();

// 導航到首頁
const navigateToHome = () => {
  router.push('/');
};
</script>

<style scoped>
/* 星空背景效果 - 深藍漸層 */
.stars-container {
  background: radial-gradient(
    ellipse at center,
    #1e3a8a 0%,
    #1e1b4b 50%,
    #0f0f23 100%
  );
}

.stars-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-image:
    radial-gradient(1px 1px at 20% 30%, #ffffff 100%, transparent 100%),
    radial-gradient(2px 2px at 40% 70%, #06b6d4 100%, transparent 100%),
    radial-gradient(1px 1px at 90% 40%, #ffffff 100%, transparent 100%),
    radial-gradient(1px 1px at 50% 50%, #ffffff 100%, transparent 100%),
    radial-gradient(2px 2px at 80% 10%, #8b5cf6 100%, transparent 100%),
    radial-gradient(1px 1px at 10% 90%, #ffffff 100%, transparent 100%),
    radial-gradient(1px 1px at 70% 80%, #ffffff 100%, transparent 100%),
    radial-gradient(2px 2px at 60% 30%, #06d6a0 100%, transparent 100%),
    radial-gradient(1px 1px at 30% 20%, #ffffff 100%, transparent 100%),
    radial-gradient(1px 1px at 80% 90%, #ffffff 100%, transparent 100%);
  background-repeat: repeat;
  background-size: 400px 400px;
  opacity: 0.8;
  animation: twinkle 30s ease-in-out infinite;
}

.stars-container::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-image:
    radial-gradient(1px 1px at 10% 20%, #ffffff 100%, transparent 100%),
    radial-gradient(2px 2px at 30% 60%, #a855f7 100%, transparent 100%),
    radial-gradient(1px 1px at 70% 30%, #ffffff 100%, transparent 100%),
    radial-gradient(1px 1px at 85% 70%, #ffffff 100%, transparent 100%),
    radial-gradient(2px 2px at 25% 80%, #f59e0b 100%, transparent 100%),
    radial-gradient(1px 1px at 50% 10%, #ffffff 100%, transparent 100%),
    radial-gradient(1px 1px at 95% 50%, #ffffff 100%, transparent 100%),
    radial-gradient(2px 2px at 15% 40%, #06b6d4 100%, transparent 100%);
  background-repeat: repeat;
  background-size: 350px 350px;
  opacity: 0.6;
  animation: twinkle 40s ease-in-out infinite reverse;
}

@keyframes twinkle {
  0% {
    opacity: 0.4;
    transform: rotate(0deg);
  }
  50% {
    opacity: 1;
    transform: rotate(180deg);
  }
  100% {
    opacity: 0.4;
    transform: rotate(360deg);
  }
}

/* 404 錯誤碼發光效果 - 青藍色 */
.error-glow {
  text-shadow:
    0 0 10px #06b6d4,
    0 0 20px #06b6d4,
    0 0 30px #06b6d4,
    0 0 40px #0891b2;
}

/* 浮動動畫 */
.astronaut {
  animation: astronaut-float 5s ease-in-out infinite;
}

@keyframes astronaut-float {
  0% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-15px) rotate(3deg);
  }
  100% {
    transform: translateY(0px) rotate(0deg);
  }
}

/* Logo 移動動畫 - 響應式調整 */
.logo-container {
  animation: logo-move 18s ease-in-out infinite;
}

@keyframes logo-move {
  0% {
    left: -20%;
    transform: rotate(-5deg) scale(1);
  }
  25% {
    left: 20%;
    transform: rotate(-15deg) scale(1.1);
  }
  50% {
    left: 50%;
    transform: rotate(0deg) scale(1.2);
  }
  75% {
    left: 80%;
    transform: rotate(15deg) scale(1.1);
  }
  100% {
    left: 120%;
    transform: rotate(5deg) scale(1);
  }
}

/* 行星旋轉動畫 - 增強效果 */
.planet {
  animation: planet-rotate 33s linear infinite;
  box-shadow:
    0 0 20px rgba(168, 85, 247, 0.6),
    inset 0 0 20px rgba(236, 72, 153, 0.3);
}

@keyframes planet-rotate {
  0% {
    transform: rotate(0deg) scale(1);
    box-shadow:
      0 0 20px rgba(168, 85, 247, 0.6),
      inset 0 0 20px rgba(236, 72, 153, 0.3);
  }
  50% {
    transform: rotate(180deg) scale(1.15);
    box-shadow:
      0 0 30px rgba(168, 85, 247, 0.8),
      inset 0 0 30px rgba(236, 72, 153, 0.5);
  }
  100% {
    transform: rotate(360deg) scale(1);
    box-shadow:
      0 0 20px rgba(168, 85, 247, 0.6),
      inset 0 0 20px rgba(236, 72, 153, 0.3);
  }
}

@media (max-width: 640px) {
  .error-glow {
    text-shadow:
      0 0 8px #06b6d4,
      0 0 16px #06b6d4,
      0 0 24px #06b6d4;
  }
}

@media (min-width: 641px) and (max-width: 768px) {
  .error-glow {
    text-shadow:
      0 0 12px #06b6d4,
      0 0 24px #06b6d4,
      0 0 36px #06b6d4;
  }
}

@media (min-width: 1024px) {
  .error-glow {
    text-shadow:
      0 0 15px #06b6d4,
      0 0 30px #06b6d4,
      0 0 45px #06b6d4,
      0 0 60px #0891b2;
  }

  @keyframes pulseText {
    0%,
    100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
  }

  .animate-pulse-text {
    animation: pulseText 2s ease-in-out infinite;
    display: inline-block; /* 確保 transform 能正常作用 */
  }
}
</style>
