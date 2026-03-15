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
let widgets = JSON.parse(localStorage.getItem('startpage_widgets_v3')) || INITIAL_WIDGETS;
let draggedId = null;
let dragOverId = null;
let activeGroup = null;
let selectedIcon = 'globe';

// DOM Elements
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const engineBtn = document.getElementById('engine-btn');
const engineMenu = document.getElementById('engine-menu');
const widgetsGrid = document.getElementById('widgets-grid');
const addModal = document.getElementById('add-modal');
const addModalContent = document.getElementById('add-modal-content');
const closeAddModalBtn = document.getElementById('close-add-modal');
const addTitleInput = document.getElementById('add-title');
const addUrlInput = document.getElementById('add-url');
const iconGrid = document.getElementById('icon-grid');
const addWidgetBtn = document.getElementById('add-widget-btn');
const groupModal = document.getElementById('group-modal');
const groupModalContent = document.getElementById('group-modal-content');
const groupTitleInput = document.getElementById('group-title');
const closeGroupModalBtn = document.getElementById('close-group-modal');
const groupWidgetsGrid = document.getElementById('group-widgets-grid');

function saveWidgets() {
    localStorage.setItem('startpage_widgets_v3', JSON.stringify(widgets));
}

function saveEngine() {
    localStorage.setItem('startpage_engine_v1', engine);
}

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

