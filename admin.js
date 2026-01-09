// 从 localStorage 加载或初始化数据
let adminQuotes = [];

// 初始化
document.addEventListener('DOMContentLoaded', function() {
    // 初始化全局音乐播放器（在管理页面继续播放音乐）
    const bgMusic = document.getElementById('bgMusic');
    if (bgMusic && window.globalMusicPlayer) {
        window.globalMusicPlayer.setAudio(bgMusic);
        console.log('✓ 管理页面：全局音乐播放器已初始化');
    }
    
    loadQuotes();
    renderQuotesList();
    setupEventListeners();
});

// 加载数据
function loadQuotes() {
    let allQuotes = [];
    
    // 1. 从 quotes.js 加载默认数据
    if (typeof quotes !== 'undefined' && Array.isArray(quotes)) {
        allQuotes = [...quotes];
        console.log('✓ 从 quotes.js 加载:', quotes.length, '条台词');
    }
    
    // 2. 从 localStorage 加载用户添加的数据
    const savedQuotes = localStorage.getItem('dailyQuotes');
    if (savedQuotes) {
        try {
            const localData = JSON.parse(savedQuotes);
            if (Array.isArray(localData) && localData.length > 0) {
                // 合并数据，localStorage的台词优先（覆盖相同ID）
                const localIds = new Set(localData.map(q => q.id));
                allQuotes = allQuotes.filter(q => !localIds.has(q.id));
                allQuotes = [...allQuotes, ...localData];
                console.log('✓ 从 localStorage 加载:', localData.length, '条台词');
            }
        } catch (e) {
            console.error('✗ localStorage数据解析失败:', e);
        }
    }
    
    if (allQuotes.length === 0) {
        // 如果没有任何数据，使用默认示例
        allQuotes = [
            {
                id: 1,
                japanese: "人生にはね、長い休みが必要な時もあるのよ",
                chinese: "人生啊，也会有需要放长假的时候",
                drama: "悠长假期",
                year: 1996,
                image: "images/default.png"
            }
        ];
    }
    
    adminQuotes = allQuotes;
    console.log('✓ 总共加载:', adminQuotes.length, '条台词');
}

// 保存数据
function saveQuotes() {
    try {
        const jsonString = JSON.stringify(adminQuotes);
        const sizeInMB = (jsonString.length / 1024 / 1024).toFixed(2);
        console.log('准备保存数据，大小:', sizeInMB, 'MB');
        
        if (jsonString.length > 5 * 1024 * 1024) {
            throw new Error('数据过大（超过5MB），无法保存到localStorage');
        }
        
        localStorage.setItem('dailyQuotes', jsonString);
        console.log('数据保存成功');
        updateQuotesFile();
    } catch (error) {
        console.error('保存失败:', error);
        if (error.name === 'QuotaExceededError' || error.message.includes('quota')) {
            alert('存储空间不足！\n可能原因：\n1. 上传了过大的文件\n2. 累积数据过多\n\n建议：删除一些旧数据，或使用更小的图片');
        } else {
            alert('保存失败: ' + error.message);
        }
        throw error;
    }
}

// 更新 quotes.js 文件（生成代码供复制）
function updateQuotesFile() {
    // 不再存储到localStorage，减少空间占用
    // 导出时动态生成
}

