<template>
  <q-dialog v-model="prompt" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">Novo tipo de insumo</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input
          class="mb-1"
          filled
          label="Código do tipo de insumo"
          color="orange-9"
          v-model="code"
        />

        <q-input
          class="mb-1"
          filled
          label="Nome do tipo de insumo"
          color="orange-9"
          v-model="name"
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
          @click="createSupplyType()"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { mapGetters } from "vuex";

export default defineComponent({
  name: "NewSupplyTypePrompt",
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
      name: ref(""),
    };
  },

  methods: {
    async createSupplyType() {
      if (!this.code || !this.name) {
        this.$q.notify({
          message: "Preencha todos os campos",
          color: "negative",
          position: "top",
        });
        return;
      }

      try {
        const supplyType = {
          code: this.code,
          name: this.name,
        };

        this.$store.commit("supply/setApiLoading", true);

        const response = await this.$store.dispatch(
          "supply/createSupplyType",
          supplyType
        );

        this.code = "";
        this.name = "";

        this.$q.notify({
          message: "Tipo de insumo cadastrado com sucesso!",
          color: "green-9",
          position: "top",
        });

        this.$store.commit("supply/setSupplyTypes", [response]);
        this.$store.commit("supply/setApiLoading", false);
        this.$emit("close");
        return;
      } catch (error) {
        this.$store.commit("supply/setApiLoading", false);

        const { message } = error;
        const status = message.split(" ")[message.split(" ").length - 1];

        const unauthorizedStatus = ["400"];
        if (unauthorizedStatus.includes(status)) {
          this.$q.notify({
            message: "Tipo de insumo ja existe.",
            color: "negative",
            position: "top",
          });

          this.code = "";
          this.name = "";

          return;
        }

        this.$store.commit("supply/setApiLoading", false);
      }
    },
  },
});
</script>