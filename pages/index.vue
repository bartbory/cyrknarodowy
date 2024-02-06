<script setup lang="ts">
import VotesList from "../components/lists/VotesList.vue";
import sittingDates from "../assets/sittingDates.json";
import type { GovernmentVoteType } from "~/types/types";
import BaseDate from "~/components/ui/BaseDate.vue";
import InfoCard from "~/components/cards/InfoCard.vue";
import dateFormater from "~/helpers/dateFormater";

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

const votesToShow: Ref<GovernmentVoteType[]> = ref([]);
const activeSitting = ref(
  routeSitting
    ? sittingDates.posiedzenia[+routeSitting - 1]
    : sittingDates.posiedzenia[0]
);
const activeDate = ref("");
const isLoading = ref(true);
let votes: Ref<GovernmentVoteType[]> = ref([]);

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

function votingDate(date: string) {
  const parseDate = dateFormater(date);
  return parseDate;
}

function filterVotes(date: string) {
  const filteredVotes = votes.value.filter((vote) => {
    if (dateFormater(vote.date) === date) {
      return vote;
    }
  });
  votesToShow.value = filteredVotes;
}

watch([activeSitting, activeDate], async ([newSitting, newDate]) => {
  isLoading.value = true;
  await fetchVotings(newSitting.sitting);
  filterVotes(dateFormater(newDate));
});
</script>

<template>
  <div class="list__container">
    <h1>Lista głosowań</h1>

    <div class="slide__container">
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
              router.push(`?sitting=${sitting.sitting}`);
              activeSitting = sitting;
              activeDate = sitting.dates[0];
            }
          "
        />
      </div>
    </div>

    <div class="slide__container">
      <h4>Daty</h4>
      <div class="dates__container">
        <BaseDate
          v-for="(sittingDate, i) in activeSitting.dates"
          :key="i"
          :text="votingDate(sittingDate)"
          :has-icon="false"
          :button-type="
            dateFormater(sittingDate) === dateFormater(activeDate)
              ? 'default'
              : 'outline'
          "
          @date-select="
            () => {
              activeDate = sittingDate;
              filterVotes(sittingDate);
            }
          "
        />
      </div>
    </div>

    <InfoCard v-if="!isLogged" />
    <UiLoading v-if="isLoading" />
    <VotesList :votes="votesToShow" v-if="votes && !isLoading" />
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
  font-size: 14px;
  min-width: 48px;
}

.slide__container {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
