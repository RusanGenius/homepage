// Built-in SVG icons — no external dependencies
const BUILTIN_ICONS = {
    'image': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>',
    'music': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>',
    'video': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5"/><rect x="2" y="6" width="14" height="12" rx="2"/></svg>',
    'file-text': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>',
    'code': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
    'terminal': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" x2="20" y1="19" y2="19"/></svg>',
    'book': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>',
    'graduation-cap': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"/><path d="M22 10v6"/><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/></svg>',
    'bot': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>',
    'sparkles': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/><path d="M20 3v4"/><path d="M22 5h-4"/></svg>',
    'github': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>',
    'globe': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>',
    'folder': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/></svg>',
    'plus': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>',
    'youtube': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></svg>',
    'brain': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/><path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"/><path d="M17.599 6.5a3 3 0 0 0 .399-1.375"/><path d="M6.003 5.125A3 3 0 0 0 6.401 6.5"/><path d="M3.477 10.896a4 4 0 0 1 .585-.396"/><path d="M19.938 10.5a4 4 0 0 1 .585.396"/><path d="M6 18a4 4 0 0 1-1.967-.516"/><path d="M19.967 17.484A4 4 0 0 1 18 18"/></svg>',
    'coffee': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 2v2"/><path d="M14 2v2"/><path d="M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1"/><path d="M6 2v2"/></svg>',
    'twitter': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>',
    'message-square': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
    'pen-tool': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 19 7-7 3 3-7 7-3-3z"/><path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="m2 2 7.586 7.586"/><circle cx="11" cy="11" r="2"/></svg>',
    // UI icons
    'arrow-left': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>',
    'arrow-right': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>',
    'edit-2': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>',
    'trash-2': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>',
    'settings': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>',
    'x': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>',
    'chevron-down': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>',
    'folder-plus': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 10v6"/><path d="M9 13h6"/><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/></svg>',
    'link': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>',
    'download': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>',
    'upload': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>',
    'folder-input': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 9V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-1"/><path d="M2 13h10"/><path d="M7 18v-6"/><path d="M4 15l3-3 3 3"/></svg>',
};

