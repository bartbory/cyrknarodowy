<script setup lang="ts">
import type { StatisticsData, GovernmentVoteType } from "~/types/types";
import BaseButton from "~/components/buttons/BaseButton.vue";
import VotingCard from "~/components/cards/VotingCard.vue";
import InfoCard from "~/components/cards/InfoCard.vue";
import VoteItem from "~/components/cards/VoteItem.vue";
import checkForVotes from "~/helpers/checkForVotes";

definePageMeta({
  middleware: ["auth"],
});

const supabase = useSupabaseClient();

const router = useRouter();
const route = useRoute();

const {
  data: { user },
} = await supabase.auth.getUser();

const isLogged = ref(false);

if (user) {
  isLogged.value = true;
}

let loadingMessage = ref("Wczytuje dane");
let isLoading = ref(true);

let vote: GovernmentVoteType = reactive({
  id: "",
  date: "",
  abstain: 0,
  description: "",
  no: 0,
  yes: 0,
  sitting: 0,
  sittingDay: 0,
  term: 0,
  notParticipating: 0,
  title: "",
  topic: "",
  totalVoted: 0,
  votingNumber: 0,
  kind: "",
  votes: [],
  userVotesYes: [],
  userVotesNo: [],
  userVotesAbstain: [],
});

let genderVotes: Ref<StatisticsData[]> = ref([]);
let voidvodeshipVotes: Ref<StatisticsData[]> = ref([]);
let educationVotes: Ref<StatisticsData[]> = ref([]);
let ageVotes: Ref<StatisticsData[]> = ref([]);
let usersVotes: Ref<StatisticsData[]> = ref([]);

let userVote = reactive({
  vote: "",
  voteMsg: "",
  voteExist: false,
});

try {
  isLoading.value = true;
  const { data } = await useFetch(`/api/votes/${route.params.voteId}`);
  if (data.value && data.value.result) {
    vote = data.value.result;
    if (user && vote) {
      if (checkForVotes(vote.userVotesAbstain, user.id)) {
        userVote.voteExist = true;
        userVote.vote = "abstain";
        userVote.voteMsg = "Twój głos: Wstrzymuję się";
      } else if (checkForVotes(vote.userVotesNo, user.id)) {
        userVote.voteExist = true;
        userVote.vote = "no";
        userVote.voteMsg = "Twój głos: Przeciw";
      } else if (checkForVotes(vote.userVotesYes, user.id)) {
        userVote.voteExist = true;
        userVote.vote = "yes";
        userVote.voteMsg = "Twój głos: Za";
      }
    }
    isLoading.value = false;
  }
} catch (error) {
  console.log(error);
}

async function userVoteHandler(voteId: string, decision: string) {
  isLoading.value = true;
  await useFetch(`/api/votes/${voteId}`, {
    method: "post",
    body: { user: user!.id, vote: decision },
  });
}

function goBack() {
  loadingMessage.value = "Wczytuję...";
  isLoading.value = true;
  router.go(-1);
}

async function saveYes() {
  loadingMessage.value = "Wysyłam Twój głos";
  isLoading.value = true;
  userVote = {
    vote: "yes",
    voteMsg: "Twój głos: Za",
    voteExist: true,
  };
  await userVoteHandler(vote!.id, "yes");
  await getStats(vote.id);
  isLoading.value = false;
}
async function saveNo() {
  loadingMessage.value = "Wysyłam Twój głos";
  isLoading.value = true;
  userVote = {
    vote: "no",
    voteMsg: "Twój głos: Przeciw",
    voteExist: true,
  };
  await userVoteHandler(vote!.id, "no");
  await getStats(vote.id);
  isLoading.value = false;
}
async function saveAbstain() {
  loadingMessage.value = "Wysyłam Twój głos";
  isLoading.value = true;
  userVote = {
    vote: "asbtain",
    voteMsg: "Twój głos: Wstrzymuje się",
    voteExist: true,
  };
  await userVoteHandler(vote.id, "abstain");
  await getStats(vote.id);
  isLoading.value = false;
}

async function getStats(voteId: string) {
  try {
    isLoading.value = true;
    const { data } = await useFetch(`/api/votes/${voteId}/stats`);
    if (data.value) {
      genderVotes.value = data.value.data.gender;
      educationVotes.value = data.value.data.education;
      voidvodeshipVotes.value = data.value.data.voidvodeship;
      ageVotes.value = data.value.data.age;
      usersVotes.value = data.value.data.votes;
    }
  } catch (error) {
    console.log(error);
  }
}

if (user && userVote.voteExist) {
  try {
    isLoading.value = true;
    const { data } = await useFetch(`/api/votes/${route.params.voteId}/stats`);
    if (data.value) {
      genderVotes.value = data.value.data.gender;
      educationVotes.value = data.value.data.education;
      voidvodeshipVotes.value = data.value.data.voidvodeship;
      ageVotes.value = data.value.data.age;
      usersVotes.value = data.value.data.votes;
      isLoading.value = false;
    }
  } catch (error) {
    console.log(error);
  }
}

useHead({
  title: `Cyrk Narodowy - Głosowanie ${route.params.voteId}`,
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
</script>

<template>
  <div class="list__container">
    <h1>Oddaj swój głos</h1>
    <BaseButton text="Wróć" :hasIcon="false" @click="goBack" />
    <UiLoading v-if="isLoading" :text="loadingMessage" />
    <VoteItem :hasAction="false" :data="vote" v-if="!isLoading && vote" />
    <InfoCard v-if="!isLogged" />
    <VotingCard
      v-if="!isLoading && user && vote && !userVote.voteExist"
      @vote-no="saveNo"
      @vote-yes="saveYes"
      @vote-hold="saveAbstain"
    />
    <BaseButton
      v-if="userVote.voteExist && !isLoading"
      :text="userVote.voteMsg"
      :has-icon="false"
      button-type="disable"
    />
    <section v-if="!isLoading">
      <CardsStatisticMainCard
        :data="vote"
        title="Głosowanie posłów"
        v-if="vote"
      />
      <h1 v-if="userVote.voteExist">Głosowanie narodu</h1>
      <div class="votes__stats__container">
        <CardsStatisticAdditionalCard
          v-if="usersVotes && userVote.voteExist"
          :data="usersVotes"
          title="Według głosów"
          table-title="Głos"
        />
        <CardsStatisticAdditionalCard
          v-if="genderVotes && userVote.voteExist"
          :data="genderVotes"
          title="Według płci"
          table-title="Płeć"
        />
        <CardsStatisticAdditionalCard
          v-if="ageVotes && userVote.voteExist"
          :data="ageVotes"
          title="Według wieku"
          table-title="Przedział wiekowy"
        />
        <CardsStatisticAdditionalCard
          v-if="educationVotes && userVote.voteExist"
          :data="educationVotes"
          title="Według wykształcenia"
          table-title="Wykształcenie"
        />
        <CardsStatisticAdditionalCard
          v-if="voidvodeshipVotes && userVote.voteExist"
          :data="voidvodeshipVotes"
          title="Według województwa"
          table-title="Województwo"
        />
      </div>
    </section>
  </div>
</template>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.votes__stats__container {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
}
.votes__stats__container > div {
  flex: 1 0 100%;
}

@media screen and (width >720px) {
  .votes__stats__container > div {
    flex: 1 0 45%;
  }
}
</style>
