"use client";

import React, { useMemo, useState, createContext, use } from "react";

export const PageLoadContext = createContext<PageLoadContextProps | null>(null);

const MinimalDashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [pageLoad, setPageLoad] = useState(false);

  const startLoading = (topLoader: boolean = true) => {
    setPageLoad(true);
    // if (topLoader) loadingBar.start();
  };
  const stopLoading = () => {
    setPageLoad(false);
    // loadingBar.complete();
  };

  const pageLoadContextProps = useMemo(
    () => ({ pageLoad, startLoading, stopLoading }),
    [pageLoad]
  );

  return (
    <PageLoadContext.Provider value={pageLoadContextProps}>
      {children}
    </PageLoadContext.Provider>
  );
};

export type PageLoadContextProps = {
  pageLoad: boolean;
  startLoading: () => void;
  stopLoading: () => void;
};

export const usePageLoader = () => {
  const pageLoader = use(PageLoadContext);
  if (!pageLoader)
    throw new Error(
      "usePageLoader hook must be within in a MinimalDashboardLayout component."
    );

  return pageLoader;
};

export default MinimalDashboardLayout;
