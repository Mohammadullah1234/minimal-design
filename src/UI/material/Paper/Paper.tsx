"use client";

import * as React from "react";
import MuiPaper, {
  PaperPropsVariantOverrides as MuiPaperPropsVariantOverrides,
  PaperOwnProps as MuiPaperOwnProps,
} from "@mui/material/Paper";
import {
  memoTheme,
  OverridableComponent,
  OverridableTypeMap,
  OverrideProps,
} from "../utils";
import {
  paperStyles,
  paperBlueGradientStyles,
  paperRedGradientStyles,
} from "../styles/customizations/Paper";
import { PaperBlueGradient, PaperRedGradient } from "./paperGradients";
import { styled } from "@/UI/styles/MuiStyles";

const PaperRoot = styled(MuiPaper)(
  memoTheme(({ theme }) => paperStyles(theme) as TemplateStringsArray)
);

const PaperBlueGradientRoot = styled(PaperBlueGradient)(
  memoTheme(() => paperBlueGradientStyles() as TemplateStringsArray)
);

const PaperRedGradientRoot = styled(PaperRedGradient)(
  memoTheme(() => paperRedGradientStyles() as TemplateStringsArray)
);

const Paper: OverridableComponent<PaperTypeMap> = React.forwardRef(
  (props, ref) => {
    const { children, ...other } = props;

    return (
      <PaperRoot {...other} ref={ref}>
        {children}
        <PaperBlueGradientRoot />
        <PaperRedGradientRoot />
      </PaperRoot>
    );
  }
) as OverridableComponent<PaperTypeMap>;

export interface PaperPropsVariantOverrides
  extends MuiPaperPropsVariantOverrides {}
export interface PaperOwnProps extends MuiPaperOwnProps {}

export interface PaperTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = "div",
> {
  props: AdditionalProps & PaperOwnProps;
  defaultComponent: RootComponent;
}

export interface ExtendPaperTypeMap<
  TypeMap extends OverridableTypeMap,
  Keys extends string = "",
> {
  props: TypeMap["props"] & Omit<PaperTypeMap["props"], Keys>;
  defaultComponent: TypeMap["defaultComponent"];
}

export type PaperProps<
  RootComponent extends React.ElementType = PaperTypeMap["defaultComponent"],
  AdditionalProps = {},
> = OverrideProps<
  PaperTypeMap<AdditionalProps, RootComponent>,
  RootComponent
> & {
  component?: React.ElementType;
};

export default Paper;
