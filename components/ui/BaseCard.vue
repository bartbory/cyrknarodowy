<script setup lang="ts">
const props = defineProps({
  isDefault: { type: Boolean, required: false, default: true },
});
</script>

<template>
  <div
    class="card__container"
    :style="
      isDefault
        ? { backgroundColor: 'rgb(var(--white))' }
        : { backgroundColor: 'rgb(var(--yellow700))' }
    "
  >
    <slot name="default"></slot>
  </div>
</template>

<style scoped>
.card__container {
  display: flex;
  flex-direction: column;
  row-gap: 16px;
  border-radius: 24px;
  padding: 16px;
  box-shadow: 0px 4px 8px 0px rgba(var(--black), 0.25);
  max-width: 1180px;
  width: 100%;
  margin: 0 auto;
}
</style>
