"use client";

import * as React from "react";
import MuiListItemButton, {
  getListItemButtonUtilityClass,
  ListItemButtonBaseProps as MuiListItemButtonBaseProps,
  ListItemButtonOwnProps as MuiListItemButtonOwnProps,
} from "@mui/material/ListItemButton";
import { ExtendButtonBaseTypeMap } from "../ButtonBase";
import {
  OverridableStringUnion,
  OverridableComponent,
  OverrideProps,
} from "../utils";
import combineSxProps, {
  CombineSxPropsParams,
} from "@/UI/utils/combineSxProps";
import {
  listItemButtonColorStyles,
  listItemButtonStyles,
} from "../styles/customizations/ListItemButton";
import mergeClasses from "@/UI/utils/mergeClasses";
import capitalize from "@/UI/utils/capitalize";
import { ComponentColors } from "../styles/componentVariantStyles";

const ListItemButton: OverridableComponent<ListItemButtonTypeMap> =
  React.forwardRef((inProps, ref) => {
    const {
      children,
      size = "medium",
      color = "primaryMain",
      classes,
      ...props
    } = inProps;

    const renderStyles: CombineSxPropsParams[] = React.useMemo(
      () => [
        (theme) => listItemButtonStyles(theme, size),
        (theme) => listItemButtonColorStyles(theme, color),
      ],
      [size, color]
    );

    const renderClasses: ListItemButtonOwnProps["classes"] = React.useMemo(
      () => ({
        ...classes,
        root: mergeClasses([
          getListItemButtonUtilityClass(`size${capitalize(size)}`),
          getListItemButtonUtilityClass(`color${capitalize(color)}`),
          classes?.root,
        ]),
      }),
      [classes, size, color]
    );

    return (
      <MuiListItemButton
        {...props}
        classes={renderClasses}
        ref={ref}
        sx={combineSxProps(renderStyles, inProps?.sx)}
      >
        {children}
      </MuiListItemButton>
    );
  }) as OverridableComponent<ListItemButtonTypeMap>;

export interface ListItemButtonColorOverrides {}
export interface ListItemButtonBaseProps extends MuiListItemButtonBaseProps {}

interface NewListItemButtonOwnProps {
  /**
   * Defines the size.
   * @default "medium"
   */
  size?: "small" | "medium";
  /**
   * The color of the component.
   * It supports both default and custom theme colors.
   *
   * The color applyed to the selected color.
   * @default 'default'
   */
  color?: OverridableStringUnion<ComponentColors, ListItemButtonColorOverrides>;
}
export interface ListItemButtonOwnProps
  extends MuiListItemButtonOwnProps,
    NewListItemButtonOwnProps {}

export type ListItemButtonTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = "div",
> = ExtendButtonBaseTypeMap<{
  props: AdditionalProps & ListItemButtonOwnProps;
  defaultComponent: RootComponent;
}>;

export type ListItemButtonProps<
  RootComponent extends
    React.ElementType = ListItemButtonTypeMap["defaultComponent"],
  AdditionalProps = {},
> = OverrideProps<
  ListItemButtonTypeMap<AdditionalProps, RootComponent>,
  RootComponent
> & {
  component?: React.ElementType;
};

export default ListItemButton;
