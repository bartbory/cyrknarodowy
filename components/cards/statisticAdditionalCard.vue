<script setup lang="ts">
import type { PropType } from "vue";
import {
  IconTypes,
  type GovernmentVoteType,
  type StatisticsData,
} from "~/types/types";
import BaseIcon from "../ui/BaseIcon.vue";

const props = defineProps({
  data: {
    type: Array as PropType<StatisticsData[]>,
    required: true,
  },
  title: { type: String, required: true },
  tableTitle: { type: String, required: true },
});
</script>

<template>
  <UiBaseCard>
    <h2>{{ title }}</h2>
    <div class="head__row">
      <p class="key">{{ tableTitle }}</p>
      <div class="value">
        <BaseIcon :icon="IconTypes.YesFont" :icon-size="16" />
      </div>
      <div class="value">
        <BaseIcon :icon="IconTypes.NoFont" :icon-size="16" />
      </div>
      <div class="value">
        <BaseIcon :icon="IconTypes.AbstainFont" :icon-size="16" />
      </div>
    </div>
    <div class="row" v-for="votes in data" :key="votes.key">
      <p class="key">{{ votes.key }}</p>
      <p class="value">{{ votes.votes.yes.length }}</p>
      <p class="value">{{ votes.votes.no.length }}</p>
      <p class="value">{{ votes.votes.abstain.length }}</p>
    </div>
  </UiBaseCard>
</template>

<style scoped>
.head__row {
  background-color: rgb(var(--gray900));
  border-radius: 4px;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 2px 8px;
}

.head__row > .key {
  font-size: 12px;
  font-weight: 300;
}
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
  max-width: 40%;
  flex: 0 0 40%;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  white-space: wrap;
  text-overflow: ellipsis;
}
.value {
  flex: 0 0 20%;
  text-align: center;
}
</style>
