<script setup lang="ts">
import VotesList from "../components/lists/VotesList.vue";
import sittingDates from "../assets/sittingDates.json";
import type { GovernmentVoteType } from "~/types/types";
import BaseDate from "~/components/ui/BaseDate.vue";
import InfoCard from "~/components/cards/InfoCard.vue";

const supabase = useSupabaseClient();
const {
  data: { user },
} = await supabase.auth.getUser();

const route = useRoute();
const router = useRouter();

const routeSitting = route.query?.sitting;

const isLogged = ref(false);
if (user) {
  isLogged.value = true;
}
const activeSitting = ref(
  routeSitting
    ? sittingDates.posiedzenia[+routeSitting - 1]
    : sittingDates.posiedzenia[0]
);
const activeDate = ref(new Date(activeSitting.value.dates[0]));
const isLoading = ref(true);
let votes: Ref<GovernmentVoteType[]> = ref([]);

async function fetchVotings(sitting: number) {
  isLoading.value = true;
  const { data, pending } = await useFetch(`/api/${sitting}/getAllVotes`, {
    params: { sitting: sitting },
  });
  if (data.value) {
    votes.value = data.value.data;
    isLoading.value = false;
  }
}
try {
  const { data } = await useFetch(
    `/api/${activeSitting.value.sitting}/getAllVotes`,
    {
      params: { sitting: activeSitting.value.sitting, date: activeDate },
    }
  );
  if (data.value) {
    votes.value = data.value.data;
    isLoading.value = false;
  }
} catch (error) {
  console.log(error);
}
const votingDate = (date: string) => {
  const parseDate = new Date(date).toLocaleDateString("pl-PL", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
  return parseDate;
};

watch(activeSitting, (newSitting) => {
  isLoading.value = true;
  fetchVotings(newSitting.sitting);
});
</script>

<template>
  <div class="list__container">
    <h1>Lista głosowań</h1>
    <h2>Posiedzenie</h2>
    <div class="dates__container">
      <ButtonsBaseButton
        v-for="(sitting, i) in sittingDates.posiedzenia"
        :key="sitting.dates[i]"
        :text="sitting.sitting.toString()"
        :has-icon="false"
        :button-type="
          sitting.sitting === activeSitting.sitting ? 'default' : 'outline'
        "
        @click="
          () => {
            activeDate = new Date(sitting.dates[0]);
            activeSitting = sitting;
            router.push(`?sitting=${sitting.sitting}`);
          }
        "
      />
    </div>
    <div>
      <h4>Daty</h4>
      <div class="dates__container">
        <BaseDate
          v-for="(sitting, i) in activeSitting.dates"
          :key="i"
          :text="votingDate(sitting)"
          :has-icon="false"
          :button-type="'disable'"
        />
      </div>
    </div>
    <InfoCard v-if="!isLogged" />
    <UiLoading v-if="isLoading" />
    <VotesList :votes="votes" v-if="votes && !isLoading" />
  </div>
</template>

<style scoped>
.dates__container {
  display: flex;
  gap: 8px;
  overflow-x: scroll;
  flex-shrink: 0;
}

.dates__container:deep(button) {
  font-size: 12px;
  min-width: 56px;
}
</style>
