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

interface supplyLog {
  _id: string;
  message: string;
  date: string;
  targetCode: string;
  targetName: string;
  description?: string;
  value?: string;
  hour?: string;
}

export interface SupplyStateInterface {
  prop: boolean;
  supplies: supply[];
  supplyTypes: supplyType[];
  supplyMeasureTypes: supplyMeasureType[];
  apiLoading: boolean;
  pageLoading: boolean;
  supplyLogs: supplyLog[];
}

function state(): SupplyStateInterface {
  return {
    prop: false,
    supplies: [],
    supplyTypes: [],
    supplyMeasureTypes: [],
    apiLoading: false,
    pageLoading: false,
    supplyLogs: []
  }
};

export default state;
