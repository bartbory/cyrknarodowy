<script setup lang="ts">
import BaseButton from "../buttons/BaseButton.vue";
import BaseCard from "../ui/BaseCard.vue";
import { IconTypes } from "~/types/types";

function goToRegister() {
  navigateTo("/account/login");
}
</script>

<template>
  <BaseCard :is-default="false">
    <p>
      Chcesz zagłosować i poznać rozkład głosów na województwa, wiek czy
      wykształcenie? Potrzebujesz założyć konto i uzupełnić swoje dane. Tylko
      dzięki temu możemy wyświetlać takie statystyki.
    </p>
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
