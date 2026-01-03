// 当前显示的索引（相对于今天的偏移）
let currentDayOffset = 0;
let isAnimating = false;

// 从 localStorage 加载数据（优先）或使用 quotes.js 中的数据
function loadQuotes() {
    const savedQuotes = localStorage.getItem('dailyQuotes');
    if (savedQuotes) {
        return JSON.parse(savedQuotes);
    }
    // 如果 localStorage 中没有数据，使用 quotes.js 中定义的数据
    return typeof quotes !== 'undefined' ? quotes : [];
}

// 获取所有台词（动态获取，确保实时同步）
function getAllQuotes() {
    return loadQuotes();
}

// 获取当天的quote
function getTodayQuote() {
    const allQuotes = getAllQuotes();
    if (allQuotes.length === 0) return null;
    
    const today = new Date();
    const dayOfYear = getDayOfYear(today);
    
    // 使用年份天数对quotes数组长度取模，确保每天都有唯一的quote
    const quoteIndex = dayOfYear % allQuotes.length;
    
    return allQuotes[quoteIndex];
}

// 根据偏移获取quote
function getQuoteByOffset(offset) {
    const allQuotes = getAllQuotes();
    if (allQuotes.length === 0) return null;
    
    const today = new Date();
    const targetDate = new Date(today);
    targetDate.setDate(today.getDate() + offset);
    
    const dayOfYear = getDayOfYear(targetDate);
    const quoteIndex = dayOfYear % allQuotes.length;
    
    return allQuotes[quoteIndex];
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
function updatePage() {
    const targetDate = getDateByOffset(currentDayOffset);
    const quote = getQuoteByOffset(currentDayOffset);
    
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
    
    // 更新quote
    document.getElementById('japanese-quote').textContent = quote.japanese;
    document.getElementById('chinese-quote').textContent = quote.chinese;
    
    // 更新图片
    const imageElement = document.getElementById('quote-image');
    imageElement.src = quote.image;
    imageElement.alt = `${quote.drama} (${quote.year})`;
    
    // 图片加载失败时显示占位符（防止无限循环）
    imageElement.onerror = function() {
        if (this.src !== 'data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27324%27 height=%27496%27%3E%3Crect fill=%27%23e8e8e8%27 width=%27324%27 height=%27496%27/%3E%3Ctext x=%27162%27 y=%27248%27 font-size=%2724%27 text-anchor=%27middle%27 fill=%27%23999%27%3E暂无图片%3C/text%3E%3C/svg%3E') {
            this.src = 'data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27324%27 height=%27496%27%3E%3Crect fill=%27%23e8e8e8%27 width=%27324%27 height=%27496%27/%3E%3Ctext x=%27162%27 y=%27248%27 font-size=%2724%27 text-anchor=%27middle%27 fill=%27%23999%27%3E暂无图片%3C/text%3E%3C/svg%3E';
        }
    };
    
    // 更新剧名和年份
    document.getElementById('drama-info').textContent = `${quote.drama} (${quote.year})`;
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
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
    isAnimating = true;
    
    const quoteSection = document.querySelector('.quote-section');
    const imageSection = document.querySelector('.image-section');
    const dramaInfo = document.querySelector('.drama-info');
    const dateSection = document.querySelector('.date-section');
    
    // 日期直接切换（无动画）
    currentDayOffset--;
    const targetDate = getDateByOffset(currentDayOffset);
    document.getElementById('date').textContent = formatDate(targetDate);
    document.getElementById('weekday').textContent = formatWeekday(targetDate);
    
    // 其他内容淡出（subtle动效：20px位移，0.3s时长）
    quoteSection.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
    imageSection.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
    dramaInfo.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
    
    quoteSection.style.transform = 'translateY(-20px)';
    imageSection.style.transform = 'translateY(-20px)';
    dramaInfo.style.transform = 'translateY(-20px)';
    
    quoteSection.style.opacity = '0';
    imageSection.style.opacity = '0';
    dramaInfo.style.opacity = '0';
    
    setTimeout(() => {
        // 更新内容（不包括日期）
        const quote = getQuoteByOffset(currentDayOffset);
        if (quote) {
            document.getElementById('japanese-quote').textContent = quote.japanese;
            document.getElementById('chinese-quote').textContent = quote.chinese;
            document.getElementById('drama-info').textContent = `${quote.drama} (${quote.year})`;
            
            const imageElement = document.getElementById('quote-image');
            imageElement.src = quote.image;
            imageElement.alt = `${quote.drama} (${quote.year})`;
        }
        
        // 从下方淡入
        quoteSection.style.transition = 'none';
        imageSection.style.transition = 'none';
        dramaInfo.style.transition = 'none';
        
        quoteSection.style.transform = 'translateY(20px)';
        imageSection.style.transform = 'translateY(20px)';
        dramaInfo.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            quoteSection.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
            imageSection.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
            dramaInfo.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
            
            quoteSection.style.transform = 'translateY(0)';
            imageSection.style.transform = 'translateY(0)';
            dramaInfo.style.transform = 'translateY(0)';
            
            quoteSection.style.opacity = '1';
            imageSection.style.opacity = '1';
            dramaInfo.style.opacity = '1';
            
            setTimeout(() => {
                isAnimating = false;
            }, 300);
        }, 50);
    }, 300);
}

// 切换到前一天（向下滑动）
function goToNextDay() {
    if (isAnimating) return;
    isAnimating = true;
    
    const quoteSection = document.querySelector('.quote-section');
    const imageSection = document.querySelector('.image-section');
    const dramaInfo = document.querySelector('.drama-info');
    
    // 日期直接切换（无动画）
    currentDayOffset++;
    const targetDate = getDateByOffset(currentDayOffset);
    document.getElementById('date').textContent = formatDate(targetDate);
    document.getElementById('weekday').textContent = formatWeekday(targetDate);
    
    // 其他内容淡出（subtle动效：20px位移，0.3s时长）
    quoteSection.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
    imageSection.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
    dramaInfo.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
    
    quoteSection.style.transform = 'translateY(20px)';
    imageSection.style.transform = 'translateY(20px)';
    dramaInfo.style.transform = 'translateY(20px)';
    
    quoteSection.style.opacity = '0';
    imageSection.style.opacity = '0';
    dramaInfo.style.opacity = '0';
    
    setTimeout(() => {
        // 更新内容（不包括日期）
        const quote = getQuoteByOffset(currentDayOffset);
        if (quote) {
            document.getElementById('japanese-quote').textContent = quote.japanese;
            document.getElementById('chinese-quote').textContent = quote.chinese;
            document.getElementById('drama-info').textContent = `${quote.drama} (${quote.year})`;
            
            const imageElement = document.getElementById('quote-image');
            imageElement.src = quote.image;
            imageElement.alt = `${quote.drama} (${quote.year})`;
        }
        
        // 从上方淡入
        quoteSection.style.transition = 'none';
        imageSection.style.transition = 'none';
        dramaInfo.style.transition = 'none';
        
        quoteSection.style.transform = 'translateY(-20px)';
        imageSection.style.transform = 'translateY(-20px)';
        dramaInfo.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            quoteSection.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
            imageSection.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
            dramaInfo.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
            
            quoteSection.style.transform = 'translateY(0)';
            imageSection.style.transform = 'translateY(0)';
            dramaInfo.style.transform = 'translateY(0)';
            
            quoteSection.style.opacity = '1';
            imageSection.style.opacity = '1';
            dramaInfo.style.opacity = '1';
            
            setTimeout(() => {
                isAnimating = false;
            }, 300);
        }, 50);
    }, 300);
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
