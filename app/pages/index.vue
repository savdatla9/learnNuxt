<script setup>
  import { Label } from "@/components/ui/label"
  import {
    NumberField,
    NumberFieldContent,
    NumberFieldDecrement,
    NumberFieldIncrement,
    NumberFieldInput,
  } from "@/components/ui/number-field"
  import { Home } from 'lucide-vue-next'
  import { ButtonGroup } from '@/components/ui/button-group'
  import { Button } from '@/components/ui/button'
  // import { Card } from '~/components/ui/card'
  import { ref } from "vue"

  const count = ref(Math.round(Math.random() * 1000))
</script>

<template>
  <div class="cApp">
    <h1>Home page</h1>

    <div>
      <NumberField id="age" :default-value="count" :min="0">
        <Label for="age" style="text-align: center;">Counter</Label>
        <NumberFieldContent>
          <NumberFieldDecrement />
          <NumberFieldInput />
          <NumberFieldIncrement />
        </NumberFieldContent>
      </NumberField>
    </div>
  </div>
</template>

<style scoped> 
.cApp {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
a{
  /* color: #333; */
  font-weight: bold;
  text-decoration: none;
}
a:hover{
  text-decoration: underline;
  color: navy
}
</style>