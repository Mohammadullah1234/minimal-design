"use client";

import * as React from "react";
import mergeProps, { MergePropsOptions } from "../../utils/mergeProps";

/**
 * An internal memoized hook to create a component with merged slotProps, additionalProps and defaultProps.
 *
 * Merges the slotProps with defaultProps, and forward to the component slot or elementType, in this hook have used the `mergeProps` utility.
 *
 * Merges the following props:
 * - className
 * - style
 * - sx
 * - events - deeply merges events, without overrides
 * - slots
 * - slotProps or componentsProps.
 *
 * @param params - The params to create a component with merged slotProps, additionalProps and defaultProps.
 * @param deps - If present, the props will only activate if the values in the list change, this only use to memoize the slotProps, additionalProps and defaultProps.
 *
 * @param options - The options use to manipulate the merge conditions.
 * @returns An array with two arguments, the slot or elementType with merged props.
 */
export default function useSlotAndSlotProps<
  Slot extends React.ElementType,
  ElementType extends React.ElementType,
>(
  params: {
    /**
     * The component slot.
     */
    slot: Slot | undefined;
    /**
     * The slotProps, it's after then `defaultProps` and `additionalProps`.
     *
     * In `slotProps` the component prop converts to as prop automaticly.
     */
    slotProps?: React.ComponentProps<Slot>;
    /**
     * if slot not available, it renders the default elementType.
     */
    elementType: ElementType;
    /**
     * The initial defaultProps for component.
     */
    defaultProps?: React.ComponentProps<ElementType>;
    /**
     * The additionalProps for component, it's after then `defaultProps`.
     */
    additionalProps?: React.ComponentProps<ElementType>;
  },
  deps?: React.DependencyList,
  options?: MergePropsOptions
): [ElementType, React.ComponentProps<ElementType>] {
  const combineProps = React.useMemo(
    () => [
      params?.defaultProps ?? {},
      params?.additionalProps ?? {},
      {
        ...params?.slotProps,
        ...(params?.slotProps?.component && {
          as: params?.slotProps?.component,
        }),
      },
    ],
    deps as React.DependencyList
  );

  const Component = params?.slot ?? params?.elementType;
  const mergedProps = React.useMemo(
    () => mergeProps(combineProps, options),
    deps as React.DependencyList
  );

  return [Component, mergedProps] as [
    ElementType,
    React.ComponentProps<ElementType>,
  ];
}
