"use client";

import * as React from "react";
import MuiButtonGroup, {
  ButtonGroupPropsColorOverrides as MuiButtonGroupPropsColorOverrides,
  ButtonGroupPropsVariantOverrides as MuiButtonGroupPropsVariantOverrides,
  ButtonGroupPropsSizeOverrides as MuiButtonGroupPropsSizeOverrides,
  ButtonGroupOwnProps as MuiButtonGroupOwnProps,
} from "@mui/material/ButtonGroup";
import { CombineSxPropsParams } from "@/UI/utils/combineSxProps";
import {
  OverridableComponent,
  OverridableStringUnion,
  OverrideProps,
} from "@/UI/material/utils";
import { varAlpha } from "@/UI/styles/colorManipulator";
import {
  ComponentColors,
  ComponentVariants,
} from "../styles/componentVariantStyles";
import combineSxProps from "../../utils/combineSxProps/combineSxProps";
import buttonGroupClasses from "./buttonGroupClasses";
import { PaletteColorKey } from "@/UI/theme";
import { useMinimalTheme } from "@/UI/styles/hooks";

const ButtonGroup: OverridableComponent<ButtonGroupTypeMap> = React.forwardRef(
  (inProps, ref) => {
    const minimalPalette = useMinimalTheme().palette;

    const {
      size = "medium",
      color = "default",
      variant = "filled",
      disabled = false,
      orientation = "horizontal",
      ...props
    } = inProps;

    const borderVal =
      orientation === "horizontal" ? "borderRight" : "borderBottom";

    const renderStyles: CombineSxPropsParams[] = React.useMemo(
      () => [
        {
          boxShadow: "none",
          [`& .${buttonGroupClasses.firstButton},& .${buttonGroupClasses.middleButton}`]:
            {
              ...(disabled
                ? {
                    [borderVal]: `1px solid ${varAlpha(
                      minimalPalette.grey["600Channel"],
                      0.2
                    )}`,
                  }
                : variant === "filled"
                  ? {
                      [borderVal]: `1px solid ${
                        color === "default"
                          ? varAlpha(minimalPalette.grey["100Channel"], 0.3)
                          : varAlpha(minimalPalette.grey["800Channel"], 0.2)
                      }`,
                    }
                  : variant === "soft" || variant === "inverted"
                    ? {
                        [borderVal]: `1px solid ${
                          color === "default" || color === "standard"
                            ? varAlpha(minimalPalette.grey["600Channel"], 0.2)
                            : varAlpha(
                                minimalPalette[color as PaletteColorKey]
                                  .darkChannel,
                                0.2
                              )
                        }`,
                      }
                    : {}),
            },
        },
      ],
      [disabled, color, variant, orientation]
    );

    return (
      <MuiButtonGroup
        {...props}
        variant={variant as MuiButtonGroupOwnProps["variant"]}
        color={color as MuiButtonGroupOwnProps["color"]}
        size={size}
        orientation={orientation}
        ref={ref}
        sx={combineSxProps(renderStyles, props?.sx)}
      />
    );
  }
) as OverridableComponent<ButtonGroupTypeMap>;

export interface ButtonGroupPropsColorOverrides
  extends MuiButtonGroupPropsColorOverrides {}
export interface ButtonGroupPropsVariantOverrides
  extends MuiButtonGroupPropsVariantOverrides {}
export interface ButtonGroupPropsSizeOverrides
  extends MuiButtonGroupPropsSizeOverrides {}

interface NewButtonGroupProps {
  /**
   * The variant to use.
   * @default 'filled'
   */
  variant?: OverridableStringUnion<
    ComponentVariants,
    ButtonGroupPropsVariantOverrides
  >;
  /**
   * The color of the component.
   * It supports both default and custom theme colors.
   * @default 'default'
   */
  color?: OverridableStringUnion<
    ComponentColors,
    ButtonGroupPropsColorOverrides
  >;
}
export interface ButtonGroupOwnProps
  extends Omit<MuiButtonGroupOwnProps, "color" | "variant">,
    NewButtonGroupProps {}

export interface ButtonGroupTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = "div",
> {
  props: AdditionalProps & ButtonGroupOwnProps;
  defaultComponent: RootComponent;
}

export type ButtonGroupProps<
  RootComponent extends
    React.ElementType = ButtonGroupTypeMap["defaultComponent"],
  AdditionalProps = {},
> = OverrideProps<
  ButtonGroupTypeMap<AdditionalProps, RootComponent>,
  RootComponent
> & {
  component?: React.ElementType;
};

export default ButtonGroup;
