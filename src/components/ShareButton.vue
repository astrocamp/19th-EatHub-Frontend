<template>
  <!-- 分享按鈕 -->
  <button @click="toggleShareModal" class="btn px-6 rounded-xl bg-gray-200 ">
    <font-awesome-icon
      :icon="['fas', 'share-alt']"
      class="text-xl md:text-2xl text-gray-400"
    />
  </button>

  <!-- 分享彈窗 -->
  <div 
    v-if="showShareModal" 
    class="fixed inset-0 bg-black/80 flex items-center justify-center z-50" 
    @click="closeShareModal"
  >
    <div class="bg-white rounded-lg p-6 m-4 max-w-sm w-full" @click.stop>
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-lg md:text-2xl font-bold mx-auto">分享餐廳</h3>
        <button @click="closeShareModal" class="text-[rgb(87,57,33)]' hover:text-gray-700 ">
          <font-awesome-icon :icon="['fas', 'times']" class="text-xl" />
        </button>
      </div>
      
      <div class="grid grid-cols-2 gap-4">
        <!-- Facebook 分享 -->
        <button 
          @click="shareToFacebook" 
          class="flex flex-col items-center p-3 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
        >
          <div class="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-2">
            <font-awesome-icon :icon="['fab', 'facebook-f']" class="text-white text-xl" />
          </div>
          <span class="text-xs text-gray-700">Facebook</span>
        </button>
        
        <!-- LINE 分享 -->
        <button 
          @click="shareToLine" 
          class="flex flex-col items-center p-3 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
        >
          <div class="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mb-2">
            <font-awesome-icon :icon="['fab', 'line']" class="text-white text-xl" />
          </div>
          <span class="text-xs text-gray-700">LINE</span>
        </button>
        
        <!-- Twitter 分享 -->
        <button 
          @click="shareToTwitter" 
          class="flex flex-col items-center p-3 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
        >
          <div class="w-12 h-12 bg-black rounded-full flex items-center justify-center mb-2">
            <font-awesome-icon :icon="['fab', 'x-twitter']" class="text-white text-xl" />
          </div>
          <span class="text-xs text-gray-700">X</span>
        </button>
        
        <!-- 複製連結 -->
        <button 
          @click="copyLink" 
          class="flex flex-col items-center p-3 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
        >
          <div class="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center mb-2">
            <font-awesome-icon :icon="['fas', 'link']" class="text-white text-xl" />
          </div>
          <span class="text-xs text-gray-700">複製連結</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAlertStore } from '@/stores/alert';

// Props - 從父組件接收資料
const props = defineProps({
  restaurantName: {
    type: String,
    required: true
  },
  restaurantRating: {
    type: [String, Number],
    default: '4.5'
  },
  customTitle: {
    type: String,
    default: ''
  },
  customDescription: {
    type: String,
    default: ''
  }
});

// 使用 alert store
const alert = useAlertStore();

// 響應式資料
const showShareModal = ref(false);

// 方法：切換分享彈窗
const toggleShareModal = () => {
  showShareModal.value = !showShareModal.value;
};

// 方法：關閉分享彈窗
const closeShareModal = () => {
  showShareModal.value = false;
};

// 方法：生成分享內容
const getShareContent = () => {
  const currentUrl = window.location.href;
  
  // 使用傳入的 props 或預設值
  const title = props.customTitle || `${props.restaurantName} - 餐廳推薦`;
  const description = props.customDescription || 
    `我在這裡發現了一家不錯的餐廳：${props.restaurantName}，評分 ${props.restaurantRating} 分！`;
  
  return { currentUrl, title, description };
};

// 方法：Facebook 分享
const shareToFacebook = async () => {
  const { currentUrl, description } = getShareContent();
  const shareContent = `${description}\n\n查看完整資訊：${currentUrl}`;
  
  try {
    // 嘗試複製到剪貼板
    await navigator.clipboard.writeText(shareContent);
    
    // 顯示成功提示
    alert.trigger('✅ 分享內容已複製！Facebook 分享頁面即將開啟', 'success');
    
    // 1.5秒後開啟 Facebook
    setTimeout(() => {
      const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
      window.open(shareUrl, '_blank', 'width=600,height=500');
    }, 1500);
    
  } catch (error) {
    // 如果複製失敗，提供手動方式
    alert.trigger('請在 Facebook 分享框中手動貼上分享內容', 'info');
    
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
    window.open(shareUrl, '_blank', 'width=600,height=500');
  }
  
  closeShareModal();
};

// 方法：LINE 分享
const shareToLine = () => {
  const { currentUrl, description } = getShareContent();
  
  // 準備分享文字（一定包含網址）
  let shareText = description;
  
  // 不管是否為 localhost，都加入網址（讓使用者知道來源）
  if (!currentUrl.includes('localhost') && !currentUrl.includes('127.0.0.1')) {
    shareText += `\n\n查看詳細資訊：${currentUrl}`;
  } else {
    shareText += `\n\n來自尋飽 App：${currentUrl}`;
    
  }
  
  // 使用正確的 LINE 分享格式
  const shareUrl = `https://social-plugins.line.me/lineit/share?text=${encodeURIComponent(shareText)}`;
  
  // 開啟分享視窗
  window.open(shareUrl, '_blank', 'width=600,height=650,scrollbars=yes,resizable=yes');
  
  closeShareModal();
};

// 方法：Twitter 分享
const shareToTwitter = () => {
  const { currentUrl, description } = getShareContent();
  const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(description)}&url=${encodeURIComponent(currentUrl)}`;
  window.open(shareUrl, '_blank', 'width=600,height=400');
  closeShareModal();
};

// 方法：複製連結
const copyLink = async () => {
  try {
    const { currentUrl } = getShareContent();
    await navigator.clipboard.writeText(currentUrl);
    alert.trigger('連結已複製到剪貼板', 'success');
  } catch (error) {
    // 備用方案：使用舊的複製方法
    const textArea = document.createElement('textarea');
    textArea.value = window.location.href;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    alert.trigger('連結已複製到剪貼板', 'success');
  }
  closeShareModal();
};
</script>