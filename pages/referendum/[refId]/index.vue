<script setup lang="ts">
import type { StatisticsData, ReferendumVoteType } from "~/types/types";
import BaseButton from "~/components/buttons/BaseButton.vue";
import VotingCard from "~/components/cards/VotingCard.vue";
import checkForVotes from "~/helpers/checkForVotes";
import ReferendumItem from "~/components/cards/ReferendumItem.vue";
import InfoCard from "~/components/cards/InfoCard.vue";

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

let userVote = reactive({
  vote: "",
  voteMsg: "",
  voteExist: false,
});

try {
  isLoading.value = true;
  // console.log("zaczynam pobieranie");
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
      isLoading.value = false;
    } else {
      isLoading.value = false;
      console.log("Głos nie oddany");
    }
  }
} catch (error) {
  console.log(error);
}

async function userVoteHandler(refId: string, decision: string) {
  isLoading.value = true;
  await useFetch(`/api/referendum/${refId}`, {
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
      isLoading.value = false;
    }
  } catch (error) {
    console.log(error);
    isLoading.value = false;
  }
}

getStats(vote.id);

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
      <BaseButton text="Wróć" :hasIcon="false" @click="goBack" />
      <h1>Oddaj swój głos</h1>
    </div>
    <UiLoading v-if="isLoading" :text="loadingMessage" />
    <section v-else>
      <UiBaseImage :image-source="vote.id" :image-alt="vote.title" />

      <ReferendumItem
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
    <h1>Głosowanie użytkowników</h1>
    <section v-if="!isLoading">
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
