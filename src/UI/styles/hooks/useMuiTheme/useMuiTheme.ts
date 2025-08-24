import * as React from "react";
import { useThemeProps } from "@mui/material/styles";
import {
  createTheme,
  Theme,
  ThemedProps,
  ThemeWithProps,
} from "../../MuiStyles";
import { ThemeContext } from "@mui/styled-engine";

function isObjectEmpty(obj: object) {
  return Object.keys(obj).length === 0;
}

export const systemDefaultTheme = createTheme();
const THEME_ID = "$$material";
function useThemeSystem(defaultTheme = systemDefaultTheme) {
  const contextTheme = React.use(ThemeContext);
  return !contextTheme || isObjectEmpty(contextTheme)
    ? defaultTheme
    : contextTheme;
}

export function useMuiTheme<T = Theme>(): T {
  const theme = useThemeSystem(systemDefaultTheme);
  if (process.env.NODE_ENV !== "production") {
    // TODO: uncomment once we enable eslint-plugin-react-compiler // eslint-disable-next-line react-compiler/react-compiler
    // eslint-disable-next-line react-hooks/rules-of-hooks
    React.useDebugValue(theme);
  }
  return ((theme as { $$material: string })[THEME_ID] || theme) as T;
}

export function useMuiThemeProps<
  Theme extends ThemeWithProps,
  Props,
  Name extends keyof any,
>(params: { props: Props; name: Name }): Props & ThemedProps<Theme, Name> {
  return useThemeProps(params) as Props & ThemedProps<Theme, Name>;
}
