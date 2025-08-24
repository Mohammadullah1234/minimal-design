"use client";

import Button from "@mui/material/Button";
import {
  memo,
  MouseEvent,
  ReactNode,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import KeyboardArrowDownRounded from "@mui/icons-material/KeyboardArrowDownRounded";
import Box from "@/UI/material/Box";
import {
  renderDropDownMobileMenuStyles,
  NavButtonStyles,
} from "./NavButtonStyles";
import {
  DropDownStateProps,
  NavButtonDropDownArrayProps,
  NavButtonProps,
} from "./NavButtonProps";
import DropDownMenu from "../DropDownMenu";
import { useNavbar } from "../../Navbar";
import NavLink from "@/UI/material/NavLink";
import { usePathname } from "next/navigation";
import useMediaQuery from "@/UI/hooks/useMediaQuery";
import { SxProps } from "@/UI/styles/MuiStyles";
import { useMuiTheme } from "@/UI/styles/hooks";
import combineSxProps from "@/UI/utils/combineSxProps";

const NavButton = memo(
  ({
    children,
    href = "",
    startIcon,
    endIcon,
    active = false,
    slotProps = {
      linkProps: undefined,
      dropDownProps: undefined,
      dropDownMenuProps: undefined,
      dropDownMobileMenuProps: undefined,
    },
    slots = { dropDownArrow: undefined },
    dropDown: DropDown,
    dropDownRender = false,
    dropDownBaseName = "",
    disableIconOnDesktop,
    disableIconOnMobile,
    hideDropDownArrow = false,
    ...props
  }: NavButtonProps) => {
    const {
      closeMenu,
      buttonLinkStyles,
      navButtonProps: navbuttonprops,
    } = useNavbar();

    const theme = useMuiTheme();
    const mobileMode = useMediaQuery(theme.breakpoints.down("md"));

    const dropDownRef = useRef<HTMLDivElement>(null);
    const pathName = usePathname();
    const [dropDown, setDropDown] = useState<DropDownStateProps>({
      open: false,
      anchorEl: null,
    });

    const { open, anchorEl } = dropDown;
    const {
      linkProps,
      dropDownProps,
      dropDownMenuProps,
      dropDownMobileMenuProps: dropMobileProps,
    } = slotProps;
    const { dropDownArrow } = slots;

    // icon Code ---------------------------------------------
    const renderStartIcon = useMemo(
      () => (startIcon === undefined ? navbuttonprops?.startIcon : startIcon),
      [navbuttonprops?.startIcon, startIcon]
    );
    const renderEndIcon = useMemo(
      () => (endIcon === undefined ? navbuttonprops?.endIcon : endIcon),
      [navbuttonprops?.endIcon, endIcon]
    );
    const renderDesktopIconDisabled = useMemo(
      () =>
        (disableIconOnDesktop === undefined
          ? navbuttonprops?.disableIconOnDesktop
          : disableIconOnDesktop) || false,
      [disableIconOnDesktop, navbuttonprops?.disableIconOnDesktop]
    );
    const renderMobileIconDisabled = useMemo(
      () =>
        (disableIconOnMobile === undefined
          ? navbuttonprops?.disableIconOnMobile
          : disableIconOnMobile) || false,
      [disableIconOnMobile, navbuttonprops?.disableIconOnMobile]
    );

    // Methods -------------------------------------------------
    const openDropDownMenu = useCallback(
      (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
        setDropDown((prev) => ({
          open: !prev.open,
          anchorEl: e.currentTarget,
        }));
      },
      []
    );
    const closeDropDownMenu = useCallback(() => {
      setDropDown({
        open: false,
        anchorEl: null,
      });
    }, []);

    const renderButtonChildren = useCallback(
      (component?: ReactNode) => {
        return (
          <>
            {renderStartIcon && (
              <span className="startIcon">{renderStartIcon}</span>
            )}

            <span
              className="navLinkContent"
              style={{ display: "flex", alignItems: "center" }}
            >
              {children}
              {component}
            </span>

            {renderEndIcon && <span className="endIcon">{renderEndIcon}</span>}
          </>
        );
      },
      [
        startIcon,
        endIcon,
        navbuttonprops?.startIcon,
        navbuttonprops?.endIcon,
        children,
      ]
    );

    const renderButtonComponent = (
      <Button
        disabled={href ? pathName === href : false}
        {...{ navbuttonprops, startIcon: undefined, endIcon: undefined }}
        {...props}
        sx={combineSxProps(
          (theme) =>
            NavButtonStyles(
              theme,
              renderDesktopIconDisabled,
              renderMobileIconDisabled
            ),
          (theme) =>
            ({
              "& .nav-button-root, & .dropDown-root":
                typeof buttonLinkStyles === "function"
                  ? buttonLinkStyles(theme)
                  : buttonLinkStyles,
            } as SxProps),
          navbuttonprops?.sx,
          props?.sx
        )}
        onClick={(e) => {
          if (DropDown) openDropDownMenu(e);
          navbuttonprops?.onClick?.(e);
          props?.onClick?.(e);
        }}
      >
        {DropDown ? (
          <Box
            className={`dropDown-root ${
              pathName.includes(dropDownBaseName) ? "active" : ""
            } ${dropDownProps?.className || ""}`}
          >
            {renderButtonChildren(
              !hideDropDownArrow &&
                (dropDownArrow ? (
                  dropDownArrow
                ) : (
                  <KeyboardArrowDownRounded
                    className="dropDown-arrow-root"
                    sx={{
                      transition: "all 0.2s ease",
                      ...(open
                        ? { transform: "rotate(-180deg)" }
                        : { transform: "rotate(0deg)" }),
                    }}
                  />
                ))
            )}
          </Box>
        ) : href ? (
          <NavLink
            href={href}
            {...linkProps}
            onClick={(e) => {
              closeMenu();
              linkProps?.onClick?.(e);
            }}
            className={`nav-button-root ${linkProps?.className || ""}`}
          >
            {renderButtonChildren()}
          </NavLink>
        ) : (
          <Box className={`nav-button-root ${active ? "active" : ""}`}>
            {renderButtonChildren()}
          </Box>
        )}
      </Button>
    );

    // DropDown Code -----------------------------------------
    const dropDownMapBtn = useCallback(
      (elm: NavButtonDropDownArrayProps, i: number) => {
        const { disableNavButtonComponent, ...other } = elm;
        return disableNavButtonComponent ? (
          elm.element
        ) : (
          <NavButton {...other} href={`${dropDownBaseName}${elm.href}`} key={i}>
            {elm?.element}
          </NavButton>
        );
      },
      []
    );

    const renderDropDownChildren = useMemo(
      () =>
        typeof DropDown === "function"
          ? DropDown({ open, anchorEl }).map((elm, i) => dropDownMapBtn(elm, i))
          : DropDown?.map((elm, i) => dropDownMapBtn(elm, i)),
      [dropDownRender && open]
    );

    const renderDropDownMenu = useMemo(
      () =>
        DropDown && (
          <DropDownMenu
            open={open}
            anchorEl={anchorEl}
            {...dropDownMenuProps}
            onClick={(e) => {
              closeDropDownMenu();
              dropDownMenuProps?.onClick?.(e);
            }}
          >
            {renderDropDownChildren}
          </DropDownMenu>
        ),
      [DropDown, anchorEl, open, dropDownMenuProps]
    );

    const renderDropDownMobileMenu = useMemo(
      () =>
        DropDown && (
          <Box
            sx={combineSxProps(
              (theme) => renderDropDownMobileMenuStyles(theme),
              dropMobileProps?.sx
            )}
            {...dropMobileProps}
          >
            <Box
              className="dropDown-lists"
              ref={dropDownRef}
              sx={{
                minHeight: 0,
                height: 0,
                overflow: "hidden",
                ...(open
                  ? {
                      minHeight: `${
                        (dropDownRef.current?.scrollHeight || 0) / 16
                      }rem`,
                      marginBottom: "0.5rem",
                    }
                  : {}),
              }}
            >
              {/* <DropDown open={open} anchorEl={anchorEl} /> */}
              {renderDropDownChildren}
            </Box>
          </Box>
        ),
      [DropDown, open, dropMobileProps]
    );

    return (
      <>
        {renderButtonComponent}
        {mobileMode ? renderDropDownMobileMenu : renderDropDownMenu}
      </>
    );
  }
);

export default NavButton;
