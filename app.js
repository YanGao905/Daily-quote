// 当前显示的索引（相对于今天的偏移）
let currentDayOffset = 0; // 默认显示今天
let isAnimating = false;

// 从 localStorage 加载数据（优先）或使用 quotes.js 中的数据
function loadQuotes() {
    const savedQuotes = localStorage.getItem('dailyQuotes');
    if (savedQuotes) {
        const data = JSON.parse(savedQuotes);
        const longVacation = data.filter(q => q.drama === '悠长假期');
        console.log('localStorage中悠长假期的数量:', longVacation.length);
        console.log('悠长假期数据:', longVacation);
        return data;
    }
    // 如果 localStorage 中没有数据，使用 quotes.js 中定义的数据
    console.log('使用quotes.js中的数据');
    return typeof quotes !== 'undefined' ? quotes : [];
}

// 获取所有台词（动态获取，确保实时同步）
function getAllQuotes() {
    return loadQuotes();
}

// 获取当天的quote
function getTodayQuote() {
    return getQuoteByOffset(0);
}

// 打乱台词顺序，确保连续的台词不来自同一部剧
function shuffleQuotesAvoidingSameDrama(quotes) {
    if (quotes.length <= 1) return quotes;
    
    const shuffled = [...quotes];
    const maxAttempts = 100;
    
    // Fisher-Yates 洗牌算法
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    // 调整顺序，避免连续两个来自同一部剧
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
        let hasSameDrama = false;
        
        for (let i = 0; i < shuffled.length - 1; i++) {
            if (shuffled[i].drama === shuffled[i + 1].drama) {
                hasSameDrama = true;
                // 尝试找一个不同剧的台词交换
                for (let j = i + 2; j < shuffled.length; j++) {
                    if (shuffled[j].drama !== shuffled[i].drama && 
                        shuffled[j].drama !== shuffled[i - 1]?.drama) {
                        [shuffled[i + 1], shuffled[j]] = [shuffled[j], shuffled[i + 1]];
                        break;
                    }
                }
            }
        }
        
        if (!hasSameDrama) break;
    }
    
    return shuffled;
}

// 获取或创建打乱后的台词列表（缓存）
let shuffledQuotes = null;
function getShuffledQuotes() {
    const allQuotes = getAllQuotes();
    
    // 检查是否需要重新洗牌（数据变化时）
    const quotesKey = JSON.stringify(allQuotes.map(q => q.id));
    const savedKey = localStorage.getItem('shuffledQuotesKey');
    
    if (!shuffledQuotes || quotesKey !== savedKey) {
        console.log('重新洗牌台词顺序');
        shuffledQuotes = shuffleQuotesAvoidingSameDrama(allQuotes);
        localStorage.setItem('shuffledQuotesKey', quotesKey);
        localStorage.setItem('shuffledQuotesOrder', JSON.stringify(shuffledQuotes.map(q => q.id)));
    } else {
        // 从缓存加载顺序
        const savedOrder = localStorage.getItem('shuffledQuotesOrder');
        if (savedOrder) {
            const orderIds = JSON.parse(savedOrder);
            shuffledQuotes = orderIds.map(id => allQuotes.find(q => q.id === id)).filter(q => q);
        }
    }
    
    return shuffledQuotes;
}

// 根据偏移获取quote
function getQuoteByOffset(offset) {
    const allQuotes = getAllQuotes();
    if (allQuotes.length === 0) return null;
    
    // 如果是今天，优先使用用户设置的默认台词
    if (offset === 0) {
        const defaultId = localStorage.getItem('todayDefaultQuote');
        if (defaultId) {
            const defaultQuote = allQuotes.find(q => q.id === parseInt(defaultId));
            if (defaultQuote) {
                console.log('✓ 使用设置的默认台词:', defaultQuote.drama);
                return defaultQuote;
            }
        }
        // 今天没有设置默认台词，返回第一个
        return allQuotes[0];
    }
    
    // 其他日期使用打乱后的顺序
    const shuffled = getShuffledQuotes();
    
    // 对于过去的日期（负偏移），从打乱列表中按顺序获取
    const index = Math.abs(offset - 1) % shuffled.length;
    
    return shuffled[index];
}

// 计算一年中的第几天
function getDayOfYear(date) {
    const start = new Date(date.getFullYear(), 0, 0);
    const diff = date - start;
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
}