// 设置事件监听
function setupEventListeners() {
    // 表单提交
    const form = document.getElementById('quote-form');
    if (form) {
        console.log('找到表单，绑定事件监听器');
        form.addEventListener('submit', handleFormSubmit);
    } else {
        console.error('未找到表单元素！');
    }
    
    // 清空表单
    document.getElementById('clear-btn').addEventListener('click', clearForm);
    
    // 重置首次体验
    const resetFirstTimeBtn = document.getElementById('reset-first-time-btn');
    if (resetFirstTimeBtn) {
        resetFirstTimeBtn.addEventListener('click', () => {
            localStorage.removeItem('dateQuoteBindings');
            localStorage.removeItem('firstUseDate');
            alert('✅ 已清除所有日期绑定和基准日期！\n\n返回主页面将重新开始前7天的精选体验。');
        });
    }
    
    // 重新加载默认数据
    const reloadDefaultBtn = document.getElementById('reload-default-btn');
    if (reloadDefaultBtn) {
        reloadDefaultBtn.addEventListener('click', () => {
            if (confirm('确定要清除localStorage并重新加载quotes.js中的默认数据吗？\n\n用户添加的数据将被清除！')) {
                localStorage.removeItem('dailyQuotes');
                location.reload();
            }
        });
    }
    
    // 图片上传预览
    document.getElementById('image-upload').addEventListener('change', handleImageUpload);
    
    // 音乐上传预览 - 已禁用，检查元素是否存在
    const musicUpload = document.getElementById('music-upload');
    if (musicUpload) {
        musicUpload.addEventListener('change', handleMusicUpload);
    }
    
    // 导出数据
    document.getElementById('export-btn').addEventListener('click', exportData);
    
    // 导入数据
    document.getElementById('import-btn').addEventListener('click', () => {
        document.getElementById('import-input').click();
    });
    document.getElementById('import-input').addEventListener('change', importData);
    
    // 删除全部
    document.getElementById('delete-all-btn').addEventListener('click', deleteAllQuotes);
}

// 处理表单提交
function handleFormSubmit(e) {
    e.preventDefault();
    console.log('表单提交被触发');
    
    const japanese = document.getElementById('japanese').value.trim();
    const chinese = document.getElementById('chinese').value.trim();
    const drama = document.getElementById('drama').value.trim();
    const year = parseInt(document.getElementById('year').value);
    const imageUrl = document.getElementById('image-url').value.trim();
    const imageFile = document.getElementById('image-upload').files[0];
    const musicUrl = document.getElementById('music').value.trim();
    const musicUploadElement = document.getElementById('music-upload');
    const musicFile = musicUploadElement ? musicUploadElement.files[0] : null;
    
    console.log('表单数据:', { japanese, chinese, drama, year, imageUrl, musicUrl, hasImageFile: !!imageFile, hasMusicFile: !!musicFile });
    
    // 验证必填字段
    if (!japanese || !chinese || !drama || !year) {
        alert('请填写所有必填字段');
        return;
    }
    
    // 处理图片和音乐
    const processData = async () => {
        console.log('开始处理数据...');
        let finalImageData = imageUrl;
        let finalMusicData = musicUrl || '';
        
        // 处理图片
        if (!imageUrl && imageFile) {
            console.log('读取并压缩图片文件...');
            try {
                finalImageData = await compressImage(imageFile, 600, 0.5);
                console.log('图片压缩成功');
            } catch (error) {
                console.error('图片处理失败:', error);
                alert('图片处理失败，请重试或使用图片URL');
                return;
            }
        } else if (!imageUrl) {
            console.log('使用默认图片');
            finalImageData = 'data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27324%27 height=%27496%27%3E%3Crect fill=%27%23e8e8e8%27 width=%27324%27 height=%27496%27/%3E%3Ctext x=%27162%27 y=%27230%27 font-size=%2720%27 text-anchor=%27middle%27 fill=%27%23999%27%3E暂无图片%3C/text%3E%3Ctext x=%27162%27 y=%27260%27 font-size=%2716%27 text-anchor=%27middle%27 fill=%27%23bbb%27%3E可通过编辑添加%3C/text%3E%3C/svg%3E';
        } else {
            console.log('使用图片URL:', imageUrl);
        }
        
        // 处理音乐文件 - 禁用上传，只使用URL
        if (musicFile) {
            console.warn('音乐文件过大，不建议上传。请将音乐文件放到music/文件夹，然后填写路径如: music/long-vacation.mp3');
            alert('音乐文件不支持上传（会超出存储限制）。\n请将音乐文件放到music/文件夹中，\n然后在"背景音乐"字段填写路径，如：music/long-vacation.mp3');
            finalMusicData = '';
        } else if (musicUrl) {
            console.log('使用音乐URL:', musicUrl);
        }
        
        console.log('准备添加台词...');
        addQuoteWithData(japanese, chinese, drama, year, finalImageData, finalMusicData);
    };
    
    console.log('调用processData...');
    processData().catch(error => {
        console.error('processData执行失败:', error);
        alert('处理数据时出错: ' + error.message);
    });
}

