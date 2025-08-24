"use client";

import * as React from "react";
import NavItemIcon, { NavItemIconProps } from "../NavItemIcon";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import combineSxProps from "@/UI/utils/combineSxProps";
import mergeClasses from "@/UI/utils/mergeClasses";
import { SxProps } from "@/UI/styles/MuiStyles";
import { Tooltip } from "@mui/material";
import { navItemClasses } from "../NavItem";
import { navItemCaptionInfoIconStyles } from "@/UI/material/styles";

const NavItemCaptionInfoIcon = (props: NavItemCaptionInfoIconProps) => {
  const { captionText, ...other } = props;

  const renderStyles = React.useMemo(() => navItemCaptionInfoIconStyles, []);

  return (
    <Tooltip title={captionText}>
      <NavItemIcon
        {...other}
        className={mergeClasses([
          navItemClasses.captionInfoIcon,
          other?.className,
        ])}
        sx={combineSxProps(renderStyles as SxProps, other?.sx)}
      >
        <InfoOutlined />
      </NavItemIcon>
    </Tooltip>
  );
};

export interface NavItemCaptionInfoIconProps extends Partial<NavItemIconProps> {
  captionText: string;
}
export default NavItemCaptionInfoIcon;