// 格式化日期
function formatDate(date) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                   'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = months[date.getMonth()];
    const day = date.getDate();
    return `${month} ${day}`;
}

// 根据偏移获取日期
function getDateByOffset(offset) {
    const today = new Date();
    const targetDate = new Date(today);
    targetDate.setDate(today.getDate() + offset);
    return targetDate;
}

// 格式化星期
function formatWeekday(date) {
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
    return weekdays[date.getDay()];
}

// 更新页面内容
function updatePage(direction = 'up') {
    const targetDate = getDateByOffset(currentDayOffset);
    const quote = getQuoteByOffset(currentDayOffset);
    
    // 显示正常内容
    showNormalPage();
    
    // 如果没有台词数据，显示提示
    if (!quote) {
        document.getElementById('japanese-quote').textContent = '还没有添加台词';
        document.getElementById('chinese-quote').textContent = '请前往管理页面添加台词';
        document.getElementById('drama-info').textContent = '点击右上角进入管理页面';
        return;
    }
    
    // 更新日期
    document.getElementById('date').textContent = formatDate(targetDate);
    document.getElementById('weekday').textContent = formatWeekday(targetDate);
    
    // 获取元素并移除旧动画类
    const japaneseQuote = document.getElementById('japanese-quote');
    const chineseQuote = document.getElementById('chinese-quote');
    const imageElement = document.getElementById('quote-image');
    const dramaInfo = document.getElementById('drama-info');
    
    // 移除旧的动画类
    japaneseQuote.classList.remove('fade-in', 'fade-in-down', 'fade-in-1', 'fade-in-reverse-1');
    chineseQuote.classList.remove('fade-in', 'fade-in-down', 'fade-in-2', 'fade-in-reverse-2');
    imageElement.parentElement.classList.remove('fade-in', 'fade-in-down', 'fade-in-3', 'fade-in-reverse-3');
    
    // 更新内容
    japaneseQuote.textContent = quote.japanese;
    chineseQuote.textContent = quote.chinese;
    imageElement.src = quote.image;
    imageElement.alt = `${quote.drama} (${quote.year})`;
    dramaInfo.textContent = `${quote.drama} (${quote.year})`;
    
    // 根据翻页方向选择动画类和延迟顺序
    const animationClass = direction === 'down' ? 'fade-in-down' : 'fade-in';
    
    // 强制重绘后添加新动画
    void japaneseQuote.offsetWidth;
    
    if (direction === 'down') {
        // 往回翻：图片→中文→日文（反向顺序）
        japaneseQuote.classList.add(animationClass, 'fade-in-reverse-1');
        chineseQuote.classList.add(animationClass, 'fade-in-reverse-2');
        imageElement.parentElement.classList.add(animationClass, 'fade-in-reverse-3');
    } else {
        // 往前翻：日文→中文→图片（正常顺序）
        japaneseQuote.classList.add(animationClass, 'fade-in-1');
        chineseQuote.classList.add(animationClass, 'fade-in-2');
        imageElement.parentElement.classList.add(animationClass, 'fade-in-3');
    }
    
    // 图片加载失败时显示占位符（防止无限循环）
    imageElement.onerror = function() {
        if (this.src !== 'data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27324%27 height=%27496%27%3E%3Crect fill=%27%23e8e8e8%27 width=%27324%27 height=%27496%27/%3E%3Ctext x=%27162%27 y=%27248%27 font-size=%2724%27 text-anchor=%27middle%27 fill=%27%23999%27%3E暂无图片%3C/text%3E%3C/svg%3E') {
            this.src = 'data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27324%27 height=%27496%27%3E%3Crect fill=%27%23e8e8e8%27 width=%27324%27 height=%27496%27/%3E%3Ctext x=%27162%27 y=%27248%27 font-size=%2724%27 text-anchor=%27middle%27 fill=%27%23999%27%3E暂无图片%3C/text%3E%3C/svg%3E';
        }
    };
    
    // 更新背景音乐
    updateBackgroundMusic(quote);
}

