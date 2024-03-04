<script setup lang="ts">
const props = defineProps({
  text: { type: String, required: true },
  buttonType: {
    type: String as PropType<"default" | "outline">,
    required: false,
    default: "default",
  },
});

const emits = defineEmits(["date-select"]);

const date = computed(() => {
  return props.text.split(".");
});
</script>

<template>
  <div :class="buttonType" @click="emits('date-select', date.join('.'))">
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
  transition: all 0.3s ease-in-out;
}
div:hover {
  transform: scale(0.95);
}
.default {
  border: 1px solid rgb(var(--blue));
  background: rgb(var(--blue));
  color: rgb(var(--white));
}
.outline {
  border: 1px solid rgb(var(--blue));
  background: rgb(var(--white));
  color: rgb(var(--blue));
}
</style>
