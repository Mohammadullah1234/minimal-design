"use client";

import { LazyPageLoader } from "@/app/layout/minimalDashboard";
import AlignItemsList from "./Lists/AlignItemsList";
import SimpleList from "./Lists/SimpleList";
import NestedListItem from "./Lists/NestedListItem";

const EcommercePage = () => {
  return (
    <LazyPageLoader>
      <SimpleList />
      <NestedListItem />
      <AlignItemsList />
    </LazyPageLoader>
  );
};

export default EcommercePage;