// 更新背景音乐
function updateBackgroundMusic(quote) {
    const bgMusic = document.getElementById('bgMusic');
    const musicBtn = document.getElementById('musicBtn');
    
    console.log('========== 音乐调试 ==========');
    console.log('完整quote对象:', quote);
    console.log('music字段值:', quote ? quote.music : 'quote不存在');
    
    // 始终显示音乐按钮
    musicBtn.classList.add('visible');
    
    // 如果当前已经在播放音乐，不做任何改变
    if (bgMusic.src && !bgMusic.paused) {
        console.log('✓ 音乐正在播放，保持不变');
        return;
    }
    
    // 只有在没有音乐播放时，才加载新音乐
    if (quote && quote.music) {
        console.log('✓ 没有音乐在播放，加载新音乐:', quote.music);
        
        // 先设置为加载中状态（半透明，慢速旋转）
        musicBtn.classList.add('loading');
        musicBtn.classList.remove('muted');
        
        bgMusic.src = quote.music;
        bgMusic.muted = false;
        bgMusic.volume = 1.0;
        
        // 使用canplay事件，更快开始播放（不需要等全部下载完）
        const canPlayHandler = () => {
            console.log('✓ 音频可以播放了，开始播放');
            musicBtn.classList.remove('loading');
            
            const playPromise = bgMusic.play();
            if (playPromise !== undefined) {
                playPromise
                    .then(() => {
                        console.log('✓ 播放成功！');
                        // 播放成功后保存状态
                        if (window.globalMusicPlayer) {
                            window.globalMusicPlayer.saveState();
                        }
                    })
                    .catch((error) => {
                        console.error('✗ 播放失败:', error.name, error.message);
                        musicBtn.classList.add('muted');
                    });
            }
        };
        
        const errorHandler = (e) => {
            console.error('✗ 音频加载错误:', bgMusic.error);
            musicBtn.classList.remove('loading');
            musicBtn.classList.add('muted');
        };
        
        // 移除旧的监听器（如果有）
        bgMusic.removeEventListener('canplay', canPlayHandler);
        bgMusic.removeEventListener('error', errorHandler);
        
        // 添加新监听器
        bgMusic.addEventListener('canplay', canPlayHandler, { once: true });
        bgMusic.addEventListener('error', errorHandler, { once: true });
        
        bgMusic.load();
    } else {
        console.log('✓ 没有音乐文件');
        // 不主动停止音乐，让用户通过静音按钮控制
    }
    console.log('==============================');
}

// 显示「终了」页面
function showEndPage() {
    const container = document.querySelector('.container');
    const dateSection = document.querySelector('.date-section');
    const quoteSection = document.querySelector('.quote-section');
    const imageSection = document.querySelector('.image-section');
    const dramaInfo = document.querySelector('.drama-info');
    
    // 先淡出当前内容
    dateSection.style.transition = 'opacity 0.3s ease';
    quoteSection.style.transition = 'opacity 0.3s ease';
    imageSection.style.transition = 'opacity 0.3s ease';
    dramaInfo.style.transition = 'opacity 0.3s ease';
    
    dateSection.style.opacity = '0';
    quoteSection.style.opacity = '0';
    imageSection.style.opacity = '0';
    dramaInfo.style.opacity = '0';
    
    setTimeout(() => {
        // 隐藏正常内容
        dateSection.style.display = 'none';
        quoteSection.style.display = 'none';
        imageSection.style.display = 'none';
        dramaInfo.style.display = 'none';
        
        // 显示终了页面
        container.classList.add('end-page');
        
        // 获取终了页面元素
        const endToday = document.querySelector('.end-today');
        const endQuoteSection = document.querySelector('.end-quote-section');
        const endText = document.querySelector('.end-text');
        
        // 每次都重置：先移除transition，立即设置透明度为0
        endToday.style.transition = 'none';
        endQuoteSection.style.transition = 'none';
        endText.style.transition = 'none';
        
        endToday.style.opacity = '0';
        endQuoteSection.style.opacity = '0';
        endText.style.opacity = '0';
        
        // 强制重绘
        void endToday.offsetHeight;
        
        // 第一步：淡入中间的quote部分
        setTimeout(() => {
            endQuoteSection.style.transition = 'opacity 0.4s ease';
            endQuoteSection.style.opacity = '1';
            
            // 第二步：淡入左上角的"今日"
            setTimeout(() => {
                endToday.style.transition = 'opacity 0.4s ease';
                endToday.style.opacity = '1';
                
                // 第三步：淡入右下角的"終了"
                setTimeout(() => {
                    endText.style.transition = 'opacity 0.4s ease';
                    endText.style.opacity = '1';
                }, 200);
            }, 200);
        }, 100);
    }, 300);
}