// 添加台词（带图片和音乐数据）
function addQuoteWithData(japanese, chinese, drama, year, imageData, musicData) {
    console.log('开始添加台词...');
    
    try {
        const newQuote = {
            id: adminQuotes.length > 0 ? Math.max(...adminQuotes.map(q => q.id)) + 1 : 1,
            japanese,
            chinese,
            drama,
            year,
            image: imageData
        };
        
        // 只有当有音乐数据时才添加music字段
        if (musicData) {
            newQuote.music = musicData;
        }
        
        console.log('新台词对象:', newQuote);
        adminQuotes.push(newQuote);
        console.log('当前台词总数:', adminQuotes.length);
        
        saveQuotes();
        renderQuotesList();
        clearForm();
        
        alert('台词添加成功！');
    } catch (error) {
        console.error('添加台词失败:', error);
        // 回滚：移除刚添加的数据
        adminQuotes.pop();
        alert('添加失败: ' + error.message);
    }
}

// 清空表单
function clearForm() {
    document.getElementById('quote-form').reset();
    const imagePreview = document.getElementById('image-preview');
    if (imagePreview) {
        imagePreview.innerHTML = '';
        imagePreview.classList.remove('show');
    }
    const musicPreview = document.getElementById('music-preview');
    if (musicPreview) {
        musicPreview.innerHTML = '';
    }
}

// 压缩图片
function compressImage(file, maxWidth = 800, quality = 0.7) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = new Image();
            img.onload = function() {
                const canvas = document.createElement('canvas');
                let width = img.width;
                let height = img.height;
                
                // 按比例缩放
                if (width > maxWidth) {
                    height *= maxWidth / width;
                    width = maxWidth;
                }
                
                canvas.width = width;
                canvas.height = height;
                
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);
                
                // 转换为压缩后的base64
                const compressedData = canvas.toDataURL('image/jpeg', quality);
                resolve(compressedData);
            };
            img.onerror = reject;
            img.src = e.target.result;
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

// 读取文件为DataURL（用于音乐等文件）
function readFileAsDataURL(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

// 处理图片上传预览
function handleImageUpload(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const preview = document.getElementById('image-preview');
            if (!preview) return; // 如果元素不存在，直接返回
            
            preview.innerHTML = `<img src="${event.target.result}" alt="预览">`;
            preview.classList.add('show');
        };
        reader.readAsDataURL(file);
    }
}

// 处理音乐上传预览
function handleMusicUpload(e) {
    const file = e.target.files[0];
    if (file) {
        const preview = document.getElementById('music-preview');
        if (!preview) return; // 如果元素不存在，直接返回
        
        const fileName = file.name;
        const fileSize = (file.size / 1024 / 1024).toFixed(2); // MB
        preview.innerHTML = `
            <div style="display: flex; align-items: center; gap: 8px; padding: 8px; background: #f0f0f0; border-radius: 4px; margin-top: 8px;">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M9 18V5l12-2v13"></path>
                    <circle cx="6" cy="18" r="3"></circle>
                    <circle cx="18" cy="16" r="3"></circle>
                </svg>
                <span style="flex: 1; font-size: 14px;">${fileName} (${fileSize}MB)</span>
            </div>
        `;
    }
}

