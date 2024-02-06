<script setup>
const props = defineProps({
  modelValue: { type: [Array, Boolean] },
  value: { type: [Boolean, Object] },
  label: { type: String },
});
const emit = defineEmits(["update:modelValue"]);
const model = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});
</script>
<template>
  <div>
    <input type="checkbox" v-model="model" :value="value" id="checkbox" />
    <label for="checkbox">{{ label }}</label>
  </div>
</template>

<style scoped>
div {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
}
input {
  width: 24px;
  height: 24px;
  flex-shrink: 0;
}
label {
  color: rgb(var(--black));
  font-family: Inter;
  font-size: 10px;
  font-style: normal;
  font-weight: 300;
  line-height: 14px;
}
</style>
