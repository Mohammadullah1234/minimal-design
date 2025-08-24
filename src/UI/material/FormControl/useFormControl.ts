import { useFormControl as MuiuseFormControl } from "@mui/material/FormControl";
import { FormControlState } from "./FormControlContext";

export default function useFormControl(): FormControlState | undefined {
  return MuiuseFormControl();
}
