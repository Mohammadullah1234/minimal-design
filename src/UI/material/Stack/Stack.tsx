"use strict";
"use client";

import * as React from "react";
import { createStack } from "@mui/system/Stack";
import {
  ResponsiveStyleValue,
  styled,
  SxProps,
  SystemProps,
  Theme,
} from "@/UI/styles/MuiStyles";
import { OverridableComponent, OverrideProps } from "@/UI/material/utils";
import { useDefaultProps } from "@mui/system/DefaultPropsProvider";

const Stack: OverridableComponent<StackTypeMap> = createStack({
  componentName: "MuiStack",
  createStyledComponent: styled("div", {
    name: "MuiStack",
    slot: "Root",
  }),
  useThemeProps: (inProps) =>
    useDefaultProps({
      props: inProps,
      name: "MuiStack",
    }),
}) as OverridableComponent<StackTypeMap>;

export interface StackOwnProps extends SystemProps<Theme> {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * Defines the `flex-direction` style property.
   * It is applied for all screen sizes.
   * @default 'column'
   */
  direction?: ResponsiveStyleValue<
    "row" | "row-reverse" | "column" | "column-reverse"
  >;
  /**
   * Defines the space between immediate children.
   * @default 0
   */
  spacing?: ResponsiveStyleValue<number | string>;
  /**
   * Add an element between each child.
   */
  divider?: React.ReactNode;
  /**
   * If `true`, the CSS flexbox `gap` is used instead of applying `margin` to children.
   *
   * While CSS `gap` removes the [known limitations](https://mui.com/joy-ui/react-stack/#limitations),
   * it is not fully supported in some browsers. We recommend checking https://caniuse.com/?search=flex%20gap before using this flag.
   *
   * To enable this flag globally, follow the [theme's default props](https://mui.com/material-ui/customization/theme-components/#default-props) configuration.
   * @default false
   */
  useFlexGap?: boolean;
  /**
   * The system prop, which allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
}
export interface StackTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = "div",
> {
  props: AdditionalProps & StackOwnProps;
  defaultComponent: RootComponent;
}

export type StackProps<
  RootComponent extends React.ElementType = StackTypeMap["defaultComponent"],
  AdditionalProps = {},
> = OverrideProps<
  StackTypeMap<AdditionalProps, RootComponent>,
  RootComponent
> & {
  component?: React.ElementType;
};

export default Stack;
