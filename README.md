# Homepage Browser

A minimalist browser start page with dark theme, widgets, and folders.

![Preview](image.png)

## 🌟 Features

- **Minimalist Design** — clean AMOLED black interface
- **Search** — supports Google, Yandex, DuckDuckGo
- **Widgets** — create shortcuts for your favorite websites
- **Folders** — organize widgets into groups
- **Customization** — adjust widget size, spacing, icon shape, and theme
- **Export/Import** — save and restore your settings
- **Offline Mode** — Service Worker caches all files for instant loading
- **Built-in Icons** — no external icon dependencies

## 🚀 Installation

### Using as Homepage

1. **Deploy the project** to GitHub Pages, Netlify, Vercel, or any hosting service
2. **Copy the URL** of your deployed project
3. **Open browser settings** and set the URL as your homepage

#### Samsung Internet
1. Open menu (three lines) → **Settings**
2. Go to **Homepage** → **Homepage** → **Custom page**
3. Paste the project URL

#### Chrome
1. Open **Settings** → **Appearance**
2. Enable **Show Home button**
3. Select **Enter custom web address** and paste the project URL

#### Firefox
1. Open **Settings** → **Home**
2. Under **Homepage and new windows**, select **Custom URLs**
3. Paste the project URL

### Local Run

Simply open the `index.html` file in any browser or run a local server:

```bash
python -m http.server 8000
# Then open http://localhost:8000
```

## ⚙️ Settings

### Themes
- **AMOLED** — deep black background
- **Black** — dark gray background

### Icon Shape
- **Square** — rounded square
- **Round** — circular

### Folder Styles
- **Preview** — shows mini icons inside the folder
- **Icon** — shows a single folder icon

### Sizes and Spacing
- Widget size (40–80px)
- Horizontal gap between widgets
- Vertical gap between widgets
- Gap between search bar and widgets

## 📋 Functions

### Widget Context Menu
- **Move Left/Right** — move widget left or right
- **Edit** — edit widget
- **Move to Group** — move to folder
- **Remove from Folder** — move back to homepage
- **Delete** — delete widget

### Folder Context Menu (inside open folder)
- **Remove from Folder** — move to homepage
- **Delete** — delete widget

### Empty Space Context Menu (long press)
- **Settings** — open settings
- **Add Widget** — create new widget
- **Add Folder** — create new folder

## 📁 Project Structure

```
Homepage Browser/
├── index.html      # HTML markup + inline CSS styles
├── app.js          # Application logic
├── sw.js           # Service Worker (offline cache)
├── style.css       # Styles backup
└── README.md       # Documentation
```

## 💾 Backup

Settings include **Export** and **Import** buttons to save and restore all widgets, folders, and settings to a JSON file.

## 🛠 Technologies

- **HTML5** — inline CSS for instant loading
- **CSS3** — Tailwind CSS (CDN) + custom styles
- **JavaScript** — vanilla JS, no frameworks
- **Built-in SVG Icons** — no external dependencies
- **Service Worker** — PWA caching for offline support

## 📝 Notes

- All data is stored in browser `localStorage`
- Internet connection required for first load (Tailwind CSS CDN)
- After first load, Service Worker caches everything — page works offline
- Swipe gestures supported for folder navigation on mobile devices

## 📄 License

MIT
