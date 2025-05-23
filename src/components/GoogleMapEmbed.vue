<template>
  <div class="map-container">
    <div class="map-frame-wrapper">
      <iframe
        :src="mapUrl"
        :width="mapWidth"
        :height="mapHeight"
        style="border: 0"
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  shopName: {
    type: String,
    default: '我的店家',
  },
  mapUrl: {
    type: String,
    required: true,
  },
  mapWidth: {
    type: String,
    default: '100%',
  },
  mapHeight: {
    type: String,
    default: '400',
  },
});
</script>

<style scoped>
.map-frame-wrapper iframe {
  width: 100%;
  height: 200px;
  max-width: 100%;
}
</style>