const SEARCH_ENGINES = {
  google: { name: 'Google', url: 'https://www.google.com/search?q=', iconHtml: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#ffffff"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>' },
  yandex: { name: 'Yandex', url: 'https://yandex.ru/search/?text=', iconHtml: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#ffffff" class="yandex-icon"><path d="M4 3h4.5L13 10.5 17.5 3H22l-8 12.5V21h-3.5V15.5L4 3z"/></svg>' },
  duckduckgo: { name: 'DuckDuckGo', url: 'https://duckduckgo.com/?q=', iconHtml: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#ffffff"><path d="M8.5,5A1.5,1.5 0 0,0 7,6.5A1.5,1.5 0 0,0 8.5,8A1.5,1.5 0 0,0 10,6.5A1.5,1.5 0 0,0 8.5,5M10,2A5,5 0 0,1 15,7C15,8.7 14.15,10.2 12.86,11.1C14.44,11.25 16.22,11.61 18,12.5C21,14 22,12 22,12C22,12 21,21 15,21H9C9,21 4,21 4,16C4,13 7,12 6,10C2,10 2,6.5 2,6.5C3,7 4.24,7 5,6.65C5.19,4.05 7.36,2 10,2Z"/></svg>' },
};

// Helper function to get icon SVG with proper styling
function getIcon(iconName, className = '', style = '') {
    const svg = BUILTIN_ICONS[iconName];
    if (!svg) {
        console.warn(`Icon "${iconName}" not found, using globe`);
        return BUILTIN_ICONS['globe'];
    }
    let result = svg;
    if (className) {
        result = result.replace('<svg ', `<svg class="${className}" `);
    }
    if (style) {
        result = result.replace('<svg ', `<svg style="${style}" `);
    }
    return result;
}

// Replace all data-lucide attributes in HTML with inline SVGs
function initInlineIcons() {
    document.querySelectorAll('[data-lucide]').forEach(el => {
        const iconName = el.getAttribute('data-lucide');
        const className = el.getAttribute('class') || '';
        const style = el.getAttribute('style') || '';
        const iconSvg = getIcon(iconName, className, style);
        el.outerHTML = iconSvg;
    });
}

const ICONS = Object.keys(BUILTIN_ICONS);
const POPULAR_ICONS = ['globe', 'github', 'youtube', 'book', 'graduation-cap', 'bot', 'sparkles', 'brain', 'coffee', 'image', 'music', 'video', 'file-text', 'code', 'terminal', 'folder'];

let iconsExpanded = false;

const INITIAL_WIDGETS = [
  { id: '1', type: 'link', title: 'GitHub', url: 'https://github.com', icon: 'github' },
  { id: '2', type: 'link', title: 'YouTube', url: 'https://youtube.com', icon: 'youtube' },
  { id: '3', type: 'link', title: 'ChatGPT', url: 'https://chat.openai.com', icon: 'bot' },
  { id: '4', type: 'link', title: 'Wikipedia', url: 'https://wikipedia.org', icon: 'book' },
  { id: '5', type: 'link', title: 'Spotify', url: 'https://open.spotify.com', icon: 'music' },
  { id: '6', type: 'link', title: 'Netflix', url: 'https://netflix.com', icon: 'video' },
  { id: '7', type: 'link', title: 'Reddit', url: 'https://reddit.com', icon: 'message-square' },
];

let engine = localStorage.getItem('startpage_engine_v1') || 'google';
let widgets = JSON.parse(localStorage.getItem('startpage_widgets_v5')) || INITIAL_WIDGETS;

// Settings state
let settings = JSON.parse(localStorage.getItem('startpage_settings_v1')) || {
    theme: 'amoled',
    iconShape: 'square',
    folderStyle: 'preview',
    addBtnVisible: true,
    widgetGapX: 8,
    widgetGapY: 8,
    searchGap: 40,
    widgetSize: 64
};

let currentContextWidgetId = null;
let editingWidgetId = null;
let activeGroup = null;
let selectedIcon = 'globe';
let selectedWidgetsForFolder = new Set();
let isInsideGroup = false;
let groupCurrentPage = 0;
const GROUP_PAGE_SIZE = 9;

// DOM Elements
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const engineBtn = document.getElementById('engine-btn');
const engineMenu = document.getElementById('engine-menu');
const widgetsGrid = document.getElementById('widgets-grid');

// Context Menu
const contextMenu = document.getElementById('context-menu');
const cmLeft = document.getElementById('cm-left');
const cmRight = document.getElementById('cm-right');
const cmEdit = document.getElementById('cm-edit');
const cmMoveGroup = document.getElementById('cm-move-group');
const cmRemoveFromGroup = document.getElementById('cm-remove-from-group');
const cmDelete = document.getElementById('cm-delete');

// Group Widget Context Menu
const groupWidgetContextMenu = document.getElementById('group-widget-context-menu');
const gcmRemove = document.getElementById('gcm-remove');
const gcmDelete = document.getElementById('gcm-delete');

// Empty Space Context Menu
const emptyContextMenu = document.getElementById('empty-context-menu');
const ecmSettings = document.getElementById('ecm-settings');
const ecmAddWidget = document.getElementById('ecm-add-widget');
const ecmAddFolder = document.getElementById('ecm-add-folder');

// Add Menu
const addMenu = document.getElementById('add-menu');
const amWidget = document.getElementById('am-widget');
const amFolder = document.getElementById('am-folder');

// Add/Edit Modal
const addModal = document.getElementById('add-modal');
const addModalContent = document.getElementById('add-modal-content');
const addModalTitle = document.getElementById('add-modal-title');
const closeAddModalBtn = document.getElementById('close-add-modal');
const addTitleInput = document.getElementById('add-title');
const addUrlInput = document.getElementById('add-url');
const iconGrid = document.getElementById('icon-grid');
const iconGridContainer = document.getElementById('icon-grid-container');
const toggleIconsBtn = document.getElementById('toggle-icons-btn');
const toggleIconsText = document.getElementById('toggle-icons-text');
const addWidgetBtn = document.getElementById('add-widget-btn');

// Create Folder Modal
const createFolderModal = document.getElementById('create-folder-modal');
const createFolderModalContent = document.getElementById('create-folder-modal-content');
const closeFolderModalBtn = document.getElementById('close-folder-modal');
const folderTitleInput = document.getElementById('folder-title');
const folderWidgetsGrid = document.getElementById('folder-widgets-grid');
const createFolderBtn = document.getElementById('create-folder-btn');

// Move to Group Modal
const moveGroupModal = document.getElementById('move-group-modal');
const moveGroupModalContent = document.getElementById('move-group-modal-content');
const closeMoveGroupModalBtn = document.getElementById('close-move-group-modal');
const moveGroupGrid = document.getElementById('move-group-grid');

// Group View Modal
const groupModal = document.getElementById('group-modal');
const groupModalContent = document.getElementById('group-modal-content');
const groupViewTitleInput = document.getElementById('group-view-title');
const groupViewWidgetsGrid = document.getElementById('group-view-widgets-grid');
const groupViewWidgetsContainer = document.getElementById('group-view-widgets-container');
const groupPagination = document.getElementById('group-pagination');

// Settings Modal
const settingsModal = document.getElementById('settings-modal');
const settingsModalContent = document.getElementById('settings-modal-content');
const closeSettingsModalBtn = document.getElementById('close-settings-modal');
const exportBtn = document.getElementById('export-btn');
const importBtn = document.getElementById('import-btn');
const importFile = document.getElementById('import-file');
const widgetGapXSlider = document.getElementById('widget-gap-x-slider');
const widgetGapXValue = document.getElementById('widget-gap-x-value');
const widgetGapYSlider = document.getElementById('widget-gap-y-slider');
const widgetGapYValue = document.getElementById('widget-gap-y-value');
const searchGapSlider = document.getElementById('search-gap-slider');
const searchGapValue = document.getElementById('search-gap-value');
const widgetSizeSlider = document.getElementById('widget-size-slider');
const widgetSizeValue = document.getElementById('widget-size-value');

function saveWidgets() {
    localStorage.setItem('startpage_widgets_v5', JSON.stringify(widgets));
}

function saveSettings() {
    localStorage.setItem('startpage_settings_v1', JSON.stringify(settings));
    applySettings();
}

function applySettings() {
    // Apply theme
    document.body.classList.remove('theme-black');
    if (settings.theme === 'black') {
        document.body.classList.add('theme-black');
    }

    // Apply icon shape
    document.body.classList.remove('icon-shape-round');
    if (settings.iconShape === 'round') {
        document.body.classList.add('icon-shape-round');
    }

    // Apply folder style
    document.body.classList.remove('folder-style-icon');
    if (settings.folderStyle === 'icon') {
        document.body.classList.add('folder-style-icon');
    }

    // Apply add button visibility
    document.body.classList.remove('add-btn-hidden');
    if (!settings.addBtnVisible) {
        document.body.classList.add('add-btn-hidden');
    }

    // Apply spacing
    document.documentElement.style.setProperty('--widget-gap-x', settings.widgetGapX + 'px');
    document.documentElement.style.setProperty('--widget-gap-y', settings.widgetGapY + 'px');
    document.documentElement.style.setProperty('--widget-search-gap', settings.searchGap + 'px');
    document.documentElement.style.setProperty('--widget-size', settings.widgetSize + 'px');

    // Update sliders
    widgetGapXSlider.value = settings.widgetGapX;
    widgetGapXValue.textContent = settings.widgetGapX + 'px';
    widgetGapYSlider.value = settings.widgetGapY;
    widgetGapYValue.textContent = settings.widgetGapY + 'px';
    searchGapSlider.value = settings.searchGap;
    searchGapValue.textContent = settings.searchGap + 'px';
    widgetSizeSlider.value = settings.widgetSize;
    widgetSizeValue.textContent = settings.widgetSize + 'px';

    // Update UI buttons
    updateSettingsUI();
}

function updateSettingsUI() {
    // Theme buttons
    updateSegmentedControl('theme', settings.theme, '[data-theme]');
    
    // Icon shape buttons
    updateSegmentedControl('shape', settings.iconShape, '[data-shape]');
    
    // Folder style buttons
    updateSegmentedControl('folderstyle', settings.folderStyle, '[data-folderstyle]');
    
    // Add button visibility
    updateSegmentedControl('addbtn', String(settings.addBtnVisible), '[data-addbtn]');
}

function updateSegmentedControl(groupName, activeValue, selector) {
    const buttons = document.querySelectorAll(selector);
    if (buttons.length === 0) return;
    
    const control = buttons[0].closest('.segmented-control');
    const pill = control.querySelector('.segmented-pill');
    
    buttons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset[groupName] === activeValue || btn.dataset[groupName] === String(activeValue)) {
            btn.classList.add('active');
            // Position the pill behind the active button
            requestAnimationFrame(() => {
                const btnRect = btn.getBoundingClientRect();
                const controlRect = control.getBoundingClientRect();
                pill.style.width = btnRect.width + 'px';
                pill.style.left = (btnRect.left - controlRect.left) + 'px';
            });
        }
    });
}

