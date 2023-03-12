import type {TitleBarMenuItem} from "./TitleBar";

export function openMenu(menu: TitleBarMenuItem[], y: number | null = null, x: number | null = null) {
  // @ts-ignore
  window.comu.emit("show", menu, y, x);
}
