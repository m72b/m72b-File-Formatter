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
    icon: path.join(__dirname, 'assets', process.platform === 'win32' ? 'icon.ico' : 'icon.png'),
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

function fileInfo(filePath) {
  const stat = fs.statSync(filePath);
  const ext = path.extname(filePath).slice(1).toLowerCase();
  return { name: path.basename(filePath), ext, size: stat.size, mtime: stat.mtimeMs, dir: path.dirname(filePath) };
}

ipcMain.handle('read-folder', async (_event, folderPath) => {
  try {
    if (!folderPath || !fs.statSync(folderPath).isDirectory()) return { error: 'Folder does not exist' };
    return fs.readdirSync(folderPath, { withFileTypes: true })
      .filter(entry => entry.isFile())
      .map(entry => fileInfo(path.join(folderPath, entry.name)));
  } catch (err) { return { error: err.message }; }
});

ipcMain.handle('pick-files', async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openFile', 'multiSelections'], title: 'Choose files'
  });
  if (result.canceled) return [];
  return result.filePaths.map(fileInfo);
});

function safeName(name) {
  return typeof name === 'string' && name.length > 0 && name !== '.' && name !== '..' && !/[\\/\0]/.test(name);
}

ipcMain.handle('rename-file', async (_event, { folderPath, oldName, newName }) => {
  try {
    if (!safeName(oldName) || !safeName(newName)) return { ok: false, error: 'Invalid filename' };
    const source = path.join(folderPath, oldName);
    const target = path.join(folderPath, newName);
    if (!fs.existsSync(source)) return { ok: false, error: 'Source file not found' };
    if (source !== target && fs.existsSync(target)) return { ok: false, error: 'A file with that name already exists' };
    fs.renameSync(source, target);
    return { ok: true };
  } catch (err) { return { ok: false, error: err.message }; }
});

ipcMain.handle('move-file', async (_event, { folderPath, fileName, destFolder }) => {
  try {
    if (!safeName(fileName) || !safeName(destFolder)) return { ok: false, error: 'Invalid file or folder name' };
    const source = path.join(folderPath, fileName);
    const destinationDir = path.join(folderPath, destFolder);
    if (!fs.existsSync(source)) return { ok: false, error: 'Source file not found' };
    fs.mkdirSync(destinationDir, { recursive: true });
    const target = path.join(destinationDir, fileName);
    if (fs.existsSync(target)) return { ok: false, error: 'Destination file already exists' };
    fs.renameSync(source, target);
    return { ok: true };
  } catch (err) { return { ok: false, error: err.message }; }
});

ipcMain.handle('musicbrainz-search', async (_event, query) => {
  try {
    const url = `https://musicbrainz.org/ws/2/recording/?query=${encodeURIComponent(query)}&fmt=json&limit=8`;
    const response = await fetch(url, { headers: { 'User-Agent': 'm72b-file-formatter/1.0 (https://github.com/m72b/m72b-File-Formatter)' } });
    if (!response.ok) return { ok: false, error: `MusicBrainz returned ${response.status}` };
    return { ok: true, data: await response.json() };
  } catch (err) { return { ok: false, error: err.message }; }
});

// Expose platform string to renderer
ipcMain.handle('get-platform', () => process.platform);
