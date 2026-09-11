# File Formatter ver.2

An Electron desktop app for batch-renaming files, applying reusable filename templates, looking up music metadata, and organizing files into subfolders.

## Download

Windows users can download the latest `Setup File` from [GitHub Releases](https://github.com/m72b/m72b-File-Formatter/releases). The installer includes Electron and the complete app; no Node.js or separate dependencies are required.

## Features

- Batch rename files with editable live previews.
- Templates with built-in tokens such as `{TrackNumber}`, `{TrackName}`, `{Artist}`, `{Year}`, `{ext}`, `{original}`, `{UPPER}`, `{lower}`, and `{n}`.
- Add custom tokens and define fixed values with Token Overrides.
- Preserve a file's original extension when a new name does not specify one.
- Optional filename rule that finds a custom phrase and renames only matching files to your chosen new name.
- Saved presets, date sorting, drag-and-drop support, and inline editing.
- MusicBrainz lookup for audio filenames.
- **File Organizer lives in its own tab** — the header button slides the screen across to it and back, instead of opening a side panel.
- Organizer sort rules support three types, each routed to its own destination subfolder:
  - **Filename pattern** — e.g. `*.mp3`
  - **Modified-year range** — e.g. 2020–2021, or open-ended ("up to 2020" / "2022 onward")
  - **File-size range** — e.g. 100MB–2GB, or open-ended ("under 100MB" / "500MB and up"), with KB/MB/GB units
- Preview mode shows exactly what would move before anything touches disk.
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

This installs dependencies, removes only this project's previous build output, and creates:

```text
release/m72b-file-formatter-Setup-<version>.exe
```

The setup is a standalone Windows installer. Running a newer setup updates the existing installation and preserves user data.

If `scripts/build-installer.js` isn't present in your checkout, build directly with electron-builder instead:

```bash
npm run build-win
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
index.html                  Application UI, tabs, and renderer logic
scripts/build-installer.js  Installer build and cleanup script (if present)
scripts/installer.nsh       Windows upgrade hooks (if present)
assets/                     Application icons
```

## License

MIT
