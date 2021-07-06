export interface UserStateInterface {
  prop: boolean;
  apiLoading: boolean;
}

function state(): UserStateInterface {
  return {
    prop: false,
    apiLoading: false
  }
};

export default state;
