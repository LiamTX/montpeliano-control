<template dark>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PublicLayout',
})
</script>

<style lang="scss">
body {
  color: white;
  background-color: black;
}

.body--dark {
  // background: #000
}
</style>
