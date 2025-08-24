"use client";

import { useMinimalTheme } from "@/UI/styles/hooks";
import { SxProps, Theme } from "@/UI/styles/MuiStyles";
import { useOverrideProps } from "../../OverridePropsProvider";
import { pxToRem } from "@/UI/utils/font";

export function dialogTitleStyles(): SxProps<Theme> {
  const fonts = useMinimalTheme().fonts;
  const overrideProps = useOverrideProps();

  return {
    lineHeight: 2.5,
    fontSize: pxToRem(18),
    fontWeight: 700,
    fontFamily: overrideProps?.fontFamily ?? fonts.nunitoSans,
  };
}
