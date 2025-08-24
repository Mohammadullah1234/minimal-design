import * as React from "react";
import MuiFormControlLabel, {
  FormControlLabelSlots as MuiFormControlLabelSlots,
  FormControlLabelSlotsAndSlotProps as MuiFormControlLabelSlotsAndSlotProps,
  FormControlLabelProps as MuiFormControlLabelProps,
} from "@mui/material/FormControlLabel";
import { useMinimalTheme } from "@/UI/styles/hooks";
import { useOverrideProps } from "../OverridePropsProvider";
import combineSxProps from "@/UI/utils/combineSxProps";

const FormControlLabel = (props: FormControlLabelProps) => {
  const renderStyles = React.useMemo(
    () => [
      () => {
        const fonts = useMinimalTheme().fonts;
        const overrideProps = useOverrideProps();

        return {
          fontWeight: 700,
          fontFamily: overrideProps?.fontFamily ?? fonts.publicSans,
        };
      },
    ],
    []
  );

  return (
    <MuiFormControlLabel
      {...props}
      sx={combineSxProps(renderStyles, props?.sx)}
    />
  );
};

export interface FormControlLabelSlots extends MuiFormControlLabelSlots {}
export interface FormControlLabelSlotsAndSlotProps
  extends MuiFormControlLabelSlotsAndSlotProps {}

export interface FormControlLabelProps extends MuiFormControlLabelProps {}

export default FormControlLabel;
