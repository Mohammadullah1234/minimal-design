import * as React from "react";

export interface UseOverridePropsReturnValue {
  /**
   * Overrides the default fontFamily for all components.
   */
  fontFamily?: string;
  /**
   * Overrides the default fontSecondaryFamily for typography and other components.
   */
  fontSecondaryFamily?: string;
}

const PropsContext = React.createContext<UseOverridePropsReturnValue | null>(
  null
);

if (process.env.NODE_ENV !== "production") {
  PropsContext.displayName = "PropsContext";
}

function OverridePropsProvider({
  value,
  children,
}: React.PropsWithChildren<{ value: UseOverridePropsReturnValue }>) {
  return (
    <PropsContext.Provider value={value}>{children}</PropsContext.Provider>
  );
}

export function useOverrideProps(): UseOverridePropsReturnValue {
  const context = React.use(PropsContext);
  return context as UseOverridePropsReturnValue;
}

export default OverridePropsProvider;
