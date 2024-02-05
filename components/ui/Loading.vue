<script setup lang="ts">
const props = defineProps({
  text: { type: String, required: false, default: "Wczytuję dane" },
});
</script>

<template>
  <div class="loading__container">
    <div class="points__container">
      <div class="point point1"></div>
      <div class="point point2"></div>
      <div class="point point3"></div>
    </div>
    <p>{{ text }}</p>
  </div>
</template>

<style scoped>
.loading__container {
  display: flex;
  flex-direction: column;
  gap: 24px;
  justify-content: center;
  align-items: center;
}

.points__container {
  display: flex;
  flex-direction: row;
  gap: 16px;
}

.point {
  width: 8px;
  height: 8px;
  border-radius: 16px;
  background-color: rgb(var(--blue));
  transform: scale(1);
  animation: pulse 1s both infinite;
}

.point1 {
  animation-delay: 0.25s;
}
.point2 {
  animation-delay: 0.75s;
}
.point3 {
  animation-delay: 0.5s;
}

@keyframes pulse {
  0% {
    transform: scale(1) translateX(-10px) translateY(0);
  }
  20% {
    transform: translateY(-10px);
  }
  80% {
    transform: scale(1.5) translateX(10px) translateY(5px);
  }
  100% {
    transform: scale(1) translateX(-10px) translateY(0);
  }
}
</style>
