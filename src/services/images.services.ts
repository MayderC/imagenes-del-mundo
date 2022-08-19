import { IUnsplashAPI } from "@/interfaces/image.interface";

export const getImages = async (name: string): Promise<IUnsplashAPI[]> => {
  const response = await fetch(
    `https://api.unsplash.com/search/photos?&query=${name}&client_id=${process.env.VUE_APP_ACCES_PUBLIC_KEY}`
  );
  const data = await response.json();
  return data.results;
};
