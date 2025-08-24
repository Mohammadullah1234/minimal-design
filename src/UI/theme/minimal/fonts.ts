import { formatFont } from "@/UI/utils/font";

export const minimalFonts: MinimalFonts = {
  barlow: formatFont("Barlow"),
  dmSans: formatFont("Dm Sans"),
  interLatin: formatFont("Inter Latin"),
  nunitoSans: formatFont("Nunito Sans"),
  publicSans: formatFont("Public Sans Variable"),
};

export interface MinimalFonts {
  barlow: string;
  dmSans: string;
  interLatin: string;
  nunitoSans: string;
  publicSans: string;
}
