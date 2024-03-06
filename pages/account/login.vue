<script setup lang="ts">
import BaseButton from "~/components/buttons/BaseButton.vue";
import BaseInput from "~/components/utils/BaseInput.vue";
import BaseCard from "~/components/ui/BaseCard.vue";
const supabase = useSupabaseClient();

const userStore = useUserStore();

useHead({
  title: `Cyrk Narodowy - Logowanie`,
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
let formValid = reactive({
  msg: "",
  valid: true,
});
const isLoading = ref(false);

const loginHandler = async () => {
  isLoading.value = true;
  formValid.msg = "";
  formValid.valid = true;
  if (formValid.valid) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    });
    if (data.user) {
      userStore.login(data.user.id);
      navigateTo("/account/user-profile");
      isLoading.value = false;
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
  isLoading.value = false;
};

function goToRegister() {
  navigateTo("/account/register");
}
</script>
<template>
  <BaseCard>
    <h1>Logowanie</h1>
    <UiLoading v-if="isLoading" />
    <form @submit.prevent="loginHandler" v-else>
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
      />
      <p v-if="!formValid.valid" class="error__message">{{ formValid.msg }}</p>
      <BaseButton
        text="Zaloguj się"
        :has-icon="false"
        button-type="success"
        type="submit"
      />
      <NuxtLink to="">Zresetuj hasło</NuxtLink>
    </form>
    <hr />
    <p>Nie masz konta?</p>
    <BaseButton
      :has-icon="false"
      text="Załóż konto i głosuj"
      button-type="outline"
      @click="goToRegister"
    />
  </BaseCard>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

a {
  font-size: 12px;
  font-weight: 300;
  text-align: center;
  color: rgb(var(--blue));
}
p {
  text-align: center;
}
</style>
