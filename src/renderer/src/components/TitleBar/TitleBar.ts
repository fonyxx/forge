export interface TitleBarMenuItemDirect {
    label: string;
    onClick: () => void;
}

export interface TitleBarMenuItemPassive {
  label: string;
  children: TitleBarMenuItem[];
}

export type TitleBarMenuItem = TitleBarMenuItemDirect | TitleBarMenuItemPassive;
