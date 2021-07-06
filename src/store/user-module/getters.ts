import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { UserStateInterface } from './state';

const getters: GetterTree<UserStateInterface, StateInterface> = {
  someAction(/* context */) {
    // your code
  },
  getApiLoading(context) {
    return context.apiLoading;
  }
};

export default getters;
