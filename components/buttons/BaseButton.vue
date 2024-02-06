<script setup lang="ts">
import type { PropType } from "vue";
import BaseIcon from "../ui/BaseIcon.vue";
import type { IconTypes } from "~/types/types";

const props = defineProps({
  text: { type: String, required: false },
  hasIcon: { type: Boolean, required: true, default: true },
  icon: {
    type: String as PropType<IconTypes>,
  },
  buttonType: {
    type: String as PropType<
      "default" | "success" | "destroy" | "warning" | "disable" | "outline"
    >,
    required: false,
    default: "default",
  },
  type: {
    type: String as PropType<"button" | "submit" | "reset">,
    default: "button",
  },
});

const styleRender = computed(() => {
  switch (props.buttonType) {
    case "default":
      return "default";
      break;
    case "success":
      return "success";
      break;
    case "destroy":
      return "destroy";
      break;
    case "warning":
      return "warning";
      break;
    case "outline":
      return "outline";
      break;
    case "disable":
      return "disable";
      break;

    default:
      break;
  }
});
</script>

<template>
  <button :class="styleRender" :type="type">
    <BaseIcon v-if="hasIcon && icon" :icon-size="24" :icon="icon" />

    {{ props.text ? text : "" }}
  </button>
</template>

<style scoped>
button {
  min-width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px 16px;
  gap: 8px;
  font-size: 16px;
  font-weight: 300;
  cursor: pointer;
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
.success {
  border: 1px solid rgb(var(--green900));
  background: rgba(var(--green700));
  color: rgba(var(--green100));
}
.destroy {
  border: 1px solid rgb(var(--red900));
  background: rgba(var(--red700));
  color: rgba(var(--red100));
}
.warning {
  border: 1px solid rgb(var(--yellow900));
  background: rgba(var(--yellow700));
  color: rgba(var(--yellow100));
}
.disable {
  border: 1px solid rgb(var(--gray700));
  background: rgba(var(--white));
  color: rgba(var(--gray100));
  cursor: not-allowed;
}
</style>
