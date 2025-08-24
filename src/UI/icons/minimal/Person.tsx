"use client";
import createSvgIcon from "@/UI/utils/createSvgIcon";
import { minimalStandardIconId } from "./iconIds";

export default createSvgIcon(
  <>
    <circle cx="12" cy="6" r="4" fill="currentColor"></circle>
    <ellipse cx="12" cy="17" fill="currentColor" rx="7" ry="4"></ellipse>
  </>,
  `Person__${minimalStandardIconId}`
);
