"use client";

import * as React from "react";
import MuiButtonBase, {
  ButtonBaseOwnProps as MuiButtonBaseOwnProps,
  ExtendButtonBaseTypeMap as MuiExtendButtonBaseTypeMap,
  ExtendButtonBase as MuiExtendButtonBase,
  ButtonBaseProps as MuiButtonBaseProps,
  ButtonBaseActions as MuiButtonBaseActions,
} from "@mui/material/ButtonBase";
import { OverridableTypeMap } from "@/UI/material/utils";
import combineSxProps from "@/UI/utils/combineSxProps";
import { buttonBaseStyles } from "../styles/customizations/ButtonBase";

const ButtonBase: ExtendButtonBase<ButtonBaseTypeMap> = React.forwardRef(
  (inProps, ref) => {
    const renderStyles = React.useMemo(() => [buttonBaseStyles], []);

    return (
      <MuiButtonBase
        {...inProps}
        ref={ref}
        sx={combineSxProps(renderStyles, inProps?.sx)}
      />
    );
  }
) as ExtendButtonBase<ButtonBaseTypeMap>;

export interface ButtonBaseOwnProps extends MuiButtonBaseOwnProps {}
/**
 * utility to create component types that inherit props from ButtonBase.
 * This component has an additional overload if the `href` prop is set which
 * can make extension quite tricky
 */
export interface ExtendButtonBaseTypeMap<TypeMap extends OverridableTypeMap>
  extends MuiExtendButtonBaseTypeMap<TypeMap> {}
export type ExtendButtonBase<TypeMap extends OverridableTypeMap> =
  MuiExtendButtonBase<TypeMap>;

export interface ButtonBaseTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = "button",
> {
  props: AdditionalProps & ButtonBaseOwnProps;
  defaultComponent: RootComponent;
}
export type ButtonBaseProps<
  RootComponent extends
    React.ElementType = ButtonBaseTypeMap["defaultComponent"],
  AdditionalProps = {},
> = MuiButtonBaseProps<RootComponent, AdditionalProps>;
export interface ButtonBaseActions extends MuiButtonBaseActions {}

export default ButtonBase;
