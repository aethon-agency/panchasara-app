import api from "./api";

interface CreateAnnouncementData {
  title: string;
  contact_number?: string;
  description?: string;
}

export const createAnnouncement = async (data: CreateAnnouncementData) => {
  try {
    const response: any = await api.post("/announcements", data);
    return response;
  } catch (error) {
    console.error("Error creating announcement:", error);
    throw error;
  }
};

export const getAnnouncements = async () => {
  try {
    const response: any = await api.get("/announcements");
    return response;
  } catch (error) {
    console.error("Error fetching announcements:", error);
    throw error;
  }
};
