<script setup>
import { IconTypes } from "~/types/types";
import InfoCard from "~/components/cards/InfoCard.vue";
</script>
<template>
  <UiBaseCard> <h1>🎪🇵🇱 Witajcie w Cyrku Narodowym! 🇵🇱🎪</h1></UiBaseCard>
  <UiBaseImage image-source="1" image-alt="Cyrk narodowy" />
  <CardsInfoCard />
  <UiBaseCard>
    <div class="content">
      <h2>
        Chcesz poznać, jak Twoje poglądy i opinie kształtują się wśród innych
        obywateli?
      </h2>
      <p>
        Aplikacja Cyrk Narodowy to idealne miejsce, aby się o tym przekonać!
      </p>
      <p>
        📊 W Cyrku Narodowym Twoje głosy mają moc nie tylko wyrażenia opinii,
        ale także dostarczenia cennych danych statystycznych na temat
        różnorodności społeczeństwa.
      </p>
      <p>
        📈 Chociaż nie wpływają one bezpośrednio na decyzje polityczne, to
        jednak stanowią istotny zbiór informacji dla badaczy i analizy trendów
        społecznych.
      </p>
      <h3>Dlaczego warto dołączyć do Cyrku Narodowego?</h3>
      <p>💡 Rzuć światło na różnorodność:</p>
      <ul>
        <li>
          Twoje odpowiedzi pomagają w lepszym zrozumieniu różnic i podobieństw w
          społeczeństwie.
        </li>
        <li>To szansa na poznanie, jak myślą i czują inni obywatele Polski.</li>
      </ul>
      <h3>🔎 Wpłyń na badania społeczne:</h3>
      <ul>
        <li>
          Twoje dane mogą być wykorzystane do prowadzenia badań naukowych i
          analiz społecznych.
        </li>
        <li>
          Twoja aktywność przyczynia się do zgłębiania wiedzy o naszym
          społeczeństwie.
        </li>
      </ul>

      <h3>🔒 Bezpieczne i poufne:</h3>
      <ul>
        <li>Cyrk Narodowy dba o ochronę Twoich danych osobowych.</li>
        <li>
          Twoja poufność jest dla nas priorytetem. Nie zbieramy poufnych
          informacji.
        </li>
      </ul>
      <p>
        Przekonaj się, jak wygląda krajobraz społeczny Polski! Dołącz do Cyrku
        Narodowego już dziś i przyczyń się do lepszego zrozumienia naszego
        społeczeństwa! 🌟📊
      </p>
      <ButtonsBaseButton
        text="Załóż konto"
        button-type="default"
        :has-icon="true"
        :icon="IconTypes.User"
        @click="
          () => {
            navigateTo('/account/register');
          }
        "
      />
    </div>
  </UiBaseCard>
</template>

<style scoped>
h1 {
  text-align: center;
}
.content {
  display: flex;
  flex-direction: column;
  gap: 32px;
  max-width: 1120px;
  padding: 16px;
}
ul,
li {
  list-style-type: none;
}
</style>
