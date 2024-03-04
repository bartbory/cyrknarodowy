<script setup lang="ts">
import BaseButton from "../buttons/BaseButton.vue";
import BaseCard from "../ui/BaseCard.vue";
import { IconTypes } from "~/types/types";

function goToRegister() {
  navigateTo("/account/register");
}
</script>

<template>
  <BaseCard :is-default="false">
    <slot>
      Załóż konto i głosuj. Weź udział w zabawie rejestrując się w naszym
      systemie.
    </slot>
    <BaseButton
      button-type="default"
      :has-icon="true"
      :icon="IconTypes.User"
      text="Załóż konto"
      @click="goToRegister"
    />
  </BaseCard>
</template>

<style scoped>
.card__container::deep {
  background-color: rgb(var(--yellow700));
}
p {
  font-size: 12px;
  line-height: 20px;
}
</style>
