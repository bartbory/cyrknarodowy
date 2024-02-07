<template>
  <div class="footer__container">
    <p class="description"><strong>Materiały źródłowe</strong></p>
    <div class="footer__row"><p>api.sejm.gov.pl | api.stat.gov.pl</p></div>
    <p class="description"><strong>Autor</strong></p>
    <div class="footer__row">
      <p>
        <NuxtLink
          to="https://www.linkedin.com/in/bartosz-borycki-8307527b/"
          target="_blank"
          >Bartosz Borycki
        </NuxtLink>
      </p>
      <NuxtLink to="https://buycoffee.to/bartoszborycki" target="_blank"
        ><div><img src="/buycoffee.png" width="100px" /></div
      ></NuxtLink>
    </div>
  </div>
</template>

<style scoped>
.footer__container {
  font-size: 12px;
  font-weight: 300;
  display: flex;
  flex-direction: column;
  gap: 8px;
  justify-content: center;
  align-items: center;
}

.footer__row {
  display: flex;
  gap: 16px;
}

.footer__container a {
  color: rgb(var(--blue));
}

.footer__row > img {
  width: 100px;
}
</style>
