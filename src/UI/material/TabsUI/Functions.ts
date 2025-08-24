import { danger, primary, secondary, success, warning } from "@/UI/colors";
import { ApplyStyleTypes } from "./TabsUIProps";
import { alpha } from "@/UI/styles";

const lightModeShadow = {
  boxShadow: "0px 1.5px 1px -1.5px rgb(201, 202, 204)",
};
const darkModeShadow = {
  boxShadow: `0px 1.5px 1px -1.5px ${alpha(primary["D400"], 0.5)}`,
};

export const applyTabStyle: ApplyStyleTypes = (
  tabColor,
  theme,
  removeBackground = false
) => {
  switch (tabColor) {
    case "default":
      return {
        background: removeBackground ? "" : "rgb(245, 245, 245)",
        color: "rgb(35, 45, 52)",
        ...lightModeShadow,

        ...theme.applyStyles("dark", {
          background: removeBackground ? "" : " #2E3843",
          color: "rgb(237, 236, 236)",
          ...darkModeShadow,
        }),
      };
    case "primary":
      return {
        background: removeBackground ? "" : "rgb(246, 250, 253)",
        color: primary[600],
        ...lightModeShadow,

        ...theme.applyStyles("dark", {
          background: removeBackground ? "" : "rgb(0, 44, 72)",
          color: primary[100],
          ...darkModeShadow,
        }),
      };
    case "secondary":
      return {
        background: removeBackground ? "" : "rgb(251, 247, 252)",
        color: "rgb(156, 39, 176)",
        ...lightModeShadow,

        ...theme.applyStyles("dark", {
          background: removeBackground ? "" : secondary["D300"],
          color: secondary[100],
          ...darkModeShadow,
        }),
      };
    case "error":
      return {
        background: removeBackground ? "" : "rgb(253, 247, 247)",
        color: "rgb(211, 47, 47)",
        ...lightModeShadow,

        ...theme.applyStyles("dark", {
          background: removeBackground ? "" : success[800],
          color: danger[100],
          ...darkModeShadow,
        }),
      };
    case "success":
      return {
        background: removeBackground ? "" : "rgb(247, 250, 247)",
        color: "rgb(72, 137, 75)",
        ...lightModeShadow,

        ...theme.applyStyles("dark", {
          background: removeBackground ? "" : success["D100"],
          color: success[100],
          ...darkModeShadow,
        }),
      };
    case "warning":
      return {
        background: removeBackground ? "" : "rgb(254, 249, 245)",
        color: warning[500],
        ...lightModeShadow,

        ...theme.applyStyles("dark", {
          background: removeBackground ? "" : warning[800],
          color: warning[100],
          ...darkModeShadow,
        }),
      };
    case "dark":
      return {
        background: removeBackground ? "" : "rgb(254, 254, 254)",
        color: "rgb(42, 41, 49)",
        ...lightModeShadow,

        ...theme.applyStyles("dark", {
          background: removeBackground ? "" : primary["D400"],
          color: "rgb(254, 254, 254)",
          ...darkModeShadow,
        }),
      };
  }
};
