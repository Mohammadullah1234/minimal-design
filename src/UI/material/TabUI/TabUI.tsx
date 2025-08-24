import Tab from "@mui/material/Tab";
import { TabUIProps } from "./TabUIProps";
import LightBox from "../LightBox";
import clsx from "clsx";
import { useTabsUIProps } from "../TabsUI";
import combineSxProps from "@/UI/utils/combineSxProps";

const TabUI = ({
  badgeContent,
  badgeColor = "default",
  badgeProps,
  ...props
}: TabUIProps) => {
  const { value } = useTabsUIProps();

  return (
    <Tab
      disableRipple
      iconType="end"
      icon={
        <LightBox
          variant={value === props?.value ? "filled" : "outlined"}
          {...badgeProps}
          className={clsx("tabLightBox", badgeProps?.className || "")}
          color={badgeColor}
          sx={combineSxProps(
            {
              height: "auto",
              minWidth: "1.7rem",
              padding: "0.17rem 0.35rem 0.18rem",
              position: badgeContent ? "unset" : "absolute",
              transform: `scale(${badgeContent ? "1" : "0"})`,
            },
            badgeProps?.sx
          )}
        >
          {badgeContent}
        </LightBox>
      }
      {...props}
      className={clsx("tabUI-root", props?.className || "")}
    />
  );
};

export default TabUI;
