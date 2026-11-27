import api from "./api";

export interface Banner {
  id: number;
  image_url: string;
  storage_key: string;
  position: number;
  created_at?: string;
}

export const getBanners = async (): Promise<Banner[]> => {
  const res = await api.get<{ success: boolean; data: Banner[] }>("/banners");
  return res?.data || [];
};

export const addBanner = async (imageUrl: string, key: string) => {
  return api.post<{ success: boolean; data: Banner }>("/banners", {
    imageUrl,
    key,
  });
};

export const updateBanner = async (
  id: number,
  imageUrl: string,
  key: string,
) => {
  return api.put<{ success: boolean; data: Banner }>(`/banners/${id}`, {
    imageUrl,
    key,
  });
};

export const deleteBanner = async (id: number) => {
  return api.delete<{ success: boolean }>(`/banners/${id}`);
};

export const reorderBanners = async (ids: number[]) => {
  return api.post<{ success: boolean }>("/banners/reorder", { ids });
};
