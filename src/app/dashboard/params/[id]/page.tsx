"use client";

import { LazyPageLoader } from "@/app/layout/minimalDashboard";
import { useParams } from "next/navigation";

const ParamsPage = () => {
  const parmas = useParams();

  return (
    <LazyPageLoader>
      <h1>Welcome to Param "{parmas.id}" Page</h1>
    </LazyPageLoader>
  );
};

export default ParamsPage;
