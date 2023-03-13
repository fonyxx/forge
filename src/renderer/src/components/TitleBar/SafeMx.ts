import type { ModalBodySlack } from './TitleBar.ts';

export function callModal(title: string, closable = true, body: ModalBodySlack[] = [], footer: ModalBodySlack[] = []) {
    window.windowEvents.emit("modal", title, closable, body, footer);
} 