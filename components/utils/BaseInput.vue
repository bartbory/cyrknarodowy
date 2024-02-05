<script setup lang="ts">
const props = defineProps({
  id: {
    type: String,
    default: "",
  },
  label: {
    type: String,
    default: "",
  },
  modelValue: {
    type: [String, Number],
    default: "",
  },
  type: {
    type: String,
    default: "text",
  },
  placeholder: { type: String, default: "text" },
});

const emits = defineEmits(["update:modelValue"]);
</script>

<template>
  <div>
    <label v-if="label" :for="id" class="font-bold block">
      {{ label }}
    </label>
    <input
      :id="id"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      @input="
        $emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
    />
  </div>
</template>

<style scoped>
div {
  display: flex;
  flex-direction: column;
  gap: 4px;
  justify-content: flex-start;
  align-items: flex-start;
}
label {
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
}
input {
  display: flex;
  padding: 8px;
  align-items: center;
  gap: 8px;
  align-self: stretch;
  border-radius: 4px;
  background: rgb(var(--gray900));
  color: rgb(var(--black));
  border: none;
  font-size: 14px;
  font-weight: 300;
}

input::placeholder {
  color: rgb(var(--gray300));
}
</style>
