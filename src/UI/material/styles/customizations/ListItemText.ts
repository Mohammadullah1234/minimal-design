"use client";

import { useMinimalTheme } from "@/UI/styles/hooks";
import { SxProps, Theme } from "@/UI/styles/MuiStyles";
import { useOverrideProps } from "../../OverridePropsProvider";
import { pxToRem } from "@/UI/utils/font";

export function listItemTextPrimaryStyles(): SxProps<Theme> {
  const fonts = useMinimalTheme().fonts;
  const overrideProps = useOverrideProps();

  return {
    letterSpacing: 0,
    fontWeight: 600,
    fontSize: pxToRem(15),
    fontFamily: overrideProps?.fontFamily ?? fonts.publicSans,
    color: "inherit",
  };
}

export function listItemTextSecondaryStyles(theme: Theme): SxProps<Theme> {
  const minimalTheme = useMinimalTheme();
  const overrideProps = useOverrideProps();

  return {
    color: minimalTheme.palette.grey[600],
    fontWeight: 400,
    fontFamily: overrideProps?.fontFamily ?? minimalTheme.fonts.publicSans,

    ...theme.applyStyles("dark", {
      color: minimalTheme.palette.grey[500],
    }),
  };
}
