import { SxProps, Theme } from "@/UI/styles";

export const NavIconButtonStyles: (theme: Theme) => SxProps = (theme) => ({
  minWidth: "max-content",
  border: "1px solid rgb(217, 222, 226)",
  background: "#fff",
  boxShadow:
    "#fff 0 1px 0 inset, hsla(215, 15%, 89%, 0.4) 0 -1px 0 inset, hsla(215, 15%, 89%, 0.5) 0 1px 2px 0",
  borderRadius: "0.8rem",
  padding: "0.45rem 0.45rem",

  "& svg": {
    fontSize: "1.1rem",
    color: "rgb(0, 114, 228)",
  },

  "&:hover": {
    boxShadow: "none",
    background: "rgb(246, 247, 248)",
    borderColor: "rgb(202, 208, 216)",
  },

  ...theme.applyStyles("dark", {
    border: "1px solid rgb(59, 67, 76)",
    background: "rgb(20, 23, 25)",
    boxShadow:
      "rgba(48, 56, 64, 0.3) 0px 1px 0px inset, rgb(9, 11, 11) 0px -1px 0px inset, rgb(9, 11, 11) 0px 1px 2px 0px",

    "& svg": {
      color: "rgb(102, 179, 255)",
    },

    "&:hover": {
      background: "rgb(26, 30, 34)",
      borderColor: "rgb(0, 89, 178)",
    },
  }),
});
