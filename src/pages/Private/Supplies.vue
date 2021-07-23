<template>
  <q-page>
    <div class="window-height" v-if="!pageLoading()">
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

            <q-btn
              color="orange-8"
              label="Buscar"
              @click="findSupplies()"
              :loading="apiLoading()"
            />

            <q-btn-dropdown
              color="orange-8"
              label="Cadastrar"
              class="float-right"
            >
              <q-list>
                <q-item
                  clickable
                  v-close-popup
                  @click="onItemClick('new_supply')"
                >
                  <q-item-section>
                    <q-item-label>Novo insumo</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item
                  clickable
                  v-close-popup
                  @click="onItemClick('new_supply_type')"
                >
                  <q-item-section>
                    <q-item-label>Novo tipo de insumo</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item
                  clickable
                  v-close-popup
                  @click="onItemClick('new_supply_measure_type')"
                >
                  <q-item-section>
                    <q-item-label>Novo tipo de medida</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>

            <new-supply-prompt
              :prompt="newSupply"
              :optionsSupplyTypes="optionsSupplyTypes"
              :optionsSupplyMeasureTypes="optionsSupplyMeasureTypes"
              @close="newSupply = false"
              @supply_type_empty="supplyTypeEmpty()"
              @supply_measure_type_empty="supplyMeasureTypeEmpty()"
            />
            <new-supply-type-prompt
              :prompt="newSupplyType"
              @close="newSupplyType = false"
            />
            <new-supply-measure-type-prompt
              :prompt="newSupplyMeasureType"
              @close="newSupplyMeasureType = false"
            />
          </div>

          <div class="q-gutter-sm q-pa-md">
            <q-input
              v-if="showCodeSupplyInput"
              dark
              color="orange-8"
              label="Código"
              style="width: 20%"
              v-model="findBySupplyCodeInput"
            />
            <q-select
              v-if="showTypeSupplySelect"
              color="orange-9"
              v-model="findBySupplyTypeSelect"
              :options="optionsSupplyTypes"
              label="Tipo do insumo"
              style="width: 20%"
              dark
            />
            <q-input
              v-if="showQtySupplyInput"
              dark
              type="number"
              color="orange-8"
              v-model="findBySupplyQtyInput"
              label="Quantidade"
              style="width: 20%"
            />
          </div>

          <div class="q-pa-md">
            <q-table
              :rows="supplies()"
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
    <div v-if="pageLoading()">
      <lottie-player
        src="https://assets1.lottiefiles.com/packages/lf20_UGvCSC/loading_animation.json"
        background="transparent"
        speed="1"
        style="width: 400px; height: 400px"
        loop
        autoplay
      ></lottie-player>
    </div>
  </q-page>
</template>

<script lang="ts">
import { mapGetters } from "vuex";
import { defineComponent, ref } from "vue";

