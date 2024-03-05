<script setup lang="ts">
import { IconTypes } from "~/types/types";
import BaseButton from "../buttons/BaseButton.vue";

const showModal = ref(false);

const userStore = useUserStore();

function userProfileHandler() {
  if (userStore.isLogged) {
    navigateTo("/account/user-profile");
  } else {
    navigateTo("/account/login");
  }
}

function infoModalHandler() {
  showModal.value = !showModal.value;
}
</script>
<template>
  <div class="topbar__container">
    <div class="wrapper">
      <BaseButton
        :has-icon="true"
        :icon="IconTypes.Info"
        text=""
        @click="infoModalHandler()"
        aria-label="Informacje"
      />
      <img src="/logo.png" @click="navigateTo('/')" />
      <BaseButton
        :has-icon="userStore.isLogged ? true : false"
        :icon="IconTypes.User"
        :text="userStore.isLogged ? '' : 'Zaloguj'"
        :button-type="userStore.isLogged ? 'default' : 'outline'"
        @click="userProfileHandler()"
        aria-label="Profil użytkownika"
      />
    </div>
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

.wrapper {
  display: flex;
  max-width: 1180px;
  width: 100%;
  height: 56px;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
}

.wrapper:deep(button) {
  margin: 0;
}

img {
  max-height: 40px;
  max-width: 60%;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}
img:hover {
  transform: scale(1.1);
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
