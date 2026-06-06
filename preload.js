const { contextBridge, ipcRenderer } = require('electron');

// Expose a safe, controlled API to the renderer (index.html)
contextBridge.exposeInMainWorld('electronAPI', {
  // Platform identifier: 'win32' | 'darwin' | 'linux'
  platform: process.platform,

  // Window controls (custom titlebar)
  winMinimize: () => ipcRenderer.send('win-minimize'),
  winMaximize: () => ipcRenderer.send('win-maximize'),
  winClose:    () => ipcRenderer.send('win-close'),

  // Open a native folder picker dialog; resolves to the selected path or null
  pickFolder: () => ipcRenderer.invoke('pick-folder'),

  // Write renamed files to disk
  // files: Array<{ newName: string, data: string (base64) }>
  // folderPath: string
  saveFiles: (payload) => ipcRenderer.invoke('save-files', payload),
});
