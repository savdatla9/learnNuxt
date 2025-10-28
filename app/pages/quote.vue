<script setup>
import { Home } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Card, CardTitle } from '@/components/ui/card'

const { data } = await useFetch(`https://dummyjson.com/quotes/random`, {
  method: 'get',
})
</script>

<template>
  <div class="cApp">
    <Card class="m-2">
      <CardTitle class="text-center mb-4 underline">Random Quote</CardTitle>
      
      <h1 class="text-xxl px-2.5 flex flex-row flex-wrap text-center">
        <!-- <Quote class="w-4 h-4 rotate-180" /> -->
        {{ data.quote }}
      </h1>
      
      <div class="mr-12 text-right italic">
        &mdash; {{ data.author }}
      </div>
    </Card>
  </div>
</template>

<style scoped>
  .cApp {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  a{
    /* color: #333 */
    text-decoration: none;
  }
</style>