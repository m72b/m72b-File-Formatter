const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  platform: process.platform,
  winMinimize: () => ipcRenderer.send('win-minimize'),
  winMaximize: () => ipcRenderer.send('win-maximize'),
  winClose:    () => ipcRenderer.send('win-close'),

  pickFolder: () => ipcRenderer.invoke('pick-folder'),
  readFolder: (folderPath) => ipcRenderer.invoke('read-folder', folderPath),
  pickFiles: () => ipcRenderer.invoke('pick-files'),
  renameFile: (payload) => ipcRenderer.invoke('rename-file', payload),
  moveFile: (payload) => ipcRenderer.invoke('move-file', payload),
  musicBrainzSearch: (query) => ipcRenderer.invoke('musicbrainz-search', query),
  pickBackgroundImage: () => ipcRenderer.invoke('pick-background-image'),

});
