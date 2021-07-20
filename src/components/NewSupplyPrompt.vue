<template>
  <q-dialog v-model="prompt" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">Your address</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input
          dense
          v-model="address"
          autofocus
          @keyup.enter="$emit('close')"
        />
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn color="orange-8" flat label="Cancelar" v-close-popup @click="$emit('close')" />
        <q-btn color="orange-8" flat label="Cadastrar" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs } from "vue";

export default defineComponent({
  name: "NewSupplyPrompt",
  props: {
    prompt: {
      type: Boolean,
      default: false,
    },
  },

  setup(props, { emit }) {
    return {
      address: ref('a'),
    };
  },
});
</script>