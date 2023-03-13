const cp = require('child_process');
const path = require('path');

console.log("[INFO] Starting electron dev server");

let processE = null;
function spawnElectron() {
    processE = cp.spawn(path.join(__dirname, "../node_modules/electron/dist/electron.exe"), ['.'], {
        cwd: path.join(__dirname, "../"),
    });

    processE.stdout.on("data", (message) => {
        if (message.toString() === '\r\n') return;

        console.log(`[ELECTRON] ${message.toString().replace("\r", "").replace("\n", "")}`);
        if (message.includes("[MAIN] Window is active"))
            console.log("[INFO] Electron is ready");
    });

    processE.on('close', (code) => {
        console.log("[INFO] Electron exited with code: " + code);
        processE = null;
    });
}

function terminateElectron() {
    if (processE) {
        processE.kill();
    }
}

spawnElectron();