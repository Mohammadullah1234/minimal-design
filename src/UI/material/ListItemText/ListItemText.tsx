"use client";

import * as React from "react";
import MuiListItemText, {
  ListItemTextSlots as MuiListItemTextSlots,
  ListItemTextSlotsAndSlotProps as MuiListItemTextSlotsAndSlotProps,
  ListItemTextOwnerState as MuiListItemTextOwnerState,
  ListItemTextProps as MuiListItemTextProps,
} from "@mui/material/ListItemText";
import combineSxProps from "@/UI/utils/combineSxProps";
import {
  listItemTextPrimaryStyles,
  listItemTextSecondaryStyles,
} from "../styles/customizations/ListItemText";
import resolveSelector from "@/UI/utils/resolveSelector";

const ListItemText = <
  PrimaryTypographyComponent extends React.ElementType = "span",
  SecondaryTypographyComponent extends React.ElementType = "p",
>(
  props: ListItemTextProps<
    PrimaryTypographyComponent,
    SecondaryTypographyComponent
  >
) => {
  const renderTypographyStyles = React.useMemo(
    () => [listItemTextPrimaryStyles, listItemTextSecondaryStyles],
    []
  );

  const reslovedSlotProps = React.useCallback(
    (
      ownerState: ListItemTextOwnerState,
      slotName: keyof Required<ListItemTextSlotsAndSlotProps>["slotProps"]
    ) => resolveSelector(props?.slotProps?.[slotName], ownerState),
    [props?.slotProps]
  );

  const slotProps: ListItemTextSlotsAndSlotProps["slotProps"] = React.useMemo(
    () => ({
      ...props?.slotProps,
      primary: (ownerState) => ({
        ...reslovedSlotProps(ownerState, "primary"),
        sx: combineSxProps(
          renderTypographyStyles[0],
          reslovedSlotProps(ownerState, "primary")?.sx
        ),
      }),
      secondary: (ownerState) => ({
        ...reslovedSlotProps(ownerState, "secondary"),
        sx: combineSxProps(
          renderTypographyStyles[1],
          reslovedSlotProps(ownerState, "secondary")?.sx
        ),
      }),
    }),
    [props?.slotProps, reslovedSlotProps]
  );

  return <MuiListItemText {...props} slotProps={slotProps} />;
};

export interface ListItemTextSlots extends MuiListItemTextSlots {}
export interface ListItemTextSlotsAndSlotProps
  extends MuiListItemTextSlotsAndSlotProps {}
export interface ListItemTextOwnerState extends MuiListItemTextOwnerState {}

export interface ListItemTextProps<
  PrimaryTypographyComponent extends React.ElementType = "span",
  SecondaryTypographyComponent extends React.ElementType = "p",
> extends MuiListItemTextProps<
    PrimaryTypographyComponent,
    SecondaryTypographyComponent
  > {}

export default ListItemText;
