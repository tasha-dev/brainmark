// Codes by mahdi tasha
// Importing part
import { ReactNode } from "react";

// Creating and exporting type and interfaces for props of component
export interface RootLayoutProps {
  children: ReactNode;
}

export interface ContainerProps {
  className?: string;
  hasHeader?: boolean;
  children: ReactNode;
}

export interface LogoProps {
  className?: string;
}

export interface HeaderProps {
  className?: string;
}
