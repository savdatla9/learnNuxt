<script setup>
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  Table, TableBody, TableCaption,
  TableCell, TableHead, TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Home, TableIcon, Grid3x3 } from 'lucide-vue-next'
import { ref } from 'vue'

  const view = ref('grid')

  const toggleView = () => {
    view.value = view.value === 'grid' ? 'table' : 'grid'
  }

  const { data: product, pending, error } = await useFetch(() => `https://dummyjson.com/products?limit=10`)
</script>

<template>
  <div class="flex justify-center m-3">
    <Button variant="outline" @click="toggleView">
      <span v-if="view === 'table'">
        <TableIcon class="w-8 h-8" /> 
      </span>
      <span v-else>
        <Grid3x3 class="w-8 h-8" />
      </span>
    </Button>
  </div>

  <p v-if="pending">Fetching...</p>
  <pre v-else-if="error">Could not load quote: {{ error.data }}</pre>
  <div v-else>
    <div v-if="view === 'grid'" class="cards">
      <div v-for="product in product.products" :key="product.id" class="card">
        <img :src="product.thumbnail" :alt="product.title" />
        
        <h3>{{ product.title }}</h3>    
        
        <strong>Brand:</strong> {{ product.brand }} <br /> <br />

        <div>
          <span>$ {{ product.price }}</span>    
        </div>  
      </div>
    </div>
    <div v-else class="tables">
      <div class="w-200 text-start">
        <Card>
          <Table class="foreground"> 
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Image</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Brand</TableHead>
                <TableHead>Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow v-for="product in product.products" :key="product.id">
                <TableCell>{{ product.id }}</TableCell>
                <TableCell>
                  <img :src="product.thumbnail" width="25rem" height="auto" :alt="product.title" /> 
                </TableCell>
                <TableCell>{{ product.title }}</TableCell>
                <TableCell>{{ product.brand }}</TableCell>
                <TableCell>$ {{ product.price }}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .cards {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  .tables {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .card {
    border: 1px solid #b9e39e;
    padding: 1rem;
    background-color: transparent;
    border-radius: 9px;
    width: 18rem ;
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
  .card img {
    width: 100%;
    height: 18vh;
    border-radius: 9px;
  }
  a{
    /* color: #333; */
    text-decoration: none;
  }
  a:hover{
    text-decoration: underline;
    color: navy
  }
</style>