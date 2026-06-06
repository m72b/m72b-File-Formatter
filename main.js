const { app, BrowserWindow, ipcMain, dialog, shell } = require('electron');
const path = require('path');
const fs = require('fs');

// Keep a global reference to prevent garbage collection
let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 780,
    minWidth: 900,
    minHeight: 600,
    frame: process.platform === 'darwin', // native frame on macOS, custom on Windows/Linux
    titleBarStyle: process.platform === 'darwin' ? 'hiddenInset' : 'default',
    backgroundColor: '#000000',
    icon: path.join(__dirname, 'assets', process.platform === 'win32' ? 'icon.ico' : process.platform === 'darwin' ? 'icon.icns' : 'icon.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false,
    },
    show: false, // show after ready-to-show for a clean launch
  });

  mainWindow.loadFile('index.html');

  // Show once fully rendered
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  // Open external links in the system browser
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    // macOS: re-create window when dock icon is clicked and no windows are open
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// ─── IPC Handlers ─────────────────────────────────────────────────────────────

// Window controls (for custom titlebar on Windows/Linux)
ipcMain.on('win-minimize', () => mainWindow?.minimize());
ipcMain.on('win-maximize', () => {
  if (mainWindow?.isMaximized()) mainWindow.unmaximize();
  else mainWindow?.maximize();
});
ipcMain.on('win-close', () => mainWindow?.close());

// Folder picker
ipcMain.handle('pick-folder', async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openDirectory', 'createDirectory'],
    title: 'Choose export folder',
  });
  if (result.canceled || result.filePaths.length === 0) return null;
  return result.filePaths[0];
});

// Save renamed files to disk
ipcMain.handle('save-files', async (_event, { files, folderPath }) => {
  let success = 0;
  let failed = 0;

  for (const file of files) {
    try {
      const destPath = path.join(folderPath, file.newName);
      // Decode base64 → buffer → write
      const buffer = Buffer.from(file.data, 'base64');
      fs.writeFileSync(destPath, buffer);
      success++;
    } catch (err) {
      console.error('Failed to save file:', file.newName, err);
      failed++;
    }
  }

  return { success, failed };
});

// Expose platform string to renderer
ipcMain.handle('get-platform', () => process.platform);
