<script setup lang="ts">
import BaseButton from "../buttons/BaseButton.vue";
import BaseInput from "../utils/BaseInput.vue";
import BaseCard from "../ui/BaseCard.vue";
import type { UserRegister } from "~/types/types";

const emits = defineEmits(["submitForm"]);

const email = ref("");
const consent = ref(false);
const formValid = ref(false);

function submitHandler() {
  const data: UserRegister = {
    email: email.value,
    consent: consent.value,
  };
  emits("submitForm", data);
}

watch([consent, email], ([newConsentValue, newEmailValue]) => {
  if (newConsentValue === true && newEmailValue !== "") {
    formValid.value = true;
  } else {
    formValid.value = false;
  }
});
</script>
<template>
  <BaseCard>
    <form @submit.prevent>
      {{ email }}
      <BaseInput
        label="E-mail"
        placeholder="jan.kowalski@email.com"
        v-model="email"
        type="email"
      />
      <UtilsBaseCheckbox
        label="Zakładając konto zgadzasz się na gromadzenie danych w celach statystycznych. W każdym momencie możesz usunąć konto, co jest równoznaczne z usunięciem Twoich danych z naszej bazy. usunięcie danych możne potrwać do 30 dni."
        v-model="consent"
      />
      <BaseButton
        text="Zarejestruj się"
        :has-icon="false"
        :button-type="formValid ? 'default' : 'disable'"
        @click.submit="formValid ? submitHandler : ''"
      />
    </form>
  </BaseCard>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
