"use client";
import createSvgIcon from "@/UI/utils/createSvgIcon";
import { minimalStandardIconId } from "./iconIds";

export default createSvgIcon(
  <>
    <circle cx="12" cy="12" r="2" fill="currentColor"></circle>
    <circle cx="12" cy="5" r="2" fill="currentColor"></circle>
    <circle cx="12" cy="19" r="2" fill="currentColor"></circle>
  </>,
  `More__${minimalStandardIconId}`
);
