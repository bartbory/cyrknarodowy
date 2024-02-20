<script setup lang="ts">
import BaseButton from "~/components/buttons/BaseButton.vue";
import BaseInput from "~/components/utils/BaseInput.vue";
import BaseCard from "~/components/ui/BaseCard.vue";

const supabase = useSupabaseClient();

useHead({
  title: `Cyrk Narodowy - Rejestracja`,
  meta: [
    { name: "author", content: "Bartosz Borycki" },
    { name: "viewport", content: "width=device-width, initial-scale=1.0" },
  ],
  htmlAttrs: {
    lang: "pl-PL",
  },
});

useSeoMeta({
  ogTitle: "Cyrk Narodowy",
  description:
    "Zostań wirtualnym posłem i bierz udział w głosowaniach! Zobaczmy, czy naród podziela zdanie posłów :)",
  ogDescription:
    "Zostań wirtualnym posłem i bierz udział w głosowaniach! Zobaczmy, czy naród podziela zdanie posłów :)",
  ogImage: "/ogImage.png",
});

const email = ref("");
const password = ref("");
const consent = ref(false);
let formValid = reactive({
  msg: "",
  valid: true,
});

const passRegExp = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

function checkIsPassValid(testValue: string) {
  if (!passRegExp.test(testValue)) {
    formValid.msg =
      "Hasło powinno zawierać przynajmniej 6 znaków, jedną cyfrę oraz znak specjalny.";
    formValid.valid = false;
    return false;
  } else {
    return true;
  }
}

function checkIsConsentApproved(testValue: Boolean) {
  if (!testValue) {
    formValid.msg =
      "Żeby się zarejestrować wymagana jest poniższa zgoda. Twoje dane są bezpieczne i służą tylko do zbierania statystyk. Nie martw się ☺️";
    formValid.valid = false;
    return false;
  } else {
    return true;
  }
}

const signInWithPass = async () => {
  formValid.msg = "";
  formValid.valid = true;
  checkIsPassValid(password.value);
  checkIsConsentApproved(consent.value);
  if (formValid.valid) {
    const { data, error } = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
      options: {
        data: {
          consent: consent.value,
        },
        emailRedirectTo: "/account/login",
      },
    });
    if (data) {
      navigateTo("/confirm");
    }
    if (error) {
      switch (error.status) {
        case 400:
          formValid.msg = "Dane logowania nie są poprawne";
          formValid.valid = false;
          break;
        case 409:
          formValid.msg = "Ten użytkownik już istnieje";
          formValid.valid = false;
          break;

        default:
          break;
      }
    }
  }
};

function goToLogin() {
  navigateTo("/account/login");
}

watch([consent, password], ([newConsentValue, newPassValue]) => {
  if (newConsentValue === true && passRegExp.test(newPassValue)) {
    formValid.valid = true;
    formValid.msg = "";
  } else if (newConsentValue === false) {
    formValid.valid = false;
    formValid.msg =
      "Wymagane jest zaznaczenie zgody. Sprawdź też poprawność wpisanych danych";
  } else if (!passRegExp.test(newPassValue)) {
    formValid.valid = false;
    formValid.msg =
      "Hasło powinno zawierać przynajmniej 6 znaków, jedną cyfrę oraz znak specjalny.";
  }
});
</script>
<template>
  <BaseCard>
    <h1>Rejestracja</h1>
    <form @submit.prevent="signInWithPass">
      <BaseInput
        label="E-mail"
        placeholder="jan.kowalski@email.com"
        v-model="email"
        id="email"
        type="email"
      />
      <BaseInput
        label="Hasło"
        placeholder=""
        v-model="password"
        type="password"
        id="password"
        description="Hasło musi mieć conajmniej 6 znaków i zawierać jedną cyfrę oraz znak specjalny"
        :min="6"
      />
      <p v-if="!formValid.valid" class="error__message">{{ formValid.msg }}</p>
      <UtilsBaseCheckbox
        label="Zakładając konto zgadzasz się na gromadzenie danych w celach statystycznych. W każdym momencie możesz usunąć konto, co jest równoznaczne z usunięciem Twoich danych z naszej bazy. usunięcie danych możne potrwać do 30 dni."
        v-model="consent"
      />
      <BaseButton
        text="Zarejestruj się"
        :has-icon="false"
        :button-type="formValid.valid ? 'success' : 'disable'"
        :type="formValid.valid ? 'submit' : 'button'"
      />
    </form>
    <hr />
    <p>Masz już konto?</p>
    <BaseButton
      :has-icon="false"
      text="Zaloguj się i głosuj"
      button-type="outline"
      @click="goToLogin"
    />
  </BaseCard>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
p {
  text-align: center;
}
</style>
