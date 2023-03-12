import { app, session, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import drpc from 'discord-rich-presence'

const code = "1083911741907415090";
const rpc = drpc(code);

rpc.updatePresence({
  state: "Forging",
  details: "Starting the IDE",
  startTimestamp: Date.now(),
  instance: true,
  largeImageKey: "frame_3_1_",
});

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    frame: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      contextIsolation: false,
      nodeIntegration: true,
      webSecurity: false,
    }
  });

  ipcMain.on('set window.minimized', () => {
    mainWindow.minimize()
  });

  ipcMain.on('set window.maximized', () => {
    mainWindow.maximize();
  });

  ipcMain.on('set window.un-maximized', () => {
    mainWindow.unmaximize();
  });

  ipcMain.handle('get window.is-maximized', () => {
    return mainWindow.isMaximized()
  });

  const { exec } = require('child_process');
  ipcMain.on('run blind-shell', (event, arg) => {
    exec(arg, (err, stdout, stderr) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(stdout);
    });
  });

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
    rpc.updatePresence({
      state: "Forging",
      details: "Loading workspace",
      startTimestamp: Date.now(),
      instance: true,
      largeImageKey: "frame_3_1_",
    });
  });

  mainWindow.on("unmaximize", () => {
    mainWindow.webContents.send("listen window.state-change");
  });

  mainWindow.on("maximize", () => {
    mainWindow.webContents.send("listen window.state-change");
  });

  mainWindow.on("minimize", () => {
    mainWindow.webContents.send("listen window.state-change");
  });

  session.defaultSession.webRequest.onBeforeSendHeaders((details, callback) => {
    details.requestHeaders['Origin'] = process.env['ELECTRON_RENDERER_URL'];
    callback({ requestHeaders: details.requestHeaders });
  });

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
