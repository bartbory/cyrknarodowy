<script setup lang="ts">
import TopBar from "../components/ui/TopBar.vue";
</script>
<template>
  <TopBar />
  <main>
    <slot> </slot>
  </main>
</template>

<style scoped>
.video {
  padding-top: 56px;
}
main {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 16px;
  padding-top: 72px;
}
</style>
