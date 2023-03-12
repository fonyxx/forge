import { ElectronAPI } from '@electron-toolkit/preload'
import EventEmitter from 'events'

declare global {
  interface Window {
    electron: ElectronAPI
    api: unknown
    comu: EventEmitter
  }
}
