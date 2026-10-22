# Frrrrame

**Frrrrame** is a browser-based tool for creating customizable image and short-video frames inspired by Google Maps and YouTube interfaces. Edit details, preview your design, and export media directly from the browser.

Repository: https://github.com/Lucy-Min/Frrrrame

## Features

### Google Maps-style generator
- Add an image or video and customize the place name, rating, review count, and category.
- Preview the frame with the selected Korean or English **output language**.
- Export generated images as PNG; video mode supports short clips of up to 7 seconds and an MP4 export workflow.

### YouTube-style generator
- Add an image or video and customize a profile picture, username, comment, relative time, and like count.
- Preview the resulting comment-style overlay.
- Export images as PNG and use the short-video export workflow.

### Website experience
- Switch the **Language** selector between Korean and English for the website interface.
- Choose the language of text inside the generated frame independently of the website language.
- The website language preference is remembered in browser `localStorage`.
- Responsive layout and a Progressive Web App (PWA) setup for compatible browsers.

> **Localization status:** The primary interface has Korean/English translations. Some dynamically generated notices and messages may still appear in Korean. Text entered by users and text baked into example images are not automatically translated.

## Tech stack

- HTML, CSS, and vanilla JavaScript
- HTML Canvas API and browser media APIs
- FFmpeg-based video conversion path (browser loading and codec support may vary)
- Service Worker, Web App Manifest, and `localStorage`

## Run locally

Requirements: Git and a local HTTP server (Python 3 is sufficient).

```bash
git clone https://github.com/Lucy-Min/Frrrrame.git
cd Frrrrame/public
python3 -m http.server 8000
```

Open **http://localhost:8000/index.html**.

> Use `http://localhost`, not `file://`: the PWA manifest and Service Worker require a supported origin.

## How to use

1. Choose the Google Maps-style or YouTube-style generator on the home page.
2. Select **Image** or **Video** mode and upload a supported file.
3. Customize the fields for your chosen template.
4. Choose **Korean** or **English** for the generated frame's labels.
5. Generate and preview the output, then use the available download control.

The **Language** selector at the top of the page controls the website UI, not the language embedded in generated media.

## Project structure

```text
Frrrrame/
├── README.md
└── public/
    ├── index.html       # Home page and generator links
    ├── gmap.html        # Google Maps-style generator
    ├── youtube.html     # YouTube-style generator
    ├── ui-i18n.js       # Korean/English website UI translations
    ├── sw.js            # Service Worker
    ├── site.webmanifest # PWA metadata
    └── images/          # Icons and example images
```

## Browser and PWA notes

- Image export is browser-based. Video conversion is dependent on browser media and codec support, and may take longer on the first run.
- The PWA manifest references icon assets. Ensure all referenced icon files exist before deploying, or update the paths in `site.webmanifest`.
- If you change files but still see an old version, reload the site and inspect the Service Worker/cache in browser developer tools.
- This is an independently developed project. Its visual templates are inspired by familiar interface patterns and are not affiliated with or endorsed by Google or YouTube.

## Author

**Soo Hee Min** — [GitHub](https://github.com/Lucy-Min)
