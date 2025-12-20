// Codes by mahdi tasha
// Importing part
import { ReactNode } from "react";
import { BookMarkType, TagsType } from "./general";

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

export interface ThemeTogglerProps {
  className?: string;
  tooltipSide?: "top" | "right" | "bottom" | "left";
  buttonVariant?: "outline" | "ghost" | "secondary";
}

export interface EditTagProps {
  label: string;
  color: string;
  id: number;
}

export interface DeleteTagProps {
  id: number;
  label: string;
}

export interface BrainMarkProps {
  className?: string;
  data: BookMarkType;
}

export interface TagProps {
  className?: string;
  data: TagsType;
}

export interface DeleteBrainMarkProps {
  id: number;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export interface EditBrainMarkProps {
  data: {
    id: number;
    url: string;
    why: string;
    tags: string;
  };
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}
