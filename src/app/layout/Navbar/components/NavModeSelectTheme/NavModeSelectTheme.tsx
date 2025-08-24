"use client";

import Box from "@/UI/material/Box";
import NavButton from "../NavButton";
import NavIconButton, { NavIconButtonProps } from "../NavIconButton";

import SystemModeIcon from "@mui/icons-material/SettingsBrightnessOutlined";
import DarkModeIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeIcon from "@mui/icons-material/LightModeRounded";
import { memo } from "react";
import TooltipUI, { TooltipUIProps } from "@/UI/material/TooltipUI";
import { useColorScheme } from "@/UI/styles/hooks";

const NavModeSelectTheme = memo(
  ({ toolTipProps, children, ...props }: NavModeSelectThemeProps) => {
    const { mode, systemMode, setMode } = useColorScheme();

    const toggleMode = (targetMode: "system" | "light" | "dark") => () =>
      setMode(targetMode);

    if (!mode) {
      return (
        <Box
          data-screenshot="toggle-mode"
          sx={(theme) => ({
            verticalAlign: "bottom",
            display: "inline-flex",
            width: "2.25rem",
            height: "2.25rem",
            borderRadius: theme.shape.borderRadius,
            border: "1px solid",
            borderColor: theme.palette.divider,
          })}
        />
      );
    }
    const resolvedMode = (systemMode || mode) as "light" | "dark";
    const icon = {
      light: <LightModeIcon />,
      dark: <DarkModeIcon />,
    }[resolvedMode];

    return (
      <TooltipUI title="Toggle Mode" {...toolTipProps}>
        <NavIconButton
          data-screenshot="toggle-mode"
          {...props}
          dropDown={() => (
            <>
              <NavButton
                active={mode === "system"}
                startIcon={<SystemModeIcon />}
                onClick={toggleMode("system")}
                disableIconOnDesktop={false}
                disableIconOnMobile={false}
              >
                System
              </NavButton>

              <NavButton
                active={mode === "light"}
                startIcon={<LightModeIcon />}
                onClick={toggleMode("light")}
                disableIconOnMobile={false}
                disableIconOnDesktop={false}
              >
                Light
              </NavButton>

              <NavButton
                active={mode === "dark"}
                startIcon={<DarkModeIcon />}
                onClick={toggleMode("dark")}
                disableIconOnMobile={false}
                disableIconOnDesktop={false}
              >
                Dark
              </NavButton>

              {children}
            </>
          )}
        >
          {icon}
        </NavIconButton>
      </TooltipUI>
    );
  }
);

export interface NavModeSelectThemeProps extends NavIconButtonProps {
  toolTipProps?: TooltipUIProps;
}

export default NavModeSelectTheme;
