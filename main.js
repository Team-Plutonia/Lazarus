const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const { execFile } = require('child_process');
const https = require("https");
const fs = require("fs");

ipcMain.handle('select-folder', async () => {
    const win = BrowserWindow.getFocusedWindow();
    const {
        canceled,
        filePaths
    } = await dialog.showOpenDialog(win, {
        properties: ['openDirectory']
    });
    if (canceled) return null;
    return filePaths[0];
});

function downloadWithRedirect(url, filepath, event) {
    const https = require("https");
    const fs = require("fs");

    https.get(url, (response) => {
        // Handle redirect
        if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
            console.log("Redirecting to:", response.headers.location);
            return downloadWithRedirect(response.headers.location, filepath, event);
        }

        const total = parseInt(response.headers["content-length"] || 0, 10);
        let received = 0;

        const file = fs.createWriteStream(filepath);
        response.pipe(file);

        response.on("data", chunk => {
            if (total > 0) {
                received += chunk.length;
                const percent = Math.floor((received / total) * 100);
                event.sender.send("download-progress", percent);
            }
        });

        file.on("finish", () => {
            file.close();
            event.sender.send("download-finished");
        });

    }).on("error", err => {
        event.sender.send("download-error", err.message);
    });
}

ipcMain.on("download-game-start", (event, { url, filepath }) => {
    //const win = BrowserWindow.getFocusedWindow();

    //https.get(url, response => {
    //    const total = parseInt(response.headers["content-length"], 10);
    //    let received = 0;

    //    const file = fs.createWriteStream(filepath);
    //    response.pipe(file);

    //    response.on("data", chunk => {
    //        received += chunk.length;
    //        const percent = Math.floor((received / total) * 100);

    //        win.webContents.send("download-progress", percent);
    //    });

    //    file.on("finish", () => {
    //        file.close();
    //        win.webContents.send("download-progress", 100);
    //        win.webContents.send("download-finished");
    //    });

    //}).on("error", err => {
    //    console.error(err);
    //    win.webContents.send("download-error", err.message);
    //});
    downloadWithRedirect(url, filepath, event);
});

ipcMain.handle("download-game", async (event, {
    url,
    filepath
}) => {
    return new Promise((resolve, reject) => {
        https.get(url, response => {
            const total = parseInt(response.headers["content-length"], 10);
            let received = 0;
            const file = fs.createWriteStream(filepath);
            response.pipe(file);
            response.on("data", chunk => {
                received += chunk.length;
                const percent = Math.floor((received / total) * 100);
                event.sender.send("download-progress", percent);
            });
            file.on("finish", () => {
                file.close();
                resolve(true);
            });
        }).on("error", err => {
            reject(err);
        });
    });
});
ipcMain.handle('select-file', async () => {
    const win = BrowserWindow.getFocusedWindow();
    const {
        canceled,
        filePaths
    } = await dialog.showOpenDialog(win, {
        properties: ['openFile']
    });
    if (canceled) return null;
    return filePaths[0];
});
ipcMain.handle('play-game', async (event, filePath) => {
    if (!filePath) return;
    execFile(filePath, (err) => {
        if (err) console.error(err);
    });
});

function createWindow() {
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        autoHideMenuBar: true,
        webPreferences: {
            preload: path.join(__dirname, 'src/preload.js'),
            nodeIntegration: false,
            contextIsolation: true,
            sandbox: false
        }
    });
    win.loadFile('index.html');
}
app.whenReady().then(createWindow);
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});