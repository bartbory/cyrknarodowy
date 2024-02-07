<script setup lang="ts">
import type { PropType } from "vue";
import VoteItem from "../cards/VoteItem.vue";
import ReferendumItem from "../cards/ReferendumItem.vue";
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

const supabase = useSupabaseClient();
const {
  data: { user },
} = await supabase.auth.getUser();

const router = useRouter();

function goToVote(voteId: string) {
  if (props.display === "vote") {
    router.push(`/votings/${voteId}`);
  } else {
    router.push(`/votings/referendum/${voteId}`);
  }
}

function checkHasVoted(vote: GovernmentVoteType | ReferendumVoteType) {
  if (user) {
    let hasVoted = false;
    if (
      vote.userVotesNo.find((u) => u.id === user.id) ||
      vote.userVotesYes.find((u) => u.id === user.id) ||
      vote.userVotesAbstain.find((u) => u.id === user.id)
    ) {
      hasVoted = true;
      return hasVoted;
    }
    return hasVoted;
  }
}
</script>

<template>
  <p v-if="votes?.length === 0">Brak informacji.</p>
  <section class="list" v-else>
    <VoteItem
      v-if="display === 'vote'"
      v-for="item in votes?.sort((a, b) =>
        a.votingNumber > b.votingNumber ? 1 : -1
      )"
      :key="item.votingNumber"
      :data="(item as GovernmentVoteType)"
      :has-voted="checkHasVoted(item)"
      @click="goToVote(item.id)"
    />
    <ReferendumItem
      v-if="display === 'referendum'"
      v-for="item in votes?.sort((a, b) =>
        a.votingNumber > b.votingNumber ? -1 : 1
      )"
      :key="item.votingNumber"
      :data="(item as ReferendumVoteType)"
      :has-voted="checkHasVoted(item)"
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
