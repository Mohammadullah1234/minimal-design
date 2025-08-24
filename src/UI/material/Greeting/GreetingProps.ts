import { StackProps } from "@/UI/material/Stack";
import { TypographyProps } from "@mui/material/Typography";

export interface GreetingProps extends StackProps {
  greetingProps?: TypographyProps;
  disableStyles?: boolean;
  dateTime?: Date;
}

export * from "@/UI/material/Stack";
