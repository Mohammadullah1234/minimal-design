import { GridProps } from "@mui/material/Grid";
import { LightBoxProps } from "@/UI/material/LightBox";
import { AvatarProps } from "@mui/material/Avatar";
import { BoxProps, CreateSlotsAndSlotProps } from "@mui/material";
import { SvgIconProps } from "@/UI/material/SvgIcon";
import { TypographyProps } from "@mui/material/Typography";
import * as React from "react";

export type ItemsProps = {
  icon: React.ElementType;
  value: React.ReactNode;
};

export interface DetailContentSlots {
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
   * The component that renders the `Avatar` slot.
   * @default Avatar
   */
  icon: React.ElementType;
  /**
   * The component that renders the `LightBox` slot.
   * @default LightBox
   */
  lightBox: React.ElementType;
  /**
   * The component that renders the icon badge `LightBox` slot.
   * @default LightBox
   */
  badge: React.ElementType;
  /**
   * The component that renders the `CircleRounded` slot.
   * @default CircleRounded
   */
  circle: React.ElementType;
  /**
   * The component that renders the `endElement` slot.
   * @default Avatar
   */
  endElement: React.ElementType;
}

type DetailContentLightBoxProps = {
  /**
   * defines a small lightBoxContent with title.
   */
  lightBoxContent?: React.ReactNode;
  /**
   * defines the color of `LightBox` component.
   */
  lightBoxColor?: LightBoxProps["color"];
};

export type DetailContnetSlotsAndSlotProps = CreateSlotsAndSlotProps<
  DetailContentSlots,
  {
    /**
     * Props forwarded to the title `Typography` component of the left. By default, the avaible props are based on the `Typography` component.
     */
    title: TypographyProps;
    /**
     * Props forwarded to the caption `Typography` component of the left. By default, the avaible props are based on the `Typography` component.
     */
    caption: TypographyProps;
    /**
     * Props forwarded to the `Avatar` icon component of the left. By default, the avaible props are based on the `Avatar` component.
     */
    icon: AvatarProps;
    /**
     * Props forwarded to the icon container `Box` component of the left. By default, the avaible props are based on the `Box` component.
     */
    iconContainer: BoxProps;
    /**
     * Props forwarded to the `LightBox` component of the right. By default, the avaible props are based on the `LightBox` component.
     */
    lightBox: Omit<LightBoxProps, "color">;
    /**
     * Props forwarded to the icon badge `LightBox` component of the icon. By default, the avaible props are based on the `LightBox` component.
     */
    badge: Omit<LightBoxProps, "color">;
    /**
     * Props forwarded to the circle `svg` component of the center of items. By default, the avaible props are based on the `svg` component.
     */
    circle: SvgIconProps;
    /**
     * Props forwarded to the `endElement` Avatar component of the center of items. By default, the avaible props are based on the `Avatar` component.
     */
    endElement: AvatarProps;
  }
>;

export interface DetailContentBoxProps
  extends Omit<GridProps, "title">,
    DetailContentLightBoxProps,
    DetailContnetSlotsAndSlotProps {
  title: React.ReactNode;
  /**
   * if it's true the loading
   */
  loading?: boolean;
  useDot?: boolean;
  dotColor?: LightBoxProps["color"];
  /**
   * if it's true a divider will be displayed at the end.
   */
  useDivider?: boolean;
  /**
   * defines the content of icon badge.
   */
  badgeContent?: React.ReactNode;
  /**
   * defines the color of icon badge `LightBox` component.
   */
  badgeColor?: LightBoxProps["color"];
  /**
   * defines the content items under the title.
   */
  items?: ItemsProps[];
  /**
   * if it's true the detailContentBox will be selectable.
   */
  selectable?: boolean;
  /**
   * if it's true the `LightBox` component is focused.
   */
  focused?: boolean;
  /**
   * defines icon before the title.
   * Note: the icon prop can be used as image link like "/background.webp" or custome component.
   */
  icon?: React.ReactNode;
  /**
   * defines caption under title.
   */
  caption?: string;
  /**
   * if it's true the small circle dot of items will not be rendered.
   */
  disableCircleDot?: boolean;
  /**
   * The prop used for end element of `DetailContentBox`.
   */
  endElement?: React.ReactNode;
  children?: React.ReactNode;
}
