<template>
  <q-layout view="lHh Lpr lFf">
    <div class="q-gutter-y-sm bg-orange text-white">
      <q-toolbar background="primary">
        <q-btn flat round dense icon="menu">
          <q-menu>
            <q-list style="min-width: 300px">
              <q-item clickable v-close-popup>
                <q-item-section>Insumos</q-item-section>
              </q-item>
              <q-item clickable v-close-popup>
                <q-item-section>New incognito tab</q-item-section>
              </q-item>
              <q-item clickable v-close-popup>
                <q-item-section>Recent tabs</q-item-section>
              </q-item>
              <q-item clickable v-close-popup>
                <q-item-section>History</q-item-section>
              </q-item>
              <q-item clickable v-close-popup>
                <q-item-section>Downloads</q-item-section>
              </q-item>
              <q-item clickable v-close-popup>
                <q-item-section>Settings</q-item-section>
              </q-item>
              <q-item clickable v-close-popup>
                <q-item-section>Help &amp; Feedback</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
        <q-toolbar-title> Toolbar </q-toolbar-title>
        <q-btn flat round dense icon="more_vert">
          <q-menu auto-close dark>
            <q-list style="min-width: 100px">
              <q-item clickable @click="logout()">
                <q-item-section> Sair </q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
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

  methods: {
    logout() {
      localStorage.removeItem("tk");
      this.$router.push("/");
    },
  },
});
</script>

<style lang="scss">
body {
  background-color: rgb(34, 33, 33);
}
</style>
