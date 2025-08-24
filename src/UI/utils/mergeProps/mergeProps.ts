import mergeClasses from "@/UI/utils/mergeClasses";
import combineSxProps, {
  CombineSxPropsParams,
} from "@/UI/utils/combineSxProps";
import resolveSelector from "../resolveSelector";

const initialOptions: MergePropsOptions = {
  disableMergingClassNames: false,
  disableMergingStyles: false,
  disableMergingSxProps: false,
  forwardSlotPropsAsFunction: false,
  shouldDisableMergingEvent: () => false,
};

const proceedSlotPropsMerge = <ForwardSlotPropsAsFunction extends boolean>({
  propValue,
  prevPropVal,
  options,
  ...other
}: {
  propValue: any;
  prevPropVal: Record<string, any>;
  args?: any[];
  options: MergePropsOptions<ForwardSlotPropsAsFunction>;
}) => {
  const reslovedPropValue = resolveSelector(
    propValue,
    ...(other?.args as Record<string, any>[])
  ) as Record<string, any>;

  const reslovedPrevPropVal = resolveSelector(
    prevPropVal,
    ...(other?.args as Record<string, any>[])
  );

  /**
   * slotProps
   */
  const slotProps: Record<string, any> = { ...reslovedPrevPropVal };

  if (reslovedPropValue)
    Object.entries(reslovedPropValue)?.forEach(
      ([slotPropKey, slotPropsObject]) => {
        const prevSlotProps = reslovedPrevPropVal?.[slotPropKey] ?? {};

        slotProps[slotPropKey] = mergeProps(
          [prevSlotProps, slotPropsObject],
          options
        );
      }
    );

  return slotProps;
};

/**
 * An internal function that merges multiple props object deeply, into one props object.
 *
 * Merges the following props:
 * - className
 * - style
 * - sx
 * - events - deeply merges events, without overrides
 * - slots
 * - slotProps or componentsProps.
 *
 * @param propsArray - The props array objects, pass as array.
 * @param options - The options use to manipulate the merge conditions.
 * @returns The merged props object.
 *
 * @example
 * // simple merging
 * const mergedProps = mergeProps([
 *    {
 *      className: "root", // className merge
 *      sx: { background: "green" }, // sx merge
 *      onClick: () => console.log("root click"), // event merge
 *    },
 *    {
 *      style: { color: "red" }, // style merge
 *      onClick: () => console.log("other click"), // event merge
 *      "aria-loading": true,
 *    },
 *    {
 *      className: "main", // className merge
 *      style: { zIndex: 1 }, // style merge
 *      sx: () => ({ border: 1 }), // sx merge
 *    },
 * ]);
 *
 * console.log(mergedProps);
 * Output: {
 *    aria-loading: true,
 *    className: "root main",
 *    onClick: (...args)=> {…},
 *    style: {color: 'red', zIndex: 1},
 *    sx: [{ background: "green" }, () => ({ border: 1 })]
 * }
 *
 *
 * @example
 * // advanced merging for slots and slotProps
 * 
 * const mergedProps = mergeProps([
     {
       slots: {
         root: "div",
       },
       slotProps: (ownerState) => ({
         root: { className: `root__class ${ownerState?.className}` },
         main: { sx: { border: 1 } },
       }),
     },
     {
       slots: {
         main: "span",
       },
       slotProps: {
         root: { className: "other__class" },
         main: { sx: () => ({ color: "red" }) },
       },
     },
   ], { forwardSlotPropsAsFunction: true });

   console.log(mergedProps);
   Output: {
      slotProps: (ownerState) => {…},
      slots: { root: "div", main: "span" }
   }

   // OR:
   
   console.log(mergedProps.slotProps({ className: "owner__class" }));
   Output: {
    root: {
      className: "root__class owner__class other__class"
    },
    main: {
      sx: [{ border: 1 }, () => ({ sx: { color: "red" } })]
    }
   }
 */
