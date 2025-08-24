"use client";

import { memo, MouseEvent, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@/UI/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Typography from "@mui/material/Typography";
import { NavUserAccountProps } from "./NavUserAccountProps";
import {
  NavUserAccountStyles,
  NavUserBadgeMenuStyles,
  NavUserBadgeStyles,
} from "./NavUserAccountStyles";
import { navContainerStyles } from "../Functions";
import { useNavbar } from "../../Navbar";
import CardMedia from "@mui/material/CardMedia";
import combineSxProps from "@/UI/utils/combineSxProps";
import { SxProps } from "@/UI/styles/MuiStyles";

const NavUserAccount = memo(
  ({
    accountTitle,
    userInfo = {
      fullName: "",
      email: "",
      otherInfo: undefined,
    },
    footer: Footer,
    slotProps = {
      avatarProps: undefined,
      menuAvatarProps: undefined,
      menuProps: undefined,
      imgProps: undefined,
    },
    ...props
  }: NavUserAccountProps) => {
    const { containerStyles } = useNavbar();

    const { avatarProps, menuAvatarProps, menuProps, imgProps } = slotProps;
    const { fullName, email, otherInfo: OtherInfo } = userInfo;

    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const open = Boolean(anchorEl);

    const openMenu = (
      e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
    ) => setAnchorEl(e.currentTarget);
    const closeMenu = () => setAnchorEl(null);

    const splitUser = accountTitle ? accountTitle.split(" ") : [""];
    const user =
      splitUser.length === 1
        ? splitUser[0][0]
        : splitUser[0][0] + splitUser[1][0];

    return (
      <>
        <Box
          {...props}
          className={`userBadge ${props.className ? props.className : ""}`}
          sx={combineSxProps((theme) => NavUserAccountStyles(theme), props?.sx)}
        >
          <IconButton
            onClick={openMenu}
            size="small"
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar
              {...avatarProps}
              sx={combineSxProps(
                (theme) => NavUserBadgeStyles(theme),
                () => ({
                  fontSize: user
                    ? user.length === 1
                      ? "0.9rem"
                      : "0.85rem"
                    : "",
                }),
                avatarProps?.sx
              )}
            >
              {user}
            </Avatar>
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={closeMenu}
            {...menuProps}
            slotProps={{
              paper: {
                elevation: 0,
              },
              ...menuProps?.slotProps,
            }}
            sx={combineSxProps(
              (theme) => NavUserBadgeMenuStyles(theme),
              (theme) =>
                ({
                  "& .MuiPaper-root": navContainerStyles(theme),
                  "& .MuiList-root": {
                    padding: 0,
                  },
                } as SxProps),
              (theme) =>
                ({
                  "& .MuiPaper-root":
                    typeof containerStyles === "function"
                      ? containerStyles(theme)
                      : containerStyles,
                } as SxProps),
              menuProps?.sx
            )}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <Box className="userBadgeMenu">
              <CardMedia
                width={100}
                height={100}
                alt="Window not Responding the Img."
                component="img"
                loading="lazy"
                className={`navMenuImg ${imgProps?.className || ""}`}
                {...imgProps}
              />

              <Box className="mainAvatarBox" sx={{ pb: 4.5 }}>
                <Box className="avaterBox">
                  <Avatar
                    {...menuAvatarProps}
                    sx={combineSxProps(
                      () => ({
                        width: "3.5rem",
                        height: "3.5rem",
                        color: "#fff",
                        fontSize: "1.4rem",
                        fontWeight: "500",
                        textTransform: "uppercase",
                        background: "#0082ec",
                      }),
                      menuAvatarProps?.sx
                    )}
                  >
                    {user}
                  </Avatar>
                </Box>
              </Box>

              <Box className="userDataBox">
                <Typography className="userData">{fullName}</Typography>
                <Typography className="userData userEmail">{email}</Typography>

                {typeof OtherInfo === "function" ? (
                  <OtherInfo open={open} anchorEl={anchorEl} />
                ) : (
                  OtherInfo
                )}
              </Box>

              <Box className="navFooter">
                {typeof Footer === "function" ? (
                  <Footer open={open} anchorEl={anchorEl} />
                ) : (
                  Footer
                )}
              </Box>
            </Box>
          </Menu>
        </Box>
      </>
    );
  }
);

export default NavUserAccount;
