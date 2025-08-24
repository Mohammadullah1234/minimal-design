"use client";

import * as React from "react";
import { LazyPageLoader } from "@/app/layout/minimalDashboard";
import Button from "@/UI/material/Button";
import Grid from "@/UI/material/Grid";
import SimpleDialogDemo from "./Dialogs/SimpleDialogDemo";
import AlertDialog from "./Dialogs/AlertDialog";
import FormDialog from "./Dialogs/FormDialog";
import TransitionAlertDialogSlide from "./Dialogs/TransitionAlertDialogSlide";
import FullScreenDialog from "./Dialogs/FullScreenDialog";
import MaxWidthDialog from "./Dialogs/MaxWidthDialog";
import CustomizedDialog from "./Dialogs/CustomizedDialog";
import Label from "@/UI/material/Label";
import SwipeableTemporaryDrawer from "./Drawers/SwipeableTemporaryDrawer";
import Stack from "@/UI/material/Stack";
import mergeProps from "@/UI/utils/mergeProps";

const AnalyticsPage = () => {
  const mergedProps = mergeProps(
    [
      { slotProps: { root: { className: "root_class" } } },
      { slotProps: { root: { className: "second_class" } } },
      { slotProps: {} },
    ],
    { forwardSlotPropsAsFunction: true }
  );

  console.log(mergedProps.slotProps({}));

  return (
    <LazyPageLoader>
      <Grid container>
        <Stack flexDirection="column" gap={2}>
          <SimpleDialogDemo />
          <AlertDialog />
          <TransitionAlertDialogSlide />
          <FormDialog />
          <FullScreenDialog />
          <MaxWidthDialog />
          <CustomizedDialog />

          <Label color="error">Top 5</Label>

          <SwipeableTemporaryDrawer />

          {/* <Paper
            sx={{
              width: "100%",
              height: "100vh",
              top: 0,
              left: 0,
              zIndex: 12000,
            }}
          >
            Welcome to Database
          </Paper> */}
        </Stack>
      </Grid>
    </LazyPageLoader>
  );
};

export default AnalyticsPage;
