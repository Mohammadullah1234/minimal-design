"use clinet";

import * as React from "react";
import { styled, SxProps, Theme } from "@/UI/styles/MuiStyles";
import {
  CreateSlotsAndSlotProps,
  memoTheme,
  OverridableComponent,
  OverridableStringUnion,
  OverrideProps,
  SlotProps,
} from "../utils";
import {
  ComponentColors,
  ComponentVariants,
  OverridableVariantStyleOptions,
  shouldForwardProp,
} from "../styles";
import {
  labelColorAndVariantStyles,
  labelStyles,
  labelMemoizedStyles,
  labelIconStyles,
} from "../styles/customizations/Label";
import combineSxProps, {
  CombineSxPropsParams,
} from "@/UI/utils/combineSxProps";
import composeClasses from "@/UI/utils/composeClasses";
import { getLabelUtilityClass, LabelClasses } from "./labelClasses";
import capitalize from "@/UI/utils/capitalize";
import mergeClasses from "@/UI/utils/mergeClasses";
import useSlotAndSlotProps from "@/UI/hooks/useSlotAndSlotProps";
import resolveSelector from "@/UI/utils/resolveSelector";

const LabelRoot = styled("span", {
  name: "RuiLabel",
  slot: "root",
  shouldForwardProp: (prop: string) => shouldForwardProp(prop),
})<Pick<LabelOwnProps, "size">>(
  memoTheme(() => labelMemoizedStyles() as TemplateStringsArray)
);

const LabelIcon = styled("div", {
  name: "RuiLabelIcon",
  slot: "root",
  shouldForwardProp: (prop: string) =>
    prop !== "type" && prop !== "size" && shouldForwardProp(prop),
})<{ type: "start" | "end" } & Pick<LabelOwnProps, "size">>(
  memoTheme(() => labelIconStyles() as TemplateStringsArray)
);

/**
 * Classes
 */
const useUtilityClasses = (ownerState: Required<LabelOwnerState>) => {
  const { variant, color, size, classes } = ownerState;

  const slots = {
    root: [
      "root",
      `variant${capitalize(variant)}`,
      `color${capitalize(color)}`,
      `size${capitalize(size)}`,
    ],
    icon: ["icon"],
    startIcon: ["startIcon"],
    endIcon: ["endIcon"],
  };

  return composeClasses(slots, getLabelUtilityClass, classes);
};

const Label: OverridableComponent<LabelTypeMap> = React.forwardRef(
  (inProps, ref) => {
    const {
      component = "span",
      variant = "soft",
      color = "standard",
      size = "medium",
      variantStyleOptions,
      startIcon,
      endIcon,
      children,
      slots,
      slotProps: SlotProps,
      ...props
    } = inProps;

    const ownerState: LabelOwnerState = React.useMemo(
      () =>
        ({
          variant,
          color,
          size,
          classes: props?.classes,
          startIcon,
          endIcon,
          variantStyleOptions,
          component,
        }) as LabelOwnerState,
      [
        variant,
        color,
        size,
        props?.classes,
        startIcon,
        endIcon,
        variantStyleOptions,
        component,
      ]
    );

    const slotProps = React.useMemo(
      () => resolveSelector(SlotProps, ownerState),
      [SlotProps, ownerState]
    );
    const classes = React.useMemo(
      () => useUtilityClasses(ownerState as Required<LabelOwnerState>),
      [ownerState]
    );

    /**
     * styles -------------------
     */
    const renderStyles: CombineSxPropsParams[] = React.useMemo(
      () => [labelStyles],
      []
    );
    const renderColorAndVariantStyles: CombineSxPropsParams[] = React.useMemo(
      () => [labelColorAndVariantStyles(color, variantStyleOptions)[variant]],
      [color, variant, variantStyleOptions]
    );

    /**
     * slots and slotProps -------------
     */
    const [StartIcon, startIconProps] = useSlotAndSlotProps(
      {
        slot: slots?.startIcon,
        slotProps: slotProps?.startIcon,
        elementType: LabelIcon,
        defaultProps: {
          type: "start",
          size,
          className: mergeClasses([classes.icon, classes.startIcon]),
        },
      },
      [slotProps?.startIcon, size, classes.icon, classes.startIcon]
    );

    const [EndIcon, endIconProps] = useSlotAndSlotProps(
      {
        slot: slots?.endIcon,
        slotProps: slotProps?.endIcon,
        elementType: LabelIcon,
        defaultProps: {
          type: "end",
          size,
          className: mergeClasses([classes.icon, classes.endIcon]),
        },
      },
      [slotProps?.endIcon, size, classes.icon, classes.endIcon]
    );

    return (
      <LabelRoot
        {...props}
        sx={combineSxProps(
          renderStyles,
          renderColorAndVariantStyles,
          props?.sx
        )}
        className={mergeClasses([classes.root, props?.className])}
        size={size}
        as={component}
        ref={ref}
      >
        {startIcon && <StartIcon {...startIconProps}>{startIcon}</StartIcon>}
        {children}
        {endIcon && <EndIcon {...endIconProps}>{endIcon}</EndIcon>}
      </LabelRoot>
    );
  }
) as OverridableComponent<LabelTypeMap>;

export interface LabelVariantOverrides {}
export interface LabelColorOverrides {}
export interface LabelSizeOverrides {}

export interface LabelSlots {
  /**
   * The component that renders the startIcon slot.
   * @default "div"
   */
  startIcon: React.ElementType;
  /**
   * The component that renders the endIcon slot.
   * @default "div"
   */
  endIcon: React.ElementType;
}

export interface LabelSlotProps {
  /**
   * Props forwarded to end `startIcon` component. By default, the avaible props are based on the `startIcon` component.
   */
  startIcon: SlotProps<"div">;
  /**
   * Props forwarded to end `endIcon` component. By default, the avaible props are based on the `endIcon` component.
   */
  endIcon: SlotProps<"div">;
}

export type LabelSlotsAndSlotProps = CreateSlotsAndSlotProps<
  LabelSlots,
  LabelSlotProps,
  LabelOwnerState
>;

export interface LabelOwnerState extends OverridableVariantStyleOptions {
  /**
   * Element placed before the children.
   */
  startIcon?: React.ReactNode;
  /**
   * Element placed after the children.
   */
  endIcon?: React.ReactNode;
  /**
   * The variant to use.
   * @default "soft"
   */
  variant?: OverridableStringUnion<ComponentVariants, LabelVariantOverrides>;
  /**
   * The color of the component.
   * It supports both default and custom theme colors.
   * @default 'standard'
   */
  color?: OverridableStringUnion<ComponentColors, LabelColorOverrides>;
  /**
   * The size of the component.
   * `small` is equivalent to the dense label styling.
   * @default 'medium'
   */
  size?: OverridableStringUnion<"medium" | "large", LabelSizeOverrides>;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<LabelClasses>;
  component?: React.ElementType;
}

export interface LabelOwnProps extends LabelOwnerState, LabelSlotsAndSlotProps {
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
}

export type LabelTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = "span",
> = {
  props: AdditionalProps & LabelOwnProps;
  defaultComponent: RootComponent;
};

export type LabelProps<
  RootComponent extends React.ElementType = LabelTypeMap["defaultComponent"],
  AdditionalProps = {},
> = OverrideProps<LabelTypeMap<AdditionalProps, RootComponent>, RootComponent>;

export default Label;
