import * as React from "react";
import MuiChip, {
  ChipPropsVariantOverrides as MuiChipPropsVariantOverrides,
  ChipPropsSizeOverrides as MuiChipPropsSizeOverrides,
  ChipPropsColorOverrides as MuiChipPropsColorOverrides,
  ChipOwnProps as MuiChipOwnProps,
} from "@mui/material/Chip";
import {
  OverridableComponent,
  OverridableStringUnion,
  OverrideProps,
} from "@/UI/material/utils";
import {
  chipAvatarStyles,
  chipColorAndVariantStyles,
  chipDeleteIconStyles,
  chipDisabledStyles,
  chipStyles,
} from "../styles/customizations/Chip";
import {
  ComponentColors,
  ComponentVariants,
  OverridableVariantStyleOptions,
} from "../styles/componentVariantStyles";
import combineSxProps, {
  CombineSxPropsParams,
} from "@/UI/utils/combineSxProps";
import { CloseFilled } from "@/UI/icons/minimal";

const Chip: OverridableComponent<ChipTypeMap> = React.forwardRef(
  (inProps, ref) => {
    const {
      children,
      clickable = false,
      color = "standard",
      variant = "filled",
      variantStyleOptions,
      ...props
    } = inProps;

    const renderStyles: CombineSxPropsParams[] = React.useMemo(
      () => [chipStyles],
      []
    );

    const renderColorAndVariantStyles: CombineSxPropsParams[] = React.useMemo(
      () => [
        (theme) => chipAvatarStyles(theme, color),
        (theme) => chipDeleteIconStyles(theme, variant, color),
        chipColorAndVariantStyles(clickable, color, variantStyleOptions)[
          variant
        ],
        (theme) => chipDisabledStyles(theme, variant),
      ],
      [clickable, color, variant, variantStyleOptions]
    );

    return (
      <MuiChip
        deleteIcon={<CloseFilled />}
        {...props}
        clickable={clickable}
        color={color as MuiChipOwnProps["color"]}
        variant={variant as MuiChipOwnProps["variant"]}
        ref={ref}
        sx={combineSxProps(
          renderStyles,
          renderColorAndVariantStyles,
          props?.sx
        )}
      >
        {children}
      </MuiChip>
    );
  }
) as OverridableComponent<ChipTypeMap>;

export interface ChipPropsVariantOverrides
  extends MuiChipPropsVariantOverrides {}
export interface ChipPropsSizeOverrides extends MuiChipPropsSizeOverrides {}
export interface ChipPropsColorOverrides extends MuiChipPropsColorOverrides {}

interface NewChipOwnProps extends OverridableVariantStyleOptions {
  /**
   * The color of the component.
   * It supports both default and custom theme colors.
   * @default 'standard'
   */
  color?: OverridableStringUnion<ComponentColors, ChipPropsColorOverrides>;
  /**
   * The variant to use.
   * @default 'filled'
   */
  variant?: OverridableStringUnion<
    ComponentVariants,
    ChipPropsVariantOverrides
  >;
}
export interface ChipOwnProps
  extends Omit<MuiChipOwnProps, "color" | "variant">,
    NewChipOwnProps {}

export interface ChipTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = "div",
> {
  props: AdditionalProps & ChipOwnProps;
  defaultComponent: RootComponent;
}

export type ChipProps<
  RootComponent extends React.ElementType = ChipTypeMap["defaultComponent"],
  AdditionalProps = {},
> = OverrideProps<
  ChipTypeMap<AdditionalProps, RootComponent>,
  RootComponent
> & {
  component?: React.ElementType;
};

export default Chip;
