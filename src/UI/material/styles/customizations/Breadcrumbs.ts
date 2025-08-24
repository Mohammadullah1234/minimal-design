"use client";

import { useMinimalTheme } from "@/UI/styles/hooks";
import { SxProps, Theme } from "@/UI/styles/MuiStyles";
import { useOverrideProps } from "../../OverridePropsProvider";

export function breadcrumbsStyles(theme: Theme): SxProps<Theme> {
  const minimalTheme = useMinimalTheme();
  const overrideProps = useOverrideProps();

  return {
    color: minimalTheme.palette.grey[600],
    fontWeight: 700,
    fontFamily: overrideProps?.fontFamily ?? minimalTheme.fonts.publicSans,
    ...theme.applyStyles("dark", {
      color: minimalTheme.palette.grey[500],
    }),
  };
}
