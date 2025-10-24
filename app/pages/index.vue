<script setup>
  const count = useState('counter', () => Math.round(Math.random() * 1000))
</script>

<template>
  <div>
    <h1>Home page</h1>

    <div class="cApp">
      <h3>Counter</h3>
      <button @click="count++">+</button>&nbsp;
      <span>{{ count }}</span>&nbsp;
      <button @click="count--">-</button>
    </div>
    <br />
    <NuxtLink to="/about">About page</NuxtLink>
    <br />
    <br />
    <NuxtLink to="/products">Product's page</NuxtLink>
    <br />
    <br />
    <NuxtLink to="/quote">Quote page</NuxtLink>
  </div>
</template>

<style scoped> 
.cApp {
  border: 2px solid #42b983;
  border-radius: 10px;
  padding: 0.5rem;
  margin: 1rem;
}
a{
  color: #789;
  text-decoration: none;
}
a:hover{
  text-decoration: underline;
  color: navy
}
</style>