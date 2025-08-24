"use client";

import { use, useCallback, useMemo, useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@/UI/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Container from "@mui/material/Container";
import NavIconButton from "./components/NavIconButton";

import MenuRounded from "@mui/icons-material/MenuRounded";
import { NavbarProps } from "./NavbarProps";
import { navBarDrawerStyles, NavbarStyles } from "./NavbarStyles";
import { NavContext, defaultSlotProps } from "./defaultProps";
import CardMedia from "@mui/material/CardMedia";
import combineSxProps from "@/UI/utils/combineSxProps";
import { SxProps } from "@/UI/styles/MuiStyles";
import { useMuiTheme } from "@/UI/styles/hooks";
import useMediaQuery from "@/UI/hooks/useMediaQuery";

const Navbar = ({
  navButtons: NavButtons,
  navIcon,
  navTitle,
  disableNavHeader = false,
  navStartElement,
  navEndElement,
  styleProps = {
    containerStyles: undefined,
    buttonLinkStyles: undefined,
  },
  slotProps = defaultSlotProps,
  ...props
}: NavbarProps) => {
  const theme = useMuiTheme();
  const mobileMode = useMediaQuery(theme.breakpoints.down("md"));
  const [menuOpen, setMenuOpen] = useState(false);

  const openMenu = () => setMenuOpen(true);
  const closeMenu = () => setMenuOpen(false);
  const { containerStyles, buttonLinkStyles } = styleProps;
  const {
    navIconComponentProps,
    navTitleProps,
    navButtonProps,
    navIconButtonProps,
    navBadgeProps,
    dropDownMenuProps,
    mainBoxProps,
    navSwipeableDrawerProps,
  } = slotProps;

  const renderNavIcon = useMemo(
    () => (
      <Box
        {...navIconComponentProps}
        className={`navIcon ${navIconComponentProps?.className || ""}`}
        sx={combineSxProps(
          () => ({
            width: "2.4rem",
            height: "2.4rem",
            borderRadius: "50%",
            overflow: "hidden",

            "& img": {
              width: "100%",
              height: "100%",
            },
          }),
          navIconComponentProps?.sx
        )}
      >
        <CardMedia
          alt="Nav Img..."
          image={navIcon || ""}
          component="img"
          loading="lazy"
          sx={{ objectFit: "unset" }}
        />
      </Box>
    ),
    [navIcon, navIconComponentProps]
  );

  const renderNavTitle = useCallback(
    (mobile: boolean = false) => (
      <Typography
        variant="h2"
        {...navTitleProps}
        className={`navTitle ${navTitleProps?.className || ""}`}
        sx={combineSxProps(
          () => ({
            fontSize: "1.15rem",
            fontWeight: "600",
            display: {
              xs: mobile ? "block" : "none",
              md: mobile ? "none" : "block",
            },
          }),
          navTitleProps?.sx
        )}
      >
        {navTitle}
      </Typography>
    ),
    [navTitle, navTitleProps]
  );

  const renderNavButtons = useMemo(
    () => (
      <Box sx={{ display: "flex" }} className="navButtons">
        {typeof NavButtons === "function" ? (
          <NavButtons closeMenu={closeMenu} />
        ) : (
          NavButtons
        )}
      </Box>
    ),
    [NavButtons]
  );

  const renderNavEndElement = useMemo(
    () => (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          paddingLeft: "1rem",
        }}
        className="navEndElement"
      >
        {navEndElement}
      </Box>
    ),
    [navEndElement]
  );

  const renderToggleMenuButton = useMemo(
    () => (
      <NavIconButton className="navToggleButton" onClick={openMenu}>
        <MenuRounded sx={{ transform: "scale(1.25)" }} />
      </NavIconButton>
    ),
    []
  );

  return (
    <NavContext.Provider
      value={{
        closeMenu,
        containerStyles,
        buttonLinkStyles,
        navButtonProps,
        dropDownMenuProps,
        navIconButtonProps,
        navBadgeProps,
      }}
    >
      <Grid
        component="header"
        container
        columns={12}
        {...props}
        sx={combineSxProps(
          (theme) => NavbarStyles(theme),
          containerStyles,
          props?.sx
        )}
      >
        <Container
          className="navContainer-root"
          sx={{
            minWidth: { xs: "auto", xl: "75rem" },
            display: "flex",
            mx: "auto",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              gap: "1rem",
            }}
            className="navStart-headerElement"
          >
            {!disableNavHeader && (
              <>
                {mobileMode && renderToggleMenuButton}
                {renderNavIcon}
                {renderNavTitle()}
              </>
            )}
            {navStartElement}
          </Box>

          <Box
            {...mainBoxProps}
            className={`navbar-elements ${mainBoxProps?.className || ""}`}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              width: "100%",
              ...mainBoxProps?.sx,
            }}
          >
            {!mobileMode && (
              <Box className="navDesktopButtonsBox">{renderNavButtons}</Box>
            )}

            {renderNavEndElement}
          </Box>
        </Container>
      </Grid>

      {mobileMode && (
        <SwipeableDrawer
          component="nav"
          anchor="left"
          open={menuOpen}
          onClose={closeMenu}
          onOpen={openMenu}
          {...navSwipeableDrawerProps}
          sx={combineSxProps(
            (theme) => navBarDrawerStyles(theme),
            (theme) =>
              ({
                "& .MuiPaper-root .navButtonsBox":
                  typeof containerStyles === "function"
                    ? containerStyles(theme)
                    : containerStyles,
              } as SxProps),
            navSwipeableDrawerProps?.sx
          )}
        >
          <Box className="navButtonsBox">
            <Box className="navToggleMenuHeader">
              {renderNavIcon}
              {renderNavTitle(true)}
            </Box>

            {renderNavButtons}
          </Box>
        </SwipeableDrawer>
      )}
    </NavContext.Provider>
  );
};

export const useNavbar = () => use(NavContext);
export default Navbar;
