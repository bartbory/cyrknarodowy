<script setup lang="ts">
import { IconTypes } from "~/types/types";
import BaseButton from "../buttons/BaseButton.vue";

const showModal = ref(false);

function userProfileHandler() {
  navigateTo("/account/user-profile");
}

function infoModalHandler() {
  showModal.value = !showModal.value;
}
</script>
<template>
  <div class="topbar__container">
    <BaseButton
      :has-icon="true"
      :icon="IconTypes.Info"
      text=""
      @click="infoModalHandler()"
      aria-label="Informacje"
    />
    <img src="/logo.png" @click="navigateTo('/')" />
    <BaseButton
      :has-icon="true"
      :icon="IconTypes.User"
      text=""
      button-type="default"
      @click="userProfileHandler()"
      aria-label="Profil użytkownika"
    />
  </div>

  <ModalInfo
    v-if="showModal"
    @click="infoModalHandler()"
    @close="infoModalHandler()"
  />
</template>

<style scoped>
.topbar__container {
  display: flex;
  min-width: 320px;
  width: 100%;
  height: 56px;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
  background: rgb(var(--gray900));
  box-shadow: 0 8px 24px rgba(var(--black), 0.25);
  z-index: 10;
  position: fixed;
}
.topbar__button {
  width: 40px;
  height: 40px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgb(var(--blue));
  color: rgb(var(--white));
  position: relative;
}

img {
  max-height: 40px;
  max-width: 60%;
  cursor: pointer;
}

.side__box {
  position: absolute;
  top: 56px;
  width: 100%;
  background-color: rgb(var(--gray900));
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: 24px;
  justify-content: flex-end;
  align-items: flex-end;
}

.side__box > div {
  cursor: pointer;
}
</style>
