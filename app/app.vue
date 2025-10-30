<script setup>
import { Sun, MoonStar, MonitorSmartphone } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { 
  DropdownMenu, DropdownMenuContent, 
  DropdownMenuItem, DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu'
import AppSidebar from '@/components/AppSidebar.vue'
import { SidebarProvider, SidebarTrigger, SidebarContent } from '@/components/ui/sidebar'

const colorMode = useColorMode()

// useHead({
//   link: [
//     { rel: 'stylesheet', href: 'https://sdk.mappls.com/map/sdk/web/mappls.css' }
//   ]
// })
</script>

<template>
  <SidebarProvider>
    <AppSidebar />
    <main>
      <div class="hello">
        <SidebarTrigger />&nbsp;

        <h2 class="flex flex-row">
          <div class="text-[20px] font-semibold">Hello Nuxt !&nbsp;&nbsp;</div>

          <DropdownMenu>
            <DropdownMenuTrigger as-child>
              <Button variant="outline" size='icon'>
                <Sun v-if="colorMode.preference==='light'" class="h-auto w-[1.2rem] transition-all" />

                <MoonStar v-else-if="colorMode.preference==='dark'" size={25} class="absolute h-[1.2rem] w-[1.2rem] transition-all" />

                <MonitorSmartphone v-else size={25} class="absolute h-[1.2rem] w-[1.2rem] transition-all" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuItem @click="colorMode.preference = 'light'">
                Light
              </DropdownMenuItem>

              <DropdownMenuItem @click="colorMode.preference = 'dark'">
                Dark
              </DropdownMenuItem>
              
              <DropdownMenuItem @click="colorMode.preference = 'system'">
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </h2>
      </div>

      <div class="bott">
        <RouterView />
      </div>
    </main>
  </SidebarProvider>
</template>

<style scoped>
.hello {
  font-family: Arial, Helvetica, sans-serif;
  padding: 1rem;
  gap: 0.5rem;
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-content: center;
  height: 3vh;
}

.bott{
  margin-top: 2.5rem;
  text-align: center;
  min-height: 85vh;
  padding: 2.5rem;
  width: 99vw;
}

@media screen and (max-width: 768px) {
  .bott{
    padding: 1rem;
    margin-top: 4rem;
    min-height: 70vh;
    width: 100vw;
  }
}

@media screen and (max-width: 1440px) and (min-width: 769px) {
  .bott{
    padding: 1rem;
    margin-top: 2rem;
    min-height: vh;
    width: 97vw;
  }
}
</style>