function saveEngine() {
    localStorage.setItem('startpage_engine_v1', engine);
}

// --- Modals Logic ---
function showModal(modal, content) {
    modal.classList.remove('hidden');
    void modal.offsetWidth; // trigger reflow
    modal.classList.remove('opacity-0');
    content.classList.remove('scale-95');
}

function hideModal(modal, content) {
    modal.classList.add('opacity-0');
    content.classList.add('scale-95');
    setTimeout(() => modal.classList.add('hidden'), 200);
}

// --- Search Engine Menu ---
function renderEngineMenu() {
    engineBtn.innerHTML = SEARCH_ENGINES[engine].iconHtml;
    engineBtn.setAttribute('data-engine', engine);
    engineMenu.innerHTML = Object.keys(SEARCH_ENGINES).map(key => `
        <button type="button" data-engine="${key}" class="engine-option w-full text-left px-4 py-3 flex items-center gap-3 rounded-lg transition-colors ${engine === key ? 'selected text-white' : 'text-neutral-400'}">
            <div class="flex-shrink-0 flex items-center justify-center" style="width: 1.25rem; height: 1.25rem;">
                <div class="engine-icon-inner yandex-icon-wrapper" style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;">
                    ${SEARCH_ENGINES[key].iconHtml}
                </div>
            </div>
            <span class="font-medium flex-1">${SEARCH_ENGINES[key].name}</span>
        </button>
    `).join('');

    document.querySelectorAll('.engine-option').forEach(btn => {
        btn.addEventListener('click', (e) => {
            engine = e.currentTarget.dataset.engine;
            saveEngine();
            renderEngineMenu();
            engineMenu.classList.add('opacity-0');
            setTimeout(() => engineMenu.classList.add('hidden'), 200);
        });
    });
}

engineBtn.addEventListener('click', () => {
    if (engineMenu.classList.contains('hidden')) {
        engineMenu.classList.remove('hidden');
        void engineMenu.offsetWidth;
        engineMenu.classList.remove('opacity-0');
    } else {
        engineMenu.classList.add('opacity-0');
        setTimeout(() => engineMenu.classList.add('hidden'), 200);
    }
});

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = searchInput.value.trim();
    if (!query) return;
    window.location.href = `${SEARCH_ENGINES[engine].url}${encodeURIComponent(query)}`;
});

// --- Context Menu ---
function showContextMenu(e, id) {
    e.preventDefault();
    e.stopPropagation();
    currentContextWidgetId = id;

    const idx = widgets.findIndex(w => w.id === id);
    const widget = widgets[idx];

    cmLeft.disabled = idx <= 0;
    cmRight.disabled = idx >= widgets.length - 1;

    const hasGroups = widgets.some(w => w.type === 'group' && w.id !== id);
    if (widget.type === 'group' || !hasGroups) {
        cmMoveGroup.classList.add('hidden');
    } else {
        cmMoveGroup.classList.remove('hidden');
    }

    // Show "Remove from Folder" only when inside a group
    if (isInsideGroup) {
        cmRemoveFromGroup.classList.remove('hidden');
    } else {
        cmRemoveFromGroup.classList.add('hidden');
    }

    if (widget.type === 'group') {
        cmEdit.classList.add('hidden');
    } else {
        cmEdit.classList.remove('hidden');
    }

    contextMenu.classList.remove('hidden');
    void contextMenu.offsetWidth; // force reflow

    const menuWidth = contextMenu.offsetWidth;
    const menuHeight = contextMenu.offsetHeight;
    const screenWidth = window.innerWidth;

    let x = e.pageX;
    let y = e.pageY;

    // Smart positioning based on cursor position
    const offset = 10;
    if (x < screenWidth / 3) {
        // Left side - open menu to the right
        x = x + offset;
    } else if (x > (screenWidth * 2 / 3)) {
        // Right side - open menu to the left
        x = x - menuWidth - offset;
    } else {
        // Center - center the menu
        x = x - menuWidth / 2;
    }

    // Ensure menu stays within screen bounds
    if (x < offset) x = offset;
    if (x + menuWidth > screenWidth) x = screenWidth - menuWidth - offset;
    if (y + menuHeight > window.innerHeight) y = window.innerHeight - menuHeight - offset;

    contextMenu.style.left = `${x}px`;
    contextMenu.style.top = `${y}px`;
}

cmLeft.addEventListener('click', () => {
    const idx = widgets.findIndex(w => w.id === currentContextWidgetId);
    if (idx > 0) {
        const temp = widgets[idx];
        widgets[idx] = widgets[idx - 1];
        widgets[idx - 1] = temp;
        saveWidgets();
        renderWidgets();
    }
    contextMenu.classList.add('hidden');
});

cmRight.addEventListener('click', () => {
    const idx = widgets.findIndex(w => w.id === currentContextWidgetId);
    if (idx < widgets.length - 1) {
        const temp = widgets[idx];
        widgets[idx] = widgets[idx + 1];
        widgets[idx + 1] = temp;
        saveWidgets();
        renderWidgets();
    }
    contextMenu.classList.add('hidden');
});

cmEdit.addEventListener('click', () => {
    contextMenu.classList.add('hidden');
    openAddModal(currentContextWidgetId);
});

cmMoveGroup.addEventListener('click', () => {
    contextMenu.classList.add('hidden');
    openMoveToGroupModal(currentContextWidgetId);
});

cmRemoveFromGroup.addEventListener('click', () => {
    if (activeGroup) {
        const childIdx = activeGroup.children.findIndex(c => c.id === currentContextWidgetId);
        if (childIdx !== -1) {
            const [removed] = activeGroup.children.splice(childIdx, 1);
            widgets.push(removed);
            saveWidgets();
            renderWidgets();
            renderGroupViewWidgets();
        }
    }
    contextMenu.classList.add('hidden');
});

