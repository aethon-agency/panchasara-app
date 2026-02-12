import api from "./api";

interface CreatePoonamData {
  title: string;
  date: string; // DD-MM-YYYY
  startTime: string; // HH:mm
  endTime: string; // HH:mm
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

export const getAllEvents = async () => {
  try {
    const response: any = await api.get("/events");
    return response;
  } catch (error) {
    console.error("Error fetching all events:", error);
    throw error;
  }
};

export const getEventById = async (id: string) => {
  try {
    const response: any = await api.get(`/events/${id}`);
    return response;
  } catch (error) {
    console.error("Error fetching event by id:", error);
    throw error;
  }
};
