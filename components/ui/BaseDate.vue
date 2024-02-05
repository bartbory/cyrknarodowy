<script setup lang="ts">
const props = defineProps({
  text: { type: String, required: true },
});

const date = computed(() => {
  return props.text.split(".");
});
</script>

<template>
  <div class="outline">
    <p>{{ date[0] }}.{{ date[1] }}</p>
    <p>{{ date[2] }}</p>
  </div>
</template>

<style scoped>
div {
  min-width: 64px;
  height: 40px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 4px 16px;
  font-size: 12px;
  font-weight: 300;
  cursor: pointer;
}
.outline {
  border: 1px solid rgb(var(--gray300));
  background: rgb(var(--white));
  color: rgb(var(--gray300));
}
</style>
