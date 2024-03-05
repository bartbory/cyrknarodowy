<script setup lang="ts">
import BaseButton from "../buttons/BaseButton.vue";
import BaseCard from "../ui/BaseCard.vue";
import { IconTypes } from "~/types/types";

const emits = defineEmits(["voteYes", "voteNo", "voteHold"]);
</script>

<template>
  <BaseCard>
    <div class="voting__container">
      <BaseButton
        button-type="success"
        :has-icon="true"
        :icon="IconTypes.Yes"
        text="Za"
        @click="emits('voteYes')"
      />
      <BaseButton
        button-type="destroy"
        :has-icon="true"
        :icon="IconTypes.No"
        text="Przeciw"
        @click="emits('voteNo')"
      />
      <BaseButton
        button-type="warning"
        :has-icon="true"
        :icon="IconTypes.Abstain"
        text="Wstrzymuję się"
        @click="emits('voteHold')"
      />
    </div>
  </BaseCard>
</template>

<style scoped>
.voting__container {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  margin: 0 auto;
}

.voting__container:deep(button) {
  flex-grow: 1;
  min-width: 100%;
  height: 80px;
}

@media screen and (min-width: 760px) {
  .voting__container {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  .voting__container:deep(button) {
    flex-grow: 1;
    min-width: calc(33.333% - 16px);
  }
}
</style>
