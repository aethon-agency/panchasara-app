import api from "./api";

type DonationType = "cash" | "item";

export interface Donation {
  id: string;
  type: DonationType;
  title: string;
  donor_name: string;
  amount?: string;
  item_name?: string;
  item_qty?: string;
  date: string;
}

export const getDonations = async (): Promise<Donation[]> => {
  try {
    const response: any = await api.get("/donations");
    if (response.success) {
      return response.data;
    }
    return [];
  } catch (error) {
    console.error("Error fetching donations:", error);
    throw error;
  }
};
