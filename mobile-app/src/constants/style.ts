import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("screen");

export const SCREEN = {
  WIDTH: width,
  HEIGHT: height,
};

export const UTILITY = {
  sizing: (multiplier = 1): number => {
    return multiplier * 8;
  },

  border: (
    size = 1,
    radius = 1,
    color = "red",
    style: "solid" | "dotted" | "dashed" = "solid",
  ) => {
    return {
      borderWidth: size,
      borderRadius: radius,
      borderStyle: style,
      borderColor: color,
    } as const;
  },
};

export const BORDER = { ...UTILITY.border() };
