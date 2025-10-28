<script setup>
    import { ref, computed, onMounted } from 'vue'

    import { Input } from '@/components/ui/input'
    import { Button } from '@/components/ui/button'
    import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
    import { 
    Table, TableHeader, TableRow, TableHead, TableBody, TableCell 
    } from '@/components/ui/table'
    import { Skeleton } from '@/components/ui/skeleton'

    import { AlarmClock, UserStar, Flame, Eye } from 'lucide-vue-next'

    const loading = ref(true)
    const error = ref(null)
    const allRecipes = ref([])
    // const cId = ref([])

    const q = ref('')
    const page = ref(1)
    const pageSize = ref(50)
    const sortKey = ref('id')
    const sortDir = ref('asc')

    // const {data} = await useFetch('https://restcountries.com/v3.1/independent?status=true&fields=name,code,flags')
    
    // data.value?.forEach((c) => {
    //     cId.value[c.name.common.toLowerCase()] = c.flags.svg
    // })

    onMounted(async () => {
        try {
            const res = await fetch('https://dummyjson.com/recipes?limit=100')
            if (!res.ok) throw new Error(`HTTP ${res.status}`)
            const data = await res.json()

            allRecipes.value = (data?.recipes ?? [])

        } catch (e) {
            error.value = e?.message ?? 'Failed to load'
        } finally {
            loading.value = false
        }
    })

    const filtered = computed(() => {
        const term = q.value.trim().toLowerCase()
        if (!term) return allRecipes.value
        return allRecipes.value.filter(r =>
            [r.name, r.cuisine, r.difficulty].some(s => String(s ?? '').toLowerCase().includes(term))
        )
    })

    function compare(a, b, key) {
        const av = a[key]
        const bv = b[key]
        if (av == null && bv == null) return 0
        if (av == null) return -1
        if (bv == null) return 1
        if (typeof av === 'number' && typeof bv === 'number') return av - bv
        return String(av).localeCompare(String(bv))
    }

    const sorted = computed(() => {
        const arr = [...filtered.value]

        arr.sort((a, b) => {
            const c = compare(a, b, sortKey.value)
            return sortDir.value === 'asc' ? c : -c
        })

        return arr
    })

    const total = computed(() => sorted.value.length)

    const pageCount = computed(() => Math.max(1, Math.ceil(total.value / pageSize.value)))

    const paged = computed(() => {
        const current = Math.min(page.value, pageCount.value)

        const start = (current - 1) * pageSize.value
        
        return sorted.value.slice(start, start + pageSize.value)
    })

    function setSort(key) {
        if (sortKey.value === key) {
            sortDir.value = sortDir.value === 'asc' ? 'desc' : 'asc'
        } else {
            sortKey.value = key
            sortDir.value = 'asc'
        }
    }

    function go(delta) {
        page.value = Math.min(pageCount.value, Math.max(1, page.value + delta))
    }
</script>

<template>
    <div class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div class="flex items-center gap-2">
                <Input v-model="q" placeholder="Search name, cuisine, difficulty…" class="w-full" />
                <Button variant="secondary" @click="q = ''">Clear</Button>
            </div>

            <div class="flex items-center gap-2">
                <span class="text-sm text-muted-foreground">Sort</span>
                <Select v-model="sortKey">
                    <SelectTrigger class="w-44">
                        <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="name">Name</SelectItem>
                        <SelectItem value="cuisine">Cuisine</SelectItem>
                        <SelectItem value="difficulty">Difficulty</SelectItem>
                        <SelectItem value="rating">Rating</SelectItem>
                        <SelectItem value="prepTimeMinutes">Prep Time </SelectItem>
                        <SelectItem value="caloriesPerServing">Calories</SelectItem>
                        <SelectItem value="serving">Serving</SelectItem>
                    </SelectContent>
                </Select>
                <Select v-model="sortDir">
                    <SelectTrigger class="w-28">
                        <SelectValue placeholder="Dir" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="asc">Asc</SelectItem>
                        <SelectItem value="desc">Desc</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div class="flex items-center gap-2 md:justify-end">
                <span class="text-sm text-muted-foreground">Rows</span>
                <Select v-model="pageSize">
                    <SelectTrigger class="w-24">
                        <SelectValue placeholder="Rows" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem :value="5">5</SelectItem>
                        <SelectItem :value="10">10</SelectItem>
                        <SelectItem :value="20">20</SelectItem>
                        <SelectItem :value="50">50</SelectItem>
                    </SelectContent>
                </Select>
                <div class="ml-auto flex items-center gap-2">
                    <Button variant="outline" @click="go(-1)" :disabled="page <= 1">Prev</Button>
                    <span class="text-sm tabular-nums">
                        {{ page }} / {{ pageCount }}
                    </span>
                    <Button variant="outline" @click="go(1)" :disabled="page >= pageCount">Next</Button>
                </div>
            </div>
        </div>

        <div class="rounded-2xl border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead class="cursor-pointer" @click="setSort('name')">Name</TableHead>
                        <TableHead class="cursor-pointer" @click="setSort('cuisine')">Cuisine</TableHead>
                        <TableHead class="cursor-pointer" @click="setSort('difficulty')">Difficulty</TableHead>
                        <TableHead class="cursor-pointer" @click="setSort('rating')"><UserStar/></TableHead>
                        <TableHead class="cursor-pointer" @click="setSort('prepTimeMinutes')"><AlarmClock/></TableHead>
                        <TableHead class="cursor-pointer" @click="setSort('caloriesPerServing')"><Flame/></TableHead>
                        <TableHead class="cursor-pointer" @click="setSort('serving')">Serving</TableHead>
                        <TableHead class="cursor-pointer">View Process</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody v-if="!loading && !error">
                    <TableRow v-for="r in paged" :key="r.id" class="text-start">
                        <TableCell class="font-medium pl-1 flex items-center gap-2">
                            <img :src="r.image" width="45px" height="auto" />
                            {{ r.name }}
                        </TableCell>
                        <TableCell>{{ r.cuisine }}</TableCell>
                        <TableCell>{{ r.difficulty }}</TableCell>
                        <TableCell>{{ r.rating.toFixed(1) }}</TableCell>
                        <TableCell>{{ r.prepTimeMinutes }} mins</TableCell>
                        <TableCell>{{ r.caloriesPerServing }}</TableCell>
                        <TableCell>{{ r.servings>1? r.servings+' people' : 'one person' }}</TableCell>
                        <TableCell><a :href="`/receipies/${r.id}`"><Eye /></a></TableCell>
                    </TableRow>

                    <TableRow v-if="paged.length === 0">
                        <TableCell colspan="6" class="text-center text-sm text-muted-foreground">
                        No recipes found.
                        </TableCell>
                    </TableRow>
                </TableBody>

                <TableBody v-else-if="loading">
                    <TableRow v-for="i in 8" :key="i">
                        <TableCell colspan="6">
                        <div class="flex gap-3 items-center">
                            <Skeleton class="h-4 w-48" />
                            <Skeleton class="h-4 w-24" />
                            <Skeleton class="h-4 w-20" />
                            <Skeleton class="h-4 w-16" />
                        </div>
                        </TableCell>
                    </TableRow>
                </TableBody>

                <TableBody v-else>
                    <TableRow>
                        <TableCell colspan="6" class="text-destructive">
                        Failed to load recipes: {{ error }}
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>

        <div class="text-sm text-muted-foreground">
            Showing <span class="font-medium">{{ paged.length }}</span> of
            <span class="font-medium">{{ total }}</span> recipes
        </div>
    </div>
</template>