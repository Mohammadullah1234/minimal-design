"use client";

import * as React from "react";
import { useNavigationBar } from "../../hooks/useNavigationBar";
import ButtonBase, { ButtonBaseProps } from "@/UI/material/ButtonBase";
import { CombineSxPropsParams } from "@/UI/utils/combineSxProps";
import {
  navItemHeaderStyles,
  navItemStatusStyles,
  navItemStyles,
  navSubItemStyles,
  navItemLoadingWrapperStyles,
} from "@/UI/material/styles/customizations";
import { NavItemDef } from "../../types";
import Skeleton, { SkeletonProps } from "@mui/material/Skeleton";
import { styled, SxProps, Theme } from "@/UI/styles/MuiStyles";
import { memoTheme } from "@/UI/material/utils";
import useSlotAndSlotProps from "@/UI/hooks/useSlotAndSlotProps";

const SkeletonRoot = styled(Skeleton)(
  memoTheme(
    ({ theme }) => navItemLoadingWrapperStyles(theme) as TemplateStringsArray
  )
);

const NavItemContainer: NavItemContainerComponent = ({
  children,
  variant = "item",
  type = "root",
  loading = false,
  rootComponent,
  loadingIndicator,
  loadingIndicatorProps,
  ...props
}) => {
  const { hideSubHeader } = useNavigationBar();

  const renderHeaderStyles: CombineSxPropsParams[] = React.useMemo(
    () => [navItemHeaderStyles],
    []
  );

  const renderItemStyles: CombineSxPropsParams[] = React.useMemo(
    () => [
      (theme: Theme) => navItemStyles(theme, type),
      navItemStatusStyles,
      type === "sub" ? navSubItemStyles : {},
    ],
    []
  );

  /**
   * ---------------------------------------------------------
   */

  const [ItemContainer, itemContainerProps] = useSlotAndSlotProps(
    {
      slot: rootComponent,
      slotProps: props,
      elementType: ButtonBase,
      defaultProps: {
        component: "div",
        sx: (variant === "header"
          ? renderHeaderStyles
          : renderItemStyles) as SxProps<Theme>,
      } as ButtonBaseProps,
    },
    [variant, props]
  );

  const [LoadingWrapper, loadingWrapperProps] = useSlotAndSlotProps(
    {
      slot: loadingIndicator,
      slotProps: loadingIndicatorProps,
      elementType: SkeletonRoot,
      defaultProps: {
        animation: "wave",
        variant: "rounded",
      },
    },
    [loadingIndicatorProps]
  );

  const renderLoadingWrapper = React.useMemo(
    () => <LoadingWrapper {...loadingWrapperProps} />,
    [LoadingWrapper, loadingWrapperProps]
  );

  return variant === "header" && hideSubHeader ? null : (
    <>
      <ItemContainer {...itemContainerProps}>{children}</ItemContainer>
      {loading && renderLoadingWrapper}
    </>
  );
};

interface NavItemContainerComponent {
  <
    RootComponent extends React.ElementType = "div",
    DOMComponent extends Element = HTMLDivElement,
    AdditionalProps = {},
  >(
    props: NavItemContainerProps<RootComponent, DOMComponent, AdditionalProps>
  ): React.JSX.Element | null;
  propTypes?: any;
}

export interface NavItemContainerOwnProps
  extends Pick<NavItemDef, "variant" | "type" | "loading"> {
  /**
   * The component that renders the root slot.
   * @default ButtonBase
   */
  rootComponent?: React.ElementType;
  /**
   * Element placed before the children if the button is in loading state.
   * @default <Skeleton animation="wave" variant="rounded" />
   */
  loadingIndicator?: React.ElementType;
  loadingIndicatorProps?: SkeletonProps;
}

export type NavItemContainerProps<
  RootComponent extends React.ElementType = "div",
  DOMComponent extends Element = HTMLDivElement,
  AdditionalProps = {},
> = NavItemContainerOwnProps &
  ButtonBaseProps<RootComponent, AdditionalProps> &
  React.DOMAttributes<DOMComponent>;

export default NavItemContainer;