cmDelete.addEventListener('click', () => {
    widgets = widgets.filter(w => w.id !== currentContextWidgetId);
    saveWidgets();
    renderWidgets();
    contextMenu.classList.add('hidden');
});

// Group Widget Context Menu
let groupWidgetContextMenuIndex = null;

function showGroupWidgetContextMenu(e, index) {
    e.preventDefault();
    e.stopPropagation();
    groupWidgetContextMenuIndex = index;

    groupWidgetContextMenu.classList.remove('hidden');
    void groupWidgetContextMenu.offsetWidth;

    const menuWidth = groupWidgetContextMenu.offsetWidth;
    const menuHeight = groupWidgetContextMenu.offsetHeight;
    const screenWidth = window.innerWidth;

    let x = e.pageX;
    let y = e.pageY;

    const offset = 10;
    if (x < screenWidth / 3) {
        x = x + offset;
    } else if (x > (screenWidth * 2 / 3)) {
        x = x - menuWidth - offset;
    } else {
        x = x - menuWidth / 2;
    }

    if (x < offset) x = offset;
    if (x + menuWidth > screenWidth) x = screenWidth - menuWidth - offset;
    if (y + menuHeight > window.innerHeight) y = window.innerHeight - menuHeight - offset;

    groupWidgetContextMenu.style.left = `${x}px`;
    groupWidgetContextMenu.style.top = `${y}px`;
}

gcmRemove.addEventListener('click', () => {
    if (activeGroup && groupWidgetContextMenuIndex !== null) {
        const [removed] = activeGroup.children.splice(groupWidgetContextMenuIndex, 1);
        widgets.push(removed);
        saveWidgets();
        renderWidgets();
        renderGroupViewWidgets();
    }
    groupWidgetContextMenu.classList.add('hidden');
});

gcmDelete.addEventListener('click', () => {
    if (activeGroup && groupWidgetContextMenuIndex !== null) {
        activeGroup.children.splice(groupWidgetContextMenuIndex, 1);
        saveWidgets();
        renderGroupViewWidgets();
    }
    groupWidgetContextMenu.classList.add('hidden');
});

// Close group widget context menu on click outside
document.addEventListener('click', (e) => {
    if (!groupWidgetContextMenu.contains(e.target)) {
        groupWidgetContextMenu.classList.add('hidden');
    }
});

// Empty Space Context Menu
let emptyPressTimer;
let emptyLongPressed = false;

document.addEventListener('mousedown', (e) => {
    if (e.button !== 0) return;
    if (e.target.closest('.widget-item') || e.target.closest('#add-widget-btn-main') || 
        e.target.closest('#context-menu') || e.target.closest('#empty-context-menu') ||
        e.target.closest('#add-menu') || e.target.closest('#engine-menu-container') ||
        e.target.closest('.modal')) return;
    
    emptyLongPressed = false;
    emptyPressTimer = setTimeout(() => {
        emptyLongPressed = true;
        showEmptyContextMenu(e);
    }, 500);
});

document.addEventListener('mouseup', () => {
    clearTimeout(emptyPressTimer);
});

document.addEventListener('contextmenu', (e) => {
    if (e.target.closest('.widget-item') || e.target.closest('#add-widget-btn-main')) return;
    if (e.target.closest('#context-menu') || e.target.closest('#empty-context-menu') ||
        e.target.closest('#add-menu') || e.target.closest('#engine-menu-container')) return;
    e.preventDefault();
    clearTimeout(emptyPressTimer);
    emptyLongPressed = true;
    showEmptyContextMenu(e);
});

function showEmptyContextMenu(e) {
    e.preventDefault();
    e.stopPropagation();

    emptyContextMenu.classList.remove('hidden');
    void emptyContextMenu.offsetWidth; // force reflow

    const menuWidth = emptyContextMenu.offsetWidth;
    const menuHeight = emptyContextMenu.offsetHeight;
    const screenWidth = window.innerWidth;
    
    let x = e.pageX;
    let y = e.pageY;
    
    // Smart positioning based on cursor position
    const offset = 10;
    if (x < screenWidth / 3) {
        // Left side - open menu to the right
        x = x + offset;
    } else if (x > (screenWidth * 2 / 3)) {
        // Right side - open menu to the left
        x = x - menuWidth - offset;
    } else {
        // Center - center the menu
        x = x - menuWidth / 2;
    }
    
    // Ensure menu stays within screen bounds
    if (x < offset) x = offset;
    if (x + menuWidth > screenWidth) x = screenWidth - menuWidth - offset;
    if (y + menuHeight > window.innerHeight) y = window.innerHeight - menuHeight - offset;

    emptyContextMenu.style.left = `${x}px`;
    emptyContextMenu.style.top = `${y}px`;
}

ecmSettings.addEventListener('click', () => {
    emptyContextMenu.classList.add('hidden');
    openSettingsModal();
});

ecmAddWidget.addEventListener('click', () => {
    emptyContextMenu.classList.add('hidden');
    openAddModal();
});

ecmAddFolder.addEventListener('click', () => {
    emptyContextMenu.classList.add('hidden');
    openCreateFolderModal();
});

