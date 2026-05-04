# 🎬 Chai LearnTube

A clean, dark-themed educational video gallery built with **React + Vite**, powered by the [FreeAPI](https://freeapi.app) public YouTube endpoint. Click any card to watch the video directly on YouTube.

---

## ✨ Features

- **Live video feed** — fetches latest videos from FreeAPI's YouTube endpoint
- **Thumbnail display** — uses high-quality YouTube thumbnails from the API response
- **Click to watch** — every card opens the corresponding YouTube video in a new tab
- **Clean descriptions** — URLs and social links are stripped, only readable text is shown
- **Stats display** — views, likes, and comments with K/M formatting
- **Responsive grid** — adapts from 1 column (mobile) to 3–4 columns (desktop)
- **Dark professional UI** — Playfair Display + Inter fonts, sticky header, smooth hover effects
- **Accessible** — keyboard navigable cards with focus-visible outlines

---

## 🛠️ Tech Stack

| Tool | Version |
|------|---------|
| React | 19 |
| Vite | 8 |
| CSS (vanilla) | — |
| FreeAPI | public |

---

## 📁 Project Structure

```
src/
├── components/
│   └── YoutubeVideo.jsx     # Fetches API data, renders header + hero + footer
├── mapper/
│   └── MapYoutubeVideo.jsx  # Maps API response → video cards grid
├── utils/
│   └── VideoTitle.jsx       # Title → YouTube URL lookup map
├── index.css                # All styles (dark theme, grid, cards, responsive)
├── App.jsx
└── main.jsx
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm

### Install & Run

```bash
# Clone the repo
git clone <your-repo-url>
cd foundation1

# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

---

## 🔌 API

Videos are fetched from the [FreeAPI](https://freeapi.app) public endpoint:

```
GET https://api.freeapi.app/api/v1/public/youtube/videos
```

**Response shape used:**

```js
response.data.data[]  // array of video items
  └── items
        ├── id                          // video ID
        ├── snippet
        │     ├── title
        │     ├── description
        │     ├── channelTitle
        │     └── thumbnails.high.url  // card thumbnail
        └── statistics
              ├── viewCount
              ├── likeCount
              └── commentCount
```

---

## 🗺️ How the URL Mapping Works

`VideoTitle.jsx` exports a plain object that maps video titles to their YouTube URLs:

```js
const videoUrlMap = {
  "Flutter Windows Installation": "https://www.youtube.com/watch?v=7b4BoyRHx-c",
  "FreeAPI local setup with npm":  "https://www.youtube.com/watch?v=dtzfTePFKgM",
  // ...
};
```

`MapYoutubeVideo.jsx` looks up each card's title in this map:

```js
const youtubeUrl = videoUrlMap[snippet?.title] || null;
```

If a match is found, the card becomes clickable and opens YouTube in a new tab. Cards without a match are still displayed but are not clickable.

---

## 🎨 Design Decisions

- **Dark theme** (`#0f0f0f`) — easy on the eyes for long learning sessions
- **Playfair Display** for headings — editorial, professional feel
- **Inter** for body text — clean and highly readable
- **Red accent (`#ff4444`)** — consistent with YouTube's brand language
- **16:9 thumbnail aspect ratio** — no layout shift on image load
- **`noopener,noreferrer`** on all external links — security best practice

---



---

> To learn more subscribe [Hitesh Choudhary](https://www.youtube.com/@chaiaurcode).

