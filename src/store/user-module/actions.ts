import axios from 'axios';
import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { UserStateInterface } from './state';

const actions: ActionTree<UserStateInterface, StateInterface> = {
  async auth(context, data) {
    const auth = await axios.post(`${process.env.baseUrl}/users/auth`, data);

    return auth.data;

  }
};

export default actions;
