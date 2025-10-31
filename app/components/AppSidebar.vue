<script setup>
import { 
    Home, ShieldUser,
    MessageSquareQuote,  
    Barcode, BookImage,  
    ChefHat, Upload,
    MapPinned, Torus,
} from "lucide-vue-next"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "About",
    url: "/about",
    icon: ShieldUser,
  },
  {
    title: "Products",
    url: "/products",
    icon: Barcode,
  },
  {
    title: "Quote",
    url: "/quote",
    icon: MessageSquareQuote,
  },  
  {
    title: "3D View in Nuxt",
    url: "/3d",
    icon: Torus,
  },
  {
    title: "UnSplash",
    url: "/unsplash",
    icon: BookImage,
  },
  {
    title: "Cook Recipes",
    url: "/receipies",
    icon: ChefHat,
  },  
  {
    title: "File Upload",
    url: "/files",
    icon: Upload,
  },
  {
    title: "Map MappIs ",
    url: "/maps",
    icon: MapPinned,
  },  
];
</script>

<template>
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>App</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem v-for="item in items" :key="item.title">
                  <SidebarMenuButton asChild>
                    <a :href="item.url">
                      <component :is="item.icon" />
                      <span>{{item.title}}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
      </SidebarContent>
    </Sidebar>
</template>