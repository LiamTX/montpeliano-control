import { MutationTree } from 'vuex';
import { SupplyStateInterface } from './state';

const mutation: MutationTree<SupplyStateInterface> = {
  someMutation(/* state: ExampleStateInterface */) {
    // your code
  },
  setSupplies(state, supplies) {
    state.supplies.values = supplies;
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
  }
};

export default mutation;
