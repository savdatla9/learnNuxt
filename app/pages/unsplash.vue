<!-- const keys = [{
    access: 'KEs_cV4oWxyDdP4diZCTvHbkWHriXp0CvhIMDA6MgRs', 
    secret:'FHMYMSLHS5FUFrIg9pA-rs3iRS5DK_p1RuxLKrdSwLw', 
    appID: '820896',
}]  -->

<script setup>
import { ref, watch } from 'vue'
import { Button } from '@/components/ui/button'
import VueEasyLightbox from 'vue-easy-lightbox'
import { Home, ImagePlay, ImageDown, Smartphone } from 'lucide-vue-next' 

    const index = ref(0)
    const images = ref([])
    const show = ref(false)
    const order_by = ref('views')  
    const orientation = ref('portrait') 

    const config = useRuntimeConfig()
    const apiUrl = config.public.apiUnsplash
    const apiKey = config.public.apiKey
    const username = config.public.username

    // 🔑 ✅
    const { data, pending, error, refresh } = await useFetch(
        () => `${apiUrl}users/${username}/photos?client_id=${apiKey}&per_page=20&order_by=${order_by.value}&orientation=${orientation.value}`
    )

    images.value = data.value?.map(img => img.urls.full) || []

    watch(data, ()=>{
        images.value = data.value?.map(img => img.urls.full) || []
    })

    watch([order_by, orientation], () => refresh())

    function openLightbox(i) {
        index.value = i
        show.value = true
    }

    function closeLightbox() {
        show.value = false
    }

    const changeOrder = () => {
        order_by.value = order_by.value === 'views' ? 'downloads' : 'views';
    }

    const changeOrientation = () => {
        orientation.value = orientation.value === 'landscape' ? 'portrait' : 'landscape';
    }  
</script>

<template>
    <h2 class="text-2xl font-bold text-center m-3">My Clicks from UnSplash</h2>

    <div class="m-3 flex justify-center text-center">
        <h3 class="text-lg font-semibold mb-2">Sort Photos By:</h3>
        &nbsp;
        <Button class="mx-0.5" size="icon" variant="outline" @click="changeOrder">
            <span v-if="order_by === 'views'">
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

    <div v-if="pending" class="text-gray-500 mt-6">Loading...</div>
    <div v-else-if="error" class="text-red-500 mt-6">Error: {{ error.message }}</div>

    <div class="photos">
        <img
            v-for="(img, i) in images"
            :key="i"
            :src="img"
            class="photo"
            @click="openLightbox(i)"
        />
    </div>

    <VueEasyLightbox
        :visible="show" :imgs="images"
        :index="index" @hide="closeLightbox"
    />
</template>

<style>
    .photos {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(234px, 1fr));
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
    .photo img {
        width: 150px;
        height: auto;
        border-radius: 9px;
    }
</style>