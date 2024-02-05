<script setup lang="ts">
import BaseCard from "~/components/ui/BaseCard.vue";

</script>

<template>
  <BaseCard>
    <h1>Świetnie</h1>
    <p>
      Sprawdź teraz swoją skrzynkę i kliknij w link potwierdzający. Już nie
      wiele brakuje, żeby Twój głos był widziany w statystykach!
    </p>
    <p>
      Po kliknięciu linku aktywującego w mailu, uzupełnij podstawowe dane,
      dzięki którym będziemy mogli zbierać dane statystyczne na temat głosowań
      takie jak: województwo, wiek czy wykształcenie. Wszystkie dane są
      dobrowolne i możesz je w każdym momencie usunąć.
    </p>
    <p>
      Mam jednak nadzieję, że zostaniesz z nami na dłużej i będziesz głosować
      jak Ci serce i rozum podpowiada :) Miłej zabawy!
    </p>
  </BaseCard>
</template>

<style scoped>
p {
  font-weight: 300;
  font-size: 16px;
  line-height: 24px;
}
</style>
