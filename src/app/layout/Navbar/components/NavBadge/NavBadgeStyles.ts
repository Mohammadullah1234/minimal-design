import { Theme, SxProps } from "@/UI/styles";
import { NavBadgeProps } from "./NavBadge";

export const BadgeStyles: (
  theme: Theme,
  animate?: boolean,
  lighting?: boolean,
  contnet?: NavBadgeProps["badgeContent"],
  color?: NavBadgeProps["color"],
  variant?: NavBadgeProps["variant"]
) => SxProps = (theme, animate, lighting, contnet, color, variant) => ({
  "& .MuiBadge-badge": {
    ...(color ? {} : { background: "#f43b73", color: "#fff" }),
    ...(variant === "dot" ? {} : { width: "1.25rem", minWidth: "max-content" }),

    fontWeight: "600",
    padding: 0,

    ...(animate
      ? {
          animation:
            "badgeAnimateScale 0.9s ease-in-out infinite alternate-reverse both",
          "@keyframes badgeAnimateScale": {
            "0%": {
              transform: "scale(1) translate(50%, -50%)",
            },
            "100%": {
              transform: "scale(0.9) translate(50%, -50%)",
            },
          },
        }
      : {}),

    ...(lighting && !contnet
      ? {
          animation:
            "badgeAnimateLight 0.45s ease-in-out alternate-reverse infinite both",

          "@keyframes badgeAnimateLight": {
            from: {
              backgroundColor: "#fff",
            },
            to: {
              backgroundColor: "#ff3ba0",
            },
          },
        }
      : {}),
  },
});
