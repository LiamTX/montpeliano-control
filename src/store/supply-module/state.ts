interface supply {
  _id: string;
  code: string;
  name: string;
  type: string;
  measureType: string;
  value?: string;
  qty?: number;
}

interface supplyType {
  _id: string;
  code: string;
  name: string;
}

interface supplyMeasureType {
  _id: string;
  code: string;
  name: string;
}

export interface SupplyStateInterface {
  prop: boolean;
  supplies: supply[];
  supplyTypes: supplyType[];
  supplyMeasureTypes: supplyMeasureType[];
  apiLoading: boolean;
  pageLoading: boolean;
}

function state(): SupplyStateInterface {
  return {
    prop: false,
    supplies: [],
    supplyTypes: [],
    supplyMeasureTypes: [],
    apiLoading: false,
    pageLoading: false
  }
};

export default state;
