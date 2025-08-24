"use client";
import { SxProps, Theme } from "@/UI/styles/MuiStyles";
import { alpha } from "@mui/system";

const lightBgolor = "rgb(255, 255, 255)";
const darkBgColor = "rgb(15, 18, 20)";

export const navContainerStyles: (
  theme: Theme,
  removeShadow?: boolean,
  removeBorder?: boolean,
  removeBackground?: boolean,
  removeBackgroundFilter?: boolean
) => SxProps = (
  theme,
  removeShadow = false,
  removeBorder = false,
  removeBackground = false,
  removeBackgroundFilter = false
) => ({
  color: "rgb(34, 34, 39)",
  borderBottom: "1px solid",

  ...(removeBackground
    ? {}
    : {
        ...(removeBackgroundFilter
          ? {
              background: lightBgolor,
            }
          : {
              backdropFilter: "blur(10px)",
              background: alpha(lightBgolor, 0.9),
            }),
      }),
  ...(removeShadow
    ? {}
    : {
        boxShadow: "0px 5px 20px rgba(0, 0, 0, 0.1)",
      }),
  ...(removeBorder ? {} : { borderColor: "rgb(232, 234, 238)" }),

  ...theme.applyStyles("dark", {
    ...(removeBackground
      ? {}
      : {
          background: removeBackgroundFilter
            ? darkBgColor
            : alpha(darkBgColor, 0.9),
        }),
    color: "rgb(249, 249, 249)",
    ...(removeShadow
      ? {}
      : { boxShadow: "0px 5px 20px rgba(255, 255, 255, 0.1)" }),
    ...(removeBorder ? {} : { borderColor: "rgba(61, 71, 81, 0.3)" }),
  }),
});

export const navLinkStyles: (theme: Theme, svgStyles?: SxProps) => SxProps = (
  theme,
  svgStyles
) => ({
  color: "rgb(0, 107, 214)",
  background: "rgb(245, 250, 255)",
  "& svg": { color: "rgb(0, 107, 214)", ...svgStyles },

  ...theme.applyStyles("dark", {
    color: "rgb(102, 179, 255)",
    background: "rgb(29, 33, 38)",
    "& svg": { color: "rgb(102, 179, 255)" },
  }),
});
