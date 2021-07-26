import { api } from '../../boot/axios';
import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { SupplyStateInterface } from './state';

const actions: ActionTree<SupplyStateInterface, StateInterface> = {
  async findAllSupplies(context, data?: { param: string, value: string }) {
    let queryString = "";
    if (data) {
      queryString = `?${data.param}=${data.value}`
    }

    const supplies = await api.get(`/supplies${queryString}`);

    context.commit('setSupplies', supplies.data);
  },
  async createSupply(context, data) {
    const supply = await api.post('/supplies', data);

    return supply.data;
  },
  async createSupplyType(context, data) {
    const supplyType = await api.post('/supply-types', data);

    return supplyType.data;
  },
  async createSupplyMeasureType(context, data) {
    const supplyMeasureType = await api.post('/supply-measure-types', data);

    return supplyMeasureType.data;
  },
  async getAllSupplyTypes(context) {
    const supplyTypes = await (await api.get('/supply-types')).data;

    context.commit('setSupplyTypes', supplyTypes);
  },
  async getAllSupplyMeasureTypes(context) {
    const supplyMeasureTypes = await (await api.get('/supply-measure-types')).data;

    context.commit('setSupplyMeasureTypes', supplyMeasureTypes);
  },

  async getSupplyLogs(context, data?: { param: string, value: string }) {
    let queryString = "";
    if (data) {
      queryString = `?${data.param}=${data.value}`
    }

    const supplyLogs = await api.get(`/logs${queryString}`);

    context.commit('setSupplyLogs', supplyLogs.data);
  },
  async supplyEntry(context, data) {
    const supplyEntry = await (await api.post('/supplies/entry', data)).data;

    return supplyEntry;
  },
  async supplyOutPut(context, data) {
    const supplyOutPut = await (await api.post('/supplies/output', data)).data;

    return supplyOutPut;
  }
};

export default actions;
