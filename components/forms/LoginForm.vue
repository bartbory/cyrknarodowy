<script setup lang="ts">
import BaseButton from "../buttons/BaseButton.vue";
import BaseInput from "../utils/BaseInput.vue";
import BaseCard from "../ui/BaseCard.vue";
import type { UserRegister } from "~/types/types";

const emits = defineEmits(["loginFormHandler"]);

const email = ref("");
const password = ref("");
const formValid = reactive({
  msg: "",
  valid: true,
});

const passRegExp = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

function checkIsPassValid() {
  if (!passRegExp.test(email.value))
    formValid.msg =
      "Hasło powinno być zawierać przynajmniej 6 znaków, jedną cyfrę oraz znak specjalny.";
  formValid.valid = false;
}

</script>
<template>
  <form @submit.prevent="loginHandler">
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
      @on-blur="checkIsPassValid()"
    />
    <p>{{ formValid.msg }}</p>
    <BaseButton
      text="Zaloguj się"
      :has-icon="false"
      button-type="default"
      type="submit"
    />
    <NuxtLink to="">Zresetuj hasło</NuxtLink>
  </form>
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
</style>
