<script setup>
const id = ref(1)
const { data: quote, pending, error } = await useFetch(() => `https://dummyjson.com/quotes/${id.value?id.value:1}`, {
  transform: (data) => data,
  watch: [id],
})
const prev = () => {
  if (id.value === 1) {
    id.value = 1
  }else{
    id.value--
  }
}

</script>

<template>
  <div>
    <button @click="prev()">
      Back
    </button>
    -
    <button @click="id++">
      Next
    </button>

    <p v-if="pending">
      Fetching...
    </p>
    <pre v-else-if="error">Could not load quote: {{ error.data }}</pre>
    <figure
      v-else
      class="card"
    >
      <h3 class="m-4">
        " {{ quote.quote }} "
      </h3>
      <span class="m-4">
        &mdash; {{ quote.author }}
      </span>
    </figure>
    <NuxtLink
      class="underline"
      to="/products"
    >
      Product's Page
    </NuxtLink>
    <br /><br />
    <NuxtLink
      class="underline"
      to="/about"
    >
      About Page
    </NuxtLink>
    <br /><br />
    <NuxtLink
      class="underline"
      to="/"
    >
      Back to Home
    </NuxtLink>
  </div>
</template>

<style scoped>
.card {
  border: 1px solid #b9e39e;
  padding: 1rem;
  background-color: whitesmoke;
  border-radius: 9px;
} 
.card h3 {
  font-size: 20px;
  font-style: italic;
}
.card span {
  font-size: 16px;
  font-weight: bold;
  color: green;
}
a{
  color: #333
}
</style>