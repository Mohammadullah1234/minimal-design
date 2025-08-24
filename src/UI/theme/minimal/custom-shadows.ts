import { ColorChannel, varAlpha } from "@/UI/styles/colorManipulator";

export const createShadowColor = (colorChannel: ColorChannel): string => {
  return `0 8px 16px 0 ${varAlpha(colorChannel, 0.24)}`;
};
