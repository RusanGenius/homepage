const SEARCH_ENGINES = {
  google: { name: 'Google', url: 'https://www.google.com/search?q=', iconHtml: '<span class="font-bold text-lg leading-none">G</span>' },
  yandex: { name: 'Yandex', url: 'https://yandex.ru/search/?text=', iconHtml: '<span class="font-bold text-lg leading-none text-red-500">Y</span>' },
  duckduckgo: { name: 'DuckDuckGo', url: 'https://duckduckgo.com/?q=', iconHtml: '<span class="font-bold text-lg leading-none text-orange-500">D</span>' },
};

const ICONS = [
  'globe', 'github', 'twitter', 'youtube', 'mail', 'message-square', 'image', 'music', 'video', 'file-text', 'code', 'terminal', 'book', 'graduation-cap', 'bot', 'sparkles', 'brain', 'coffee', 'briefcase', 'pen-tool', 'layout', 'gamepad-2'
];

const INITIAL_WIDGETS = [
  { id: '1', type: 'link', title: 'GitHub', url: 'https://github.com', icon: 'github' },
  { id: '2', type: 'link', title: 'YouTube', url: 'https://youtube.com', icon: 'youtube' },
  { id: '3', type: 'link', title: 'Twitter', url: 'https://twitter.com', icon: 'twitter' },
  { id: '4', type: 'link', title: 'ChatGPT', url: 'https://chat.openai.com', icon: 'bot' },
  { id: '5', type: 'link', title: 'Claude', url: 'https://claude.ai', icon: 'sparkles' },
  { id: '6', type: 'link', title: 'Wikipedia', url: 'https://wikipedia.org', icon: 'book' },
  { id: '7', type: 'link', title: 'Coursera', url: 'https://coursera.org', icon: 'graduation-cap' },
  { id: '8', type: 'link', title: 'Duolingo', url: 'https://duolingo.com', icon: 'globe' },
  { id: '9', type: 'link', title: 'Spotify', url: 'https://open.spotify.com', icon: 'music' },
  { id: '10', type: 'link', title: 'Netflix', url: 'https://netflix.com', icon: 'video' },
  { id: '11', type: 'link', title: 'Figma', url: 'https://figma.com', icon: 'pen-tool' },
  { id: '12', type: 'link', title: 'Reddit', url: 'https://reddit.com', icon: 'message-square' },
];

let engine = localStorage.getItem('startpage_engine_v1') || 'google';
let widgets = JSON.parse(localStorage.getItem('startpage_widgets_v5')) || INITIAL_WIDGETS;

