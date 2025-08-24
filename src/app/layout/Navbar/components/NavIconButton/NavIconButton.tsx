"use client";

import { NavIconButtonProps } from "./NavIconButtonProps";
import Button from "@mui/material/Button";
import { NavIconButtonStyles } from "./NavIconButtonStyles";
import { memo, MouseEvent, useCallback, useMemo, useState } from "react";
import { DropDownStateProps } from "../NavButton";
import DropDownMenu from "../DropDownMenu";
import { useNavbar } from "../../Navbar";
import combineSxProps from "@/UI/utils/combineSxProps";

const NavIconButton = memo(
  ({
    children,
    dropDown: DropDown,
    slotProps = { dropDownMenuProps: undefined },
    ...props
  }: NavIconButtonProps) => {
    const { navIconButtonProps } = useNavbar();

    const [dropDown, setDropDown] = useState<DropDownStateProps>({
      open: false,
      anchorEl: null,
    });

    const { open, anchorEl } = dropDown;
    const { dropDownMenuProps } = slotProps;

    const openDropDownMenu = useCallback(
      (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
        setDropDown({
          open: true,
          anchorEl: e.currentTarget,
        });
      },
      []
    );
    const closeDropDownMenu = useCallback(() => {
      setDropDown({
        open: false,
        anchorEl: null,
      });
    }, []);

    const renderDropDownMenu = useMemo(
      () =>
        DropDown && (
          <DropDownMenu
            open={open}
            onClick={closeDropDownMenu}
            anchorEl={anchorEl}
            {...dropDownMenuProps}
          >
            <DropDown open={open} anchorEl={anchorEl} />
          </DropDownMenu>
        ),
      [DropDown, anchorEl, open, dropDownMenuProps]
    );

    return (
      <>
        <Button
          {...navIconButtonProps}
          {...props}
          sx={combineSxProps(
            (theme) => NavIconButtonStyles(theme),
            navIconButtonProps?.sx,
            props?.sx
          )}
          onClick={(e) => {
            if (DropDown) openDropDownMenu(e);
            navIconButtonProps?.onClick?.(e);
            props?.onClick?.(e);
          }}
        >
          {children}
        </Button>

        {renderDropDownMenu}
      </>
    );
  }
);

export default NavIconButton;
