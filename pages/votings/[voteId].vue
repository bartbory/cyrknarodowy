<script setup lang="ts">
import type { StatisticsData, GovernmentVoteType } from "~/types/types";
import BaseButton from "~/components/buttons/BaseButton.vue";
import VotingCard from "~/components/cards/VotingCard.vue";
import VoteItem from "~/components/cards/VoteItem.vue";
import checkForVotes from "~/helpers/checkForVotes";
import InfoCard from "~/components/cards/InfoCard.vue";

const userStore = useUserStore();
const showModal = ref(false);
function userModalCloseHandler() {
  showModal.value = !showModal.value;
}

const router = useRouter();
const route = useRoute();

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
  const { data } = await useFetch(`/api/votes/${route.params.voteId}`, {
    method: "GET",
  });
  if (data.value) {
    //@ts-ignore
    vote = data.value.result;
    if (userStore && vote) {
      if (checkForVotes(vote.userVotesAbstain, userStore.userId)) {
        userVote.voteExist = true;
        userVote.vote = "abstain";
        userVote.voteMsg = "Twój głos: Wstrzymuję się";
      } else if (checkForVotes(vote.userVotesNo, userStore.userId)) {
        userVote.voteExist = true;
        userVote.vote = "no";
        userVote.voteMsg = "Twój głos: Przeciw";
      } else if (checkForVotes(vote.userVotesYes, userStore.userId)) {
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
    body: { user: userStore.userId, vote: decision },
  });
}

function goBack() {
  loadingMessage.value = "Wczytuję...";
  isLoading.value = true;
  router.go(-1);
}

async function saveYes() {
  if (userStore.isLogged) {
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
  } else {
    userModalCloseHandler();
  }
}
async function saveNo() {
  if (userStore.isLogged) {
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
  } else {
    userModalCloseHandler();
  }
}
async function saveAbstain() {
  if (userStore.isLogged) {
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
  } else {
    userModalCloseHandler();
  }
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
  isLoading.value = false;
}

// if (userStore.isLogged && userVote.voteExist) {
//   try {
//     isLoading.value = true;
//     const { data } = await useFetch(`/api/votes/${route.params.voteId}/stats`);
//     if (data.value) {
//       genderVotes.value = data.value.data.gender;
//       educationVotes.value = data.value.data.education;
//       voidvodeshipVotes.value = data.value.data.voidvodeship;
//       ageVotes.value = data.value.data.age;
//       usersVotes.value = data.value.data.votes;
//       isLoading.value = false;
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }

await getStats(vote.id);

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
    <div class="head">
      <BaseButton text="Wróć" :hasIcon="false" @click="goBack" />
      <h1>Oddaj swój głos</h1>
    </div>
    <UiLoading v-if="isLoading" :text="loadingMessage" />
    <section v-else>
      <VoteItem
        :hasAction="false"
        :data="vote"
        v-if="vote"
        :has-limits="false"
      />

      <VotingCard
        v-if="vote && !userVote.voteExist"
        @vote-no="saveNo"
        @vote-yes="saveYes"
        @vote-hold="saveAbstain"
      />
      <BaseButton
        v-if="userVote.voteExist"
        :text="userVote.voteMsg"
        :has-icon="false"
        button-type="disable"
      />
    </section>
    <section v-if="!isLoading">
      <CardsStatisticMainCard
        :data="vote"
        title="Głosowanie posłów"
        v-if="vote"
      />

      <h1>Głosowanie użytkowników</h1>
      <div class="votes__stats__container">
        <CardsStatisticAdditionalCard
          v-if="usersVotes"
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
      <InfoCard v-if="!userStore.isLogged">
        <p>
          Chcesz poznać jak rozkładają się głosy w podziale na wiek,
          województwo, płeć czy wykształcenie?
        </p></InfoCard
      >
    </section>
  </div>
  <ModalUnregistredVoteInfo
    v-if="showModal"
    @click="userModalCloseHandler()"
    @close="userModalCloseHandler()"
  />
</template>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.head {
  display: flex;
  gap: 16px;
}

.head > h1 {
  flex: 1 0 50%;
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
