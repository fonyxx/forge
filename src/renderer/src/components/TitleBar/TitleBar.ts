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

export interface ModalBodyButtonSlack {
  type: "buttons";
  buttons: {
    label: string;
    mode: "primary" | "secondary" | "danger";
    onClick: () => void;
  }[];
}

export interface ModalBodyTextSlack {
  type: "text";
  value: string;
  mode: "header" | "paragraph" | "image";
}

export interface ModalBodyCodeSlack {
  value: string;
  type: "code";
  mode: string;
}

export interface ModalBodyHR {
  type: "hr";
}

export interface ModalBodyFormSlack {
  type: "form";
  fields: {
    label: string;
    mode: "text" | "password";
    initialValue: string;
    name: string;
    placeholder: string;
    onChange: (value: string) => void;
  }[];
  onSubmit: (formData: any) => void;
}

export type ModalBodySlack = ModalBodyButtonSlack | ModalBodyTextSlack | ModalBodyCodeSlack | ModalBodyFormSlack | ModalBodyHR;
