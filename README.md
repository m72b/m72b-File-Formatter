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


## License

MIT
