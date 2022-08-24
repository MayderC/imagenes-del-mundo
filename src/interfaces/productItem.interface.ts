export interface Category {
  id: string;
  name: string;
}

export interface ItemCategory {
  id: string;
  name: string;
  description: string;
  status: string;
}

export interface Currency {
  code: string;
  symbol: string;
}

export interface Price {
  idPriceList: number;
  name: string;
  type: string;
  price: string;
  currency: Currency;
}

export interface Warehouse {
  name: string;
  observations?: any;
  isDefault: boolean;
  status: string;
  id: string;
  costCenter?: any;
  address?: any;
  initialQuantity: string;
  availableQuantity: string;
  minQuantity?: any;
  maxQuantity?: any;
}

export interface Inventory {
  initialQuantity: number;
  initialQuantityDate: string;
  unit: string;
  unitCost: number;
  availableQuantity: number;
  warehouses: Warehouse[];
}

export interface CategoryRule {
  id: string;
  name: string;
  key: string;
}

export interface Inventory2 {
  id: string;
  idParent: string;
  name: string;
  code?: any;
  description: string;
  type: string;
  readOnly: boolean;
  nature: string;
  blocked: string;
  categoryRule: CategoryRule;
}

export interface CategoryRule2 {
  id: string;
  name: string;
  key: string;
}

export interface InventariablePurchase {
  id: string;
  idParent: string;
  name: string;
  code?: any;
  description: string;
  type: string;
  readOnly: boolean;
  nature: string;
  blocked: string;
  categoryRule: CategoryRule2;
}

export interface Accounting {
  inventory: Inventory2;
  inventariablePurchase: InventariablePurchase;
}

export interface IProductItemResponse {
  id: number;
  category: Category;
  name: string;
  description?: any;
  reference: string;
  status: string;
  itemCategory: ItemCategory;
  price: Price[];
  inventory: Inventory;
  accounting: Accounting;
  tax: any[];
  customFields: any[];
  type: string;
  itemType?: any;
}
