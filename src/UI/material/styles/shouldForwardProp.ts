"use strick";

/**
 * Use to define the shouldForwardProp props for new styled component.
 *
 * @param prop - The prop value.
 * @returns boolean
 */
export default function shouldForwardProp(prop: PropertyKey): boolean {
  return (
    prop !== "ownerState" &&
    prop !== "theme" &&
    prop !== "sx" &&
    prop !== "as" &&
    prop !== "classes" &&
    prop !== "density" &&
    prop !== "orientation"
  );
}
