export interface DropDown {
    label: string;
    icon?: string;
    value?: string;
    keywords?: string[];
    iconColor?: "warning" | "error" | "success" | "neutral";
    bestMatch?: boolean;
    onClick?: () => void;
}