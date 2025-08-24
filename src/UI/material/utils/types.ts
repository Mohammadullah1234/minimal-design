import * as React from "react";
import { SxProps, Theme } from "@/UI/styles/MuiStyles";

export type EventHandlers = Record<string, React.EventHandler<any>>;

export type SlotCommonProps = {
  component?: React.ElementType;
  sx?: SxProps<Theme>;
};

export type SlotProps<
  TSlotComponent extends React.ElementType,
  TOverrides = {},
> = Partial<React.ComponentPropsWithRef<TSlotComponent>> &
  SlotCommonProps &
  TOverrides;

/**
 * -------------------------------------------------------
 */
type SlotPropsWithoutOwnerState<SlotProps> = {
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps?: { [P in keyof SlotProps]?: SlotProps[P] };
};

type SlotPropsWithOwnerState<SlotProps, TOwnerState> = {
  /**
   * The props used for each slot inside.
   *
   * To use the component `ownerState`, just use the slotProps as function.
   *
   * @example slotProps={(ownerState) => ({...})}
   * @default {}
   */
  slotProps?:
    | ((ownerState: TOwnerState) => { [P in keyof SlotProps]?: SlotProps[P] })
    | { [P in keyof SlotProps]?: SlotProps[P] };
};

/**
 * Use the keys of `Slots` to make sure that K contains all of the keys.
 *
 * @example CreateSlotsAndSlotProps<{ root: React.ElementType, decorator: React.ElementType }, { root: ..., decorator: ... }>
 */
export type CreateSlotsAndSlotProps<
  Slots,
  SlotProps extends Record<keyof Slots, any>,
  TOwnerState = false,
> = (TOwnerState extends false
  ? SlotPropsWithoutOwnerState<SlotProps>
  : SlotPropsWithOwnerState<SlotProps, TOwnerState>) & {
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots?: Partial<Slots>;
};

// mui system ------------------------------------------------------------------------

/**
 * `T extends ConsistentWith<T, U>` means that where `T` has overlapping properties with
 * `U`, their value types do not conflict.
 *
 * @internal
 */
export type ConsistentWith<DecorationTargetProps, InjectedProps> = {
  [P in keyof DecorationTargetProps]: P extends keyof InjectedProps
    ? InjectedProps[P] extends DecorationTargetProps[P]
      ? DecorationTargetProps[P]
      : InjectedProps[P]
    : DecorationTargetProps[P];
};
/**
 * a function that takes {component} and returns a component that passes along
 * all the props to {component} except the {InjectedProps} and will accept
 * additional {AdditionalProps}
 */
export type PropInjector<InjectedProps, AdditionalProps = {}> = <
  C extends React.JSXElementConstructor<
    ConsistentWith<React.ComponentProps<C>, InjectedProps>
  >,
>(
  component: C
) => React.JSXElementConstructor<
  DistributiveOmit<
    React.JSX.LibraryManagedAttributes<C, React.ComponentProps<C>>,
    keyof InjectedProps
  > &
    AdditionalProps
>;
/**
 * Remove properties `K` from `T`.
 * Distributive for union types.
 *
 * @internal
 */
export type DistributiveOmit<T, K extends keyof any> = T extends any
  ? Omit<T, K>
  : never;
/**
 * Generate a set of string literal types with the given default record `T` and
 * override record `U`.
 *
 * If the property value was `true`, the property key will be added to the
 * string union.
 *
 * @internal
 */
export type OverridableStringUnion<
  T extends string | number,
  U = {},
> = GenerateStringUnion<Overwrite<Record<T, true>, U>>;
/**
 * Like `T & U`, but using the value types from `U` where their properties overlap.
 *
 * @internal
 */
export type Overwrite<T, U> = DistributiveOmit<T, keyof U> & U;
type GenerateStringUnion<T> = Extract<
  { [Key in keyof T]: true extends T[Key] ? Key : never }[keyof T],
  string
>;

export type IfEquals<T, U, Y = unknown, N = never> =
  (<G>() => G extends T ? 1 : 2) extends <G>() => G extends U ? 1 : 2 ? Y : N;

/**
 * A component whose root component can be controlled via a `component` prop.
 *
 * Adjusts valid props based on the type of `component`.
 */
export interface OverridableComponent<
  M extends OverridableTypeMap,
  OmitComponentProp extends boolean = false,
> {
  <C extends React.ElementType>(
    props: (OmitComponentProp extends true
      ? {}
      : {
          /**
           * The component used for the root node.
           * Either a string to use a HTML element or a component.
           */
          component: C;
        }) &
      OverrideProps<M, C>
  ): React.JSX.Element | null;
  (props: DefaultComponentProps<M>): React.JSX.Element | null;
  propTypes?: any;
}
/**
 * Props of the component if `component={Component}` is used.
 */
export type OverrideProps<
  M extends OverridableTypeMap,
  C extends React.ElementType,
> = BaseProps<M> &
  DistributiveOmit<React.ComponentPropsWithRef<C>, keyof BaseProps<M>>;
/**
 * Props if `component={Component}` is NOT used.
 */
export type DefaultComponentProps<M extends OverridableTypeMap> = BaseProps<M> &
  DistributiveOmit<
    React.ComponentPropsWithRef<M["defaultComponent"]>,
    keyof BaseProps<M>
  >;
/**
 * Props defined on the component.
 */
export type BaseProps<M extends OverridableTypeMap> = M["props"];
export interface OverridableTypeMap {
  props: {};
  defaultComponent: React.ElementType;
}
/**
 * Simplifies the display of a type (without modifying it).
 * Taken from https://effectivetypescript.com/2022/02/25/gentips-4-display/
 */
export type Simplify<T> = T extends Function ? T : { [K in keyof T]: T[K] };
/**
 * Changes the properties K from T to required
 */
export type PartiallyRequired<T, K extends keyof T> = DistributiveOmit<T, K> & {
  [P in K]-?: T[P];
};
