import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { SupplyStateInterface } from './state';

const getters: GetterTree<SupplyStateInterface, StateInterface> = {
  someAction(/* context */) {
    // your code
  },
  getSupplies(state) {
    return state.supplies;
  },
  getApiLoading(state) {
    return state.apiLoading;
  },
  getPageLoading(state) {
    return state.pageLoading;
  },
  getSupplyTypes(state) {
    return state.supplyTypes;
  },
  getSupplyMeasureTypes(state) {
    return state.supplyMeasureTypes;
  },

  getSupplyLogs(state) {
    return state.supplyLogs;
  }
};

export default getters;
