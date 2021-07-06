<template>
  <q-layout view="lHh Lpr lFf">
    <div class="q-gutter-y-sm bg-orange text-white">
      <q-toolbar background="primary">
        <q-btn flat round dense icon="menu" />
        <q-toolbar-title> Toolbar </q-toolbar-title>
        <!-- <q-btn flat round dense icon="more_vert" /> -->
      </q-toolbar>
    </div>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "PrivateLayout",
});
</script>
