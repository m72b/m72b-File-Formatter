# m72b file formatter — Desktop App

A sleek, dark file-renaming tool. Drop files in, set a format template using tokens like `{TrackNumber}`, `{Artist}`, `{ext}`, and rename entire batches in one click.

---

## What you need to install

### 1. Node.js
Download and install from: https://nodejs.org  
Choose the **LTS** version (e.g. 20.x or 22.x).

To verify it's installed, open a terminal and run:
```
node -v
npm -v
```

That's it — no other software needed. npm comes bundled with Node.js.

---

## How to run the app

1. **Open a terminal** (Command Prompt / PowerShell on Windows, Terminal on Mac/Linux)

2. **Navigate to this folder:**
   ```
   cd path/to/m72b-app
   ```

3. **Install dependencies** (first time only):
   ```
   npm install
   ```

4. **Launch the app:**
   ```
   npm start
   ```

The app window will open. You're good to go.

---

## How to build a distributable (optional)

To create a standalone installer you can share:

```
# Windows (.exe installer)
npm run build-win

# macOS (.dmg)
npm run build-mac

# Linux (.AppImage)
npm run build-linux


Output goes into the `dist/` folder.

> **Note for macOS:** to build a `.dmg` you must be on a Mac.  
> **Note for Windows:** to build an `.exe` you should be on Windows (or use CI).

---

## Features

- **Format templates** — use tokens like `{TrackNumber} - {TrackName} - {Artist}.{ext}`
- **Token chips** — click to insert tokens at cursor position
- **Token overrides** — lock any token to a fixed value (e.g. Artist = Daft Punk)
- **Saved presets** — save your favourite formats and switch between them
- **Live preview** — see an example of the renamed output as you type
- **Sort by date** — order files by modification date
- **Native folder export** — pick a destination folder and write files directly
- **Drag & drop** — drop files from Explorer/Finder

---

## Project structure

```
m72b-app/
├── main.js        ← Electron main process (window, IPC, file writing)
├── preload.js     ← Secure bridge (exposes electronAPI to the UI)
├── index.html     ← The entire UI (all CSS + JS in one file)
├── package.json   ← Dependencies and build config
├── assets/        ← App icons (add icon.ico / icon.icns / icon.png here)
└── README.md      ← This file
```

---

## Adding an app icon (optional)

Place your icon files in the `assets/` folder:
- `icon.ico` — Windows
- `icon.icns` — macOS  
- `icon.png` — Linux (256×256 or larger)

The icons are only used when building a distributable, not during `npm start`.