export default function mergeProps<
  Props extends object | undefined,
  ForwardSlotPropsAsFunction extends boolean,
>(
  propsArray: Props[],
  options: MergePropsOptions<ForwardSlotPropsAsFunction> = initialOptions as MergePropsOptions<ForwardSlotPropsAsFunction>
): MergePropsReturnValue<Props, ForwardSlotPropsAsFunction> {
  const output: Record<string, any> = {};
  const {
    disableMergingClassNames,
    disableMergingStyles,
    disableMergingSxProps,
    forwardSlotPropsAsFunction,
    shouldDisableMergingEvent,
  } = {
    ...initialOptions,
    ...options,
  } as Required<MergePropsOptions>;

  propsArray.forEach((props) => {
    if (props)
      Object.entries(props).forEach(([propKey, propValue]: [string, any]) => {
        const prevPropVal = output[propKey];

        if (propKey === "className" && !disableMergingClassNames)
          output[propKey] = mergeClasses([prevPropVal, propValue]);
        else if (
          propKey === "style" &&
          typeof propValue === "object" &&
          !disableMergingStyles
        )
          output[propKey] = {
            ...prevPropVal,
            ...propValue,
          };
        else if (propKey === "sx" && !disableMergingSxProps)
          output[propKey] = combineSxProps(
            prevPropVal,
            propValue as CombineSxPropsParams
          );
        else if (
          propKey.match(/^on[A-Z]/) &&
          typeof propValue === "function" &&
          !shouldDisableMergingEvent(propKey)
        )
          output[propKey] = (...args: any[]) => {
            prevPropVal?.(...args);
            propValue(...args);
          };
        else if (propKey === "slots" && typeof propValue === "object")
          output[propKey] = {
            ...prevPropVal,
            ...propValue,
          };
        else if (propKey === "slotProps" || propKey === "componentsProps") {
          const slotPropsMergeOpts = {
            prevPropVal,
            propValue,
            options,
          };

          output[propKey] = forwardSlotPropsAsFunction
            ? (...args: any[]) =>
                proceedSlotPropsMerge({ ...slotPropsMergeOpts, args })
            : proceedSlotPropsMerge(slotPropsMergeOpts);
        } else output[propKey] = propValue;
      });
  });

  type ReturnValue = MergePropsReturnValue<Props, ForwardSlotPropsAsFunction>;

  if (options?.shouldForwardProp) {
    const newOutput: Record<string, any> = {};

    Object.keys(output)
      .filter((propName) => options?.shouldForwardProp?.(propName))
      .forEach((prop) => {
        newOutput[prop] = output[prop];
      });

    return newOutput as ReturnValue;
  }

  return output as ReturnValue;
}

export interface MergePropsOptions<
  ForwardSlotPropsAsFunction extends boolean = false,
> {
  /**
   * If it's true, merging classNames will be disabled.
   * @default false
   */
  disableMergingClassNames?: boolean;
  /**
   * If it's true, merging styles objects will be disabled.
   * @default false
   */
  disableMergingStyles?: boolean;
  /**
   * If it's true, merging sx props be disabled.
   * @default false
   */
  disableMergingSxProps?: boolean;
  /**
   * If it's true, the slotProps will be retured as function with args.
   * @default false
   */
  forwardSlotPropsAsFunction?: ForwardSlotPropsAsFunction;
  /**
   * This will disable merging events if returns true.
   *
   * @param {string} event - The event name.
   */
  shouldDisableMergingEvent?: (event: string) => boolean;
  /**
   * The forwarded props is returned.
   *
   * @param propName - The prop name.
   */
  shouldForwardProp?: (propName: string) => boolean;
}

type MergePropsReturnValue<
  Props extends object | undefined,
  ForwardSlotPropsAsFunction extends boolean,
> = {
  [T in keyof Props]: ForwardSlotPropsAsFunction extends true
    ? (ownerState: unknown) => Props
    : Props[T];
};
