import { format } from 'date-fns';
import { MutationTree } from 'vuex';
import { SupplyStateInterface } from './state';

const mutation: MutationTree<SupplyStateInterface> = {
  someMutation(/* state: ExampleStateInterface */) {
    // your code
  },
  setSupplies(state, supplies) {
    state.supplies = supplies;
  },
  setApiLoading(state, bool: boolean) {
    state.apiLoading = bool;
  },
  setPageLoading(state, bool: boolean) {
    state.pageLoading = bool
  },
  setSupplyTypes(state, supplyTypes) {
    state.supplyTypes.push(...supplyTypes);
  },
  setSupplyMeasureTypes(state, supplyMeasureTypes) {
    state.supplyMeasureTypes.push(...supplyMeasureTypes);
  },
  formatSupplies(state) {
    for (let supply of state.supplies) {
      if (supply.valueQty) {
        supply.valueQty = `R$ ${supply.valueQty}`
      } else {
        supply.valueQty = `R$ 0`
      }
    }
  },

  setSupplyLogs(state, supplyLogs) {
    state.supplyLogs = supplyLogs;
  },
  formatSupplyLogs(state) {
    for (let log of state.supplyLogs) {
      log.hour = format(new Date(log.date), 'KK:mm');
      log.date = format(new Date(log.date), 'dd/MM/yyyy');

      if (log.message == 'SUPPLY_ENTRY') {
        log.message = 'Entrada de insumo';

        log.value = log.value ? `R$ ${log.value}` : 'Valor não registrado'
      }
      if (log.message == 'SUPPLY_OUTPUT') {
        log.message = 'Saida de insumo';

        log.value = 'Saida não consta'
      }
    }
  }
};

export default mutation;
