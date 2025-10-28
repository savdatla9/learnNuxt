<script setup>
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Home, ImagePlay, ImageDown, Smartphone } from 'lucide-vue-next' 

// const keys = [{
//     access: 'KEs_cV4oWxyDdP4diZCTvHbkWHriXp0CvhIMDA6MgRs', 
//     secret:'FHMYMSLHS5FUFrIg9pA-rs3iRS5DK_p1RuxLKrdSwLw', 
//     appID: '820896',
// }] 

const page = ref(1)
const order_by = ref('latest')  
const orientation = ref('portrait') 

const config = useRuntimeConfig()
const apiUrl = config.public.apiUnsplash
const apiKey = config.public.apiKey
const username = config.public.username

const { data: unsplash, pending, error } = await useFetch(() => `${apiUrl}users/${username}/photos?client_id=${apiKey}&page=${page.value}&per_page=25&order_by=${order_by.value}&orientation=${orientation.value}`)

const changeOrder = () => {
    order_by.value = order_by.value === 'latest' ? 'popular' : 'latest';
}

const changeOrientation = () => {
    orientation.value = orientation.value === 'landscape' ? 'portrait' : 'landscape';
}  
</script>

<template>
    <h2 class="text-2xl font-bold text-center m-3">My Unsplash Photos</h2>

    <div class="m-3 flex justify-center text-center">
        <h3 class="text-lg font-semibold mb-2">Sort Photos By:</h3>
        &nbsp;
        <Button class="mx-0.5" size="icon" variant="outline" @click="changeOrder">
            <span v-if="order_by === 'latest'">
                <ImageDown class="w-50 h-auto icons" />
            </span>
            <span v-else>
                <ImagePlay class="w-50 h-auto icons" /> 
            </span> 
        </Button>
        
        &nbsp;
        <Button class="mx-0.5" size="icon" variant="outline" @click="changeOrientation">
            <span v-if="orientation === 'landscape'">
                <Smartphone class="w-50 h-auto rotate-90 icons" />
            </span>
            <span v-else>
                <Smartphone class="w-50 h-auto icons" />
            </span>     
        </Button>
    </div>

    <p v-if="pending">Fetching...</p>
    <pre v-else-if="error">Could not load photos: {{ error.data }}</pre>
    <div v-else class="photos">
        <div v-for="photo in unsplash" :key="photo.id" class="photo">
            <img :src="photo.urls.regular" :alt="photo.alt_description" />
        </div>
    </div>
</template>

<style scoped>
.photos {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(225px, 1fr));
  align-items: center;
  gap: 0.5rem;
  padding: 2rem;
  width: auto;
}
.photo {
  padding: 0.5rem;
  background-color: #cccccc50;
  border-radius: 9px;
  height: auto;
}
.photo h3 {
  font-size: 1.2rem;
  font-weight: bold;
  color: #555;
}
.photo img {
  width: 45rem;
  height: auto;
  border-radius: 9px;
}
a{
  /* color: #333; */
  text-decoration: none;
}   
</style>