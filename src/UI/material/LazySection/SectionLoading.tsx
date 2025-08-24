"use client";

import Stack, { StackProps } from "@/UI/material/Stack";
import LinearProgress, {
  linearProgressClasses,
  LinearProgressProps,
} from "@mui/material/LinearProgress";
import combineSxProps from "../../utils/combineSxProps";

const SectionLoading = ({ progressProps, ...props }: SectionLoadingProps) => {
  return (
    <Stack
      {...props}
      sx={combineSxProps(
        {
          width: "100%",
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
        },
        props?.sx
      )}
    >
      <LinearProgress
        {...progressProps}
        sx={combineSxProps(
          (theme) => ({
            width: { xs: "20rem", md: "25rem" },
            height: "0.25rem",

            [`& .${linearProgressClasses.bar2}`]: {
              background: " #999DA1",
            },

            ...theme.applyStyles("dark", {
              background: " #4F555B",

              [`& .${linearProgressClasses.bar1}`]: {
                background: " #fff",
              },
            }),
          }),
          progressProps?.sx
        )}
      />
    </Stack>
  );
};

export interface SectionLoadingProps extends StackProps {
  progressProps?: LinearProgressProps;
}

export default SectionLoading;
