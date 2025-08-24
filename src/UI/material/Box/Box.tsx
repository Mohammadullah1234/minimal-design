"use strict";
"use client";

import * as React from "react";
import {
  BoxTypeMap as MuiSystemBoxTypeMap,
  BoxOwnProps as MuiSystemBoxOwnProps,
} from "@mui/system/Box";
import createBox from "@mui/system/createBox";
import { Theme as MuiTheme, createTheme } from "@/UI/styles/MuiStyles";
import boxClasses from "./boxClasses";
import classNameGenerator from "@/UI/utils/classNameGenerator";
import { OverridableComponent, OverrideProps } from "@/UI/material/utils";

const defaultTheme = createTheme();
const Box: OverridableComponent<BoxTypeMap<{}, "div", MuiTheme>> = createBox({
  themeId: "$$mui",
  defaultTheme,
  defaultClassName: boxClasses.root,
  generateClassName: classNameGenerator().generate,
}) as OverridableComponent<BoxTypeMap<{}, "div", MuiTheme>>;

export interface BoxOwnProps<Theme extends object = MuiTheme>
  extends MuiSystemBoxOwnProps<Theme> {}

export interface BoxTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = "div",
  Theme extends object = MuiTheme,
> extends MuiSystemBoxTypeMap<AdditionalProps, RootComponent, Theme> {}

export type BoxProps<
  RootComponent extends React.ElementType = BoxTypeMap["defaultComponent"],
  DomElement extends Element = HTMLDivElement,
  AdditionalProps = {},
> = OverrideProps<
  BoxTypeMap<AdditionalProps, RootComponent, MuiTheme>,
  RootComponent
> &
  React.DOMAttributes<DomElement> & {
    className?: string;
    component?: React.ElementType;
  };

export default Box;
