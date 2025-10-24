<!-- <script setup lang="ts">
  const definePageMeta({
    pageTransition: {
      name: 'rotate',
    },
})
</script> -->

<template>
  <div class="back">
    <h1>About page</h1>
    <NuxtLink to="/products">Product's Page</NuxtLink>
    <br /><br />
    <NuxtLink to="/">Home page</NuxtLink>
    <br /><br />
    <NuxtLink to="/quote">Quote page</NuxtLink>
  </div>
</template>

<style scoped>
.back {
  border: 1px solid #b9e39e;
  padding: 1rem;
  position: relative;
  background-color: #b8e39e87;
}

a{
  color: #2c3e50;
  font-weight: bold;
  text-decoration: none;
}
a:hover{
  text-decoration: underline;
  color: navy
}
</style>