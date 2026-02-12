import React, { useState } from "react";
import { ViewStyle, Platform } from "react-native";
import { SelectionField } from "./SelectionField";
import DateTimePicker from "@react-native-community/datetimepicker";

interface TimeSelectionFieldProps {
  label: string;
  value?: string;
  onSelect: (time: string) => void;
  placeholder?: string;
  error?: string;
  style?: ViewStyle;
  required?: boolean;
}

export const TimeSelectionField = ({
  label,
  value,
  onSelect,
  error,
  style,
  required,
}: TimeSelectionFieldProps) => {
  const [showPicker, setShowPicker] = useState(false);

  const formatTimeDisplay = (time24: string) => {
    if (!time24) return "";
    const [hours, minutes] = time24.split(":").map(Number);
    const period = hours >= 12 ? "PM" : "AM";
    const hours12 = hours % 12 || 12;
    return `${hours12}:${String(minutes).padStart(2, "0")} ${period}`;
  };

  const handleTimeChange = (event: any, selectedDate?: Date) => {
    setShowPicker(Platform.OS === "ios");
    if (selectedDate) {
      const hours = String(selectedDate.getHours()).padStart(2, "0");
      const minutes = String(selectedDate.getMinutes()).padStart(2, "0");
      onSelect(`${hours}:${minutes}`);
    }
  };

  const currentDate = value ? new Date(`2000-01-01T${value}`) : new Date();

  return (
    <>
      <SelectionField
        label={label}
        value={value ? formatTimeDisplay(value) : ""}
        placeholder="Select Time"
        icon="time-outline"
        onPress={() => setShowPicker(true)}
        error={error}
        style={style}
        required={required}
      />
      {showPicker && (
        <DateTimePicker
          value={currentDate}
          mode="time"
          is24Hour={false}
          display="default"
          onChange={handleTimeChange}
        />
      )}
    </>
  );
};
