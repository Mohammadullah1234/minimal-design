import { ButtonProps } from "@mui/material/Button";
import { DropDownSlotProps, DropDownStateProps } from "../NavButton";
import { ReactNode } from "react";

type NavIconButtonDropDownProps = ({
  open,
  anchorEl,
}: DropDownStateProps) => ReactNode;

export interface NavIconButtonProps extends ButtonProps {
  dropDown?: NavIconButtonDropDownProps;
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps?: Omit<
    DropDownSlotProps,
    "dropDownProps" | "dropDownMobileMenuProps"
  >;
}
