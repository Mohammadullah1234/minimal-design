"use client";

import * as React from "react";
import MuiBadge, {
  BadgePropsVariantOverrides as MuiBadgePropsVariantOverrides,
  BadgePropsColorOverrides as MuiBadgePropsColorOverrides,
  BadgeRootSlotPropsOverrides as MuiBadgeRootSlotPropsOverrides,
  BadgeBadgeSlotPropsOverrides as MuiBadgeBadgeSlotPropsOverrides,
  BadgeSlots as MuiBadgeSlots,
  BadgeSlotsAndSlotProps as MuiBadgeSlotsAndSlotProps,
  BadgeOwnerState as MuiBadgeOwnerState,
  BadgeOrigin as MuiBadgeOrigin,
  BadgeOwnProps as MuiBadgeOwnProps,
} from "@mui/material/Badge";
import combineSxProps, {
  CombineSxPropsParams,
} from "@/UI/utils/combineSxProps";
import {
  OverridableComponent,
  OverridableStringUnion,
  OverrideProps,
} from "@/UI/material/utils";
import {
  badgeStyles,
  badgeStatusStyles,
  badgeColorAndVariantStyles,
} from "../styles/customizations/Badge";
import {
  ComponentColors,
  ComponentVariants,
  OverridableVariantStyleOptions,
} from "../styles/componentVariantStyles";
import mergeClasses from "@/UI/utils/mergeClasses";
import { getBadgeUtilityClass } from "./badgeClasses";
import resolveSelector from "@/UI/utils/resolveSelector";

const Badge: OverridableComponent<BadgeTypeMap> = React.forwardRef(
  (inProps, ref) => {
    const {
      children,
      color = "standard",
      status,
      variantStyle = "filled",
      variantStyleOptions,
      classes,
      ...props
    } = inProps;

    const renderStyles: CombineSxPropsParams[] = React.useMemo(
      () => [badgeStyles],
      []
    );

    const renderColorAndVariantStyles: CombineSxPropsParams[] = React.useMemo(
      () => [
        status && props?.variant === "dot"
          ? badgeStatusStyles(status)
          : badgeColorAndVariantStyles(color, variantStyleOptions)[
              variantStyle
            ],
      ],
      [status, props?.variant, color, variantStyleOptions, variantStyle]
    );

    const badgeSlotProps = React.useCallback(
      (ownerState: BadgeOwnerState) =>
        resolveSelector(props?.slotProps?.badge, ownerState),
      [props?.slotProps?.badge]
    );

    const slotProps: BadgeSlotsAndSlotProps["slotProps"] = React.useMemo(
      () => ({
        ...props?.slotProps,
        badge: (ownerState) => ({
          ...badgeSlotProps(ownerState),
          sx: combineSxProps(
            renderStyles,
            renderColorAndVariantStyles,
            badgeSlotProps(ownerState)?.sx
          ),
        }),
      }),
      [props?.slotProps, renderStyles, renderColorAndVariantStyles]
    );

    const renderClasses = React.useMemo(
      () => ({
        ...classes,
        root: mergeClasses([getBadgeUtilityClass(variantStyle), classes?.root]),
      }),
      [classes, variantStyle]
    );

    return (
      <MuiBadge
        {...props}
        color={color as MuiBadgeOwnProps["color"]}
        ref={ref}
        classes={renderClasses}
        slotProps={slotProps}
      >
        {children}
      </MuiBadge>
    );
  }
) as OverridableComponent<BadgeTypeMap>;

export interface BadgePropsVariantOverrides
  extends MuiBadgePropsVariantOverrides {}
export interface BadgePropsVariantStyleOverrides {}
export interface BadgePropsColorOverrides extends MuiBadgePropsColorOverrides {}
export interface BadgeRootSlotPropsOverrides
  extends MuiBadgeRootSlotPropsOverrides {}
export interface BadgeBadgeSlotPropsOverrides
  extends MuiBadgeBadgeSlotPropsOverrides {}

export interface BadgeSlots extends MuiBadgeSlots {}
export type BadgeSlotsAndSlotProps = MuiBadgeSlotsAndSlotProps;
export interface BadgeOwnerState extends MuiBadgeOwnerState {}
export interface BadgeOrigin extends MuiBadgeOrigin {}

interface NewBadgeOwnProps extends OverridableVariantStyleOptions {
  /**
   * Defines the custome status of Badge.
   *
   * Note: Before using the `status` prop, the variant must be set to `dot` of Badge.
   */
  status?: "always" | "online" | "busy" | "offline";
  /**
   * The color of the component.
   * It supports both default and custom theme colors.
   * @default 'standard'
   */
  color?: OverridableStringUnion<ComponentColors, BadgePropsColorOverrides>;
  /**
   * The variant style to use.
   * @default 'filled'
   */
  variantStyle?: OverridableStringUnion<
    ComponentVariants,
    BadgePropsVariantStyleOverrides
  >;
}

export interface BadgeOwnProps
  extends Omit<MuiBadgeOwnProps, "color">,
    NewBadgeOwnProps {}

export interface BadgeTypeMap<
  RootComponent extends React.ElementType = "span",
  AdditionalProps = {},
> {
  props: AdditionalProps & BadgeOwnProps;
  defaultComponent: RootComponent;
}

export type BadgeProps<
  RootComponent extends React.ElementType = BadgeTypeMap["defaultComponent"],
  AdditionalProps = {},
> = OverrideProps<
  BadgeTypeMap<RootComponent, AdditionalProps>,
  RootComponent
> & {
  component?: React.ElementType;
};
export default Badge;
