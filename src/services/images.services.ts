import { IUnsplashAPI } from "@/interfaces/image.interface";
import { apiUnsplash } from "./httpInstance";

export const getImages = async (name: string): Promise<IUnsplashAPI[]> => {
  try {
    const res = await apiUnsplash.get(`/search/photos?&query=${name}`);
    return res.data.results;
  } catch (error) {
    throw new Error("Error");
  }
};
