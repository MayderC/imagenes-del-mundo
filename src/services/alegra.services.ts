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

export const makeInvioce = async () => {
  console.log("make invoice");
};
