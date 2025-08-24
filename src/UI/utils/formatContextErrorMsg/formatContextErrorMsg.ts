"use strict";
import { prefixClass } from "../generateUtilityClass";

/**
 * Formats the context error msg.
 *
 * @param hookName - Hook name.
 * @param componentName - Component or Context name.
 * @returns The formated context error msg.
 */
export default function formatContextErrorMsg(
  hookName: string,
  componentName: string
) {
  throw new Error(
    [
      `${prefixClass}: ${"`" + hookName + "`"} hook must used within ${componentName} component.`,
      `It looks like you have used the ${"`" + hookName + "`"} hook outside ${componentName} component.`,
    ].join("\n")
  );
}
