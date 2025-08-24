"use client";
import { Theme } from "@/UI/styles/MuiStyles";
import useMuiMediaQuery, {
  UseMediaQueryOptions as MuiUseMediaQueryOptions,
} from "@mui/material/useMediaQuery";

export interface UseMediaQueryOptions extends MuiUseMediaQueryOptions {}
// export { unstable_createUseMediaQuery } from "@mui/material/useMediaQuery";

/**
 * The mui useMediaQuery.
 */
export default function useMediaQuery<T = Theme>(
  queryInput: string | ((theme: T) => string),
  options?: UseMediaQueryOptions
): boolean {
  return useMuiMediaQuery(queryInput, options);
}
