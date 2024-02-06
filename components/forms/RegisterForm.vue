<script setup lang="ts">
import BaseButton from "../buttons/BaseButton.vue";
import BaseInput from "../utils/BaseInput.vue";
import BaseCard from "../ui/BaseCard.vue";
import type { UserRegister } from "~/types/types";

const emits = defineEmits(["submitFormHandler"]);

const email = ref("");
const password = ref("");
const consent = ref(false);
const formValid = reactive({
  msg: "",
  valid: true,
});

function submitHandler() {
  if (checkIsPassValid()) {
    const data: UserRegister = {
      email: email.value,
      password: password.value,
      consent: consent.value,
    };
    emits("submitFormHandler", data);
  } else {
    console.log(formValid);
  }
}

const passRegExp = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

function checkIsPassValid() {
  if (!passRegExp.test(password.value)) {
    formValid.msg =
      "Hasło powinno zawierać przynajmniej 6 znaków, jedną cyfrę oraz znak specjalny.";
    formValid.valid = false;
  } else {
    return false;
  }
}

watch([consent, email], ([newConsentValue, newEmailValue]) => {
  if (newConsentValue === true && newEmailValue !== "") {

    formValid.valid = true;
  } else {
    formValid.valid = false;
    formValid.msg =
      "Wymagane jest zaznaczenie zgody. Sprawdź też poprawność wpisanych danych";
  }
});
</script>
<template>
  <form @submit.prevent="submitHandler">
    <BaseInput
      label="E-mail"
      placeholder="jan.kowalski@email.com"
      v-model="email"
      type="email"
    />
    <BaseInput
      label="Hasło"
      placeholder=""
      v-model="password"
      type="password"
    />
    <p v-if="!formValid.valid">{{ formValid.msg }}</p>
    <UtilsBaseCheckbox
      label="Zakładając konto zgadzasz się na gromadzenie danych w celach statystycznych. W każdym momencie możesz usunąć konto, co jest równoznaczne z usunięciem Twoich danych z naszej bazy. usunięcie danych możne potrwać do 30 dni."
      v-model="consent"
    />
    <BaseButton
      text="Zarejestruj się"
      :has-icon="false"
      :button-type="formValid.valid ? 'default' : 'disable'"
      :type="formValid.valid ? 'submit' : 'button'"
    />
  </form>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
