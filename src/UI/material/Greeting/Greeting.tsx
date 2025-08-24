import Stack from "@/UI/material/Stack";
import Typography from "@mui/material/Typography";
import { GreetingProps } from "./GreetingProps";

const Greeting = ({
  greetingProps,
  disableStyles = false,
  dateTime = new Date(),
  ...props
}: GreetingProps) => {
  let curDate: Date | number = dateTime;
  curDate = curDate.getHours();
  let greeting = "";

  if (curDate >= 4 && curDate < 11) greeting = "Good Morning";
  else if (curDate >= 11 && curDate < 16) greeting = "Good Noon";
  else if (curDate >= 16 && curDate < 19) greeting = "Good Afternoon";
  else if (curDate >= 19 && curDate < 24) greeting = "Good Evening";
  else greeting = "Midnight";

  return disableStyles ? (
    greeting
  ) : (
    <Stack justifyContent="center" alignItems="center" {...props}>
      <Typography
        color="info"
        component="span"
        {...greetingProps}
        sx={[
          () => ({
            fontWeight: "600",
            fontSize: "1rem",
            pb: 1,
            animation: "animateGreet 2s ease-in-out alternate-reverse infinite",
            background:
              "-webkit-linear-gradient(90deg, rgb(33, 198, 253), rgb(33, 120, 254))",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",

            "@keyframes animateGreet": {
              from: {
                transform: "scale(1)",
              },
              to: {
                transform: "scale(1.15)",
              },
            },
          }),
          ...(Array.isArray(greetingProps?.sx)
            ? greetingProps?.sx
            : [greetingProps?.sx]),
        ]}
      >
        {greeting}
      </Typography>
    </Stack>
  );
};

export default Greeting;
