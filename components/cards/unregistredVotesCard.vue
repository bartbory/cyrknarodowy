<script setup lang="ts">
import type { PropType } from "vue";
import { IconTypes, type UnregistredVotesData } from "~/types/types";
import BaseIcon from "../ui/BaseIcon.vue";

const props = defineProps({
  data: {
    type: Object as PropType<UnregistredVotesData>,
    required: true,
  },
  title: { type: String, required: true },
  tableTitle: { type: String, required: true },
});
</script>

<template>
  <UiBaseCard>
    <h2>{{ title }}</h2>
    <div class="votes__container">
      <div class="head__row">
        <p class="key">{{ tableTitle }}</p>
        <div class="value">
          <BaseIcon :icon="IconTypes.Yes" :icon-size="16" />
        </div>
        <div class="value">
          <BaseIcon :icon="IconTypes.No" :icon-size="16" />
        </div>
        <div class="value">
          <BaseIcon :icon="IconTypes.Abstain" :icon-size="16" />
        </div>
      </div>
      <div class="row">
        <p class="key">{{ data.key }}</p>
        <p class="value">{{ data.votes.yes }}</p>
        <p class="value">{{ data.votes.no }}</p>
        <p class="value">{{ data.votes.abstain }}</p>
      </div>
    </div>
  </UiBaseCard>
</template>

<style scoped>
.votes__container {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.head__row {
  background-color: rgb(var(--gray900));
  border-radius: 4px;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 2px 4px;
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
  min-height: 32px;
  padding: 2px 4px;
  background-color: rgb(var(--white));
  transition: 0.3s;
}

.row:hover {
  background-color: rgb(var(--gray900));
}
.key {
  max-width: 55%;
  flex: 0 0 55%;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  white-space: wrap;
  text-overflow: ellipsis;
}
.value {
  flex: 0 0 15%;
  text-align: center;
}
</style>
