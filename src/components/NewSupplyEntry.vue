<template>
  <q-dialog v-model="prompt" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">Entrada de insumo</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input
          class="mb-1"
          filled
          label="Código do insumo"
          color="orange-9"
          v-model="code"
        />

        <q-input
          class="mb-1"
          filled
          label="Quantidade"
          color="orange-9"
          v-model="qty"
          type="number"
        />

        <q-input
          class="mb-1"
          filled
          label="Valor(opcional)"
          color="orange-9"
          v-model="value"
        />
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn
          color="orange-8"
          flat
          label="Cancelar"
          v-close-popup
          @click="$emit('close')"
        />
        <q-btn
          color="orange-8"
          flat
          label="Cadastrar"
          :loading="apiLoading()"
          @click="createSupplyEntry()"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { mapGetters } from "vuex";

export default defineComponent({
  name: "NewSupplyEntry",
  props: {
    prompt: {
      type: Boolean,
      default: false,
    },
  },

  setup(props, { emit }) {
    return {
      ...mapGetters({
        apiLoading: "supply/getApiLoading",
      }),

      code: ref(""),
      qty: ref(0),
      value: ref(""),
    };
  },

  methods: {
    async createSupplyEntry() {
      if (!this.code || !this.qty) {
        this.$q.notify({
          message: "Preencha todos os campos",
          color: "negative",
          position: "top",
        });
        return;
      }

      try {
        const supplyEntry = {
          code: this.code,
          qty: this.qty,
          value: this.value,
        };

        this.$store.commit("supply/setApiLoading", true);

        const response = await this.$store.dispatch(
          "supply/supplyEntry",
          supplyEntry
        );

        this.code = "";
        this.qty = 0;
        this.value = "";

        this.$q.notify({
          message: "Entrada de insumo cadastrado com sucesso!",
          color: "green-9",
          position: "top",
        });

        this.$store.commit("supply/setApiLoading", false);
        this.$emit("close");
        return;
      } catch (error) {
        this.$store.commit("supply/setApiLoading", false);

        const { message } = error;
        const status = message.split(" ")[message.split(" ").length - 1];

        const unauthorizedStatus = ["404"];
        if (unauthorizedStatus.includes(status)) {
          this.$q.notify({
            message: "O insumo não existe.",
            color: "negative",
            position: "top",
          });

          this.code = "";
          this.qty = 0;
          this.value = "";

          return;
        }

        this.$store.commit("supply/setApiLoading", false);
      }
    },
  },
});
</script>