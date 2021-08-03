<template>
  <q-dialog v-model="prompt" persistent dark>
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">Novo insumo</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <!-- <q-input
          dense
          v-model="address"
          autofocus
          @keyup.enter="$emit('close')"
        /> -->

        <q-input
          class="mb-1"
          filled
          label="Código do insumo"
          color="orange-9"
          v-model="code"
        />

        <q-input
          v-model="name"
          class="mb-1"
          filled
          label="Nome do insumo"
          color="orange-9"
        />

        <q-select
          color="orange-9"
          class="mb-1"
          filled
          v-model="modelSupplyType"
          :options="optionsSupplyTypes"
          label="Tipo do insumo"
        />

        <q-select
          color="orange-9"
          class="mb-1"
          filled
          v-model="modelSupplyMeasureType"
          :options="optionsSupplyMeasureTypes"
          label="Tipo de medida do insumo"
        />

        <q-input
          v-model="value"
          class="mb-1"
          filled
          label="Valor do insumo (R$)"
          color="orange-9"
          mask="#.##"
          fill-mask="0"
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
          :loading="apiLoading()"
          color="orange-8"
          flat
          label="Cadastrar"
          @click="createNewSupplyMeasureType()"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { mapGetters } from "vuex";

export default defineComponent({
  name: "NewSupplyPrompt",
  props: {
    prompt: {
      type: Boolean,
      default: false,
    },
    optionsSupplyTypes: {
      default: [],
    },
    optionsSupplyMeasureTypes: {
      default: [],
    },
  },

  setup(props, { emit }) {
    let modelSupplyType: any = ref("");
    let modelSupplyMeasureType: any = ref("");

    return {
      ...mapGetters({
        apiLoading: "supply/getApiLoading",
      }),

      code: ref(""),
      name: ref(""),
      value: ref(0),
      modelSupplyType,
      modelSupplyMeasureType,
    };
  },

  watch: {
    modelSupplyType(value, oldValue) {
      if (value != undefined) {
        if (value.value == "Cadastre um tipo de insumo") {
          this.modelSupplyType = undefined;
          this.$emit("supply_type_empty");
        }
      }
    },
    modelSupplyMeasureType(value, oldValue) {
      if (value != undefined) {
        if (value.value == "Cadastre um tipo de medida de insumo") {
          this.modelSupplyMeasureType = undefined;
          this.$emit("supply_measure_type_empty");
        }
      }
    },
  },

  methods: {
    async createNewSupplyMeasureType() {
      console.log(this.value);
      if (
        !this.code ||
        !this.name ||
        !this.value ||
        this.value == 0.00 ||
        !this.modelSupplyType ||
        !this.modelSupplyMeasureType ||
        this.modelSupplyType.value == "Cadastre um tipo de insumo" ||
        this.modelSupplyMeasureType.value ==
          "Cadastre um tipo de medida de insumo"
      ) {
        this.$q.notify({
          message: "Preencha todos os campos",
          color: "negative",
          position: "top",
        });
        return;
      }

      try {
        this.$store.commit("supply/setApiLoading", true);

        const supply = {
          code: this.code,
          name: this.name,
          value: this.value,
          type: this.modelSupplyType.value,
          measureType: this.modelSupplyMeasureType.value,
        };
        const response = await this.$store.dispatch(
          "supply/createSupply",
          supply
        );

        this.code = "";
        this.name = "";
        this.value = 0;
        this.modelSupplyType = null;
        this.modelSupplyMeasureType = null;

        this.$q.notify({
          message: "Insumo cadastrado com sucesso!",
          color: "green-9",
          position: "top",
        });

        this.$store.commit("supply/setApiLoading", false);
        this.$emit("close");
        return;
      } catch (error) {
        console.log("err", error.message);
        const { message } = error;
        this.$store.commit("supply/setApiLoading", false);

        if (message == "Request failed with status code 400") {
          this.$q.notify({
            message:
              "Insumo já existente na base de dados com esse código ou nome.",
            color: "negative",
            position: "top",
          });

          this.code = "";
          this.name = "";
          this.value = 0;
          this.modelSupplyType = null;
          this.modelSupplyMeasureType = null;

          return;
        }
      }
    },
  },
});
</script>