import NewSupplyTypePrompt from "../../components/NewSupplyTypePrompt.vue";
import NewSupplyPrompt from "../../components/NewSupplyPrompt.vue";
import NewSupplyMeasureTypePrompt from "../../components/NewSupplyMeasureTypePrompt.vue";
import { profile } from "console";

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

  components: {
    NewSupplyTypePrompt,
    NewSupplyPrompt,
    NewSupplyMeasureTypePrompt,
  },

  setup() {
    let optionsSupplyTypes: any[] = [];
    let optionsSupplyMeasureTypes: any[] = [];

    let modelSupplyType: any = ref("");

    let findBySupplyTypeSelect: any = ref("");

    return {
      ...mapGetters({
        pageLoading: "supply/getPageLoading",
        apiLoading: "supply/getApiLoading",
        supplies: "supply/getSupplies",
        supplyTypes: "supply/getSupplyTypes",
        supplyMeasureTypes: "supply/getSupplyMeasureTypes",
      }),

      modelSupplyType,

      loading: ref(true),

      shape: ref("all"),

      tab: ref("supplies"),

      columns,

      newSupplyType: ref(false),
      newSupplyMeasureType: ref(false),
      newSupply: ref(false),

      optionsSupplyTypes,
      optionsSupplyMeasureTypes,

      showCodeSupplyInput: ref(false),
      showTypeSupplySelect: ref(false),
      showQtySupplyInput: ref(false),

      findBySupplyCodeInput: ref(""),
      findBySupplyTypeSelect,
      findBySupplyQtyInput: ref(""),
    };
  },

  watch: {
    shape(value, oldValue) {
      this.showCodeSupplyInput = false;
      this.showTypeSupplySelect = false;
      this.showQtySupplyInput = false;

      if (value == "code") {
        this.showCodeSupplyInput = true;
      }
      if (value == "type") {
        this.showTypeSupplySelect = true;
      }
      if (value == "qty") {
        this.showQtySupplyInput = true;
      }
    },
  },

  async created() {
    try {
      this.$store.commit("supply/setPageLoading", true);

      const data = await this.$store.dispatch("supply/findAllSupplies");
      this.$store.commit("supply/setSupplies", data);

      await this.$store.dispatch("supply/getAllSupplyTypes");
      await this.$store.dispatch("supply/getAllSupplyMeasureTypes");

      this.loadSupplyTypes();
      this.$store.commit("supply/setPageLoading", false);
    } catch (error) {
      console.log("err", error);
      this.$store.commit("supply/setPageLoading", false);
    }
  },

  methods: {
    supplyTypeEmpty() {
      this.newSupply = false;
      this.newSupplyType = true;
    },

    supplyMeasureTypeEmpty() {
      this.newSupply = false;
      this.newSupplyMeasureType = true;
    },

    loadSupplyTypes() {
      let supplyTypesNames = [];
      for (let supplyType of this.supplyTypes()) {
        const { name, code, _id } = supplyType;
        supplyTypesNames.push({
          label: name,
          value: name,
          id: _id,
          code,
        });
      }

      this.optionsSupplyTypes = supplyTypesNames;
      if (this.optionsSupplyTypes.length == 0) {
        this.optionsSupplyTypes.push({
          label: "Cadastre um tipo de insumo",
          value: "Cadastre um tipo de insumo",
        });
      }
    },

    onItemClick(target: string) {
      if (target == "new_supply_type") {
        this.newSupplyType = true;
      }
      if (target == "new_supply") {
        this.loadSupplyTypes();

        let supplyMeasureTypesNames = [];
        for (let supplyMeasureType of this.supplyMeasureTypes()) {
          const { name, code, _id } = supplyMeasureType;
          supplyMeasureTypesNames.push({
            label: name,
            value: name,
            id: _id,
            code,
          });
        }

        this.optionsSupplyMeasureTypes = supplyMeasureTypesNames;
        if (this.optionsSupplyMeasureTypes.length == 0) {
          this.optionsSupplyMeasureTypes.push({
            label: "Cadastre um tipo de medida de insumo",
            value: "Cadastre um tipo de medida de insumo",
          });
        }

        this.newSupply = true;
      }
      if (target == "new_supply_measure_type") {
        this.newSupplyMeasureType = true;
      }
    },

    async findSupplies() {
      try {
        this.$store.commit("supply/setApiLoading", true);

        // await new Promise((resolve) => setTimeout(resolve, 5000));

        if (this.shape == "all") {
          await this.$store.dispatch("supply/findAllSupplies");
        } else {
          let value = "";
          if (this.shape == "code") {
            value = this.findBySupplyCodeInput;
          }
          if (this.shape == "type") {
            value = this.findBySupplyTypeSelect.value;
          }
          if (this.shape == "qty") {
            value = this.findBySupplyQtyInput;
          }
          await this.$store.dispatch("supply/findAllSupplies", {
            param: this.shape,
            value,
          });
        }

        if (this.supplies().length == 0) {
          this.$q.notify({
            message: "Não existe nenhum insumo buscado.",
            color: "negative",
            position: "top",
          });
        }

        this.$store.commit("supply/setApiLoading", false);
      } catch (error) {
        console.log("err", error);
      }
    },
  },
});
</script>

<style lang="scss">
</style>
