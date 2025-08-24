import { SxProps, Theme } from "@/UI/styles";

export const DropDownMenuStyles: (theme: Theme) => SxProps = () => ({
  "& .MuiPaper-root": {
    padding: "0.2rem 0.6rem",
    marginTop: "1rem",
    borderRadius: "0.8rem",

    "& ul": {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      gap: "0.2rem",

      "& button": {
        width: "100%",

        "& .nav-button-root": {
          padding: "0.3rem 1.2rem",
          justifyContent: "flex-start",
        },
      },
    },
  },
});
