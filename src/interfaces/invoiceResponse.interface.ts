export interface Client {
  id: string;
  name: string;
  identification: string;
  phonePrimary?: any;
  phoneSecondary?: any;
  fax?: any;
  mobile?: any;
  email?: any;
  address: any[];
}

export interface NumberTemplate {
  id: string;
  prefix?: any;
  number: string;
  text?: any;
  documentType: string;
  fullNumber: string;
  formattedNumber: string;
}

export interface Warehouse {
  id: string;
  name: string;
}

export interface Seller {
  id: number;
  name: string;
  identification: string;
  observations: string;
}

export interface PriceList {
  id: number;
  name: string;
}

export interface Item {
  name: string;
  description?: any;
  price: number;
  discount: number;
  reference?: any;
  quantity: number;
  id: number;
  tax: any[];
  total: number;
}

export interface IInvoiceResponse {
  id: string;
  date: string;
  dueDate: string;
  datetime: string;
  observations?: any;
  anotation?: any;
  termsConditions: string;
  status: string;
  client: Client;
  numberTemplate: NumberTemplate;
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  totalPaid: number;
  balance: number;
  decimalPrecision: string;
  warehouse: Warehouse;
  seller: Seller;
  priceList: PriceList;
  items: Item[];
  costCenter?: any;
}
