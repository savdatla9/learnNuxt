<script setup>
import { ref } from 'vue'
import { Flame, ChefHat, Timer, UserStar, MoveLeft } from 'lucide-vue-next'

const route = useRoute()
const id = route.params.id

const recipeData = ref(null)

if (id) {
    const { data: receipe, error, pending } = await useFetch(`https://dummyjson.com/recipes/${id}`)

    recipeData.value = receipe.value
}
</script>

<template>
    <div>
        <h1 class="text-4xl flex justify-center items-center mt-[-5px]">
            <a href="/receipies" class="mr-5">
                <MoveLeft stroke-width="3.5px" />
            </a> 
            Recipe Details:&nbsp;<i>{{ recipeData?.name }}</i>
        </h1>
        
        <br/>
        
        <div class="flex justify-evenly gap-5 items-center text-start mt-5 xs:flex-col sm:flex-col md:flex-col lg:flex-row xl:flex-row xxl:flex-row"> 
            <div>
                <img :src="recipeData?.image" class="rounded-[15px] w-[450px] h-auto" />
            </div>

            <div> 
                <p class="text-xl"><strong>Cuisine:</strong> {{ recipeData?.cuisine }}</p>

                <p class="text-xl"><strong>Meal Type:</strong> {{ recipeData?.mealType[0] }}</p>

                <p class="text-xl"><strong>Difficulty:</strong> {{ recipeData?.difficulty }}</p>
                
                <p class="text-xl flex"><strong>Prep Time:</strong>&nbsp;<Timer />&nbsp;{{ recipeData?.prepTimeMinutes }} mins</p>
                
                <p class="text-xl flex"><strong>Cook Time:</strong>&nbsp;<Timer />&nbsp;{{ recipeData?.cookTimeMinutes }} mins</p>
                
                <p class="text-xl"><strong>Servings:</strong> {{ recipeData.servings>1 ? recipeData.servings+' People' :  'One Person' }}</p>
                
                <p class="text-xl flex"><strong>Calories per Serving:</strong>&nbsp;<Flame color="orangered" />&nbsp;{{ recipeData?.caloriesPerServing }}</p>
                
                <h2 class="text-3xl mt-4 underline pb-1 uppercase">Ingredients:</h2>

                <ul class="list-disc list-inside text-xl">
                    <li v-for="(ingredient, index) in recipeData?.ingredients" :key="index">
                        {{ ingredient }}
                    </li>
                </ul>

                <h2 class="text-3xl mt-4 underline pb-1 uppercase">Instructions:</h2>
                
                <ol class="list-decimal list-inside text-xl">
                    <li v-for="(step, index) in recipeData?.instructions" :key="index">
                        {{ step }}
                    </li>
                </ol>
            </div>
        </div>
    </div>  
</template>