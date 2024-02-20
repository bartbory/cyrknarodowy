<script setup lang="ts">
const props = defineProps({
  imageSource: { type: String, required: true },
  imageAlt: { type: String, required: true },
});
</script>

<template>
  <div class="image__slot">
    <img
      :src="'/images/' + imageSource + '.jpg'"
      :alt="imageAlt"
      width="100%"
    />
  </div>
</template>

<style scoped>
.image__slot {
  width: 100%;
  max-width: 1200px;
  aspect-ratio: 1200/630;
  margin: 0 auto;
  border-radius: 24px;
  box-shadow: 0px 4px 8px 0px rgba(var(--black), 0.25);
  overflow: hidden;
}
</style>
