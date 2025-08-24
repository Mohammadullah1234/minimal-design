"use client";

import Tabs from "@mui/material/Tabs";
import { TabsUIProps } from "./TabsUIProps";
import { createContext, memo, use, useState } from "react";
import { tabsUIStyles } from "./TabsUIStyles";
import combineSxProps from "@/UI/utils/combineSxProps";

export const TabsUIContext = createContext<TabsUIProps>({
  defaultTabValue: "",
});

const TabsUI = memo(
  ({
    children,
    defaultTabValue,
    tabColor = "default",
    tabVariant = "underline",
    ...props
  }: TabsUIProps) => {
    const [value, setValue] = useState(defaultTabValue);

    return (
      <TabsUIContext.Provider
        value={{
          tabColor,
          defaultTabValue,
          ...props,
          value: props?.value ?? value,
        }}
      >
        <Tabs
          variant="fullWidth"
          value={value}
          {...props}
          onChange={(event, newValue) => {
            setValue(newValue);
            props.onChange?.(event, newValue);
          }}
          sx={combineSxProps(
            (theme) => tabsUIStyles(theme, tabColor, tabVariant),
            props?.sx
          )}
        >
          {children}
        </Tabs>
      </TabsUIContext.Provider>
    );
  }
);

export const useTabsUIProps = () => {
  const context = use(TabsUIContext);

  if (!context)
    throw new Error("useTabsUIProps hook must be used within a TabsUI.");

  return context;
};
export default TabsUI;
