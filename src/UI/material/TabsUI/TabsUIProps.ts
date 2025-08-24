import { TabsProps } from "@mui/material/Tabs";
import { CSSObject, Theme } from "@/UI/styles";

export type TabColors =
  | "default"
  | "dark"
  | "primary"
  | "secondary"
  | "success"
  | "error"
  | "warning";
export type ApplyStyleTypes = (
  style: TabColors,
  theme: Theme,
  removeBackground?: boolean
) => CSSObject;

export interface TabsUIProps extends TabsProps {
  defaultTabValue: string;
  /**
   * tabColor is used to select your favorite color of Tab
   * @default "default"
   */
  tabColor?: TabColors;
  tabVariant?: "box" | "underline";
}
