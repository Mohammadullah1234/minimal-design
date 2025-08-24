import { CreateSlotsAndSlotProps } from "@mui/material";
import { BoxProps } from "@/UI/material/Box";
import { TypographyProps } from "@mui/material/Typography";
import { GridProps } from "@mui/material/Grid";
import { CardUIProps } from "../CardUI";
import { CircularProgressUIProps } from "../CircularProgressUI";

export type ColorfulProgressCardSlots = {
  /**
   * The component that renders the `card` slot.
   * @default CardUI
   */
  card: React.ElementType;
  /**
   * The component that renders the `progress` slot.
   * @default LinearCircularProgress
   */
  progress: React.JSX.Element;
  /**
   * The component that renders the `title` slot.
   * @default Typography
   */
  title: React.ElementType;
  /**
   * The component that renders the `caption` slot.
   * @default Typography
   */
  caption: React.ElementType;
  /**
   * The component that renders the `icon` slot.
   * @default SvgIcon
   */
  icon: React.ElementType;
};

export type ColorfulProgressCardSlotsAndSlotProps = CreateSlotsAndSlotProps<
  ColorfulProgressCardSlots,
  {
    /**
     * Props forwarded to the `CardUI` component. By default, the avaible props are based on the `CardUI` component.
     */
    card: CardUIProps;
    /**
     * Props forwarded to the `LinearCircularProgress` component of the left. By default, the avaible props are based on the `LinearCircularProgress` component.
     */
    progress: Omit<LinearCircularProgressProps, "progressValue">;
    /**
     * Props forwarded to the `title` Typography component. By default, the avaible props are based on the `title` component.
     */
    title: Omit<TypographyProps, "children">;
    /**
     * Props forwarded to the `caption` Typography component. By default, the avaible props are based on the `caption` component.
     */
    caption: Omit<TypographyProps, "children">;
    /**
     * Props forwarded to the `svg` icon component at the right. By default, the avaible props are based on the `svg` component.
     */
    icon: Omit<BoxProps, "children">;
  }
>;

export interface ColorfulProgressCardProps
  extends ColorfulProgressCardSlotsAndSlotProps {
  title: React.ReactNode;
  progressValue: number;
  /**
   * progressColors use to defines linear progress colors.
   */
  progressColors: CircularProgressUIProps["colors"];
  /**
   * defines icon at the right.
   */
  icon?: React.ReactNode;
  /**
   * defines caption under the title.
   */
  caption?: React.ReactNode;
  /**
   * if it's true the animation will be disabled on mouseover.
   */
  skipAnimation?: boolean;
}

// LinearCircularProgress props code --------------------------------------
export type LinearCircularProgressSlots = {
  /**
   * The component that renders the `circle1` slot.
   * @default Typography
   */
  circle1: React.ElementType;
  /**
   * The component that renders the `circle2` slot.
   * @default Typography
   */
  circle2: React.ElementType;
  /**
   * The component that renders the `progressValue` slot.
   * @default Typography
   */
  progressValue: React.ElementType;
};

export type LinearCircularProgressSlotsAndSlotProps = CreateSlotsAndSlotProps<
  LinearCircularProgressSlots,
  {
    /**
     * Props forwarded to the first circle component. By default, the avaible props are based on the `circle` component.
     */
    circle1: CircularProgressUIProps;
    /**
     * Props forwarded to the second circle component. By default, the avaible props are based on the `circle` component.
     */
    circle2: Omit<CircularProgressUIProps, "value">;
    /**
     * Props forwarded to the `value` Typography component. By default, the avaible props are based on the `value` component.
     */
    progressValue: Omit<TypographyProps, "children">;
  }
>;

export interface LinearCircularProgressProps
  extends GridProps,
    LinearCircularProgressSlotsAndSlotProps {
  progressValue: number;
}
