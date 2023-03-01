

<template>
  <RouterView></RouterView>
</template>

<script setup>
import { RouterView } from 'vue-router'
import useScalePage from '@/hooks/useScalePage.js'

let option = {
  targetX: 1920,
  targetY: 1080,
  target: 16 / 9
}
useScalePage()

</script>
<style scoped>

</style>
