import { IInvoiceRequest } from "@/interfaces/invoice.interface";
import { IInvoiceResponse } from "@/interfaces/invoiceResponse.interface";
import { IProductItemResponse } from "@/interfaces/productItem.interface";
import { ISeller } from "./../interfaces/seller.interface";
import { apiAlegra } from "./httpInstance";

export const getSellers = async (): Promise<ISeller[]> => {
  try {
    const res = await apiAlegra.get("/sellers");
    return res.data;
  } catch (error) {
    throw new Error("Error: get sellers");
  }
};

export const makeInvoice = async (
  data: IInvoiceRequest
): Promise<IInvoiceResponse> => {
  try {
    const res = await apiAlegra.post("/invoices", data);
    return res.data;
  } catch (error) {
    throw new Error("Error: post invoice");
  }
};

export const getProductItem = async (
  limit: number
): Promise<IProductItemResponse[]> => {
  try {
    const res = await apiAlegra.get(`/items/?limit=${limit}`);
    return res.data;
  } catch (error) {
    throw new Error("Error: get product");
  }
};
