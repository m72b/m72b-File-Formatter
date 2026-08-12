# File Formatter ver.2

An Electron desktop app for batch-renaming files, applying reusable filename templates, looking up music metadata, and organizing files into subfolders.

## Download

Windows users can download the latest `Setup2.0.1.exe` from [GitHub Releases](https://github.com/m72b/m72b-File-Formatter/releases). The installer includes Electron and the complete app; no Node.js or separate dependencies are required.

## Features

- Batch rename files with editable live previews.
- Templates with built-in tokens such as `{TrackNumber}`, `{TrackName}`, `{Artist}`, `{Year}`, `{ext}`, `{original}`, `{UPPER}`, `{lower}`, and `{n}`.
- Add custom tokens and define fixed values with Token Overrides.
- Preserve a file's original extension when a new name does not specify one.
- Optional filename rule that finds a custom phrase and renames only matching files to your chosen new name.
- Saved presets, date sorting, drag-and-drop support, and inline editing.
- MusicBrainz lookup for audio filenames.
- File Organizer with preview mode and match rules such as `*.mp3`.
- Safe path validation and duplicate-name protection.
- Automatic in-place upgrades through the Windows installer.

## Run from source

Requirements: Node.js 20 or newer.

```bash
npm install
npm start
```

## Build the Windows installer

```bash
npm run make-installer
```

The script installs dependencies, removes only this project's previous build output, and creates:

```text
release/m72b-file-formatter-Setup-2.0.0.exe
```

The setup is a standalone Windows installer. Running a newer setup updates the existing installation and preserves user data. If troubleshooting is needed, launch the installer with:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\run-installer-with-log.ps1 .\release\m72b-file-formatter-Setup-2.0.0.exe
```

## Other platforms

```bash
npm run build-mac
npm run build-linux
```

## Project structure

```text
main.js                     Electron main process and file operations
preload.js                  Secure renderer bridge
index.html                  Application UI and renderer logic
scripts/build-installer.js  Installer build and cleanup script
scripts/installer.nsh       Windows upgrade hooks
scripts/run-installer-with-log.ps1  Installer diagnostics helper
assets/                     Application icons
```

## Release checklist

1. Update the version in `package.json` and `package-lock.json`.
2. Run `npm install`.
3. Run `npm run make-installer`.
4. Test the generated installer on a clean Windows account.
5. Create a GitHub Release and upload the `.exe` from the build directory.

## License

MIT
