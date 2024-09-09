import { Dimensions } from "react-native";
import { Easing, ReduceMotion } from "react-native-reanimated";

const { width } = Dimensions.get("window");

export const MARGIN = 4;
export const COL = 3;
export const SIZE = width / COL - MARGIN;

export const animTimingConfig = {
  duration: 300,
  easing: Easing.inOut(Easing.quad),
  reduceMotion: ReduceMotion.System,
};
