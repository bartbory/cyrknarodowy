<script setup lang="ts">
import type { PropType } from "vue";
import { Education } from "~/types/types";

const props = defineProps({
  label: { type: String, required: true },
  options: {
    type: Array as PropType<Education[]>,
    required: true,
  },
  default: {
    type: String as PropType<Education>,
    required: false,
    default: null,
  },
  tabindex: {
    type: Number,
    required: false,
    default: 0,
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
const open = ref(false);
</script>

<template>
  <div class="select__container" :tabindex="tabindex" @blur="open = false">
    <label>{{ label }}</label>
    <div class="selected" :class="{ open: open }" @click="open = !open">
      {{ selected }}
    </div>
    <div class="items" :class="{ selectHide: !open }">
      <div
        v-for="(option, i) of options"
        :key="i"
        @click="
          selected = option;
          open = false;
          $emit('input', option);
        "
      >
        {{ option }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.select__container {
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

.select__container .selected {
  background-color: rgb(var(--gray900));
  border-radius: 4px;
  border: none;
  color: rgb(var(--black));
  padding: 8px;
  cursor: pointer;
  user-select: none;
  position: relative;
}

.select__container .selected.open {
  border: none;
  border-radius: 4px 4px 0px 0px;
}

.select__container .selected:after {
  position: absolute;
  content: "";
  top: 1em;
  right: 1em;
  width: 0;
  height: 0;
  border: 5px solid transparent;
  border-color: rgb(var(--black)) transparent transparent transparent;
}

.select__container .items {
  color: rgb(var(--black));
  border-radius: 0px 0px 4px 4px;
  overflow: hidden;
  position: relative;
  background-color: rgb(var(--gray900));
  left: 0;
  right: 0;
  z-index: 1;
}

.select__container .items div {
  color: rgb(var(--black));
  padding: 8px;
  cursor: pointer;
  user-select: none;
}

.select__container .items div:hover {
  background-color: rgb(var(--gray700));
}

.selectHide {
  display: none;
}
</style>
