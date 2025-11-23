const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
    selectFolder: () => ipcRenderer.invoke('select-folder'),
    selectFile: () => ipcRenderer.invoke('select-file'),
    playGame: (filePath) => ipcRenderer.invoke('play-game', filePath),
    downloadGame: (url, filepath) => ipcRenderer.send('download-game-start', { url, filepath }),
    onDownloadProgress: (callback) => ipcRenderer.on('download-progress', (e, percent) => callback(percent)),
    onDownloadFinished: (callback) => ipcRenderer.on('download-finished', callback),
    onDownloadError: (callback) => ipcRenderer.on('download-error', (e, err) => callback(err))
});