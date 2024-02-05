<script setup lang="ts">
import type { PropType } from "vue";
import type { GovernmentVoteType } from "~/types/types";

const props = defineProps({
  data: { type: Object as PropType<GovernmentVoteType>, required: true },
  title: { type: String, required: true },
});

let voteResult = {
  yes: props.data.yes,
  no: props.data.no,
  abstain: props.data.abstain,
  totalVoted: props.data.totalVoted,
  absent: props.data.absent || 0,
};
</script>

<template>
  <UiBaseCard>
    <h2>{{ title }}</h2>
    <div class="row">
      <p class="key">Za</p>
      <p class="value">{{ voteResult.yes }}</p>
    </div>
    <div class="row">
      <p class="key">Przeciw</p>
      <p class="value">{{ voteResult.no }}</p>
    </div>
    <div class="row">
      <p class="key">Wstrzymało się</p>
      <p class="value">{{ voteResult.abstain }}</p>
    </div>
    <div class="row">
      <p class="key">Głosowało</p>
      <p class="value">{{ voteResult.totalVoted }}</p>
    </div>
    <div class="row">
      <p class="key">Nieobecnych</p>
      <p class="value">{{ voteResult.absent }}</p>
    </div>
  </UiBaseCard>
</template>

<style scoped>
.row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  font-weight: 300;
  padding: 2px 8px;
}
.key {
  flex: 0 0 60%;
}
.value {
  flex: 0 0 40%;
  text-align: right;
}
</style>
