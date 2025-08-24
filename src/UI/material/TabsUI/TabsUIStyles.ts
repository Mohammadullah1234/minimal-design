import { SxProps, Theme } from "@/UI/styles";
import { tabsClasses } from "@mui/material/Tabs";
import { tabClasses } from "@mui/material/Tab";
import { TabColors, TabsUIProps } from "./TabsUIProps";
import { applyTabStyle } from "./Functions";

export const tabsUIStyles: (
  theme: Theme,
  tabColor: TabColors,
  tabVariant: TabsUIProps["tabVariant"]
) => SxProps = (theme, tabColor, tabVariant) => ({
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  ...(tabColor === "default" ? {} : { background: "rgb(243, 245, 248)" }),
  color: "rgb(101, 108, 114)",
  overflowX: "auto",
  height: "3.5rem",
  px: "0.45rem",

  ...theme.applyStyles("dark", {
    ...(tabColor === "default" ? {} : { background: " #27313C" }),
    color: "rgb(153, 163, 173)",
  }),

  [`& .${tabsClasses.scroller}`]: {
    display: "flex",
  },

  [`& .${tabsClasses.list}`]: {
    width: "100%",
    height: "3.5rem",
    alignItems: "center",
  },
  [`& .${tabClasses.root}`]: {
    minWidth: "max-content",
    borderRadius: "0.5rem",
    textTransform: "unset",
    fontSize: "0.85rem",
    lineHeight: "unset",
    height: "2.5rem",
    minHeight: "auto",
    background: "transparent",
    textAlign: "center",
    paddingLeft: tabVariant === "box" ? "1.55rem" : "0",
    paddingRight: tabVariant === "box" ? "1.55rem" : "0",
    color: " #67717A",
    zIndex: "2",
    px: "0.95rem",

    "&.Mui-selected": applyTabStyle(tabColor, theme, true),

    ...theme.applyStyles("dark", {
      color: " #959FAB",
    }),
  },

  [` .${tabsClasses.indicator}`]: {
    top: tabVariant === "box" ? "16%" : "unset",
    bottom: tabVariant === "underline" ? "0" : "unset",
    height: tabVariant === "box" ? "2.4rem" : "0.15rem",
    pointerEvents: "none",
    borderRadius: tabVariant === "box" ? "0.5rem" : "5rem",

    ...(tabVariant === "box"
      ? applyTabStyle(tabColor, theme, false)
      : {
          background: "rgb(42, 41, 49)",

          ...theme.applyStyles("dark", {
            background: "rgb(254, 254, 254)",
          }),
        }),
  },
});
