#  m72b File Formatter

A simple desktop application that automatically organizes files into folders based on their file type.

## Features

- Organize files with one click
- Sort images, videos, documents, archives, and more
- Create folders automatically
- Fast processing
- Clean and simple interface

## Supported File Types

| Category | Extensions |
|-----------|------------|
| Images | .png, .jpg, .jpeg, .gif, .webp |
| Videos | .mp4, .mov, .avi, .mkv |
| Documents | .pdf, .docx, .txt, .pptx |
| Archives | .zip, .rar, .7z |
| Audio | .mp3, .wav, .flac |

## How It Works

Before:

Downloads/
├── cat.png
├── report.pdf
├── song.mp3
├── movie.mp4

After:

Downloads/
├── Images/
│   └── cat.png
├── Documents/
│   └── report.pdf
├── Audio/
│   └── song.mp3
└── Videos/
    └── movie.mp4

## Installation

To generate a Windows desktop setup installer directly from this repository:

```bash
npm run make-installer
```

The command installs dependencies when needed, builds the installer, and writes
`m72b-file-formatter-Setup-1.0.1.exe` to `dist/`. You can then share that file
or upload it to the GitHub Releases section.

## Usage

1. Launch the application
2. Select a folder
3. Click Format
4. Done!

## Planned Features

- Undo functionality
- Custom file rules
- Duplicate file detection
- Empty folder cleanup
- Dark mode
- Drag & drop support
- File preview

## Roadmap

### Version 1.0
- Basic file sorting
- Folder creation
- Modern UI

in the feature 

### Version 1.1 
- Undo feature
- Custom categories
- Settings page

### Version 1.2
- Duplicate finder
- Recursive folder scanning
- Performance improvements

### Version 2.0
- Plugin system
- Advanced automation rules
- Scheduled formatting

## Contributing

Contributions, bug reports, and feature suggestions are welcome.

## License

MIT License
