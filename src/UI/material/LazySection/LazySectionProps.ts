type SectionsProps = {
  importFunc: () => {
    then: (module: any) => Promise<any>;
  };
  props?: object;
};

type RenderInProps<T extends React.ElementType = "div"> = {
  component: T | "div";
  props?: React.ComponentPropsWithoutRef<T>;
};

export interface LazySectionProps<T extends React.ElementType = "div"> {
  sections: SectionsProps[];
  renderIn?: RenderInProps<T>;
  fallback?: React.ReactNode;
}
