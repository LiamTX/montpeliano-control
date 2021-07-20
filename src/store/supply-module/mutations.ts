import { MutationTree } from 'vuex';
import { SupplyStateInterface } from './state';

const mutation: MutationTree<SupplyStateInterface> = {
  someMutation (/* state: ExampleStateInterface */) {
    // your code
  },
  setSupplies(state, supplies) {
    state.supplies.values = supplies;
  }
};

export default mutation;
