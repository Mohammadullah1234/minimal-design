"use client";

import * as React from "react";
import MinimalDashboardLayout from "@/app/layout/minimalDashboard";
import {
  DashboardLayoutContext,
  defaultDrawerProps,
  drawerReducer,
} from "./dashboardLayoutMethods";
import LayoutNavigationBar from "./LayoutNavigationBar";
import Stack from "@/UI/material/Stack";

const DashboardLayout = ({ children }: { children?: React.ReactNode }) => {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const openMenu = React.useCallback(() => setMenuOpen(true), []);
  const closeMenu = React.useCallback(() => setMenuOpen(false), []);

  const [mainDrawer, dispatchMainDrawer] = React.useReducer(
    drawerReducer,
    defaultDrawerProps
  );
  const openDrawer = () => dispatchMainDrawer({ type: null });
  const closeDrawer = () => dispatchMainDrawer({ type: null });

  return (
    <MinimalDashboardLayout>
      <DashboardLayoutContext.Provider value={{ dispatchMainDrawer }}>
        <LayoutNavigationBar
          open={menuOpen}
          onOpen={openMenu}
          onClose={closeMenu}
        >
          {children}
        </LayoutNavigationBar>
        {/* <NavigationBarChildrenProvider></NavigationBarChildrenProvider> */}
        {/* <Grid container columns={12} sx={{ height: "100vh" }}>
          <Grid size={2.4}>
            <LayoutNavigationBar
              open={menuOpen}
              onOpen={openMenu}
              onClose={closeMenu}
            />
          </Grid>

          <Grid
            container
            columns={12}
            size={9.6}
            spacing={3}
            rowSpacing={4}
            sx={{
              px: { xs: "1rem", lg: "2.5rem" },
              paddingBottom: "2.5rem",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              transition: "all 0.4s ease",
            }}
          >
            <Stack sx={{ position: "fixed", top: 0 }}>
              <NavModeSelectTheme />
            </Stack>
            {children}
          </Grid>
        </Grid> */}

        {/* <SideDrawer
          swipeAreaWidth={0}
          {...mainDrawer}
          open={mainDrawer.open}
          onOpen={openDrawer}
          onClose={closeDrawer}
        >
          {mainDrawer.children}
        </SideDrawer> */}
      </DashboardLayoutContext.Provider>
    </MinimalDashboardLayout>
  );
};

export const useDashboard = () => {
  const context = React.use(DashboardLayoutContext);

  if (!context)
    throw new Error("useDashboard must be within DashboardLayoutContext");

  return context;
};
export default DashboardLayout;
