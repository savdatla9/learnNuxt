<template>
  <div class="hello">
    <h2>Hello Nuxt !</h2>
    <nuxt-page />
  </div>
</template>

<style scoped>
.hello {
  font-family: Arial, Helvetica, sans-serif;
  /* font-size: 18px; */
  padding: 2rem;
  text-align: center;
}
.page-enter-active,
.page-leave-active {
  transition: all 0.2s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>