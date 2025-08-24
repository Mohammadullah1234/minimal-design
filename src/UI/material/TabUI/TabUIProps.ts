import { TabProps } from "@mui/material/Tab";
import { LightBoxProps } from "../LightBox";

export interface TabUIProps extends TabProps {
  badgeContent?: React.ReactNode;
  badgeColor?: LightBoxProps["color"];
  badgeProps?: Omit<LightBoxProps, "color" | "children">;
}
