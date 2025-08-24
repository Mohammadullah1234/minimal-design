import { Theme, SxProps } from "@/UI/styles/MuiStyles";
import { navContainerStyles, navLinkStyles } from "../Functions";

export const NavButtonStyles: (
  theme: Theme,
  disableIcon: boolean,
  disableMobileIcon: boolean
) => SxProps = (theme, disableIcon, disableMobileIcon) => ({
  padding: "0",
  margin: "0",
  borderRadius: "5rem",
  position: "relative",

  "& .nav-button-root, & .dropDown-root": {
    width: "100%",
    height: "100%",
    textDecoration: "none",
    margin: "0",
    color: "rgb(32, 40, 50)",
    fontWeight: "500",
    u7: "capitalize",
    padding: "0.15rem 0.85rem",
    borderRadius: "5rem",
    fontSize: "0.84rem",
    transition: "all 0.4s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    ...navContainerStyles(theme, true, true, true),
    backdropFilter: "unset",
    background: "transparent",
    border: "1px solid",
    borderColor: "transparent",

    "&:hover": {
      transition: "unset",
      background: "rgb(243, 249, 255)",
      borderColor: "rgb(232, 234, 238)",

      "& svg": {
        color: "rgb(32, 40, 50)",
      },

      ...theme.applyStyles("dark", {
        background: "rgb(26, 30, 34)",
        borderColor: "rgb(37, 43, 48)",

        "& svg": {
          color: "#fff",
        },
      }),
    },

    "& .startIcon": {
      display: "flex",
      ...(!disableIcon && { paddingRight: "0.6rem" }),
    },
    "& .endIcon": {
      display: "flex",
      ...(!disableIcon && { paddingLeft: "0.6rem" }),
    },

    "&.active": navLinkStyles(theme),
  },

  "& svg": {
    fontSize: "1.1rem",
    color: "rgb(95, 99, 104)",
    padding: 0,

    ...(disableMobileIcon
      ? {
          display: { xs: "none", md: "inline-block" },
        }
      : disableIcon
      ? {
          display: { xs: "inline-block", md: "none" },
        }
      : {}),

    ...theme.applyStyles("dark", {
      color: "rgb(145, 151, 157)",
    }),
  },

  "& .dropDown-arrow-root": {
    marginLeft: "0.2rem",
    marginRight: "-0.2rem",
    display: "inline-block",
    fontSize: "1.15rem",
  },
});

export const renderDropDownMobileMenuStyles: (
  theme: Theme
) => SxProps = () => ({
  paddingLeft: "1.8rem",

  "& .dropDown-lists": {
    borderLeft: "0.06rem solid rgb(150, 150, 150)",
    display: "flex",
    flexDirection: "column",
    paddingLeft: "0.6rem",
    transition: "all 0.3s ease",
    gap: "0.1rem",

    "& button": {
      width: "100%",

      "&::before": {
        content: '""',
        position: "absolute",
        width: "0.6rem",
        height: "0.05rem",
        top: "50%",
        left: "-0.6rem",
        background: "rgb(150, 150, 150)",
      },

      "& .startIcon": {
        padding: "0",
        marginLeft: "0.6rem",
      },
      "& .endIcon": {
        padding: "0",
        marginRight: "0.6rem",
      },
      "& .nav-button-root": {
        padding: `0.4rem !important`,
      },
    },
  },
});
