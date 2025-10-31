<script setup>
    import { TresCanvas } from '@tresjs/core'
    import Dchild from '~/components/3dchild.vue';

</script>

<template>
    <TresCanvas
        shadows alpha
        clear-color="#cccccc"
        window-[98vh]
    >
        <Dchild />
    </TresCanvas>
</template>
