<script setup lang="ts">
const emits = defineEmits(["close"]);
</script>

<template>
  <Teleport to="body">
    <div class="backdrop" @click="emits('close')">
      <div class="card__container">
        <slot name="default"></slot>
        <UiModalFooter />
        <ButtonsBaseButton
          text="Zamknij"
          :has-icon="false"
          @click="emits('close')"
        />
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.backdrop {
  background-color: rgba(var(--black), 0.7);
  backdrop-filter: blur(4px);
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px;
}
.card__container {
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  row-gap: 16px;
  border-radius: 16px;
  padding: 16px;
  box-shadow: 0px 4px 8px 0px rgba(var(--black), 0.25);
  background-color: rgb(var(--white));
}
</style>
