<script setup lang="ts">
import {
  type StatisticsData,
  type ReferendumVoteType,
  type UnregistredVotesData,
  IconTypes,
} from "~/types/types";
import BaseButton from "~/components/buttons/BaseButton.vue";
import VotingCard from "~/components/cards/VotingCard.vue";
import checkForVotes from "~/helpers/checkForVotes";
import ReferendumItem from "~/components/cards/ReferendumItem.vue";
import InfoCard from "~/components/cards/InfoCard.vue";
import StatisticMainCard from "~/components/cards/statisticMainCard.vue";
import UnregistredVotesCard from "~/components/cards/unregistredVotesCard.vue";

const userStore = useUserStore();

const router = useRouter();
const route = useRoute();

const showModal = ref(false);
function userModalCloseHandler() {
  showModal.value = !showModal.value;
}

let loadingMessage = ref("Wczytuje dane");
let isLoading = ref(true);

let vote: ReferendumVoteType = reactive({
  id: "",
  votingNumber: 0,
  date: "",
  description: "",
  title: "",
  topic: "",
  userVotesYes: [],
  userVotesNo: [],
  userVotesAbstain: [],
});

let genderVotes: Ref<StatisticsData[]> = ref([]);
let voidvodeshipVotes: Ref<StatisticsData[]> = ref([]);
let educationVotes: Ref<StatisticsData[]> = ref([]);
let ageVotes: Ref<StatisticsData[]> = ref([]);
let usersVotes: Ref<StatisticsData[]> = ref([]);
let unregistredVotes: UnregistredVotesData = reactive({
  key: "",
  votes: { abstain: 0, no: 0, yes: 0 },
});

let userVote = reactive({
  vote: "",
  voteMsg: "",
  voteExist: false,
});

try {
  isLoading.value = true;
  const { data } = await useFetch(`/api/referendum/${route.params.refId}`, {
    method: "GET",
  });
  if (data.value && data.value.result) {
    vote = data.value.result;
    if (userStore.isLogged && vote) {
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
    } else if (!userStore.isLogged && localStorage.getItem(vote.id)) {
      userVote.voteExist = true;
      userVote.vote = localStorage.getItem(vote.id)!;
      userVote.voteMsg =
        localStorage.getItem(vote.id) === "yes"
          ? "Twój głos: Za"
          : localStorage.getItem(vote.id) === "no"
          ? "Twój głos: Przeciw"
          : "Twój głos: Wstrzymuję się";
    }
    isLoading.value = false;
  }
} catch (error) {
  console.log(error);
}

const userVoteType = computed(() => {
  switch (userVote.vote) {
    case "yes":
      console.log("tak");
      return "success";
      break;
    case "no":
      console.log("nie");
      return "destroy";
      break;
    case "abstain":
      console.log("hold");
      return "warning";
      break;

    default:
      return "disable";
      break;
  }
});

async function userVoteHandler(refId: string, decision: string) {
  isLoading.value = true;
  if (userStore.isLogged) {
    await useFetch(`/api/referendum/${refId}`, {
      method: "post",
      body: { user: userStore.userId, vote: decision },
    });
  } else {
    userStore.addUnregistredVote(vote.id, decision);
    await useFetch(`/api/referendum/${refId}/unregistred`, {
      method: "post",
      body: { vote: decision },
    });
    setTimeout(() => userModalCloseHandler(), 2000);
  }
  await getStats(vote.id);
  isLoading.value = false;
}

function goBack() {
  loadingMessage.value = "Wczytuję...";
  isLoading.value = true;
  router.go(-1);
}

async function saveUserVote(voteType: "yes" | "no" | "abstain") {
  isLoading.value = true;
  loadingMessage.value = "Wysyłam Twój głos";
  if (voteType === "yes") {
    userVote = {
      vote: "yes",
      voteMsg: "Twój głos: Za",
      voteExist: true,
    };
  } else if (voteType === "no") {
    userVote = {
      vote: "no",
      voteMsg: "Twój głos: Przeciw",
      voteExist: true,
    };
  } else {
    userVote = {
      vote: "abstain",
      voteMsg: "Twój głos: Wstrzymuje się",
      voteExist: true,
    };
  }
  await userVoteHandler(vote!.id, voteType);
  isLoading.value = false;
}