// 显示正常页面
function showNormalPage() {
    const container = document.querySelector('.container');
    const dateSection = document.querySelector('.date-section');
    const quoteSection = document.querySelector('.quote-section');
    const imageSection = document.querySelector('.image-section');
    const dramaInfo = document.querySelector('.drama-info');
    
    // 如果当前是终了页面，需要先切换回正常布局
    if (container.classList.contains('end-page')) {
        const endToday = document.querySelector('.end-today');
        const endQuoteSection = document.querySelector('.end-quote-section');
        const endText = document.querySelector('.end-text');
        
        // 淡出终了页面内容
        endToday.style.transition = 'opacity 0.3s ease';
        endQuoteSection.style.transition = 'opacity 0.3s ease';
        endText.style.transition = 'opacity 0.3s ease';
        
        endToday.style.opacity = '0';
        endQuoteSection.style.opacity = '0';
        endText.style.opacity = '0';
        
        setTimeout(() => {
            container.classList.remove('end-page');
            
            // 显示正常内容元素
            dateSection.style.display = 'flex';
            quoteSection.style.display = 'flex';
            imageSection.style.display = 'flex';
            dramaInfo.style.display = 'block';
            
            // 重置透明度
            dateSection.style.opacity = '1';
            quoteSection.style.opacity = '1';
            imageSection.style.opacity = '1';
            dramaInfo.style.opacity = '1';
            
            // 动画类会在updatePage中添加，这里不需要额外处理
        }, 300);
    } else {
        // 如果不是从终了页面切换，确保所有元素可见
        dateSection.style.display = 'flex';
        quoteSection.style.display = 'flex';
        imageSection.style.display = 'flex';
        dramaInfo.style.display = 'block';
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    // 初始化全局音乐播放器
    const bgMusic = document.getElementById('bgMusic');
    if (bgMusic && window.globalMusicPlayer) {
        window.globalMusicPlayer.setAudio(bgMusic);
        console.log('✓ 全局音乐播放器已初始化');
    }
    
    // 确保从今天开始
    currentDayOffset = 0;
    updatePage();
    
    // 每天午夜自动更新（可选）
    setInterval(function() {
        const now = new Date();
        if (now.getHours() === 0 && now.getMinutes() === 0) {
            updatePage();
        }
    }, 60000); // 每分钟检查一次
    
    // 监听 localStorage 变化，实时同步后台更新
    window.addEventListener('storage', function(e) {
        if (e.key === 'dailyQuotes') {
            console.log('检测到数据更新，重新加载...');
            updatePage();
        }
    });
    
    // 监听页面获得焦点时刷新（从后台切换回来时）
    window.addEventListener('focus', function() {
        updatePage();
    });
    
    // 添加导航箭头点击事件
    setupNavigation();
    
    // 添加触摸和滚轮支持
    setupSwipeGestures();
});

// 切换到下一天（向上滑动）
function goToPreviousDay() {
    if (isAnimating) return;
    
    // 如果在终了页面，翻回今天
    if (document.querySelector('.container').classList.contains('end-page')) {
        showNormalPage();
        currentDayOffset = 0;
        setTimeout(() => {
            updatePage('up'); // 从终了返回，从下往上
        }, 300);
        return;
    }
    
    isAnimating = true;
    currentDayOffset--;
    
    // 往回翻（更早日期），从上往下出现
    updatePage('down');
    
    setTimeout(() => {
        isAnimating = false;
    }, 600); // 等待动画完成
}

// 切换到前一天（向下滑动）
function goToNextDay() {
    if (isAnimating) return;
    
    // 如果已经在终了页面，不允许继续
    if (document.querySelector('.container').classList.contains('end-page')) {
        return;
    }
    
    // 如果当前是今天(offset=0)，显示终了页面
    if (currentDayOffset === 0) {
        showEndPage();
        return;
    }
    
    // 如果在历史日期，往前翻一天
    isAnimating = true;
    currentDayOffset++;
    
    // 往前翻（更晚日期），从下往上出现
    updatePage('up');
    
    setTimeout(() => {
        isAnimating = false;
    }, 600); // 等待动画完成
}

// 设置导航
function setupNavigation() {
    const navUp = document.getElementById('nav-up');
    const navDown = document.getElementById('nav-down');
    
    navUp.addEventListener('click', goToPreviousDay);
    navDown.addEventListener('click', goToNextDay);
}

