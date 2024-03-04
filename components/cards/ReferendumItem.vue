<script setup lang="ts">
import BaseButton from "../buttons/BaseButton.vue";
import BaseCard from "../ui/BaseCard.vue";
import type { ReferendumVoteType } from "~/types/types";

const props = defineProps({
  data: { type: Object as PropType<ReferendumVoteType>, required: true },
  hasAction: { type: Boolean, default: true },
  hasVoted: { type: Boolean, default: false },
  hasLimits: { type: Boolean, default: true },
});
</script>

<template>
  <div>
    <BaseCard>
      <div class="card__data">
        <h3 :class="hasLimits ? 'limit' : ''">{{ data.title }}</h3>
        <p v-if="data.topic" :class="hasLimits ? 'limit' : ''">
          {{ data.topic }}
        </p>
        <p v-if="data.description" :class="hasLimits ? 'limit' : ''">
          {{ data.description }}
        </p>
      </div>
      <div class="card__action">
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
  align-self: stretch;
  color: rgb(var(--black));
  font-style: normal;
  font-weight: 300;
  line-height: normal;
}

.limit {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card__data h3 {
  font-size: 16px;
}
.card__data p {
  font-size: 14px;
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