async function getStats(refId: string) {
  try {
    isLoading.value = true;
    const { data } = await useFetch(`/api/referendum/${refId}/stats`);
    if (data.value?.data) {
      genderVotes.value = data.value?.data.gender;
      educationVotes.value = data.value?.data.education;
      voidvodeshipVotes.value = data.value?.data.voidvodeship;
      ageVotes.value = data.value?.data.age;
      usersVotes.value = data.value?.data.votes;
      unregistredVotes = data.value?.data.unregistredVotes;
    }
    isLoading.value = false;
  } catch (error) {
    console.log(error);
    isLoading.value = false;
  }
}

await getStats(vote.id);

const seoData = reactive({
  ogTitle: `Cyrk Narodowy - Referendum - ${vote.title}`,
  description:
    "Zostań wirtualnym posłem i bierz udział w głosowaniach! Zobaczmy, czy naród podziela zdanie posłów :)",
  ogDescription:
    "Zostań wirtualnym posłem i bierz udział w głosowaniach! Zobaczmy, czy naród podziela zdanie posłów :)",
  ogImage: `/images/${route.params.refId}.jpg`,
});

useHead({
  title: `Cyrk Narodowy - Referendum - ${vote.title}`,
  meta: [
    { name: "author", content: "Bartosz Borycki" },
    { name: "viewport", content: "width=device-width, initial-scale=1.0" },
  ],
  htmlAttrs: {
    lang: "pl-PL",
  },
});

useSeoMeta({
  ...seoData,
});
</script>

<template>
  <div class="list__container">
    <div class="head">
      <BaseButton
        text=""
        :hasIcon="true"
        :icon="IconTypes.Back"
        @click="goBack"
      />
      <h1>Oddaj swój głos</h1>
    </div>
    <section>
      <UiBaseImage :image-source="vote.id" :image-alt="vote.title" />

      <ReferendumItem
        :hasAction="false"
        :data="vote"
        v-if="vote"
        :has-limits="false"
      />
      <VotingCard
        v-if="vote && !userVote.voteExist"
        text-no="Nie"
        text-yes="Tak"
        @vote-no="saveUserVote('no')"
        @vote-yes="saveUserVote('yes')"
        @vote-abstain="saveUserVote('abstain')"
      />
      <BaseButton
        v-if="userVote.voteExist"
        :text="userVote.voteMsg"
        :has-icon="false"
        :button-type="userVoteType"
      />
    </section>
    <h1>Głosowanie użytkowników</h1>
    <UiLoading v-if="isLoading" :text="loadingMessage" />
    <section v-if="!isLoading">
      <div class="votes__stats__container">
        <CardsStatisticAdditionalCard
          v-if="usersVotes"
          :data="usersVotes"
          :unregistred-data="unregistredVotes"
          :show-unregistred="true"
          title="Według głosów"
          table-title="Głos"
        />
        <CardsStatisticAdditionalCard
          v-if="genderVotes && userVote.voteExist && userStore.isLogged"
          :data="genderVotes"
          title="Według płci"
          table-title="Płeć"
        />
        <CardsStatisticAdditionalCard
          v-if="ageVotes && userVote.voteExist && userStore.isLogged"
          :data="ageVotes"
          title="Według wieku"
          table-title="Przedział wiekowy"
        />
        <CardsStatisticAdditionalCard
          v-if="educationVotes && userVote.voteExist && userStore.isLogged"
          :data="educationVotes"
          title="Według wykształcenia"
          table-title="Wykształcenie"
        />
        <CardsStatisticAdditionalCard
          v-if="voidvodeshipVotes && userVote.voteExist && userStore.isLogged"
          :data="voidvodeshipVotes"
          title="Według województwa"
          table-title="Województwo"
        />
      </div>
      <InfoCard v-if="!userStore.isLogged">
        <p>
          🤔 Chcesz się dowiedzieć jaki jest rozkład głosów w podziale na wiek,
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
