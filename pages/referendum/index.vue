<script setup lang="ts">
import VotesList from "~/components/lists/VotesList.vue";
import sittingDates from "~/assets/sittingDates.json";
import type { ReferendumVoteType } from "~/types/types";
import InfoCard from "~/components/cards/InfoCard.vue";

useHead({
  title: "Cyrk Narodowy - Referenda",
  meta: [
    { name: "author", content: "Bartosz Borycki" },
    { name: "viewport", content: "width=device-width, initial-scale=1.0" },
  ],
  htmlAttrs: {
    lang: "pl-PL",
  },
});

useSeoMeta({
  ogTitle: "Cyrk Narodowy - Referenda",
  description:
    "Zostań wirtualnym posłem i bierz udział w głosowaniach! Zobaczmy, czy naród podziela zdanie posłów :)",
  ogDescription:
    "Zostań wirtualnym posłem i bierz udział w głosowaniach! Zobaczmy, czy naród podziela zdanie posłów :)",
  ogImage: "/ogImage.png",
});

//Auth Check
const supabase = useSupabaseClient();
const {
  data: { user },
} = await supabase.auth.getUser();

const isLogged = ref(false);
if (user) {
  isLogged.value = true;
}

const router = useRouter();

// Refs
const isLoading = ref(true);
let referendumArray: Ref<ReferendumVoteType[]> = ref([]);

// Fetch votes data
async function fetchReferendum() {
  try {
    const { data } = await useFetch(`/api/referendum`);
    if (data.value) {
      //@ts-ignore
      referendumArray.value = data.value.data;
      isLoading.value = false;
    }
  } catch (error) {
    console.log(error);
  }
}

await fetchReferendum();
</script>

<template>
  <div class="list__container">
    <h2>Posiedzenie</h2>
    <div class="selector__container">
      <div class="dates__container">
        <ButtonsBaseButton
          v-for="(sitting, i) in sittingDates.posiedzenia"
          :key="sitting.dates[i]"
          :text="sitting.sitting.toString()"
          :has-icon="false"
          button-type="outline"
          @click="
            () => {
              router.push(`/votings?sitting=${sitting.sitting}`);
            }
          "
        />
      </div>
      <div>
        <ButtonsBaseButton
          text="Referenda"
          :has-icon="false"
          button-type="default"
          @click="
            () => {
              router.push(`/referendum`);
            }
          "
        />
      </div>
    </div>
  </div>
  <div class="list__container">
    <h1>Lista referendów</h1>

    <InfoCard v-if="!isLogged" />
    <UiLoading v-if="isLoading" />
    <VotesList
      v-if="referendumArray && !isLoading"
      :votes="referendumArray"
      display="referendum"
    />
  </div>
</template>

<style scoped>
.selector__container {
  display: flex;
  gap: 8px;
  flex-shrink: 0;
}
.dates__container {
  display: flex;
  gap: 8px;
  overflow-x: scroll;
  flex-shrink: 1;
}

.dates__container::-webkit-scrollbar {
  display: none;
}

.dates__container:deep(button) {
  font-size: 14px;
  min-width: 48px;
}

.slide__container {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
