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
  client: number;
  items: IItem[];
  seller: number;
}
