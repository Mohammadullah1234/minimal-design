"use client";

import { useMuiTheme } from "@/UI/styles/hooks";
import { styled } from "@/UI/styles/MuiStyles";
import { useDefaultProps } from "@mui/system/DefaultPropsProvider";
import { createGrid } from "@mui/system/Grid";
import {
  GridDirection as MuiGridDirection,
  GridSpacing as MuiGridSpacing,
  GridWrap as MuiGridWrap,
  GridSize as MuiGridSize,
  GridOffset as MuiGridOffset,
  GridBaseProps as MuiGridBaseProps,
  GridTypeMap as MuiGridTypeMap,
  GridProps as MuiGridProps,
} from "@mui/material/Grid";
import { OverridableComponent } from "../utils";

const Grid: OverridableComponent<GridTypeMap> = createGrid({
  createStyledComponent: styled("div", {
    name: "MuiGrid",
    slot: "Root",
    overridesResolver: (props, styles) => {
      const { ownerState } = props;
      return [styles.root, ownerState.container && styles.container];
    },
  }),
  componentName: "MuiGrid",
  useThemeProps: (inProps) =>
    useDefaultProps({
      props: inProps,
      name: "MuiGrid",
    }),
  useTheme: useMuiTheme,
}) as OverridableComponent<GridTypeMap>;

export type GridDirection = MuiGridDirection;
export type GridSpacing = MuiGridSpacing;
export type GridWrap = MuiGridWrap;
export type GridSize = MuiGridSize;
export type GridOffset = MuiGridOffset;

export interface GridBaseProps extends MuiGridBaseProps {}
export interface GridTypeMap<
  Props = {},
  DefaultComponent extends React.ElementType = "div",
> extends MuiGridTypeMap<Props, DefaultComponent> {}

export type GridProps<
  DefaultComponent extends React.ElementType = GridTypeMap["defaultComponent"],
  Props = {
    component?: React.ElementType;
  },
> = MuiGridProps<DefaultComponent, Props>;

export default Grid;
