import { primary } from "@/UI/colors";
import combineSxProps from "@/UI/utils/combineSxProps";
import Button, { ButtonProps } from "@mui/material/Button";

const ContentButton = ({ children, variant, ...props }: ContentButtonProps) => {
  return (
    <Button
      {...props}
      sx={combineSxProps(
        () => ({
          color: primary["D400"],
          boxShadow: "none",
          padding: "0.2rem 0.7rem 0.28rem",
          fontSize: "0.84rem",
          borderRadius: "0.5rem",
        }),
        () => ({
          ...(variant === "filled"
            ? {
                color: "#fff",
                background: primary["D200"],
              }
            : variant === "outlined"
              ? {
                  boxShadow: `inset 0 0 0 1px rgb(215, 223, 229)`,
                }
              : {}),
        }),
        props?.sx
      )}
    >
      {children}
    </Button>
  );
};

export interface ContentButtonProps extends ButtonProps {}

export default ContentButton;
