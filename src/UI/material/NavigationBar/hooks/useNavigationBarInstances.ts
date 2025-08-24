"use client";

import * as React from "react";
import NavigationBarInstances from "../contexts/NavigationBarInstances";
import { NavigationBarOwnProps } from "../types";
import formatContextErrorMsg from "@/UI/utils/formatContextErrorMsg";

type RequiredNavProps<OtherItemDef extends object> =
  NavigationBarOwnProps<OtherItemDef>;

export interface UseNavigationBarInstancesReturnValue<
  OtherItemDef extends object = {},
> extends Pick<NavigationBarOwnProps<OtherItemDef>, "onOpen" | "onClose"> {
  /**
   * Sets the state of navigationBar `density`.
   */
  setDensity: React.Dispatch<
    React.SetStateAction<RequiredNavProps<OtherItemDef>["density"]>
  >;
  /**
   * Sets the state of navigationBar `orientation`.
   */
  setOrientation: React.Dispatch<
    React.SetStateAction<RequiredNavProps<OtherItemDef>["orientation"]>
  >;
  /**
   * Sets the state of navigationBar `width`.
   */
  setWidth: React.Dispatch<
    React.SetStateAction<RequiredNavProps<OtherItemDef>["width"]>
  >;
  /**
   * Sets the state of navigationBar `height`.
   */
  setHeight: React.Dispatch<
    React.SetStateAction<RequiredNavProps<OtherItemDef>["height"]>
  >;
  /**
   * Sets the state of navigationBar `disableToggleDensityButton`.
   */
  setDisableToggleDensityButton: React.Dispatch<
    React.SetStateAction<
      RequiredNavProps<OtherItemDef>["disableToggleDensityButton"]
    >
  >;
}

/**
 * Custome hook to access instances of `NavigationBar` component.
 */
export function useNavigationBarInstances<
  OtherItemDef extends object = {},
>(): UseNavigationBarInstancesReturnValue<OtherItemDef> {
  const context = React.use(NavigationBarInstances);
  if (context == null)
    formatContextErrorMsg(
      "useNavigationBarInstances",
      "NavigationBarInstances"
    );

  return context as UseNavigationBarInstancesReturnValue<OtherItemDef>;
}
