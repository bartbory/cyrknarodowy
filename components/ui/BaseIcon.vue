<script setup lang="ts">
import { IconTypes } from "~/types/types";

const props = defineProps({
  icon: {
    type: String as PropType<IconTypes>,
    required: true,
  },
  iconSize: { type: Number, required: false, default: 24 },
});

const size = computed(() => {
  return { width: `${props.iconSize}px`, height: `${props.iconSize}px` };
});

const iconRender = computed(() => {
  switch (props.icon) {
    case IconTypes.Sitting:
      return "info";
      break;
    case IconTypes.Yes:
      return "yes";
      break;
    case IconTypes.No:
      return "no";
      break;
    case IconTypes.Abstain:
      return "abstain";
      break;
    case IconTypes.Info:
      return "info";
      break;
    case IconTypes.Back:
      return "back";
      break;
    case IconTypes.User:
      return "user";
      break;
    case IconTypes.Referendum:
      return "info";
      break;
    case IconTypes.Login:
      return "info";
      break;
    case IconTypes.Logout:
      return "info";
      break;

    default:
      return "info";

      break;
  }
});

const labelRender = computed(() => {
  switch (props.icon) {
    case IconTypes.Sitting:
      return "Posiedzenia";
      break;
    case IconTypes.Yes:
      return "Głos na tak";
      break;
    case IconTypes.No:
      return "Głos na nie";
      break;
    case IconTypes.Abstain:
      return "Wstrzymanie się od głosu";
      break;
    case IconTypes.Info:
      return "Informacja";
      break;
    case IconTypes.Back:
      return "Wstecz";
      break;
    case IconTypes.User:
      return "Użytkownik";
      break;
    case IconTypes.Referendum:
      return "Lista referend";
      break;
    case IconTypes.Login:
      return "Logowanie";
      break;
    case IconTypes.Logout:
      return "Wylogowanie";
      break;

    default:
      break;
  }
});
</script>

<template>
  <div :style="{ fontSize: size.width, lineHeight: size.width }">
    <nuxt-icon :name="iconRender" :style="size" :aria-label="labelRender" />
  </div>
</template>

<style scoped>
div {
  display: flex;
  justify-content: center;
  align-items: center;
}

div:deep(.nuxt-icon svg) {
  margin: 0;
  width: 1em;
  height: 1em;
}
</style>
