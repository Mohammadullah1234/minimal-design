import { SxProps, Theme } from "@mui/material/styles";
import { ColorfulProgressCardProps } from "./ColorfulProgressCardProps";
import { colorfulProgressCardClasses } from "./ColorfulProgressCardClasses";

export const colorfulProgressCardStyles: (theme: Theme,skipAnimation: ColorfulProgressCardProps["skipAnimation"]) => SxProps = (
  theme,
  skipAnimation
) => ({
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  color: "#fff",
  overflow: "hidden",
  padding: "1.75rem 2rem",
  paddingRight: "0rem",
  boxShadow: "none",

  border: "none",
  borderRadius: "1rem",
  transition: "all 0.4s ease",

  ...(skipAnimation
    ? {}
    : {
        "&:hover": {
          transform: "scale(1.02)",

          [`& .${colorfulProgressCardClasses.icon}`]: {
            right: "-0.5rem",
            color: "rgba(255, 255, 255, 0.25)",

            "& path": {
              fill: "rgba(255, 255, 255, 0.25)",
            },
          },
        },
      }),
});