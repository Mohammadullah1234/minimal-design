import { ButtonProps } from "@mui/material/Button";
import { ReactNode } from "react";
import { BoxProps } from "@/UI/material/Box";
import { DropDownMenuProps } from "../DropDownMenu";
import { NavBadgeProps } from "../NavBadge";
import { NavLinkProps } from "@/UI/material/NavLink";

export type DropDownSlotProps = {
  /**
   * Props forwarded to the `DropDown` component. By default, the avaible props are based on the `DropDown` component.
   */
  dropDownProps?: BoxProps;
  /**
   * Props forwarded to the `DropDownMenu` component. By default, the avaible props are based on the `DropDownMenu` component.
   * Note: the props will only work in destop mode.
   */
  dropDownMenuProps?: DropDownMenuProps;
  /**
   * Props forwarded to the `Mobile DropDown Box` component. By default, the avaible props are based on the `Mobile DropDown Box` component.
   * Note: these props will only work in mobile mode.
   */
  dropDownMobileMenuProps?: BoxProps;
};

export type NavButtonSlotProps = {
  /**
   * Props forwarded to the `Link` component. By default, the avaible props are based on the `Link` component.
   */
  linkProps?: NavLinkProps;
  /**
   * Props forwarded to the `NavBadge` component. By default, the avaible props are based on the `NavBadge` component.
   */
  badgeProps?: Omit<NavBadgeProps, "badgeContent">;
};

export type NavButtonDropDownArrayProps = {
  element: ReactNode;
  href?: NavLinkProps["href"];
  /**
   * If it's true the element will render in `DropDownMenu` without `NavButton` compoent and you will be able to use your own components in `element` prop like `<Button>myButton</Button>`.
   *
   * By default dropDown renders `element` prop in `<NavButton>{element}</NavButton>` component.
   * @default false
   */
  disableNavButtonComponent?: boolean;
} & Omit<ButtonProps, "children">;

type DropDownMethodProps = ({
  open,
  anchorEl,
}: DropDownStateProps) => NavButtonDropDownArrayProps[];

export interface NavButtonProps extends ButtonProps {
  children: ReactNode;
  href?: NavLinkProps["href"];
  dropDown?: NavButtonDropDownArrayProps[] | DropDownMethodProps;
  dropDownBaseName?: string;
  /**
   * the startIcon and endIcon will only disabled in destop mode from (`md` to `xl`).
   */
  disableIconOnDesktop?: boolean;
  /**
   * the startIcon and endIcon will only disabled in mobile mode from (`xs` to `md`).
   */
  disableIconOnMobile?: boolean;
  /**
   * by default the dropDown only renders for the first time.
   * if `dropDownRender` prop is `true` the dropDown will render on open or close
   *
   * Note: this is useful for that when you change dropDown element values every time.
   * @default false
   */
  dropDownRender?: boolean;
  active?: boolean;
  slots?: {
    dropDownArrow?: ReactNode;
  };
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps?: NavButtonSlotProps & DropDownSlotProps;
  hideDropDownArrow?: boolean;
}

export type DropDownStateProps = {
  open: boolean;
  anchorEl: HTMLButtonElement | null;
};
