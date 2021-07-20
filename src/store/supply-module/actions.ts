import { api } from '../../boot/axios';
import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { SupplyStateInterface } from './state';

const actions: ActionTree<SupplyStateInterface, StateInterface> = {
  async findAllSupplies(context, data) {
    const supplies = await api.get(`/supplies`);

    return supplies.data;
  }
};

export default actions;
