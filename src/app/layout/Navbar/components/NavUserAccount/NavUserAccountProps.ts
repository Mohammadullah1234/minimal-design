import * as React from "react";
import { AvatarProps } from "@mui/material/Avatar";
import { BoxProps } from "@/UI/material/Box";
import { MenuProps } from "@mui/material/Menu";
import { CardMediaProps } from "@mui/material/CardMedia";

type AccountMenuProps = ({
  open,
  anchorEl,
}: {
  open?: boolean;
  anchorEl?: HTMLButtonElement | null;
}) => React.ReactNode;

export interface NavUserAccountProps extends BoxProps {
  accountTitle: string;
  footer?: React.ReactNode | AccountMenuProps;
  userInfo?: {
    fullName?: string;
    email?: string;
    otherInfo?: React.ReactNode | AccountMenuProps;
  };
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps?: {
    /**
     * Props forwarded to the `Avatar` component. By default, the avaible props are based on the `Avatar` component.
     */
    avatarProps?: AvatarProps;
    /**
     * Props forwarded to the `Avatar` component in Menu. By default, the avaible props are based on the `Avatar` component.
     */
    menuAvatarProps?: AvatarProps;
    /**
     * Props forwarded to the `Menu` component. By default, the avaible props are based on the `Menu` component.
     */
    menuProps?: MenuProps;
    /**
     * Props forwarded to the `img` element. By default, the avaible props are based on the `img` element.
     */
    imgProps?: CardMediaProps;
  };
}
