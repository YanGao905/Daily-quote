// 从 localStorage 加载或初始化数据
let quotes = [];

// 初始化
document.addEventListener('DOMContentLoaded', function() {
    loadQuotes();
    renderQuotesList();
    setupEventListeners();
});

// 加载数据
function loadQuotes() {
    const savedQuotes = localStorage.getItem('dailyQuotes');
    if (savedQuotes) {
        quotes = JSON.parse(savedQuotes);
    } else {
        // 如果没有保存的数据，使用默认示例
        quotes = [
            {
                id: 1,
                japanese: "人生にはね、長い休みが必要な時もあるのよ",
                chinese: "人生啊，也会有需要放长假的时候",
                drama: "悠长假期",
                year: 1996,
                image: "images/default.png"
            }
        ];
        saveQuotes();
    }
}

// 保存数据
function saveQuotes() {
    localStorage.setItem('dailyQuotes', JSON.stringify(quotes));
    // 同时更新 quotes.js 文件的提示
    updateQuotesFile();
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
    
    // 图片上传预览
    document.getElementById('image-upload').addEventListener('change', handleImageUpload);
    
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
    
    console.log('表单数据:', { japanese, chinese, drama, year, imageUrl, hasFile: !!imageFile });
    
    // 验证必填字段
    if (!japanese || !chinese || !drama || !year) {
        alert('请填写所有必填字段');
        return;
    }
    
    // 优先使用URL（节省空间）
    if (imageUrl) {
        console.log('使用图片URL');
        addQuoteWithImage(japanese, chinese, drama, year, imageUrl);
    }
    // 如果有图片文件，压缩并保存
    else if (imageFile) {
        console.log('读取并压缩图片文件...');
        // 更激进的压缩：600px宽度，50%质量
        compressImage(imageFile, 600, 0.5)
            .then(compressedData => {
                console.log('图片压缩成功');
                addQuoteWithImage(japanese, chinese, drama, year, compressedData);
            })
            .catch(error => {
                console.error('图片处理失败:', error);
                alert('图片处理失败，请重试或使用图片URL');
            });
    } else {
        console.log('使用默认图片');
        // 没有图片，使用默认占位图
        const defaultImage = 'data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27324%27 height=%27496%27%3E%3Crect fill=%27%23e8e8e8%27 width=%27324%27 height=%27496%27/%3E%3Ctext x=%27162%27 y=%27230%27 font-size=%2720%27 text-anchor=%27middle%27 fill=%27%23999%27%3E暂无图片%3C/text%3E%3Ctext x=%27162%27 y=%27260%27 font-size=%2716%27 text-anchor=%27middle%27 fill=%27%23bbb%27%3E可通过编辑添加%3C/text%3E%3C/svg%3E';
        addQuoteWithImage(japanese, chinese, drama, year, defaultImage);
    }
}

// 添加台词（带图片数据）
function addQuoteWithImage(japanese, chinese, drama, year, imageData) {
    console.log('开始添加台词...');
    const newQuote = {
        id: quotes.length > 0 ? Math.max(...quotes.map(q => q.id)) + 1 : 1,
        japanese,
        chinese,
        drama,
        year,
        image: imageData
    };
    
    console.log('新台词对象:', newQuote);
    quotes.push(newQuote);
    console.log('当前台词总数:', quotes.length);
    
    saveQuotes();
    renderQuotesList();
    clearForm();
    
    alert('台词添加成功！' + (imageData.includes('暂无图片') ? '\n提示：您可以稍后编辑此台词来添加图片' : ''));
}

// 清空表单
function clearForm() {
    document.getElementById('quote-form').reset();
    document.getElementById('image-preview').innerHTML = '';
    document.getElementById('image-preview').classList.remove('show');
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

// 处理图片上传预览
function handleImageUpload(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const preview = document.getElementById('image-preview');
            preview.innerHTML = `<img src="${event.target.result}" alt="预览">`;
            preview.classList.add('show');
        };
        reader.readAsDataURL(file);
    }
}

// 渲染台词列表
function renderQuotesList() {
    const container = document.getElementById('quotes-container');
    const countElement = document.getElementById('quote-count');
    
    countElement.textContent = quotes.length;
    
    if (quotes.length === 0) {
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
    
    container.innerHTML = quotes.map(quote => `
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
    `).join('');
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
    const quote = quotes.find(q => q.id === id);
    if (!quote) return;
    
    document.getElementById('japanese').value = quote.japanese;
    document.getElementById('chinese').value = quote.chinese;
    document.getElementById('drama').value = quote.drama;
    document.getElementById('year').value = quote.year;
    
    // 显示图片预览
    const preview = document.getElementById('image-preview');
    preview.innerHTML = `<img src="${quote.image}" alt="预览">`;
    preview.classList.add('show');
    
    // 删除原有的，稍后会添加新的
    deleteQuote(id);
    
    // 滚动到表单
    document.querySelector('.add-form').scrollIntoView({ behavior: 'smooth' });
}

// 删除全部
function deleteAllQuotes() {
    if (!confirm('确定要删除所有台词吗？此操作无法撤销！')) return;
    
    quotes = [];
    saveQuotes();
    renderQuotesList();
}

// 导出数据
function exportData() {
    const dataStr = JSON.stringify(quotes, null, 2);
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
                quotes = importedQuotes;
            } else {
                // 合并数据
                const maxId = quotes.length > 0 ? Math.max(...quotes.map(q => q.id)) : 0;
                importedQuotes.forEach((q, index) => {
                    q.id = maxId + index + 1;
                });
                quotes = [...quotes, ...importedQuotes];
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
