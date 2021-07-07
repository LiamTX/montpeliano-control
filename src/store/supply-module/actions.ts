import { api } from '../../boot/axios';
import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { SupplyStateInterface } from './state';

const actions: ActionTree<SupplyStateInterface, StateInterface> = {
  someAction(/* context */) {
    // your code
  },
  async createSupply(context, data) {
    const supply = await api.post(data);

    return supply.data;
  }
};

export default actions;
