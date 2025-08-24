"use strict";

const defaultGenerator = (componentName: string): string => componentName;

export default function createClassNameGenerator(): {
  configure(generator: (componentName: string) => string): void;
  generate(componentName: string): string;
  reset(): void;
} {
  let generate = defaultGenerator;

  return {
    configure(generator) {
      generate = generator;
    },
    generate(componentName) {
      return generate(componentName);
    },
    reset() {
      generate = defaultGenerator;
    },
  };
}
