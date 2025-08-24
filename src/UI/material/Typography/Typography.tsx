"use client";

import * as React from "react";
import MuiTypography, {
  TypographyPropsVariantOverrides as MuiTypographyPropsVariantOverrides,
  TypographyPropsColorOverrides as MuiTypographyPropsColorOverrides,
  TypographyOwnProps as MuiTypographyOwnProps,
} from "@mui/material/Typography";
import {
  memoTheme,
  OverridableComponent,
  OverridableStringUnion,
  OverrideProps,
} from "../utils";
import { styled, TypeText } from "@/UI/styles/MuiStyles";
import {
  typographyStyles,
  typographyColorStyles,
  typographyVariantOptions,
} from "../styles/customizations/Typography";
import combineSxProps, {
  CombineSxPropsParams,
} from "@/UI/utils/combineSxProps";
import { ComponentColors } from "../styles/componentVariantStyles";

const TypographyRoot = styled(MuiTypography)(
  memoTheme(
    () =>
      ({
        ...typographyStyles(),
        variants: Object.entries(typographyVariantOptions()).map(
          ([variant, value]) =>
            typeof value === "object"
              ? {
                  props: {
                    variant,
                  },
                  style: value,
                }
              : {}
        ),
      }) as unknown as TemplateStringsArray
  )
);

const Typography: OverridableComponent<TypographyTypeMap> = React.forwardRef(
  (inProps, ref) => {
    const { children, color = "standard", ...props } = inProps;

    const renderColorStyles: CombineSxPropsParams[] = React.useMemo(
      () => [(theme) => typographyColorStyles(theme, color)],
      [color]
    );

    return (
      <TypographyRoot
        {...props}
        color={color as MuiTypographyOwnProps["color"]}
        sx={combineSxProps(renderColorStyles, props?.sx)}
        ref={ref}
      >
        {children}
      </TypographyRoot>
    );
  }
) as OverridableComponent<TypographyTypeMap>;

export interface TypographyPropsVariantOverrides
  extends MuiTypographyPropsVariantOverrides {}
export interface TypographyPropsColorOverrides
  extends MuiTypographyPropsColorOverrides {}

interface NewTypographyOwnProps {
  /**
   * The color of the component.
   * It supports both default and custom theme colors.
   * @default 'standard'
   */
  color?: OverridableStringUnion<
    ComponentColors | `text${Capitalize<keyof TypeText>}`,
    TypographyPropsColorOverrides
  >;
}
export interface TypographyOwnProps
  extends Omit<MuiTypographyOwnProps, "color">,
    NewTypographyOwnProps {}

export interface TypographyTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = "span",
> {
  props: AdditionalProps & TypographyOwnProps;
  defaultComponent: RootComponent;
}

export type TypographyProps<
  RootComponent extends
    React.ElementType = TypographyTypeMap["defaultComponent"],
  AdditionalProps = {},
> = OverrideProps<
  TypographyTypeMap<AdditionalProps, RootComponent>,
  RootComponent
> & {
  component?: React.ElementType;
};

export default Typography;
