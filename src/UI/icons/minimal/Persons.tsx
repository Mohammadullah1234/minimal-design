"use client";
import createSvgIcon from "@/UI/utils/createSvgIcon";
import { minimalStandardIconId } from "./iconIds";

export default createSvgIcon(
  <>
    <circle cx="15" cy="6" r="3" fill="currentColor" opacity="0.4"></circle>
    <ellipse
      cx="16"
      cy="17"
      fill="currentColor"
      opacity="0.4"
      rx="5"
      ry="3"
    ></ellipse>
    <circle cx="9.001" cy="6" r="4" fill="currentColor"></circle>
    <ellipse cx="9.001" cy="17.001" fill="currentColor" rx="7" ry="4"></ellipse>
  </>,
  `Persons__${minimalStandardIconId}`
);
