# Minimal Start Page

A minimalist browser start page with dark theme, widgets, and folders.

![Preview](image.png)

## 🌟 Features

- **Minimalist Design** — clean AMOLED black interface
- **Search** — supports Google, Yandex, DuckDuckGo
- **Widgets** — create shortcuts for your favorite websites
- **Folders** — organize widgets into folders for easy management
- **Customization** — adjust widget size, spacing, icon shape, and theme
- **Export/Import** — save and restore your settings
- **100+ Icons** — extensive icon selection for widgets
- **Responsive** — works on desktop and mobile devices

## 🚀 Installation

### Using as Homepage

1. **Deploy the project** to a hosting service (GitHub Pages, Netlify, Vercel, or any other)
2. **Copy the URL** of your deployed project
3. **Open browser settings** and set the URL as your homepage

#### Samsung Internet
1. Open menu (three lines) → **Settings**
2. Go to **Homepage** → **Homepage** → **Custom page**
3. Paste the URL https://github.com/RusanGenius/homepage

#### Chrome
1. Open **Settings** → **Appearance**
2. Enable **Show Home button**
3. Select **Enter custom web address** and paste https://github.com/RusanGenius/homepage

#### Firefox
1. Open **Settings** → **Home**
2. Under **Homepage and new windows**, select **Custom URLs**
3. Paste the project URL

### Local Run

Simply open the `index.html` file in any browser:

```bash
# Or use a local server
python -m http.server 8000
# Then open http://localhost:8000
```

## ⚙️ Settings

### Themes
- **AMOLED** — deep black background
- **Black** — dark gray background
- **Light** — light theme (beta)

### Icon Shape
- **Square** — square with rounded corners
- **Round** — circular

### Folder Styles
- **Preview** — shows mini icons inside the folder
- **Icon** — shows a single folder icon

### Sizes and Spacing
- Widget size (40–80px)
- Horizontal gap between widgets
- Vertical gap between widgets
- Gap between search and widgets

## 📋 Functions

### Widget Context Menu
- **Move Left/Right** — move widget left or right
- **Edit** — edit widget
- **Move to Group** — move to folder
- **Remove from Folder** — remove from folder
- **Delete** — delete widget

### Folder Context Menu (inside open folder)
- **Remove from Folder** — move to homepage
- **Delete** — delete widget

### Empty Space Context Menu
- **Settings** — open settings
- **Add Widget** — add new widget
- **Add Folder** — create new folder

## 📁 Project Structure

```
homepage-browser/
├── index.html      # HTML markup
├── style1.css      # Styles and themes
├── app1.js         # Application logic
└── README.md       # Documentation
```

## 💾 Backup

Settings include **Export** and **Import** buttons to save and restore all widgets, folders, and settings to a JSON file.

## 🛠 Technologies

- **HTML5**
- **CSS3** (Tailwind CSS via CDN)
- **JavaScript** (Vanilla)
- **Lucide Icons** — icon library

## 📝 Notes

- All data is stored in browser's `localStorage`
- Internet connection required (for loading Tailwind and Lucide Icons)
- Swipe gestures supported for folder navigation on mobile devices

## 📄 License

MIT
