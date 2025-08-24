"use client";

import { Suspense, SuspenseProps, useEffect } from "react";
import { usePageLoader } from "./MinimalDashboardLayout";
import { SectionLoading } from "@/UI/material/LazySection";

const LazyPageLoader = ({ children }: LazyPageLoaderProps) => {
  const { pageLoad, stopLoading } = usePageLoader();

  useEffect(() => {
    if (pageLoad) stopLoading();
  }, []);

  if (pageLoad) return <SectionLoading />;

  return <Suspense fallback={<SectionLoading />}>{children}</Suspense>;
};

export interface LazyPageLoaderProps extends SuspenseProps {}

export default LazyPageLoader;
