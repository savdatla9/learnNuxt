<script setup>
    import { ref } from 'vue'
    import { useLoop } from '@tresjs/core'
    import { OrbitControls } from '@tresjs/cientos'

    const donutRef = ref()
    const boxRef = ref()

    const { onBeforeRender } = useLoop()

    onBeforeRender(({ elapsed }) => {
        if (donutRef.value) {
            // Rotate the donut on both X and Y axes
            donutRef.value.rotation.x += 0.005
            donutRef.value.rotation.y += 0.025
        }

        if(boxRef.value){
            boxRef.value.rotation.x = elapsed * 1.5
            boxRef.value.rotation.y = elapsed * 0.75
        }
    })
</script>

<template>
    <TresPerspectiveCamera
        :position="[10, 8, 7]"
        :look-at="[0, 0, 0]"
    />

    <OrbitControls />

    <TresMesh ref="donutRef" :position="[0, 2, 0]">
        <TresTorusGeometry :args="[1, 0.4, 16, 32]" />
        <TresMeshBasicMaterial color="#ff6b35" wireframe />
    </TresMesh>

    <TresMesh ref="boxRef" :position="[3, 1, 0]">
        <TresBoxGeometry :args="[1, 1, 1]" />
        <TresMeshNormalMaterial />
    </TresMesh>

    <TresAmbientLight :intensity="0.5" />
    
    <TresDirectionalLight :position="[0, 0, 5]" :intensity="0.5" />

    <!-- <TresAxesHelper /> -->
    <TresGridHelper />
</template>
