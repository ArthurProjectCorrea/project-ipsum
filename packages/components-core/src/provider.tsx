import React from "react";

export interface ComponentsProviderProps {
  children: React.ReactNode;
}

export const ComponentsProvider: React.FC<ComponentsProviderProps> = ({ children }) => {
  return <div className="components-provider">{children}</div>;
};
