"use client";
import { useState, useRef, useEffect, createElement, useMemo } from "react";
import { LazySectionProps } from "./LazySectionProps";
import SectionLoading from "./SectionLoading";

const LazySection = <E extends React.ElementType = "div">({
  sections,
  renderIn,
  fallback = <SectionLoading />,
}: LazySectionProps<E>) => {
  const Component = renderIn?.component || "div";

  const sectionList = useMemo(
    () => (Array.isArray(sections) ? sections : [sections]),
    [sections]
  );

  const [isVisible, setIsVisible] = useState(false);
  const [loadedComponents, setLoadedComponents] = useState(
    Array(sectionList.length).fill(null)
  );

  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          Promise.all(
            sectionList.map((section) =>
              section.importFunc().then((module: any) => module.default)
            )
          ).then((components) => setLoadedComponents(components));
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [sectionList, isVisible]);

  return (
    <Component ref={ref} {...renderIn?.props}>
      {isVisible && loadedComponents.every((component) => component)
        ? sectionList.map((section, index) =>
            createElement(loadedComponents[index], {
              key: index,
              ...section.props,
            })
          )
        : isVisible && fallback}
    </Component>
  );
};

export default LazySection;
