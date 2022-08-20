import { IInvoiceRequest } from "@/interfaces/invoice.interface";
import { IInvoiceResponse } from "@/interfaces/invoiceResponse.interface";
import { ISeller } from "./../interfaces/seller.interface";

export const getSellers = async (token: string): Promise<ISeller[]> => {
  const response = await fetch("https://api.alegra.com/api/v1/sellers/", {
    method: "GET",
    headers: {
      Accept: "*/*",
      authorization: "Basic " + token,
      "accept-encoding": "gzip, deflate",
    },
  });

  const data = await response.json();
  return data;
};

export const makeInvioce = async (
  data: IInvoiceRequest
): Promise<IInvoiceResponse> => {
  const response = await fetch("https://api.alegra.com/api/v1/invoices", {
    method: "POST",
    headers: {
      Accept: "*/*",
      authorization: "Basic " + "",
      "accept-encoding": "gzip, deflate",
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return await response.json();
};
