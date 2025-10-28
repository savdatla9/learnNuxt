<script setup>

</script>

<template>
  <div class="back">
    <h1 class="text-[25px] font-semibold">About page</h1>

    <p class="mt-3">
      This is a simple Nuxt 4 application demonstrating fetching data from an external API and displaying it in different views.  <br/> <br/>
      You can navigate to the Quote page to see a random quote fetched from a dummy API. <br/> <br/>
      You can navigate to the Products page to see a list of products fetched from a dummy API. <br/>
      Use the buttons provided to switch between grid and table views on the Products page.  <br/> <br/>
      Lastly, unsplash API is used to fetch my account images for display. <br/> <br/>
    </p>
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
  /* color: #2c3e50; */
  font-weight: bold;
  text-decoration: none;
}
a:hover{
  text-decoration: underline;
  color: navy
}
</style>