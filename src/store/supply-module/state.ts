interface supply {
  id: string;
  code: string;
  name: string;
  type: string;
  measureType: string;
  value?: string;
  qty?: number;
}

export interface SupplyStateInterface {
  prop: boolean;
  supplies: supply[]
}

function state(): SupplyStateInterface {
  return {
    prop: false,
    supplies: []
  }
};

export default state;
