<script setup lang="ts">
import BaseButton from "~/components/buttons/BaseButton.vue";
import BaseInput from "~/components/utils/BaseInput.vue";
import BaseCard from "~/components/ui/BaseCard.vue";
const supabase = useSupabaseClient();

const email = ref("");
const password = ref("");
const consent = ref(false);
const formValid = ref(false);

const loginMode = ref(false);
const modesArray = ["Rejestracja", "Logowanie"];

watch([consent, email], ([newConsentValue, newEmailValue]) => {
  if (newConsentValue === true && newEmailValue !== "") {
    formValid.value = true;
  } else {
    formValid.value = false;
  }
});

const signInWithPass = async () => {
  const { data, error } = await supabase.auth.signUp({
    email: email.value,
    password: password.value,
    options: {
      emailRedirectTo: "http://localhost:3000/user-profile",
    },
  });
  navigateTo("/confirm");
  if (error) console.log(error);
};

const loginHandler = async () => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  });
  if (data) {
    navigateTo("/user-profile");
  }
};

// const signInWithOtp = async () => {
//   const { error } = await supabase.auth.signInWithOtp({
//     email: email.value,
//     options: {
//       data: { consent: consent.value },
//       emailRedirectTo: "http://localhost:3000/user-profile",
//     },
//   });
//   navigateTo("/confirm");
//   if (error) console.log(error);
// };
</script>
<template>
  <BaseCard>
    <UtilsBaseTab
      :options="modesArray"
      label="Widok"
      @input="loginMode = !loginMode"
    />
    <form @submit.prevent="signInWithPass" v-if="!loginMode">
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
      <UtilsBaseCheckbox
        label="Zakładając konto zgadzasz się na gromadzenie danych w celach statystycznych. W każdym momencie możesz usunąć konto, co jest równoznaczne z usunięciem Twoich danych z naszej bazy. usunięcie danych możne potrwać do 30 dni."
        v-model="consent"
      />
      <BaseButton
        text="Zarejestruj się"
        :has-icon="false"
        :button-type="formValid ? 'default' : 'disable'"
        :type="formValid ? 'submit' : 'button'"
      />
    </form>
    <form v-else @submit.prevent="loginHandler">
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
      <BaseButton
        text="Zaloguj się"
        :has-icon="false"
        button-type="default"
        type="submit"
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
