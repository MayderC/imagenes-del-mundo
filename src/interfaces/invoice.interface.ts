export interface IItem {
  id: number;
  price: number;
  quantity: number;
  name?: string;
  description?: string;
  discount?: number;
}

export interface IInvoiceRequest {
  date: string;
  dueDate: string;
  client: string;
  items: IItem[];
  seller: number;
  retentions: [];
  payments: [];
  remissions: [];
  comments: [];
  quotas: [];
  stamp: {
    generateStamp: boolean;
  };
}
