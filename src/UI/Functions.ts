"use client";

import { CardMediaProps } from "@mui/material/CardMedia";

export function cardMediaMainProps(url: CardMediaProps["image"]) {
  return {
    component: "img",
    loading: "lazy",
    width: "100%",
    height: "100%",
    image: url,
    alt: "Broser can't support image",
  };
}
