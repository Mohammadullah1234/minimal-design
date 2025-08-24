import { SxProps, Theme } from "@/UI/styles";
import { navLinkStyles } from "../Functions";

const displayFlex = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const systemFont = {
  fontFamily: `, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif`,
};

export const NavUserAccountStyles: (theme: Theme) => SxProps = () => ({
  ...displayFlex,
});

export const NavUserBadgeStyles: (theme: Theme) => SxProps = () => ({
  width: "2.1rem",
  height: "2.1rem",
  borderRadius: "50%",
  ...systemFont,
  fontWeight: "600",
  textTransform: "uppercase",
  letterSpacing: "0.02rem",
  background: "#0082ec",
  color: "#fff",

  "& svg": {
    width: "auto",
  },
});

export const NavUserBadgeMenuStyles: (theme: Theme) => SxProps = (theme) => ({
  "& .MuiPaper-root": {
    borderRadius: "0.8rem",
    overflow: "auto",
    marginTop: "1rem",

    "& .userBadgeMenu": {
      position: "relative",

      ".navMenuImg": {
        width: "100%",
        height: "9rem",
      },
      ".mainAvatarBox": {
        ...displayFlex,

        "& .avaterBox": {
          position: "absolute",
          borderRadius: "50%",
          padding: "0.2rem",
          background: "#fff",
          zIndex: 2,

          ...theme.applyStyles("dark", {
            background: "rgb(20, 23, 25)",
          }),
        },
      },

      "& .userDataBox": {
        ...displayFlex,
        flexDirection: "column",
        padding: "0 0.5rem",
        width: "15rem",
        minWidth: "15rem",
        textAlign: "center",

        "& .userData": {
          ...systemFont,
          fontWeight: "600",
          fontSize: "1rem",
          color: "rgb(34, 34, 39)",
          ...theme.applyStyles("dark", {
            color: "rgb(243, 243, 243)",
          }),

          "&.userEmail": {
            fontSize: "0.85rem",
            color: "rgb(147, 151, 154)",
          },
        },
      },

      "& .navFooter": {
        ...displayFlex,
        marginTop: "0.7rem",
        padding: "0.6rem 0.6rem",
        flexDirection: "column",
        gap: "0.5rem",

        "& .logoutBtn, & button, & button .nav-button-root": {
          textTransform: "capitalize",
          width: "100%",
          padding: "0.22rem",
          ...navLinkStyles(theme, { fontSize: "1.1rem" }),
        },
      },

      "& .userInfo": {
        margin: "0.25rem 1.2rem",
        ...displayFlex,

        "& .right": {
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          flexDirection: "column",

          span: {
            ...systemFont,
            fontWeight: "600",
            fontSize: "1rem",
            color: "var(--text-color)",

            '&:f"irst-child "': {
              textTransform: "capitalize",
              color: "var(--text-color)",
              fontSize: "1rem",
              fontWeight: "600",
              textShadow: "0 0 0 #000",
              letterSpacing: "0.02rem",
            },
          },
        },
      },
    },
  },
});
