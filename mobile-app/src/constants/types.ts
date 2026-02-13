export interface SelectedImage {
  uri: string;
  fileName: string;
}

export interface MandirEvent {
  id: string;
  type: "poonam" | "havan";
  title: string;
  date: string;
  day: string;
  startTime: string;
  endTime: string;
  description: string;
  location: string;
  organizerName?: string;
}