// 渲染台词列表
function renderQuotesList() {
    const container = document.getElementById('quotes-container');
    const countElement = document.getElementById('quote-count');
    
    if (!container || !countElement) return; // 如果元素不存在，直接返回
    
    countElement.textContent = adminQuotes.length;
    
    if (adminQuotes.length === 0) {
        container.innerHTML = `
            <div class="empty-state" style="grid-column: 1/-1;">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p>还没有台词，快添加第一条吧！</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = adminQuotes.map(quote => {
        return `
        <div class="quote-card" data-id="${quote.id}">
            <img src="${quote.image}" alt="${quote.drama}" class="quote-card-image" onerror="if(this.src!=='data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27324%27 height=%27180%27%3E%3Crect fill=%27%23e8e8e8%27 width=%27324%27 height=%27180%27/%3E%3Ctext x=%27162%27 y=%2795%27 font-size=%2718%27 text-anchor=%27middle%27 fill=%27%23999%27%3E暂无图片%3C/text%3E%3C/svg%3E')this.src='data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27324%27 height=%27180%27%3E%3Crect fill=%27%23e8e8e8%27 width=%27324%27 height=%27180%27/%3E%3Ctext x=%27162%27 y=%2795%27 font-size=%2718%27 text-anchor=%27middle%27 fill=%27%23999%27%3E暂无图片%3C/text%3E%3C/svg%3E'">
            <div class="quote-card-japanese">${quote.japanese}</div>
            <div class="quote-card-chinese">${quote.chinese}</div>
            <div class="quote-card-info">${quote.drama} (${quote.year})</div>
            <div class="quote-card-actions">
                <button class="btn btn-secondary btn-small" onclick="editQuote(${quote.id})">✏️ 编辑</button>
                <button class="btn btn-danger btn-small" onclick="deleteQuote(${quote.id})">🗑️ 删除</button>
            </div>
        </div>
    `;
    }).join('');
}

// 删除单条台词
function deleteQuote(id) {
    if (!confirm('确定要删除这条台词吗？')) return;
    
    quotes = quotes.filter(q => q.id !== id);
    saveQuotes();
    renderQuotesList();
}

// 编辑台词
function editQuote(id) {
    const quote = adminQuotes.find(q => q.id === id);
    if (!quote) return;
    
    document.getElementById('japanese').value = quote.japanese;
    document.getElementById('chinese').value = quote.chinese;
    document.getElementById('drama').value = quote.drama;
    document.getElementById('year').value = quote.year;
    document.getElementById('image-url').value = quote.image.startsWith('data:') ? '' : quote.image;
    
    // 如果有音乐字段，填充音乐路径
    if (quote.music) {
        document.getElementById('music').value = quote.music.startsWith('data:') ? '' : quote.music;
    }
    
    // 显示图片预览
    const preview = document.getElementById('image-preview');
    preview.innerHTML = `<img src="${quote.image}" alt="预览">`;
    preview.classList.add('show');
    
    // 静默删除原有的（不弹出确认框）
    adminQuotes = adminQuotes.filter(q => q.id !== id);
    saveQuotes();
    renderQuotesList();
    
    // 滚动到表单
    document.querySelector('.add-form').scrollIntoView({ behavior: 'smooth' });
}

// 删除全部
function deleteAllQuotes() {
    if (!confirm('确定要删除所有台词吗？此操作无法撤销！')) return;
    
    adminQuotes = [];
    saveQuotes();
    renderQuotesList();
}

// 导出数据
function exportData() {
    const dataStr = JSON.stringify(adminQuotes, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `daily-quotes-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
}

// 导入数据
function importData(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(event) {
        try {
            const importedQuotes = JSON.parse(event.target.result);
            
            if (!Array.isArray(importedQuotes)) {
                throw new Error('数据格式错误');
            }
            
            if (confirm(`将导入 ${importedQuotes.length} 条台词，是否覆盖现有数据？`)) {
                adminQuotes = importedQuotes;
            } else {
                // 合并数据
                const maxId = adminQuotes.length > 0 ? Math.max(...adminQuotes.map(q => q.id)) : 0;
                importedQuotes.forEach((q, index) => {
                    q.id = maxId + index + 1;
                });
                adminQuotes = [...adminQuotes, ...importedQuotes];
            }
            
            saveQuotes();
            renderQuotesList();
            alert('导入成功！');
        } catch (error) {
            alert('导入失败：' + error.message);
        }
    };
    
    reader.readAsText(file);
    e.target.value = ''; // 重置input
}
