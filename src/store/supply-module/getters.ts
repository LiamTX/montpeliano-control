import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { SupplyStateInterface } from './state';

const getters: GetterTree<SupplyStateInterface, StateInterface> = {
  someAction (/* context */) {
    // your code
  }
};

export default getters;
