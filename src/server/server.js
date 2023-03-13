const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

class WindowService {
    constructor() {
        this.window = new BrowserWindow({
            show: false,
            webPreferences: {
                nodeIntegration: true,
                webSecurity: false,
                contextIsolation: false
            }
        });

        this.load();
        this.window.once("ready-to-show", () => {
            console.log("[MAIN] Activating control unit");
            
            // controlify(this.window);

            ipcMain.handle('alert/modal', async (event, someArgument) => {
                console.log(someArgument);
                return null;
            })

            this.window.show();

            console.log("[MAIN] Window is active");
        });
    }

    load() {
        this.window.loadURL(path.join(__dirname, "../uix/entry.html")).then();
    }
}

try {
    let window = null;
    app.on("ready", () => {
        window = new WindowService();
    });
} catch (error) {
    console.log("[MAIN] Error: " + error);
}