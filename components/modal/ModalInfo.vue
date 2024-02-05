<script setup lang="ts">
import BaseModal from "../ui/BaseModal.vue";
</script>

<template>
  <BaseModal>
    <h1>Cześć!</h1>
    <p>Miło mi że tu jesteś!</p>
    <p>
      Ta aplikacja służy do zabawy. I tylko takie ma przeznaczenie. Żeby móc
      głosować konieczna jest rejestracja.
    </p>
    <p>
      Zebrane tutaj dane służą do prezentacji statystyk. Nie są one w żaden
      sposób wiążące czy też nie wpływają na dzieje narodu 😉
    </p>
    <p>Z czasem planuje wprowadzić pewne uatrakcyjnienia.</p>
    <p>Miłej zabawy!</p>
  </BaseModal>
</template>

<style scoped>
p {
  font-size: 16px;
  font-weight: 300;
}
</style>
