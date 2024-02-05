<script setup lang="ts">
import BaseButton from "../buttons/BaseButton.vue";
import BaseCard from "../ui/BaseCard.vue";
import BaseIcon from "../ui/BaseIcon.vue";
import type { GovernmentVoteType } from "~/types/types";
import { IconTypes } from "~/types/types";

const props = defineProps({
  data: { type: Object as PropType<GovernmentVoteType>, required: true },
  hasAction: { type: Boolean, default: true },
  hasVoted: { type: Boolean, default: false },
});
const votingDate = computed(() => {
  const parseDate = new Date(props.data.date).toLocaleDateString("pl-PL", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
  return parseDate;
});
</script>

<template>
  <div>
    <BaseCard>
      <div class="card__info">
        <p>{{ votingDate }}</p>
        <p class="op--6">Posiedzenie {{ data.sitting }}</p>
        <p class="op--6">Głosowanie {{ data.votingNumber }}</p>
      </div>
      <div class="card__data">
        <h3>{{ data.title }}</h3>
        <p v-if="data.topic">{{ data.topic }}</p>
      </div>
      <div class="card__action">
        <div class="card__action--timer">
          <BaseIcon :icon="IconTypes.Time" :icon-size="16" />
          <p class="op--6">12 godz. 37 min.</p>
        </div>
        <div class="card__action-options" v-if="hasAction">
          <BaseButton
            :hasIcon="true"
            :text="hasVoted ? 'Zobacz wyniki' : 'Głosuj'"
          />
        </div></div
    ></BaseCard>
  </div>
</template>

<style scoped>
.card__info {
  font-size: 10px;
  color: rgb(var(--black));
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.card__data {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.card__data h3,
.card__data p {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  align-self: stretch;
  overflow: hidden;
  color: rgb(var(--black));
  text-overflow: ellipsis;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
}

.card__data h3 {
  font-size: 14px;
}
.card__data p {
  font-size: 12px;
}

.card__action {
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
}

.card__action--timer {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
  font-size: 10px;
}

.op--6 {
  opacity: 0.6;
}
</style>
