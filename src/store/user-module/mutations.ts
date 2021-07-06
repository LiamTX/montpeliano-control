import { MutationTree } from 'vuex';
import { UserStateInterface } from './state';

const mutation: MutationTree<UserStateInterface> = {
  someMutation(/* state: UserStateInterface */) {
    // your code
  },
  setApiLoading(state, bool: boolean) {
    state.apiLoading = bool;
  }
};

export default mutation;
