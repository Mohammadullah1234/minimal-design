import createSvgIcon from "@/UI/utils/createSvgIcon";

export const PaperBlueGradient = createSvgIcon(
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="120"
    height="120"
    viewBox="0 0 120 120"
    fill="none"
  >
    <rect
      width="120"
      height="120"
      fill="url(#paint0_radial_4464_55338)"
      fillOpacity="0.1"
    />
    <defs>
      <radialGradient
        id="paint0_radial_4464_55338"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(120 1.81812e-05) rotate(-45) scale(123.25)"
      >
        <stop stopColor="#00B8D9" />
        <stop offset="1" stopColor="#00B8D9" stopOpacity="0" />
      </radialGradient>
    </defs>
  </svg>,
  "paperBlueGradient"
);

export const PaperRedGradient = createSvgIcon(
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="120"
    height="120"
    viewBox="0 0 120 120"
    fill="none"
  >
    <rect
      width="120"
      height="120"
      fill="url(#paint0_radial_4464_55337)"
      fillOpacity="0.1"
    />
    <defs>
      <radialGradient
        id="paint0_radial_4464_55337"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(0 120) rotate(135) scale(123.25)"
      >
        <stop stopColor="#FF5630" />
        <stop offset="1" stopColor="#FF5630" stopOpacity="0" />
      </radialGradient>
    </defs>
  </svg>,
  "paperRedGradient"
);