// Settings state
let settings = JSON.parse(localStorage.getItem('startpage_settings_v1')) || {
    theme: 'amoled',
    iconShape: 'square',
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

// Empty Space Context Menu
const emptyContextMenu = document.getElementById('empty-context-menu');
const ecmSettings = document.getElementById('ecm-settings');
const ecmAddWidget = document.getElementById('ecm-add-widget');

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
const themeAmoledBtn = document.getElementById('theme-amoled');
const themeBlackBtn = document.getElementById('theme-black');
const themeLightBtn = document.getElementById('theme-light');
const iconSquareBtn = document.getElementById('icon-square');
const iconRoundBtn = document.getElementById('icon-round');
const addBtnShowBtn = document.getElementById('add-btn-show');
const addBtnHideBtn = document.getElementById('add-btn-hide');
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
    document.body.classList.remove('theme-black', 'theme-light');
    if (settings.theme === 'black') {
        document.body.classList.add('theme-black');
    } else if (settings.theme === 'light') {
        document.body.classList.add('theme-light');
    }

    // Apply icon shape
    document.body.classList.remove('icon-shape-round');
    if (settings.iconShape === 'round') {
        document.body.classList.add('icon-shape-round');
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
    document.querySelectorAll('[data-theme]').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.theme === settings.theme) {
            btn.classList.add('active');
        }
    });

    // Icon shape buttons
    document.querySelectorAll('[data-shape]').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.shape === settings.iconShape) {
            btn.classList.add('active');
        }
    });

    // Add button visibility
    document.querySelectorAll('[data-addbtn]').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.addbtn === String(settings.addBtnVisible)) {
            btn.classList.add('active');
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
    engineMenu.innerHTML = Object.keys(SEARCH_ENGINES).map(key => `
        <button type="button" data-engine="${key}" class="engine-option w-full text-left px-4 py-3 flex items-center gap-3 rounded-lg transition-colors ${engine === key ? 'selected text-white' : 'text-neutral-400'}">
            <div class="w-6 flex justify-center grayscale">${SEARCH_ENGINES[key].iconHtml}</div>
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

// --- Widgets Rendering ---
function createWidgetElement(widget) {
    const div = document.createElement('div');
    div.className = `widget-item relative group cursor-pointer flex flex-col items-center gap-2 z-10`;
    div.style.width = 'var(--widget-size)';
    div.dataset.id = widget.id;

    let innerHtml = '';
    if (widget.type === 'link') {
        innerHtml = `<i data-lucide="${widget.icon}" class="text-neutral-400 text-white transition-colors" style="width: calc(var(--widget-size) * 0.35); height: calc(var(--widget-size) * 0.35);"></i>`;
    } else {
        const childrenHtml = widget.children.slice(0, 4).map(child => `
            <div class="flex items-center justify-center folder-preview-icon">
                <i data-lucide="${child.icon}" class="text-neutral-500" style="width: calc(var(--widget-size) * 0.16); height: calc(var(--widget-size) * 0.16);"></i>
            </div>
        `).join('');
        innerHtml = `<div class="grid grid-cols-2 gap-0.5 p-1 w-full h-full">${childrenHtml}</div>`;
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
    addBtn.innerHTML = `
        <div class="flex items-center justify-center bg-transparent border-2 border-dashed border-neutral-800 transition-colors pointer-events-none" style="width: var(--widget-size); height: var(--widget-size); border-radius: 12px;">
            <i data-lucide="plus" class="text-neutral-600 text-neutral-400 transition-colors" style="width: calc(var(--widget-size) * 0.35); height: calc(var(--widget-size) * 0.35);"></i>
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
    lucide.createIcons();
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
    iconGrid.innerHTML = ICONS.map(icon => `
        <button type="button" data-icon="${icon}" class="icon-btn p-3 rounded-xl flex items-center justify-center transition-all ${selectedIcon === icon ? 'bg-white/90 text-black' : 'bg-white/5 text-neutral-500'}">
            <i data-lucide="${icon}" class="w-5 h-5"></i>
        </button>
    `).join('');

    document.querySelectorAll('.icon-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            selectedIcon = e.currentTarget.dataset.icon;
            renderIconGrid();
        });
    });
    lucide.createIcons();
}

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
    folderWidgetsGrid.innerHTML = linkWidgets.map(w => `
        <div data-id="${w.id}" class="folder-select-widget cursor-pointer p-2 rounded-xl border-2 border-transparent flex flex-col items-center gap-2" style="width: var(--widget-size);">
            <div class="icon-container flex items-center justify-center text-neutral-400 transition-colors" style="width: var(--widget-size); height: var(--widget-size); border-radius: 12px;">
                <i data-lucide="${w.icon}" style="width: calc(var(--widget-size) * 0.35); height: calc(var(--widget-size) * 0.35);"></i>
            </div>
            <span class="text-[10px] text-neutral-500 truncate w-full text-center">${w.title}</span>
        </div>
    `).join('');

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

    lucide.createIcons();
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
            <i data-lucide="folder" class="w-5 h-5 text-neutral-400"></i>
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

    lucide.createIcons();
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
    const PAGE_WIDTH = 288; // 280px container + 8px gap between pages
    
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
        
        renderGroupViewWidgets();
    }

    function handleMouseDown(e) {
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

    // Render all pages in a row for sliding
    let pagesHtml = '';
    for (let page = 0; page < totalPages; page++) {
        const startIndex = page * GROUP_PAGE_SIZE;
        const endIndex = Math.min(startIndex + GROUP_PAGE_SIZE, activeGroup.children.length);
        const pageChildren = activeGroup.children.slice(startIndex, endIndex);
        
        let pageHtml = pageChildren.map(child => `
            <a href="${child.url}" class="relative flex flex-col items-center gap-1 group/item" style="width: var(--widget-size);">
                <div class="flex items-center justify-center text-neutral-400 text-white transition-colors shadow-sm bg-neutral-900 border border-neutral-800" style="width: var(--widget-size); height: var(--widget-size); border-radius: 12px;">
                    <i data-lucide="${child.icon}" style="width: calc(var(--widget-size) * 0.35); height: calc(var(--widget-size) * 0.35);"></i>
                </div>
                <span class="text-[9px] font-medium text-neutral-400 text-neutral-200 truncate w-full text-center px-1">
                    ${child.title}
                </span>
            </a>
        `).join('');
        
        // Add empty placeholders if page is not full
        const missingCount = GROUP_PAGE_SIZE - pageChildren.length;
        if (missingCount > 0) {
            pageHtml += Array(missingCount).fill(`<div style="width: var(--widget-size); visibility: hidden;"></div>`).join('');
        }
        
        // Page container with 3x3 grid layout
        pagesHtml += `<div class="page-slide" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 4px 8px; padding: 0 4px; width: 280px; flex-shrink: 0; align-items: start;">${pageHtml}</div>`;
    }

    groupViewWidgetsGrid.innerHTML = pagesHtml;

    // Apply slide animation
    groupViewWidgetsGrid.style.transition = 'transform 0.3s ease-out';
    groupViewWidgetsGrid.style.transform = `translateX(-${groupCurrentPage * 288}px)`;

    // Update pagination dots
    renderPaginationDots(totalPages);

    lucide.createIcons();
}

function renderPaginationDots(totalPages) {
    if (totalPages <= 1) {
        groupPagination.innerHTML = '';
        return;
    }

    groupPagination.innerHTML = Array.from({ length: totalPages }, (_, i) => `
        <button data-page="${i}" class="pagination-dot w-2 h-2 rounded-full transition-all duration-200 ${i === groupCurrentPage ? 'bg-white w-4' : 'bg-white/30 hover:bg-white/50'}"></button>
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
}

closeSettingsModalBtn.addEventListener('click', () => hideModal(settingsModal, settingsModalContent));
settingsModal.addEventListener('click', (e) => { if (e.target === settingsModal) hideModal(settingsModal, settingsModalContent); });

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
renderEngineMenu();
renderWidgets();
applySettings();