// --- Widgets Rendering ---
function createWidgetElement(widget) {
    const div = document.createElement('div');
    div.className = `widget-item relative group cursor-pointer flex flex-col items-center gap-2 z-10`;
    div.style.width = 'var(--widget-size)';
    div.dataset.id = widget.id;

    let innerHtml = '';
    if (widget.type === 'link') {
        const iconSize = `calc(var(--widget-size) * 0.4)`;
        innerHtml = getIcon(widget.icon, 'widget-icon-color transition-colors', `width: ${iconSize}; height: ${iconSize};`);
    } else if (widget.type === 'group' && settings.folderStyle === 'icon') {
        const iconSize = `calc(var(--widget-size) * 0.4)`;
        innerHtml = getIcon('folder', 'folder-icon widget-icon-color transition-colors', `width: ${iconSize}; height: ${iconSize};`);
    } else if (widget.type === 'group') {
        const childrenHtml = widget.children.slice(0, 4).map(child => {
            const previewSize = `calc(var(--widget-size) * 0.18)`;
            return `
            <div class="flex items-center justify-center folder-preview-icon">
                ${getIcon(child.icon, 'text-neutral-300', `width: ${previewSize}; height: ${previewSize};`)}
            </div>
        `;
        }).join('');
        innerHtml = `<div class="folder-preview grid grid-cols-2 gap-0.5 p-1 w-full h-full">${childrenHtml}</div>`;
    }

    div.innerHTML = `
        <div class="widget-icon-container flex items-center justify-center transition-all bg-neutral-900 border border-neutral-800 pointer-events-none" style="width: var(--widget-size); height: var(--widget-size); border-radius: 12px;">
            ${innerHtml}
        </div>
        <span class="text-[10px] font-medium text-neutral-500 text-neutral-300 truncate w-full text-center px-1 pointer-events-none">
            ${widget.title}
        </span>
    `;

    let pressTimer;
    let longPressed = false;

    div.addEventListener('mousedown', (e) => {
        if (e.button !== 0) return;
        longPressed = false;
        pressTimer = window.setTimeout(() => {
            longPressed = true;
            showContextMenu(e, widget.id);
        }, 500);
    });

    div.addEventListener('mouseup', (e) => {
        if (e.button !== 0) return;
        clearTimeout(pressTimer);
        if (!longPressed) {
            if (widget.type === 'group') {
                openGroupViewModal(widget);
            } else {
                window.location.href = widget.url;
            }
        }
    });

    div.addEventListener('mouseleave', () => {
        clearTimeout(pressTimer);
    });

    div.addEventListener('mousemove', () => {
        // Cancel long press if user moves mouse significantly
        clearTimeout(pressTimer);
    });

    div.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        clearTimeout(pressTimer);
        longPressed = true;
        showContextMenu(e, widget.id);
    });

    return div;
}

function renderWidgets() {
    widgetsGrid.innerHTML = '';
    widgets.forEach(widget => {
        widgetsGrid.appendChild(createWidgetElement(widget));
    });

    const addBtn = document.createElement('button');
    addBtn.className = 'flex flex-col items-center gap-2 group relative';
    addBtn.id = 'add-widget-btn-main';
    addBtn.style.width = 'var(--widget-size)';
    
    const plusIconSize = `calc(var(--widget-size) * 0.35)`;
    addBtn.innerHTML = `
        <div class="flex items-center justify-center bg-transparent border-2 border-dashed border-neutral-800 transition-colors pointer-events-none" style="width: var(--widget-size); height: var(--widget-size); border-radius: 12px;">
            ${getIcon('plus', 'text-neutral-600 text-neutral-400 transition-colors', `width: ${plusIconSize}; height: ${plusIconSize};`)}
        </div>
        <span class="text-[10px] font-medium text-transparent pointer-events-none">Add</span>
    `;

    addBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const rect = addBtn.getBoundingClientRect();
        addMenu.style.left = `${rect.left + window.scrollX}px`;
        addMenu.style.top = `${rect.bottom + window.scrollY + 8}px`;
        addMenu.classList.remove('hidden');
    });

    widgetsGrid.appendChild(addBtn);
}

// Global click handler to close menus
document.addEventListener('click', (e) => {
    if (!contextMenu.contains(e.target)) contextMenu.classList.add('hidden');
    if (!emptyContextMenu.contains(e.target)) emptyContextMenu.classList.add('hidden');
    if (!addMenu.contains(e.target) && !e.target.closest('#add-widget-btn-main')) addMenu.classList.add('hidden');
    if (!engineBtn.contains(e.target) && !engineMenu.contains(e.target)) {
        engineMenu.classList.add('opacity-0');
        setTimeout(() => engineMenu.classList.add('hidden'), 200);
    }
});

// --- Add Menu Actions ---
amWidget.addEventListener('click', () => {
    addMenu.classList.add('hidden');
    openAddModal();
});

amFolder.addEventListener('click', () => {
    addMenu.classList.add('hidden');
    openCreateFolderModal();
});

// --- Add/Edit Widget Modal ---
function renderIconGrid() {
    const iconsToShow = iconsExpanded ? ICONS : POPULAR_ICONS;

    iconGrid.innerHTML = iconsToShow.map(icon => {
        const isSelected = selectedIcon === icon;
        const iconClass = isSelected ? 'bg-white/90 text-black' : 'bg-white/5 text-neutral-500';
        return `
        <button type="button" data-icon="${icon}" class="icon-btn p-3 rounded-xl flex items-center justify-center transition-all ${iconClass}">
            ${getIcon(icon, 'w-5 h-5', 'width: 20px; height: 20px;')}
        </button>
    `;
    }).join('');

    document.querySelectorAll('.icon-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            selectedIcon = e.currentTarget.dataset.icon;
            renderIconGrid();
        });
    });

    // Update button text
    toggleIconsText.textContent = iconsExpanded ? 'Show Less' : 'Show All Icons';
}

// Toggle icons expand/collapse
toggleIconsBtn.addEventListener('click', () => {
    iconsExpanded = !iconsExpanded;
    renderIconGrid();
    
    // Scroll to top when expanding
    if (iconsExpanded) {
        iconGridContainer.scrollTop = 0;
    }
});

function openAddModal(editId = null) {
    editingWidgetId = editId;
    if (editId) {
        const widget = widgets.find(w => w.id === editId);
        addModalTitle.textContent = 'Edit Widget';
        addTitleInput.value = widget.title;
        addUrlInput.value = widget.url || '';
        selectedIcon = widget.icon || 'globe';
        addWidgetBtn.textContent = 'Save Changes';
    } else {
        addModalTitle.textContent = 'Add Widget';
        addTitleInput.value = '';
        addUrlInput.value = '';
        selectedIcon = 'globe';
        addWidgetBtn.textContent = 'Add Widget';
    }
    checkAddForm();
    renderIconGrid();
    showModal(addModal, addModalContent);
    addTitleInput.focus();
}

closeAddModalBtn.addEventListener('click', () => hideModal(addModal, addModalContent));
addModal.addEventListener('click', (e) => { if (e.target === addModal) hideModal(addModal, addModalContent); });

function checkAddForm() {
    addWidgetBtn.disabled = !(addTitleInput.value.trim() && addUrlInput.value.trim());
}

addTitleInput.addEventListener('input', checkAddForm);
addUrlInput.addEventListener('input', checkAddForm);

