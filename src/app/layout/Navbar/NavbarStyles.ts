import { Theme, SxProps } from "@/UI/styles";
import { navContainerStyles } from "./components/Functions";

export const NavbarStyles: (theme: Theme) => SxProps = (theme) => ({
  width: "100%",
  minHeight: "3.56rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexWrap: "nowrap",
  position: "sticky",
  top: "0",
  zIndex: 1100,
  ...navContainerStyles(theme, true),
});

export const navBarDrawerStyles: (theme: Theme) => SxProps = (theme) => ({
  "& .MuiPaper-root": {
    width: "18rem",
    borderRadius: "0 1.2rem 1.2rem 0",
    background: "transparent",

    "& .navButtonsBox": {
      minHeight: "max-content",
      ...navContainerStyles(theme, true, true, false, true),

      "& .navToggleMenuHeader": {
        width: "100%",
        padding: "0.52rem 1.2rem",
        borderBottom: "1px solid",
        borderColor: "rgb(232, 234, 238)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",

        "& .MuiTypography-root": {
          width: "78%",
          fontSize: "1.04rem",
          fontWeight: "600",
          wordBreak: "break-all",
          wordWrap: "break-word",
          paddingRight: "0.5rem",
        },

        ...theme.applyStyles("dark", {
          borderColor: "rgba(61, 71, 81, 0.3)",
        }),
      },

      "& .navButtons": {
        flexDirection: "column",
        gap: "0.2rem",
        overflow: "auto",
        paddingTop: "0.6rem",
        px: "0.4rem",
        paddingBottom: "2.5rem",
        height: "calc(100vh - 3.52rem)",

        "& button": {
          "& .nav-button-root, & .dropDown-root": {
            padding: "0.5rem 1.2rem",
            fontSize: "0.86rem",
            justifyContent: "flex-start",

            "& svg": {
              fontSize: "1.28rem",
            },

            "& .navLinkContent": {
              width: "100%",
              padding: "0",
              marginLeft: "0.8rem",
              justifyContent: "space-between",
            },
          },
        },
      },
    },
  },
});
