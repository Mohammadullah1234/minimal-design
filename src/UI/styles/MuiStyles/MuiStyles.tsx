import {
  DefaultTheme,
  CreateMUIStyled as MuiCreateMUIStyled,
  MUIStyledCommonProps as MuiImportStyledCommonProps,
  MuiStyledOptions as MaterialUIEngineStyledOptions,
  SystemProps as MuiSystemProps,
} from "@mui/system";
import {
  ThemeProvider as MuiThemeProvider,
  createTheme as MuicreateTheme,
  ThemeProviderProps as MuiThemeProviderProps,
  ThemeOptions as MuiThemeOptions,
  ThemeCssVar as MuiThemeCssVar,
  ThemeVars as MuiThemeVars,
  ThemeWithProps as MuiThemeWithProps,
  Components as MuiComponents,
  ComponentsProps as MuiComponentsProps,
  ComponentsOverrides as MuiComponentsOverrides,
  ComponentsVariants as MuiComponentsVariants,
  StyledComponentProps as MuiStyledComponentProps,
  ComponentsPropsList as MuiComponentsPropsList,
  ComponentNameToClassKey as MuiComponentNameToClassKey,
  Breakpoint as MuiBreakpoint,
  Breakpoints as MuiBreakpoints,
  BreakpointsOptions as MuiBreakpointsOptions,
  CommonColors as MuiCommonColors,
  PaletteCommonChannel as MuiPaletteCommonChannel,
  Shadows as MuiShadows,
  TypographyStyle as MuiTypographyStyle,
  TypographyVariant as MuiTypographyVariant,
  TypographyVariants as MuiTypographyVariants,
  TypographyVariantsOptions as MuiTypographyVariantsOptions,
  SxProps as MuiSxProps,
  Theme as MuiTheme,
  TypeText as MuiTypeText,
  styled as MuiStyled,
  CSSProperties as MuiCSSProperties,
  ColorSystem as MuiColorSystem,
  ColorSystemOptions as MuiColorSystemOptions,
  CSSObject as MuiCSSObject,
  CssVarsThemeOptions as MuiCssVarsThemeOptions,
  createColorScheme as MuiCreateColorScheme,
  getInitColorSchemeScript as MuiGetInitColorSchemeScript,
  SupportedColorScheme as MuiSupportedColorScheme,
  SimplePaletteColorOptions as MuiSimplePaletteColorOptions,
  PaletteColorOptions as MuiPaletteColorOptions,
} from "@mui/material/styles";

export interface ThemeProviderProps<Theme = DefaultTheme>
  extends MuiThemeProviderProps<Theme> {}
export interface ThemeOptions extends MuiThemeOptions {}
export type ThemeCssVar = MuiThemeCssVar;
export type ThemedProps<Theme, Name extends keyof any> = Theme extends {
  components: Record<
    Name,
    {
      defaultProps: infer Props;
    }
  >;
}
  ? Props
  : {};
export interface ThemeVars extends MuiThemeVars {}
export interface ThemeWithProps extends MuiThemeWithProps {}
export interface Components<Theme = unknown> extends MuiComponents<Theme> {}
export type ComponentsProps = MuiComponentsProps;
export type ComponentsOverrides<Theme = unknown> =
  MuiComponentsOverrides<Theme>;
export type ComponentsVariants<Theme = unknown> = MuiComponentsVariants<Theme>;
export interface StyledComponentProps<ClassKey extends string = string>
  extends MuiStyledComponentProps<ClassKey> {}
export interface ComponentsPropsList extends MuiComponentsPropsList {}
export interface ComponentNameToClassKey extends MuiComponentNameToClassKey {}
export type Breakpoint = MuiBreakpoint;
export interface Breakpoints extends MuiBreakpoints {}
export interface BreakpointsOptions extends MuiBreakpointsOptions {}
export interface CommonColors extends MuiCommonColors {}
export interface PaletteCommonChannel extends MuiPaletteCommonChannel {}
export type Shadows = MuiShadows;
export type TypographyStyle = MuiTypographyStyle;
export type TypographyVariant = MuiTypographyVariant;
export interface TypographyVariants extends MuiTypographyVariants {}
export interface TypographyVariantsOptions
  extends MuiTypographyVariantsOptions {}
export type SxProps<Theme extends object = {}> = MuiSxProps<Theme>;

/**
 * Our [TypeScript guide on theme customization](https://mui.com/material-ui/guides/typescript/#customization-of-theme) explains in detail how you would add custom properties.
 */
export interface Theme extends MuiTheme {}
export interface TypeText extends MuiTypeText {}
export type CreateMUIStyled<Theme extends object = DefaultTheme> =
  MuiCreateMUIStyled<Theme>;

export interface MUIStyledCommonProps<Theme extends object = DefaultTheme>
  extends MuiImportStyledCommonProps<Theme> {}

export interface MuiStyledOptions extends MaterialUIEngineStyledOptions {}
export interface CSSProperties extends MuiCSSProperties {}
export interface ColorSystem extends MuiColorSystem {}
export interface ColorSystemOptions extends MuiColorSystemOptions {}
export interface CSSObject extends MuiCSSObject {}

export interface CssVarsThemeOptions extends MuiCssVarsThemeOptions {}
export type SupportedColorScheme = MuiSupportedColorScheme;
/**
 * The `css` function accepts arrays as values for mobile-first responsive styles.
 * Note that this extends to non-theme values also. For example `display=['none', 'block']`
 * will also works.
 */
export type ResponsiveStyleValue<T> =
  | T
  | Array<T | null>
  | {
      [key: string]: T | null;
    };

export type SystemProps<Theme extends object = {}> = MuiSystemProps<Theme>;
export interface SimplePaletteColorOptions
  extends MuiSimplePaletteColorOptions {}
export type PaletteColorOptions = MuiPaletteColorOptions;

// methods -----------------------------------------------------
/**
 * Custom styled utility that has a default MUI theme.
 * @param tag HTML tag or component that should serve as base.
 * @param options Styled options for the created component.
 * @returns React component that has styles attached to it.
 */
export const styled: CreateMUIStyled<Theme> = MuiStyled;

export function ThemeProvider<Theme = DefaultTheme>({
  theme,
  ...props
}: ThemeProviderProps<Theme>): React.JSX.Element {
  return <MuiThemeProvider theme={theme} {...props} />;
}

/**
 * Generate a theme base on the options received.
 * @param options Takes an incomplete theme object and adds the missing parts.
 * @param args Deep merge the arguments with the about to be returned theme.
 * @returns A complete, ready-to-use theme object.
 */
export function createTheme(
  options?: Omit<ThemeOptions, "components"> &
    Pick<
      CssVarsThemeOptions,
      "defaultColorScheme" | "colorSchemes" | "components"
    > & {
      cssVariables?:
        | boolean
        | Pick<
            CssVarsThemeOptions,
            | "colorSchemeSelector"
            | "rootSelector"
            | "disableCssColorScheme"
            | "cssVarPrefix"
            | "shouldSkipGeneratingVar"
          >;
    },
  // cast type to skip module augmentation test
  ...args: object[]
): Theme {
  return MuicreateTheme(options, args);
}

export function createColorScheme(
  options: ColorSystemOptions
): ColorSystemOptions {
  return MuiCreateColorScheme(options);
}

export const getInitColorSchemeScript = MuiGetInitColorSchemeScript;