addWidgetBtn.addEventListener('click', () => {
    const title = addTitleInput.value.trim();
    let url = addUrlInput.value.trim();
    if (!title || !url) return;
    if (!url.startsWith('http')) url = `https://${url}`;

    if (editingWidgetId) {
        const widget = widgets.find(w => w.id === editingWidgetId);
        if (widget) {
            widget.title = title;
            widget.url = url;
            widget.icon = selectedIcon;
        }
    } else {
        widgets.push({
            id: `link-${Date.now()}`,
            type: 'link',
            title,
            url,
            icon: selectedIcon
        });
    }
    saveWidgets();
    renderWidgets();
    hideModal(addModal, addModalContent);
});

// --- Create Folder Modal ---
function checkFolderForm() {
    createFolderBtn.disabled = !folderTitleInput.value.trim();
}

function openCreateFolderModal() {
    folderTitleInput.value = '';
    selectedWidgetsForFolder.clear();
    checkFolderForm();

    const linkWidgets = widgets.filter(w => w.type === 'link');
    folderWidgetsGrid.innerHTML = linkWidgets.map(w => {
        const widgetSize = `calc(var(--widget-size) * 0.35)`;
        return `
        <div data-id="${w.id}" class="folder-select-widget cursor-pointer p-2 rounded-xl border-2 border-transparent flex flex-col items-center gap-2" style="width: var(--widget-size);">
            <div class="icon-container flex items-center justify-center text-neutral-400 transition-colors" style="width: var(--widget-size); height: var(--widget-size); border-radius: 12px;">
                ${getIcon(w.icon, 'widget-icon-color', `width: ${widgetSize}; height: ${widgetSize};`)}
            </div>
            <span class="text-[10px] text-neutral-500 truncate w-full text-center">${w.title}</span>
        </div>
    `;
    }).join('');

    document.querySelectorAll('.folder-select-widget').forEach(el => {
        el.addEventListener('click', (e) => {
            const id = e.currentTarget.dataset.id;
            if (selectedWidgetsForFolder.has(id)) {
                selectedWidgetsForFolder.delete(id);
                e.currentTarget.classList.remove('selected');
            } else {
                selectedWidgetsForFolder.add(id);
                e.currentTarget.classList.add('selected');
            }
        });
    });

    showModal(createFolderModal, createFolderModalContent);
    folderTitleInput.focus();
}

closeFolderModalBtn.addEventListener('click', () => hideModal(createFolderModal, createFolderModalContent));
createFolderModal.addEventListener('click', (e) => { if (e.target === createFolderModal) hideModal(createFolderModal, createFolderModalContent); });
folderTitleInput.addEventListener('input', checkFolderForm);

createFolderBtn.addEventListener('click', () => {
    const title = folderTitleInput.value.trim();
    if (!title) return;

    const children = [];
    const newWidgets = [];
    
    widgets.forEach(w => {
        if (selectedWidgetsForFolder.has(w.id)) {
            children.push(w);
        } else {
            newWidgets.push(w);
        }
    });

    newWidgets.push({
        id: `group-${Date.now()}`,
        type: 'group',
        title,
        children
    });

    widgets = newWidgets;
    saveWidgets();
    renderWidgets();
    hideModal(createFolderModal, createFolderModalContent);
});

// --- Move to Group Modal ---
function openMoveToGroupModal(widgetId) {
    const groups = widgets.filter(w => w.type === 'group' && w.id !== widgetId);
    moveGroupGrid.innerHTML = groups.map(g => `
        <button data-id="${g.id}" class="move-target-group w-full text-left px-4 py-3 bg-neutral-800 rounded-xl text-white flex items-center gap-3 transition-colors">
            ${getIcon('folder', 'w-5 h-5 text-neutral-400', 'width: 20px; height: 20px;')}
            ${g.title}
        </button>
    `).join('');

    document.querySelectorAll('.move-target-group').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const targetGroupId = e.currentTarget.dataset.id;
            const widgetIdx = widgets.findIndex(w => w.id === widgetId);

            if (widgetIdx !== -1) {
                const [widget] = widgets.splice(widgetIdx, 1);
                const newGroupIdx = widgets.findIndex(w => w.id === targetGroupId);
                if(newGroupIdx !== -1) {
                    widgets[newGroupIdx].children.push(widget);
                    saveWidgets();
                    renderWidgets();
                }
            }
            hideModal(moveGroupModal, moveGroupModalContent);
        });
    });

    showModal(moveGroupModal, moveGroupModalContent);
}

closeMoveGroupModalBtn.addEventListener('click', () => hideModal(moveGroupModal, moveGroupModalContent));
moveGroupModal.addEventListener('click', (e) => { if (e.target === moveGroupModal) hideModal(moveGroupModal, moveGroupModalContent); });

// --- Group View Modal ---
function openGroupViewModal(group) {
    activeGroup = group;
    isInsideGroup = true;
    groupCurrentPage = 0;
    groupViewTitleInput.value = group.title;
    
    // Reset swipe state
    setupSwipeHandlers();
    
    renderGroupViewWidgets();
    showModal(groupModal, groupModalContent);
}

function closeGroupViewModal() {
    activeGroup = null;
    isInsideGroup = false;
    groupWidgetContextMenu.classList.add('hidden');

    // Cleanup swipe handlers
    if (groupViewWidgetsContainer._swipeHandlers) {
        const old = groupViewWidgetsContainer._swipeHandlers;
        groupViewWidgetsContainer.removeEventListener('touchstart', old.handleTouchStart);
        groupViewWidgetsContainer.removeEventListener('touchmove', old.handleTouchMove);
        groupViewWidgetsContainer.removeEventListener('touchend', old.handleTouchEnd);
        groupViewWidgetsContainer.removeEventListener('mousedown', old.handleMouseDown);
        document.removeEventListener('mousemove', old.handleMouseMove);
        document.removeEventListener('mouseup', old.handleMouseUp);
    }

    hideModal(groupModal, groupModalContent);
}

