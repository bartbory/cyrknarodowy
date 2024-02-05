<script setup lang="ts">

const props = defineProps({
  label: { type: String, required: true },
  options: {
    type: Array as PropType<String[]>,
    required: true,
  },
  default: {
    type: String,
    required: false,
  },
});

const emits = defineEmits(["input"]);

const selected = ref(
  props.default
    ? props.default
    : props.options.length > 0
    ? props.options[0]
    : null
);
</script>

<template>
  <div class="tab__container">
    <label>{{ label }}</label>
    <div class="tabs">
      <div
        v-for="(option, i) in options"
        :key="i"
        :class="[selected === option ? 'selected' : 'default', 'tab']"
        @click="
          () => {
            selected = option;
            emits('input', option);
          }
        "
      >
        {{ option }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.tab__container {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 14px;
  font-weight: 300;
}
label {
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
}
.tabs {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 8px;
}
.tabs > div {
  flex-grow: 1;
  text-align: center;
  padding: 8px;
  border-radius: 4px;
  cursor: pointer;
}

.default {
  background-color: rgb(var(--gray900));
  color: rgb(var(--black));
}
.selected {
  background-color: rgb(var(--white));
  border:1px solid rgb(var(--blue));
  color: rgb(var(--blue));
}
</style>
