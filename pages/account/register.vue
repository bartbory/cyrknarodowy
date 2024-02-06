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

function checkIsPassValid() {
  if (!passRegExp.test(password.value)) {
    console.log("niepoprawne hasło");
    formValid.msg =
      "Hasło powinno zawierać przynajmniej 6 znaków, jedną cyfrę oraz znak specjalny.";
    formValid.valid = false;
  }
}

const signInWithPass = async () => {
  formValid.msg = "";
  formValid.valid = true;
  checkIsPassValid();
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
      console.log("Register error: ", error.status, error.message);
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
</script>
<template>
  <BaseCard>
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
