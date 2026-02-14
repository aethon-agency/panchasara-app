import api from "./api";

export interface Contact {
  id: number;
  name: string;
  number: string | null;
  url: string | null;
  type: string | null;
}

export const getContacts = async () => {
  try {
    const response = await api.get<{ status: boolean; data: Contact[] }>(
      "/contacts",
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching contacts:", error);
    throw error;
  }
};
