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
  hasFooter?: boolean;
  children: ReactNode;
}

export interface LogoProps {
  className?: string;
}

export interface HeaderProps {
  className?: string;
}

export interface BeamBgProps {
  className?: string;
}

export interface FooterProps {
  className?: string;
}

export interface AppLayoutProps {
  children: ReactNode;
}

export interface SideBarProps {
  open?: boolean;
  onOpenChange?: (val: boolean) => void;
}