// Swipe handlers
function setupSwipeHandlers() {
    const container = groupViewWidgetsContainer;
    const grid = groupViewWidgetsGrid;
    const widgetSize = settings.widgetSize;
    const gapX = 14;
    const slideGap = 8;
    const PAGE_WIDTH = widgetSize * 3 + gapX * 2 + slideGap;

    let touchStartX = 0;
    let touchEndX = 0;
    let isDragging = false;
    let startX = 0;
    let currentTranslate = -groupCurrentPage * PAGE_WIDTH;

    // Remove old handlers if they exist
    if (container._swipeHandlers) {
        const old = container._swipeHandlers;
        container.removeEventListener('touchstart', old.handleTouchStart);
        container.removeEventListener('touchmove', old.handleTouchMove);
        container.removeEventListener('touchend', old.handleTouchEnd);
        container.removeEventListener('mousedown', old.handleMouseDown);
        document.removeEventListener('mousemove', old.handleMouseMove);
        document.removeEventListener('mouseup', old.handleMouseUp);
    }

    // Handlers
    function handleTouchStart(e) {
        // Don't handle swipe if touching a link directly
        if (e.target.closest('a')) return;
        isDragging = true;
        touchStartX = e.touches[0].clientX;
        startX = currentTranslate;
        grid.style.transition = 'none';
    }

    function handleTouchMove(e) {
        if (!isDragging) return;
        touchEndX = e.touches[0].clientX;
        const diff = touchEndX - touchStartX;
        const totalPages = Math.ceil(activeGroup.children.length / GROUP_PAGE_SIZE);
        const maxPage = totalPages - 1;

        currentTranslate = startX + diff;

        // Resistance on edges
        if (currentTranslate > 0) {
            currentTranslate = currentTranslate * 0.3;
        } else if (currentTranslate < -maxPage * PAGE_WIDTH) {
            currentTranslate = -maxPage * PAGE_WIDTH + (currentTranslate + maxPage * PAGE_WIDTH) * 0.3;
        }

        grid.style.transform = `translateX(${currentTranslate}px)`;
    }

    function handleTouchEnd() {
        if (!isDragging) return;
        isDragging = false;

        const diff = touchEndX - touchStartX;
        const threshold = 40;
        const totalPages = Math.ceil(activeGroup.children.length / GROUP_PAGE_SIZE);

        if (diff > threshold && groupCurrentPage > 0) {
            groupCurrentPage--;
        } else if (diff < -threshold && groupCurrentPage < totalPages - 1) {
            groupCurrentPage++;
        }

        currentTranslate = -groupCurrentPage * PAGE_WIDTH;
        renderGroupViewWidgets();
    }

    function handleMouseDown(e) {
        if (e.target.closest('a')) return;
        isDragging = true;
        touchStartX = e.clientX;
        startX = currentTranslate;
        grid.style.transition = 'none';
        e.preventDefault();
    }

    function handleMouseMove(e) {
        if (!isDragging) return;
        touchEndX = e.clientX;
        const diff = touchEndX - touchStartX;
        const totalPages = Math.ceil(activeGroup.children.length / GROUP_PAGE_SIZE);
        const maxPage = totalPages - 1;

        currentTranslate = startX + diff;

        if (currentTranslate > 0) {
            currentTranslate = currentTranslate * 0.3;
        } else if (currentTranslate < -maxPage * PAGE_WIDTH) {
            currentTranslate = -maxPage * PAGE_WIDTH + (currentTranslate + maxPage * PAGE_WIDTH) * 0.3;
        }

        grid.style.transform = `translateX(${currentTranslate}px)`;
    }

    function handleMouseUp() {
        if (!isDragging) return;
        isDragging = false;

        const diff = touchEndX - touchStartX;
        const threshold = 40;
        const totalPages = Math.ceil(activeGroup.children.length / GROUP_PAGE_SIZE);

        if (diff > threshold && groupCurrentPage > 0) {
            groupCurrentPage--;
        } else if (diff < -threshold && groupCurrentPage < totalPages - 1) {
            groupCurrentPage++;
        }

        currentTranslate = -groupCurrentPage * PAGE_WIDTH;
        renderGroupViewWidgets();
    }

    // Store handlers for cleanup
    container._swipeHandlers = {
        handleTouchStart,
        handleTouchMove,
        handleTouchEnd,
        handleMouseDown,
        handleMouseMove,
        handleMouseUp
    };

    // Add listeners
    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: true });
    container.addEventListener('touchend', handleTouchEnd);
    container.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
}

groupViewTitleInput.addEventListener('input', (e) => {
    if (!activeGroup) return;
    activeGroup.title = e.target.value;
    const idx = widgets.findIndex(w => w.id === activeGroup.id);
    if (idx !== -1) {
        widgets[idx].title = activeGroup.title;
        saveWidgets();
        renderWidgets();
    }
});

// Close group modal on background click
groupModal.addEventListener('click', (e) => {
    if (e.target === groupModal) {
        closeGroupViewModal();
    }
});

function renderGroupViewWidgets() {
    if (!activeGroup) return;

    const totalPages = Math.ceil(activeGroup.children.length / GROUP_PAGE_SIZE);
    const widgetSize = settings.widgetSize;
    const gapX = 14;
    const gapY = 8;
    const pageWidth = widgetSize * 3 + gapX * 2;
    const slideGap = 8;
    const iconSize = widgetSize * 0.35;

    // Update container width to match page width
    groupViewWidgetsContainer.style.width = pageWidth + 'px';

    // Render all pages in a row for sliding
    let pagesHtml = '';
    for (let page = 0; page < totalPages; page++) {
        const startIndex = page * GROUP_PAGE_SIZE;
        const endIndex = Math.min(startIndex + GROUP_PAGE_SIZE, activeGroup.children.length);
        const pageChildren = activeGroup.children.slice(startIndex, endIndex);

        let pageHtml = pageChildren.map((child, idx) => {
            const globalIndex = startIndex + idx;
            return `
            <div class="group-widget-item relative flex flex-col items-center" data-index="${globalIndex}" style="width: ${widgetSize}px; cursor: pointer;">
                <div class="group-widget-icon flex items-center justify-center text-neutral-400 text-white transition-colors shadow-sm bg-neutral-900 border border-neutral-800" style="width: ${widgetSize}px; height: ${widgetSize}px;">
                    ${getIcon(child.icon, 'widget-icon-color', `width: ${iconSize}px; height: ${iconSize}px;`)}
                </div>
                <a href="${child.url}" class="absolute inset-0" style="z-index: 1;"></a>
                <span class="text-[9px] font-medium text-neutral-400 text-neutral-200 truncate w-full text-center px-1" style="margin-top: ${gapY / 2}px; pointer-events: none;">
                    ${child.title}
                </span>
            </div>
        `;
        }).join('');

        // Add empty placeholders if page is not full
        const missingCount = GROUP_PAGE_SIZE - pageChildren.length;
        if (missingCount > 0) {
            pageHtml += Array(missingCount).fill(`<div style="width: ${widgetSize}px; visibility: hidden;"></div>`).join('');
        }

        // Page container with 3x3 grid layout
        pagesHtml += `<div class="page-slide" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: ${gapY}px ${gapX}px; width: ${pageWidth}px; flex-shrink: 0; align-items: start;">${pageHtml}</div>`;
    }

    groupViewWidgetsGrid.innerHTML = pagesHtml;

    // Apply slide animation
    groupViewWidgetsGrid.style.transition = 'transform 0.3s ease-out';
    groupViewWidgetsGrid.style.transform = `translateX(-${groupCurrentPage * (pageWidth + slideGap)}px)`;

    // Add context menu handlers
    groupViewWidgetsGrid.querySelectorAll('.group-widget-item').forEach(item => {
        item.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            e.stopPropagation();
            showGroupWidgetContextMenu(e, parseInt(item.dataset.index));
        });
    });

    // Update pagination dots
    renderPaginationDots(totalPages);
}

