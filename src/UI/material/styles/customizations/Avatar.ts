"use client";

import { SxProps, Theme } from "@/UI/styles/MuiStyles";
import { AvatarOwnProps } from "../../Avatar";
import { createComponentVariantStyles } from "../componentVariantStyles";
import { useMinimalTheme } from "@/UI/styles/hooks";
import { useOverrideProps } from "../../OverridePropsProvider";

export function avatarStyles(
  size: AvatarOwnProps["size"],
  variant: AvatarOwnProps["variant"]
): SxProps<Theme> {
  const fonts = useMinimalTheme().fonts;
  const overrideProps = useOverrideProps();

  return {
    lineHeight: 1.5,
    width: size,
    height: size,
    fontWeight: 600,
    ...(variant === "rounded" && { borderRadius: 12 }),
    fontFamily: overrideProps?.fontFamily ?? fonts?.publicSans,
  };
}

export const avatarColorAndVariantStyles = createComponentVariantStyles({
  filled: { disableMouseHover: true },
  outlined: { disableMouseHover: true },
  text: { disableMouseHover: true },
  soft: { disableMouseHover: true },
  waterSoft: { disableMouseHover: true },
  inverted: { disableMouseHover: true },
});
