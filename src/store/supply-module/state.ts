export interface SupplyStateInterface {
  prop: boolean;
}

function state(): SupplyStateInterface {
  return {
    prop: false
  }
};

export default state;
