import api from "./api";

interface CreatePoonamData {
  title: string;
  date: string; // YYYY-MM-DD
  day: string; // Enum or string
  startTime?: string; // HH:mm
  endTime?: string; // HH:mm
  organizer?: string;
  description?: string;
  location?: string;
}

export const createPoonam = async (data: CreatePoonamData) => {
  try {
    const response: any = await api.post("/events/poonam", data);
    return response;
  } catch (error) {
    console.error("Error creating poonam:", error);
    throw error;
  }
};
