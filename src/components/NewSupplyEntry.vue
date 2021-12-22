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
          :loading="apiLoading()"
        />

        <q-select
          v-if="!disable"
          color="orange-9"
          class="mb-1"
          filled
          v-model="measureType"
          label="Tipo de medida do insumo"
          :disable="true"
        />

        <!-- <q-input
          class="mb-1"
          filled
          label="Quantidade"
          color="orange-9"
          v-model="qty"
          type="number"
          :disable="disable"
        /> -->

        <q-input
          v-model="qty"
          class="mb-1"
          filled
          label="Quantidade"
          color="orange-9"
          mask="#.###"
          fill-mask="0"
          :disable="disable"
          reverse-fill-mask
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
      qty: ref(""),

      measureType: ref(""),

      disable: ref(true),
    };
  },

  watch: {
    async code(value, oldValue) {
      this.$store.commit("supply/setApiLoading", true);

      if (value || value != "") {
        const supply = await this.$store.dispatch(
          "supply/findOneSupply",
          value
        );
        if (!supply) {
          this.$q.notify({
            message: "Insumo não encontrado",
            color: "negative",
            position: "top",
          });
        } else {
          this.$q.notify({
            message: "Insumo encontrado",
            color: "green-9",
            position: "top",
          });

          this.measureType = supply.measureType;
          this.disable = false;
        }
      }

      this.$store.commit("supply/setApiLoading", false);
    },
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
        };

        console.log(this.qty)

        this.$store.commit("supply/setApiLoading", true);

        const response = await this.$store.dispatch(
          "supply/supplyEntry",
          supplyEntry
        );

        this.code = "";
        this.qty = "";

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
          this.qty = "";

          return;
        }

        this.$store.commit("supply/setApiLoading", false);
      }
    },
  },
});
</script>