document.addEventListener('mousedown', (e) => {
    if (!engineBtn.contains(e.target) && !engineMenu.contains(e.target) && !engineMenu.classList.contains('hidden')) {
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

function createWidgetElement(widget) {
    const div = document.createElement('div');
    div.className = `widget-item relative group cursor-pointer flex flex-col items-center gap-2 w-16 z-10`;
    div.draggable = true;
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
        <button class="delete-btn absolute -top-2 -right-2 bg-neutral-800 border border-neutral-700 rounded-full p-1 opacity-0 group-hover:opacity-100 hover:bg-red-500/20 hover:text-red-400 text-neutral-400 transition-all z-20">
            <i data-lucide="trash-2" class="w-[10px] h-[10px]"></i>
        </button>
    `;

    div.addEventListener('click', (e) => {
        if (e.target.closest('.delete-btn')) {
            e.stopPropagation();
            widgets = widgets.filter(w => w.id !== widget.id);
            saveWidgets();
            renderWidgets();
            return;
        }
        if (widget.type === 'group') {
            openGroupModal(widget);
        } else {
            window.location.href = widget.url;
        }
    });

    div.addEventListener('dragstart', (e) => {
        draggedId = widget.id;
        e.dataTransfer.effectAllowed = 'move';
        setTimeout(() => div.classList.add('dragging'), 0);
    });

    div.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        if (!draggedId || draggedId === widget.id) return;

        const rect = div.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const width = rect.width;

        if (x > width * 0.35 && x < width * 0.65) {
            if (dragOverId !== widget.id) {
                dragOverId = widget.id;
                document.querySelectorAll('.widget-item').forEach(el => el.classList.remove('drag-over'));
                div.classList.add('drag-over');
            }
            return;
        }

        if (dragOverId === widget.id) {
            dragOverId = null;
            div.classList.remove('drag-over');
        }

        const sourceIdx = widgets.findIndex(w => w.id === draggedId);
        const targetIdx = widgets.findIndex(w => w.id === widget.id);
        if (sourceIdx !== -1 && targetIdx !== -1 && sourceIdx !== targetIdx) {
            const [removed] = widgets.splice(sourceIdx, 1);
            widgets.splice(targetIdx, 0, removed);
            renderWidgets();
            saveWidgets(); // Сохраняем новый порядок при каждом сдвиге
        }
    });

    div.addEventListener('dragleave', () => {
        if (dragOverId === widget.id) {
            dragOverId = null;
            div.classList.remove('drag-over');
        }
    });

    div.addEventListener('drop', (e) => {
        e.preventDefault();
        const currentDragOverId = dragOverId;
        dragOverId = null;
        div.classList.remove('drag-over');
        document.querySelectorAll('.widget-item').forEach(el => el.classList.remove('dragging'));

        if (!draggedId || draggedId === widget.id) return;

        if (currentDragOverId === widget.id) {
            const sourceIdx = widgets.findIndex(w => w.id === draggedId);
            const targetIdx = widgets.findIndex(w => w.id === widget.id);
            if (sourceIdx === -1 || targetIdx === -1) return;

            const source = widgets[sourceIdx];
            const target = widgets[targetIdx];

            if (source.type === 'link' && target.type === 'link') {
                const newGroup = {
                    id: `group-${Date.now()}`,
                    type: 'group',
                    title: 'New Group',
                    children: [target, source],
                };
                widgets.splice(targetIdx, 1, newGroup);
                widgets.splice(sourceIdx > targetIdx ? sourceIdx : sourceIdx - 1, 1);
            } else if (source.type === 'link' && target.type === 'group') {
                target.children.push(source);
                widgets.splice(sourceIdx, 1);
            } else if (source.type === 'group' && target.type === 'link') {
                source.children.push(target);
                widgets.splice(targetIdx, 1);
            } else if (source.type === 'group' && target.type === 'group') {
                target.children.push(...source.children);
                widgets.splice(sourceIdx, 1);
            }
            saveWidgets();
            renderWidgets();
        }
        draggedId = null;
    });

    div.addEventListener('dragend', () => {
        draggedId = null;
        dragOverId = null;
        document.querySelectorAll('.widget-item').forEach(el => {
            el.classList.remove('dragging');
            el.classList.remove('drag-over');
        });
    });

    return div;
}

function renderWidgets() {
    const oldPositions = new Map();
    document.querySelectorAll('.widget-item').forEach(el => {
        oldPositions.set(el.dataset.id, el.getBoundingClientRect());
    });

    widgetsGrid.innerHTML = '';
    widgets.forEach(widget => {
        widgetsGrid.appendChild(createWidgetElement(widget));
    });

    const addBtn = document.createElement('button');
    addBtn.className = 'flex flex-col items-center gap-2 w-16 group';
    addBtn.id = 'add-widget-btn-main';
    addBtn.innerHTML = `
        <div class="w-12 h-12 rounded-xl flex items-center justify-center bg-transparent border-2 border-dashed border-neutral-800 group-hover:border-neutral-600 transition-colors">
            <i data-lucide="plus" class="w-[22px] h-[22px] text-neutral-600 group-hover:text-neutral-400 transition-colors"></i>
        </div>
        <span class="text-[10px] font-medium text-transparent">Add</span>
    `;
    addBtn.addEventListener('click', openAddModal);
    widgetsGrid.appendChild(addBtn);

    lucide.createIcons();

    document.querySelectorAll('.widget-item').forEach(el => {
        const oldPos = oldPositions.get(el.dataset.id);
        if (oldPos) {
            const newPos = el.getBoundingClientRect();
            const dx = oldPos.left - newPos.left;
            const dy = oldPos.top - newPos.top;
            if (dx !== 0 || dy !== 0) {
                el.style.transform = `translate(${dx}px, ${dy}px)`;
                el.style.transition = 'none';
                requestAnimationFrame(() => {
                    el.style.transform = '';
                    el.style.transition = 'transform 0.2s ease';
                });
            }
        }
    });
}

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

function openAddModal() {
    addTitleInput.value = '';
    addUrlInput.value = '';
    selectedIcon = 'globe';
    checkAddForm();
    renderIconGrid();
    addModal.classList.remove('hidden');
    void addModal.offsetWidth;
    addModal.classList.remove('opacity-0');
    addModalContent.classList.remove('scale-95');
    addTitleInput.focus();
}

function closeAddModal() {
    addModal.classList.add('opacity-0');
    addModalContent.classList.add('scale-95');
    setTimeout(() => addModal.classList.add('hidden'), 200);
}

closeAddModalBtn.addEventListener('click', closeAddModal);
addModal.addEventListener('click', (e) => {
    if (e.target === addModal) closeAddModal();
});

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

    widgets.push({
        id: `link-${Date.now()}`,
        type: 'link',
        title,
        url,
        icon: selectedIcon
    });
    saveWidgets();
    renderWidgets();
    closeAddModal();
});

function openGroupModal(group) {
    activeGroup = group;
    groupTitleInput.value = group.title;
    renderGroupWidgets();
    groupModal.classList.remove('hidden');
    void groupModal.offsetWidth;
    groupModal.classList.remove('opacity-0');
    groupModalContent.classList.remove('scale-95');
}

function closeGroupModal() {
    activeGroup = null;
    groupModal.classList.add('opacity-0');
    groupModalContent.classList.add('scale-95');
    setTimeout(() => groupModal.classList.add('hidden'), 200);
}

closeGroupModalBtn.addEventListener('click', closeGroupModal);
groupModal.addEventListener('click', (e) => {
    if (e.target === groupModal) closeGroupModal();
});

groupTitleInput.addEventListener('input', (e) => {
    if (!activeGroup) return;
    activeGroup.title = e.target.value;
    const idx = widgets.findIndex(w => w.id === activeGroup.id);
    if (idx !== -1) {
        widgets[idx].title = activeGroup.title;
        saveWidgets();
        renderWidgets();
    }
});

function renderGroupWidgets() {
    if (!activeGroup) return;
    
    if (activeGroup.children.length === 0) {
        groupWidgetsGrid.innerHTML = `
            <div class="w-full py-12 flex flex-col items-center justify-center text-neutral-600">
                <i data-lucide="folder" class="w-12 h-12 mb-4 opacity-20"></i>
                <p>This group is empty.</p>
            </div>
        `;
    } else {
        groupWidgetsGrid.innerHTML = activeGroup.children.map(child => `
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
                        closeGroupModal();
                    }
                    
                    saveWidgets();
                    renderWidgets();
                    if (activeGroup && activeGroup.children.length > 0) {
                        renderGroupWidgets();
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