function renderPaginationDots(totalPages) {
    if (totalPages <= 1) {
        groupPagination.innerHTML = '';
        return;
    }

    groupPagination.innerHTML = Array.from({ length: totalPages }, (_, i) => `
        <button data-page="${i}" class="pagination-dot w-1.5 h-1.5 rounded-full transition-all duration-200 ${i === groupCurrentPage ? 'bg-white w-1.5' : 'bg-white/30 hover:bg-white/50'}"></button>
    `).join('');

    groupPagination.querySelectorAll('.pagination-dot').forEach(dot => {
        dot.addEventListener('click', (e) => {
            groupCurrentPage = parseInt(e.currentTarget.dataset.page);
            renderGroupViewWidgets();
        });
    });
}

// --- Settings Modal ---
function openSettingsModal() {
    updateSettingsUI();
    showModal(settingsModal, settingsModalContent);
    // Re-position pills after modal transition (200ms) completes
    setTimeout(() => { updateSettingsUI(); }, 250);
}

closeSettingsModalBtn.addEventListener('click', () => hideModal(settingsModal, settingsModalContent));
settingsModal.addEventListener('click', (e) => { if (e.target === settingsModal) hideModal(settingsModal, settingsModalContent); });

// Segmented control event listeners
function setupSegmentedControl(selector, settingKey) {
    document.querySelectorAll(selector).forEach(btn => {
        btn.addEventListener('click', () => {
            settings[settingKey] = btn.dataset[Object.keys(btn.dataset)[0]];
            saveSettings();
        });
    });
}

// Theme buttons
document.querySelectorAll('[data-theme]').forEach(btn => {
    btn.addEventListener('click', () => {
        settings.theme = btn.dataset.theme;
        saveSettings();
    });
});

// Icon shape buttons
document.querySelectorAll('[data-shape]').forEach(btn => {
    btn.addEventListener('click', () => {
        settings.iconShape = btn.dataset.shape;
        saveSettings();
    });
});

// Folder style buttons
document.querySelectorAll('[data-folderstyle]').forEach(btn => {
    btn.addEventListener('click', () => {
        settings.folderStyle = btn.dataset.folderstyle;
        saveSettings();
    });
});

// Add button visibility
document.querySelectorAll('[data-addbtn]').forEach(btn => {
    btn.addEventListener('click', () => {
        settings.addBtnVisible = btn.dataset.addbtn === 'true';
        saveSettings();
    });
});

// Widget size slider
widgetSizeSlider.addEventListener('input', (e) => {
    settings.widgetSize = parseInt(e.target.value);
    widgetSizeValue.textContent = settings.widgetSize + 'px';
    document.documentElement.style.setProperty('--widget-size', settings.widgetSize + 'px');
});

widgetSizeSlider.addEventListener('change', () => {
    saveSettings();
});

// Widget gap X slider
widgetGapXSlider.addEventListener('input', (e) => {
    settings.widgetGapX = parseInt(e.target.value);
    widgetGapXValue.textContent = settings.widgetGapX + 'px';
    document.documentElement.style.setProperty('--widget-gap-x', settings.widgetGapX + 'px');
});

widgetGapXSlider.addEventListener('change', () => {
    saveSettings();
});

// Widget gap Y slider
widgetGapYSlider.addEventListener('input', (e) => {
    settings.widgetGapY = parseInt(e.target.value);
    widgetGapYValue.textContent = settings.widgetGapY + 'px';
    document.documentElement.style.setProperty('--widget-gap-y', settings.widgetGapY + 'px');
});

widgetGapYSlider.addEventListener('change', () => {
    saveSettings();
});

// Search gap slider
searchGapSlider.addEventListener('input', (e) => {
    settings.searchGap = parseInt(e.target.value);
    searchGapValue.textContent = settings.searchGap + 'px';
    document.documentElement.style.setProperty('--widget-search-gap', settings.searchGap + 'px');
});

searchGapSlider.addEventListener('change', () => {
    saveSettings();
});

// Export settings
exportBtn.addEventListener('click', () => {
    const data = {
        widgets,
        engine,
        settings
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `homepage-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
});

// Import settings
importBtn.addEventListener('click', () => {
    importFile.click();
});

importFile.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
        try {
            const data = JSON.parse(event.target.result);
            
            if (data.widgets) {
                widgets = data.widgets;
                saveWidgets();
            }
            if (data.engine) {
                engine = data.engine;
                saveEngine();
            }
            if (data.settings) {
                settings = data.settings;
                saveSettings();
            }
            
            renderEngineMenu();
            renderWidgets();
            hideModal(settingsModal, settingsModalContent);
            
            alert('Settings imported successfully!');
        } catch (err) {
            alert('Error importing settings: Invalid file format');
        }
    };
    reader.readAsText(file);
    importFile.value = '';
});

// Init
function initApp() {
    initInlineIcons();
    renderEngineMenu();
    renderWidgets();
    applySettings();

    // Register Service Worker for offline support
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('./sw.js')
                .then((reg) => console.log('[SW] Registered:', reg.scope))
                .catch((err) => console.log('[SW] Registration failed:', err));
        });
    }
}

initApp();
