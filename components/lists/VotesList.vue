<script setup lang="ts">
import type { PropType } from "vue";
import VoteItem from "../cards/VoteItem.vue";
import ReferendumItem from "../cards/ReferendumItem.vue";
import checkHasVotesOnList from "~/helpers/checkHasVotesOnList";
import type {
  GovernmentVoteType,
  ReferendumVoteType,
  UserData,
} from "~/types/types";

const props = defineProps({
  votes: {
    type: Object as PropType<
      GovernmentVoteType[] | ReferendumVoteType[] | null
    >,
    required: true,
  },
  display: {
    type: String as PropType<"vote" | "referendum">,
    required: false,
    default: "vote",
  },
});

const userStore = useUserStore();
const router = useRouter();

function goToVote(voteId: string) {
  if (props.display === "vote") {
    router.push(`/votings/${voteId}`);
  } else {
    router.push(`/referendum/${voteId}`);
  }
}
</script>

<template>
  <p v-if="votes?.length === 0">Brak głosowań</p>
  <section class="list" v-else>
    <VoteItem
      v-if="display === 'vote'"
      v-for="item in votes?.sort((a, b) =>
        a.votingNumber > b.votingNumber ? 1 : -1
      )"
      :key="item.votingNumber"
      :data="(item as GovernmentVoteType)"
      :has-voted="checkHasVotesOnList(item, userStore.userId)"
      @click="goToVote(item.id)"
    />
    <ReferendumItem
      v-if="display === 'referendum'"
      v-for="item in votes?.sort((a, b) =>
        a.votingNumber > b.votingNumber ? -1 : 1
      )"
      :key="item.votingNumber"
      :data="(item as ReferendumVoteType)"
      :has-voted="checkHasVotesOnList(item, userStore.userId)"
      @click="goToVote(item.id)"
    />
  </section>
</template>

<style scoped>
.list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
