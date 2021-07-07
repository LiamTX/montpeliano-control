import { Module } from 'vuex';
import { StateInterface } from '../index';
import state, { SupplyStateInterface } from './state';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const supplyModule: Module<SupplyStateInterface, StateInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state
};

export default supplyModule;
