<script setup lang="ts">
  import BarraNavegacao from '@/components/BarraNavegacao.vue'
  import Rodape from '@/components/Rodape.vue'

</script>

<template>
  <header>
    <BarraNavegacao />
  </header>

  <router-view></router-view>

  <footer>
    <Rodape />
  </footer>
</template>

