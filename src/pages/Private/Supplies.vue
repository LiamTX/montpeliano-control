<template>
  <q-page>
    <div class="window-height">
      <q-tabs v-model="tab" no-caps class="bg-orange text-white shadow-2">
        <q-tab name="supplies" label="Insumos" />
        <q-tab name="out_in_supplies" label="Entrada/Saida de insumos" />
      </q-tabs>

      <q-tab-panels v-model="tab" animated class="window-height" dark>
        <q-tab-panel name="supplies">
          <div class="text-h4 q-pa-md">Insumos</div>

          <label class="q-pa-md">Buscar por:</label>

          <div class="q-gutter-sm q-pa-md">
            <q-radio v-model="shape" val="all" label="Todos" />
            <q-radio v-model="shape" val="code" label="Código" />
            <q-radio v-model="shape" val="type" label="Tipo" />
            <q-radio v-model="shape" val="qty" label="Qtd em estoque" />

            <q-btn color="orange-8" label="Buscar" />

            <q-btn color="orange-8" class="float-right" label="Novo tipo de insumo" />
            <q-btn color="orange-8" class="float-right" label="Novo de medida" />
            <q-btn color="orange-8" class="float-right" label="Novo insumo" />
          </div>

          <div class="q-pa-md">
            <q-table
              :rows="supplies"
              :columns="columns"
              row-key="id"
              dark
              color="amber"
              :rows-per-page-options="[7]"
              no-data-label="Selecione um filtro para listagem dos itens"
            />
          </div>
        </q-tab-panel>

        <q-tab-panel name="out_in_supplies">
          <div class="text-h4 q-mb-md">Entrada e saida de insumos</div>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis
            praesentium cumque magnam odio iure quidem, quod illum numquam
            possimus obcaecati commodi minima assumenda consectetur culpa fuga
            nulla ullam. In, libero.
          </p>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis
            praesentium cumque magnam odio iure quidem, quod illum numquam
            possimus obcaecati commodi minima assumenda consectetur culpa fuga
            nulla ullam. In, libero.
          </p>
        </q-tab-panel>
      </q-tab-panels>
    </div>
    <!-- <div v-if="loading">
      <lottie-player
        src="https://assets1.lottiefiles.com/packages/lf20_UGvCSC/loading_animation.json"
        background="transparent"
        speed="1"
        style="width: 400px; height: 400px"
        loop
        autoplay
      ></lottie-player>
    </div> -->
  </q-page>
</template>

<script lang="ts">
import { mapGetters } from "vuex";
import { defineComponent, ref } from "vue";

const columns = [
  {
    name: "code",
    label: "Código",
    align: "left",
    field: "code",
  },
  {
    name: "name",
    align: "center",
    label: "Nome",
    field: "name",
  },
  { name: "type", label: "Tipo", field: "type" },
  { name: "measureTypes", label: "Tipo de medida", field: "measureType" },
  {
    name: "qty",
    label: "Quantidade em estoque",
    field: "qty",
    sortable: true,
  },
];

export default defineComponent({
  name: "Supplies",
  setup() {
    return {
      // ...mapGetters({
      //   supplies: "supply/getSupplies",
      // }),
      supplies: [],

      loading: ref(true),

      shape: ref("all"),

      tab: ref("supplies"),

      columns,
    };
  },

  async created() {
    try {
      const data = await this.$store.dispatch("supply/findAllSupplies");
      this.$store.commit("supply/setSupplies", data);
    } catch (error) {
      console.log("err", error);
    }
  },
});
</script>

<style lang="scss">
</style>
