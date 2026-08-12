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
  readFolder: (folderPath) => ipcRenderer.invoke('read-folder', folderPath),
  pickFiles: () => ipcRenderer.invoke('pick-files'),
  renameFile: (payload) => ipcRenderer.invoke('rename-file', payload),
  moveFile: (payload) => ipcRenderer.invoke('move-file', payload),
  musicBrainzSearch: (query) => ipcRenderer.invoke('musicbrainz-search', query),

});
