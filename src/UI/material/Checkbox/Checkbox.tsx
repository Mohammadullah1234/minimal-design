import * as React from "react";
import MuiCheckbox, {
  CheckboxPropsSizeOverrides as MuiCheckboxPropsSizeOverrides,
  CheckboxPropsColorOverrides as MuiCheckboxPropsColorOverrides,
  CheckboxRootSlotPropsOverrides as MuiCheckboxRootSlotPropsOverrides,
  CheckboxInputSlotPropsOverrides as MuiCheckboxInputSlotPropsOverrides,
  CheckboxSlots as MuiCheckboxSlots,
  CheckboxSlotsAndSlotProps as MuiCheckboxSlotsAndSlotProps,
  CheckboxProps as MuiCheckboxProps,
  CheckboxOwnerState as MuiCheckboxOwnerState,
} from "@mui/material/Checkbox";
import combineSxProps, {
  CombineSxPropsParams,
} from "@/UI/utils/combineSxProps";
import {
  checkboxColorCheckedStyles,
  checkboxDisabledStyles,
  checkboxStyles,
} from "../styles/customizations/Checkbox";
import { ComponentColors } from "../styles/componentVariantStyles";
import { OverridableStringUnion } from "@/UI/material/utils";
import {
  CheckBoxChecked,
  CheckBoxDefault,
  CheckBoxIndeterminate,
} from "@/UI/icons/minimal";

const Checkbox = (props: CheckboxProps) => {
  const { color = "primaryMain", ...other } = props;

  const renderStyles: CombineSxPropsParams[] = React.useMemo(
    () => [
      checkboxStyles,
      checkboxColorCheckedStyles(color),
      checkboxDisabledStyles,
    ],
    [color]
  );

  return (
    <MuiCheckbox
      icon={<CheckBoxDefault />}
      checkedIcon={<CheckBoxChecked />}
      indeterminateIcon={<CheckBoxIndeterminate />}
      {...other}
      color={color as MuiCheckboxProps["color"]}
      sx={combineSxProps(renderStyles, other?.sx)}
    />
  );
};

export interface CheckboxPropsSizeOverrides
  extends MuiCheckboxPropsSizeOverrides {}
export interface CheckboxPropsColorOverrides
  extends MuiCheckboxPropsColorOverrides {}
export interface CheckboxRootSlotPropsOverrides
  extends MuiCheckboxRootSlotPropsOverrides {}
export interface CheckboxInputSlotPropsOverrides
  extends MuiCheckboxInputSlotPropsOverrides {}

export interface CheckboxSlots extends MuiCheckboxSlots {}
export type CheckboxSlotsAndSlotProps = MuiCheckboxSlotsAndSlotProps;

interface NewCheckboxProps {
  /**
   * The color of the component.
   * It supports both default and custom theme colors.
   * @default 'primaryMain'
   */
  color?: OverridableStringUnion<ComponentColors, CheckboxPropsColorOverrides>;
}

export interface CheckboxProps
  extends Omit<MuiCheckboxProps, "color">,
    NewCheckboxProps {}
export interface CheckboxOwnerState extends MuiCheckboxOwnerState {}

export default Checkbox;
