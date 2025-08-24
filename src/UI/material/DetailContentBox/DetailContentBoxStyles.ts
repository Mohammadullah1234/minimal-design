import { primary } from "@/UI/colors";
import { orange } from "@mui/material/colors";
import { Theme, SxProps } from "@/UI/styles";

export const detailContentBoxAvatarBadgeStyles: SxProps<Theme> = (theme) => ({
  position: "absolute",
  borderRadius: "50%",
  right: "0rem",
  bottom: "0rem",
  zIndex: 1000,
  textAlign: "center",
  alignItems: "center",
  justifyContent: "center",
  width: "0rem",
  height: "0rem",
  minWidth: "0.6rem",
  minHeight: "0.6rem",
  padding: "0.3rem",

  "& svg": {
    fontSize: "0.8rem",
    margin: "0",
  },
});

export const detailContentBoxAvatarStyles: (theme: Theme) => SxProps = (
  theme
) => ({
  width: "2.85rem",
  height: "2.85rem",
  borderRadius: "0.8rem",
  p: "0.5rem",
  overflow: "hidden",
  background: "rgb(245, 246, 249)",
  color: primary["D200"],

  "& img": {
    width: "100%",
    height: "100%",
  },

  ...theme.applyStyles("dark", {
    background: "rgb(39, 49, 60)",
    color: "#fff",
  }),
});

export const detailContentBoxStyles: SxProps<Theme> = () => ({
  alignItems: "center",
  alignContent: "center",

  "& svg": {
    fontSize: "1.45rem",
  },
});

export const detailContentTitleStyles: SxProps<Theme> = (theme) => ({
  fontSize: "0.9rem",
  color: primary["D400"],

  ...theme.applyStyles("dark", {
    color: "#fff",
  }),
});

export const detailContentCaptionStyles: SxProps<Theme> = (theme) => ({
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  overflow: "hidden",
  display: "block",
  fontWeight: "600",
  color: "rgb(168, 170, 176)",
  fontSize: "0.8rem",

  ...theme.applyStyles("dark", {
    color: "rgb(139, 144, 151)",
  }),
});

export const detailContentBadgeStyles: SxProps<Theme> = () => ({
  width: "auto",
  height: "auto",
  padding: "0.1rem 0.4rem",
  fontSize: "0.85rem",
});

export const detailContentItemContainerStyles: SxProps<Theme> = (theme) => ({
  alignItems: "center",
  justifyContent: "flex-start",
  color: "rgb(149, 159, 173)",

  "& .starIcon": {
    color: orange[400],
  },
  "& .starEmptyIcon": {
    color: "rgb(196, 197, 206)",
  },

  ...theme.applyStyles("dark", {
    color: "rgb(109, 123, 138)",

    "& .starIcon": {
      color: "rgb(255, 179, 16)",
    },
    "& .starEmptyIcon": {
      color: " #556069",
    },
  }),
});
