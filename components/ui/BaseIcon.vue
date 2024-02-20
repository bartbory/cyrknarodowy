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
    case IconTypes.Eye:
      return "/icons/icon-show_color.png";
      break;
    case IconTypes.Yes:
      return "/icons/icon-yes_color.png";
      break;
    case IconTypes.No:
      return "/icons/icon-no_color.png";
      break;
    case IconTypes.Abstain:
      return "/icons/icon-abstain_color.png";
      break;
    case IconTypes.YesFont:
      return "/icons/icon-yes_font.png";
      break;
    case IconTypes.NoFont:
      return "/icons/icon-no_font.png";
      break;
    case IconTypes.AbstainFont:
      return "/icons/icon-abstain_font.png";
      break;
    case IconTypes.Time:
      return "/icons/icon-time_color.png";
      break;
    case IconTypes.Info:
      return "/icons/icon-info_color.png";
      break;
    case IconTypes.Down:
      return "/icons/icon-down.png";
      break;
    case IconTypes.User:
      return "/icons/icon-user_color.png";
      break;

    default:
      break;
  }
});

const labelRender = computed(() => {
  switch (props.icon) {
    case IconTypes.Eye:
      return "Zobacz";
      break;
    case IconTypes.Yes || IconTypes.YesFont:
      return "Głos na tak";
      break;
    case IconTypes.No || IconTypes.NoFont:
      return "Głos na nie";
      break;
    case IconTypes.Abstain || IconTypes.AbstainFont:
      return "Wstrzymanie się od głosu";
      break;
    case IconTypes.Time:
      return "Czas";
      break;
    case IconTypes.Info:
      return "Informacja";
      break;
    case IconTypes.Down:
      return "W dół";
      break;
    case IconTypes.User:
      return "Uzytkownik";
      break;

    default:
      break;
  }
});
</script>

<template>
  <div>
    <img :src="iconRender" :style="size" :aria-label="labelRender" />
  </div>
</template>

<style scoped>
div {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
