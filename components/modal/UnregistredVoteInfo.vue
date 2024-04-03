<script setup lang="ts">
import BaseButton from "../buttons/BaseButton.vue";
import BaseModal from "../ui/BaseModal.vue";
</script>

<template>
  <BaseModal>
    <h3>Widzę że głosujesz, super!</h3>
    <p>
      Jeśli nie jesteś zarejestrowany niestety nie zobaczysz szczegółowych wyników.
    </p>
    <p>
      Nie zbieramy wrażliwych danych, zbieramy tylko dane na temat:
      <strong>roku urodzenia</strong>, <strong>województwa</strong>,
      <strong>płci</strong> i <strong>wykształcenia</strong>.
    </p>
    <p>
      Wprowadzenie danych jest opcjonalne,
      ale bez nich statystyki będą znacznie uboższe 🫣
    </p>
    <BaseButton
      button-type="success"
      text="Załóż konto"
      :has-icon="false"
      @click="
        () => {
          navigateTo('/account/register');
        }
      "
    />
  </BaseModal>
</template>

<style scoped>
p {
  font-size: 16px;
  font-weight: 300;
}
</style>
