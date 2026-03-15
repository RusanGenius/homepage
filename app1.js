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

let currentContextWidgetId = null;
let editingWidgetId = null;
let activeGroup = null;
let selectedIcon = 'globe';
let selectedWidgetsForFolder = new Set();

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
const cmDelete = document.getElementById('cm-delete');

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
const closeGroupViewModalBtn = document.getElementById('close-group-view-modal');
const groupViewWidgetsGrid = document.getElementById('group-view-widgets-grid');

function saveWidgets() {
    localStorage.setItem('startpage_widgets_v5', JSON.stringify(widgets));
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
        <button type="button" data-engine="${key}" class="engine-option w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-neutral-800 transition-colors ${engine === key ? 'text-white bg-neutral-800/50' : 'text-neutral-400'}">
            <div class="w-6 flex justify-center grayscale">${SEARCH_ENGINES[key].iconHtml}</div>
            <span class="font-medium">${SEARCH_ENGINES[key].name}</span>
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

    if (widget.type === 'group') {
        cmEdit.classList.add('hidden');
    } else {
        cmEdit.classList.remove('hidden');
    }

    contextMenu.classList.remove('hidden');
    
    let x = e.pageX;
    let y = e.pageY;
    const menuWidth = contextMenu.offsetWidth;
    const menuHeight = contextMenu.offsetHeight;
    
    if (x + menuWidth > window.innerWidth) x = window.innerWidth - menuWidth - 10;
    if (y + menuHeight > window.innerHeight) y = window.innerHeight - menuHeight - 10;
    
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

cmDelete.addEventListener('click', () => {
    widgets = widgets.filter(w => w.id !== currentContextWidgetId);
    saveWidgets();
    renderWidgets();
    contextMenu.classList.add('hidden');
});

// --- Widgets Rendering ---
function createWidgetElement(widget) {
    const div = document.createElement('div');
    div.className = `widget-item relative group cursor-pointer flex flex-col items-center gap-2 w-16 z-10`;
    div.dataset.id = widget.id;

    let innerHtml = '';
    if (widget.type === 'link') {
        innerHtml = `<i data-lucide="${widget.icon}" class="w-[22px] h-[22px] text-neutral-400 group-hover:text-white transition-colors"></i>`;
    } else {
        const childrenHtml = widget.children.slice(0, 4).map(child => `
            <div class="flex items-center justify-center bg-neutral-800 rounded-sm">
                <i data-lucide="${child.icon}" class="w-[10px] h-[10px] text-neutral-500"></i>
            </div>
        `).join('');
        innerHtml = `<div class="grid grid-cols-2 gap-0.5 p-1.5 w-full h-full">${childrenHtml}</div>`;
    }

    div.innerHTML = `
        <div class="widget-icon-container w-12 h-12 rounded-xl flex items-center justify-center transition-all bg-neutral-900 group-hover:bg-neutral-800 border border-neutral-800 group-hover:border-neutral-700 pointer-events-none">
            ${innerHtml}
        </div>
        <span class="text-[10px] font-medium text-neutral-500 group-hover:text-neutral-300 truncate w-full text-center px-1 pointer-events-none">
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
    addBtn.className = 'flex flex-col items-center gap-2 w-16 group relative';
    addBtn.id = 'add-widget-btn-main';
    addBtn.innerHTML = `
        <div class="w-12 h-12 rounded-xl flex items-center justify-center bg-transparent border-2 border-dashed border-neutral-800 group-hover:border-neutral-600 transition-colors pointer-events-none">
            <i data-lucide="plus" class="w-[22px] h-[22px] text-neutral-600 group-hover:text-neutral-400 transition-colors"></i>
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
        <button type="button" data-icon="${icon}" class="icon-btn p-3 rounded-xl flex items-center justify-center transition-all ${selectedIcon === icon ? 'bg-white text-black' : 'bg-neutral-950 text-neutral-500 hover:bg-neutral-800 hover:text-white'}">
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
        <div data-id="${w.id}" class="folder-select-widget cursor-pointer p-2 rounded-xl border-2 border-transparent hover:border-neutral-700 flex flex-col items-center gap-2 w-16">
            <div class="icon-container w-12 h-12 rounded-xl bg-neutral-800 flex items-center justify-center text-neutral-400 transition-colors">
                <i data-lucide="${w.icon}" class="w-5 h-5"></i>
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
        <button data-id="${g.id}" class="move-target-group w-full text-left px-4 py-3 bg-neutral-800 hover:bg-neutral-700 rounded-xl text-white flex items-center gap-3 transition-colors">
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
    groupViewTitleInput.value = group.title;
    renderGroupViewWidgets();
    showModal(groupModal, groupModalContent);
}

function closeGroupViewModal() {
    activeGroup = null;
    hideModal(groupModal, groupModalContent);
}

closeGroupViewModalBtn.addEventListener('click', closeGroupViewModal);
groupModal.addEventListener('click', (e) => { if (e.target === groupModal) closeGroupViewModal(); });

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

function renderGroupViewWidgets() {
    if (!activeGroup) return;
    
    if (activeGroup.children.length === 0) {
        groupViewWidgetsGrid.innerHTML = `
            <div class="w-full py-12 flex flex-col items-center justify-center text-neutral-600">
                <i data-lucide="folder" class="w-12 h-12 mb-4 opacity-20"></i>
                <p>This group is empty.</p>
            </div>
        `;
    } else {
        groupViewWidgetsGrid.innerHTML = activeGroup.children.map(child => `
            <a href="${child.url}" class="relative flex flex-col items-center gap-2 w-16 group/item">
                <div class="w-12 h-12 rounded-xl bg-neutral-800 flex items-center justify-center text-neutral-400 group-hover/item:text-white group-hover/item:bg-neutral-700 transition-colors border border-neutral-700 group-hover/item:border-neutral-600 shadow-sm">
                    <i data-lucide="${child.icon}" class="w-[22px] h-[22px]"></i>
                </div>
                <span class="text-[10px] font-medium text-neutral-400 group-hover/item:text-neutral-200 truncate w-full text-center px-1">
                    ${child.title}
                </span>
                <button data-id="${child.id}" class="remove-from-group-btn absolute -top-2 -right-2 bg-neutral-700 border border-neutral-600 rounded-full p-1 opacity-0 group-hover/item:opacity-100 hover:bg-neutral-600 text-neutral-300 hover:text-white transition-all shadow-md" title="Move to main screen">
                    <i data-lucide="arrow-left" class="w-[10px] h-[10px]"></i>
                </button>
            </a>
        `).join('');

        document.querySelectorAll('.remove-from-group-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const childId = e.currentTarget.dataset.id;
                const childIdx = activeGroup.children.findIndex(c => c.id === childId);
                if (childIdx !== -1) {
                    const [removed] = activeGroup.children.splice(childIdx, 1);
                    widgets.push(removed);
                    
                    if (activeGroup.children.length === 0) {
                        widgets = widgets.filter(w => w.id !== activeGroup.id);
                        closeGroupViewModal();
                    }
                    
                    saveWidgets();
                    renderWidgets();
                    if (activeGroup && activeGroup.children.length > 0) {
                        renderGroupViewWidgets();
                    }
                }
            });
        });
    }
    lucide.createIcons();
}

// Init
renderEngineMenu();
renderWidgets();
