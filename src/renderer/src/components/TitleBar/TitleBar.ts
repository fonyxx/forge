export interface TitleBarMenuItemItem {
    label: string;
    onClick?: () => void;
    type: "item";
    icon?: string;
}

export interface TitleBarMenuItemGroup {
  label: string;
  children?: TitleBarMenuItem[];
  type: "group";
  icon?: string;
  shortcut?: string;
  position: "right" | "left";
}

export interface TitleBarMenuItemSeparator {
  type: "separator";
}

export type TitleBarMenuItem = TitleBarMenuItemItem | TitleBarMenuItemGroup | TitleBarMenuItemSeparator;