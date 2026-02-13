import api from "./api";

interface CreateGalleryData {
  title: string;
  month: number;
  year: number;
  images: string[];
}

export const createGallery = async (data: CreateGalleryData) => {
  try {
    const response: any = await api.post("/galleries", data);
    return response;
  } catch (error) {
    console.error("Error creating gallery:", error);
    throw error;
  }
};

export const getGalleries = async () => {
  try {
    const response: any = await api.get("/galleries");
    return response;
  } catch (error) {
    console.error("Error fetching galleries:", error);
    throw error;
  }
};
