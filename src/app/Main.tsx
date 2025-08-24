"use client";

import React, { useMemo } from "react";
import { createTheme, ThemeProvider } from "@/UI/styles/MuiStyles";
import { useMinimalTheme } from "@/UI/styles/hooks";
import Stack from "@/UI/material/Stack";
import { NavModeSelectTheme } from "./layout/Navbar";

const Main = ({ children }: { children: React.ReactNode }) => {
  const minimalTheme = useMinimalTheme();
  const theme = useMemo(
    () =>
      createTheme({
        cssVariables: minimalTheme.cssVariables,
        colorSchemes: {
          light: {
            palette: {
              background: {
                default: minimalTheme.palette.background.default,
                paper: minimalTheme.palette.background.paper,
              },
              text: {
                primary: minimalTheme.palette.text.primary,
                secondary: minimalTheme.palette.text.secondary,
              },
            },
          },
          dark: {
            palette: {
              background: {
                default: minimalTheme.palette.grey[800],
                paper: minimalTheme.palette.grey[900],
              },
              text: {
                primary: minimalTheme.palette.grey[200],
                secondary: minimalTheme.palette.grey[400],
              },
            },
          },
        },
      }),
    []
  );

  const renderMode = useMemo(
    () => (
      <Stack sx={{ position: "fixed", top: 10, left: 960, zIndex: 1500 }}>
        <NavModeSelectTheme />
      </Stack>
    ),
    []
  );

  return (
    <ThemeProvider theme={theme} disableTransitionOnChange>
      {children}
      {renderMode}
    </ThemeProvider>
  );
};

export default Main;
