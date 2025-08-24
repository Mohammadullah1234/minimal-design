"use client";

import { useMinimalTheme } from "@/UI/styles/hooks";
import { SxProps, Theme } from "@/UI/styles/MuiStyles";
import { useOverrideProps } from "../../OverridePropsProvider";

export function buttonBaseStyles(): SxProps<Theme> {
  const fonts = useMinimalTheme().fonts;
  const overrideProps = useOverrideProps();

  return {
    fontWeight: 500,
    fontFamily: overrideProps?.fontFamily ?? fonts.publicSans,
  };
}
