<script setup lang="ts">
import BaseButton from "../buttons/BaseButton.vue";
import BaseCard from "../ui/BaseCard.vue";
import { IconTypes } from "~/types/types";

const emits = defineEmits(["voteYes", "voteNo", "voteHold"]);
</script>

<template>
  <BaseCard>
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
  </BaseCard>
</template>
