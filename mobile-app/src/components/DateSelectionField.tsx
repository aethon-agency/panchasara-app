import React, { useState } from "react";
import { ViewStyle, Platform } from "react-native";
import { SelectionField } from "./SelectionField";
import DateTimePicker from "@react-native-community/datetimepicker";

interface DateSelectionFieldProps {
  label: string;
  value?: string;
  onSelect: (date: string) => void;
  placeholder?: string;
  error?: string;
  style?: ViewStyle;
  required?: boolean;
}

export const DateSelectionField = ({
  label,
  value,
  onSelect,
  placeholder,
  error,
  style,
  required,
}: DateSelectionFieldProps) => {
  const [showPicker, setShowPicker] = useState(false);

  const formatDateDisplay = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowPicker(Platform.OS === "ios");
    if (selectedDate) {
      const year = selectedDate.getFullYear();
      const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
      const day = String(selectedDate.getDate()).padStart(2, "0");
      onSelect(`${year}-${month}-${day}`);
    }
  };

  const currentDate = value ? new Date(value) : new Date();

  return (
    <>
      <SelectionField
        label={label}
        value={value ? formatDateDisplay(value) : ""}
        placeholder={placeholder || "Select Date"}
        icon="calendar-outline"
        onPress={() => setShowPicker(true)}
        error={error}
        style={style}
        required={required}
      />
      {showPicker && (
        <DateTimePicker
          value={currentDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
          maximumDate={new Date(2035, 11, 31)}
          minimumDate={new Date()}
        />
      )}
    </>
  );
};
