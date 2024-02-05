<script setup lang="ts">
import BaseButton from "~/components/buttons/BaseButton.vue";
import BaseInput from "~/components/utils/BaseInput.vue";
import BaseCard from "~/components/ui/BaseCard.vue";
import { Education, Gender, type UserData } from "~/types/types";
import BaseTab from "~/components/utils/BaseTab.vue";

definePageMeta({
  middleware: ["auth"],
});

const supabase = useSupabaseClient();

const {
  data: { user },
} = await supabase.auth.getUser();

const educationsArray = [
  Education.Wyzsze,
  Education.Srednie,
  Education.Zawodowe,
  Education.Gimanzjalne,
  Education.PodstawoweUkonczone,
  Education.PodstawoweNieukonczone,
  Education.Nieustalone,
];
const genderArray = [Gender.Female, Gender.Male, Gender.NonBinary, Gender.NA];

const isLoading = ref(true);
let userData = reactive({
  id: user ? user.id : "",
  name: "",
  gender: Gender.NA,
  education: Education.NA,
  birthYear: "",
  postalCode: "",
  voidvodeship: "",
});

function educationSelectHandler(value: Education) {
  userData.education = value;
}

function genderSelectHandler(value: Gender) {
  userData.gender = value;
}

async function subimtHandler() {
  isLoading.value = true;
  const { data: responseData } = await useFetch(`/api/users/create`, {
    method: "post",
    body: { userData },
  });
  if (responseData) {
    isLoading.value = false;
    navigateTo("/");
  }
}

if (user) {
  try {
    isLoading.value = true;
    const { data } = await useFetch(`/api/users/${user.id}`, { method: "get" });
    if (data.value) {
      //@ts-ignore
      userData = data.value.userData;
      isLoading.value = false;
    }
    isLoading.value = false;
  } catch (error) {
    console.log(error);
  }
}
</script>
<template>
  <BaseCard>
    <h1>Uzupełnij swoje dane</h1>
    <p>
      Wszystkie pola są dobrowolne. Dzięki ich wypełnieniu pozwolisz nam zbierać
      bardziej rzetelne statystyki. Nie przekazujemy nigdzie Twoich danych. W
      każdej chwili możesz je usunąć.
    </p>
    <form @submit.prevent="subimtHandler" v-if="!isLoading">
      <BaseInput
        label="Imię"
        placeholder="Ania"
        v-model="userData.name"
        type="text"
      />
      <BaseInput
        label="Kod pocztowy"
        placeholder="00-000"
        v-model="userData.postalCode"
        type="text"
      />
      <BaseInput
        label="Rok urodzenia"
        placeholder="1980"
        v-model="userData.birthYear"
        type="number"
      />
      <UtilsBaseSelect
        :options="educationsArray"
        label="Wykształcenie"
        :default="userData.education"
        @input="(item: Education) => educationSelectHandler(item)"
      />
      <BaseTab
        label="Płeć"
        :options="genderArray"
        :default="userData.gender"
        @input="(gender: Gender) => genderSelectHandler(gender)"
      />
      <BaseButton
        text="Idę głosować"
        :has-icon="false"
        button-type="default"
        type="submit"
      />
    </form>
    <UiLoading v-else />
  </BaseCard>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
p {
  font-size: 12px;
  font-style: normal;
  font-weight: 300;
  line-height: 20px;
}
</style>
