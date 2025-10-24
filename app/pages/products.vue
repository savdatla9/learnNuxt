<script setup>
    const { data: product, pending, error } = await useFetch(() => `https://dummyjson.com/products?limit=4`)
    console.log(product.value)
</script>

<template>
  <div>
    <p v-if="pending">
      Fetching...
    </p>
    <pre v-else-if="error">Could not load quote: {{ error.data }}</pre>
    <div v-else class="cards">
        <div v-for="product in product.products" :key="product.id" class="card">
            <img :src="product.thumbnail" width="100rem" height="auto" :alt="product.title" />
            <h3>{{ product.title }}</h3>    
            <strong>Brand:</strong> {{ product.brand }} <br /> <br />
            <!-- <sup>{{ product.description }}</sup>   -->
            <div>
              <span>$ {{ product.price }}</span>    
            </div>  
        </div>
    </div>
    <br /><br />
    <NuxtLink to="/quote">
      Quote Page
    </NuxtLink>
    <br /><br />
    <NuxtLink to="/about">
      About Page
    </NuxtLink>
    <br /><br />
    <NuxtLink to="/">
      Back to Home
    </NuxtLink>
  </div>
</template>

<style scoped>
.cards {
    display: flex;
    /* flex-direction: row;
    justify-content: space-evenly; */
    flex-wrap: wrap;
    gap: 0.5rem;
}
.card {
  border: 1px solid #b9e39e;
  padding: 1rem;
  background-color: whitesmoke;
  border-radius: 9px;
  width: 25rem ;
  height: auto;
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
  color: #333;
  text-decoration: none;
}
a:hover{
  text-decoration: underline;
  color: navy
}
</style>