// 设置滑动手势
function setupSwipeGestures() {
    let startY = 0;
    let startTime = 0;
    const container = document.getElementById('container');
    
    // 触摸事件
    container.addEventListener('touchstart', function(e) {
        if (isAnimating) return;
        startY = e.touches[0].clientY;
        startTime = Date.now();
    });
    
    container.addEventListener('touchend', function(e) {
        if (isAnimating) return;
        const endY = e.changedTouches[0].clientY;
        const deltaY = endY - startY;
        const deltaTime = Date.now() - startTime;
        const velocity = Math.abs(deltaY) / deltaTime;
        
        // 判断滑动方向和速度
        if (Math.abs(deltaY) > 50 || velocity > 0.5) {
            if (deltaY > 0) {
                goToNextDay();
            } else {
                goToPreviousDay();
            }
        }
    });
    
    // 滚轮事件
    let wheelTimeout;
    container.addEventListener('wheel', function(e) {
        if (isAnimating) return;
        e.preventDefault();
        
        clearTimeout(wheelTimeout);
        wheelTimeout = setTimeout(() => {
            if (e.deltaY < 0) {
                goToNextDay();
            } else if (e.deltaY > 0) {
                goToPreviousDay();
            }
        }, 50);
    }, { passive: false });
}

// 添加键盘快捷键：方向键上下切换
document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowUp') {
        event.preventDefault();
        goToPreviousDay();
    } else if (event.key === 'ArrowDown') {
        event.preventDefault();
        goToNextDay();
    }
});

// 音乐静音控制
document.addEventListener('DOMContentLoaded', function() {
    const bgMusic = document.getElementById('bgMusic');
    const musicBtn = document.getElementById('musicBtn');
    
    // 点击按钮切换静音/取消静音
    musicBtn.addEventListener('click', function() {
        if (bgMusic.muted) {
            bgMusic.muted = false;
            musicBtn.classList.remove('muted');
        } else {
            bgMusic.muted = true;
            musicBtn.classList.add('muted');
        }
    });
});

// 管理面板模态框控制
document.addEventListener('DOMContentLoaded', function() {
    const openAdminBtn = document.getElementById('openAdminBtn');
    const closeAdminBtn = document.getElementById('closeAdminBtn');
    const adminModal = document.getElementById('adminModal');
    const adminPanelContainer = document.getElementById('adminPanelContainer');
    
    // 打开管理面板
    openAdminBtn.addEventListener('click', function() {
        adminModal.classList.add('show');
        
        // 每次打开都重新加载，确保数据最新
        loadAdminPanel();
    });
    
    // 关闭管理面板
    closeAdminBtn.addEventListener('click', function() {
        adminModal.classList.remove('show');
        // 清空内容，下次打开重新加载
        adminPanelContainer.innerHTML = '';
        // 刷新主页面以显示可能的更新
        updatePage();
    });
    
    // 点击模态框背景关闭
    adminModal.addEventListener('click', function(e) {
        if (e.target === adminModal) {
            adminModal.classList.remove('show');
            // 清空内容
            adminPanelContainer.innerHTML = '';
            updatePage();
        }
    });
});

// 加载管理面板内容
function loadAdminPanel() {
    const container = document.getElementById('adminPanelContainer');
    
    fetch('admin.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('网络响应错误');
            }
            return response.text();
        })
        .then(html => {
            // 提取 admin.html 中的内容部分
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const adminContent = doc.querySelector('.admin-content');
            
            if (adminContent) {
                container.innerHTML = adminContent.innerHTML;
                
                // 等待DOM更新后再初始化
                setTimeout(() => {
                    // 重新加载数据
                    if (typeof loadQuotes === 'function') {
                        loadQuotes();
                    }
                    // 重新渲染列表
                    if (typeof renderQuotesList === 'function') {
                        renderQuotesList();
                    }
                    // 重新绑定事件
                    if (typeof setupEventListeners === 'function') {
                        setupEventListeners();
                    }
                }, 100);
            } else {
                throw new Error('找不到管理面板内容');
            }
        })
        .catch(error => {
            console.error('加载管理面板失败:', error);
            container.innerHTML = `
                <div style="padding: 40px; text-align: center;">
                    <p style="color: red; font-size: 18px; margin-bottom: 20px;">❌ 加载失败</p>
                    <p style="color: #666; margin-bottom: 20px;">错误: ${error.message}</p>
                    <button onclick="location.href='admin.html'" style="padding: 10px 20px; background: #007bff; color: white; border: none; border-radius: 5px; cursor: pointer;">
                        直接打开管理页面
                    </button>
                </div>
            `;
        });
}

