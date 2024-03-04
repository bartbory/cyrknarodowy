<script setup lang="ts">
import BaseButton from "../buttons/BaseButton.vue";
import BaseModal from "../ui/BaseModal.vue";
</script>

<template>
  <BaseModal>
    <h1>Cześć!</h1>
    <p>Widzę że chcesz oddać głos, super!</p>
    <p>
      Żeby to zrobić musisz założyć konto. Tylko dzięki temu, będziemy mogli
      zbierać informacje o tym, jak głosują ludzie.
    </p>
    <p>
      Dana nie są wrażliwe, zbieramy tylko dane na temat:
      <strong>roku urodzenia</strong>, <strong>województwa</strong>,
      <strong>płci</strong> i <strong>wykształcenia</strong>.
    </p>
    <p>
      Wszystkie dane są oczywiście opcjonalne, możesz ich też nie wprowadzić,
      ale wtedy statystyki będą znacznie uboższe 🫣
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
