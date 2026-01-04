// 全局音乐播放器管理
// 使用 localStorage 保持音乐状态，实现跨页面持续播放

class GlobalMusicPlayer {
    constructor() {
        this.audio = null;
        this.storageKey = 'globalMusicState';
        this.updateInterval = null;
        this.init();
    }

    init() {
        // 监听其他标签页的状态变化
        window.addEventListener('storage', (e) => {
            if (e.key === this.storageKey) {
                this.syncFromStorage();
            }
        });

        // 页面可见性变化时同步状态
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden) {
                this.syncFromStorage();
            }
        });

        // 页面卸载前保存状态
        window.addEventListener('beforeunload', () => {
            this.saveState();
        });

        // 阻止页面卸载时的暂停（无效，但保留以示意图）
        window.addEventListener('pagehide', (e) => {
            this.saveState();
        });
    }

    // 初始化音频元素
    setAudio(audioElement) {
        this.audio = audioElement;
        
        // 监听播放状态变化
        this.audio.addEventListener('play', () => this.saveState());
        this.audio.addEventListener('pause', () => this.saveState());
        this.audio.addEventListener('volumechange', () => this.saveState());
        this.audio.addEventListener('loadedmetadata', () => this.saveState());
        
        // 定期保存播放进度
        this.audio.addEventListener('timeupdate', () => {
            if (this.audio.played.length > 0) {
                this.saveState();
            }
        });

        // 从存储中恢复状态
        this.syncFromStorage();
    }

    // 保存当前播放状态
    saveState() {
        if (!this.audio) return;

        const state = {
            src: this.audio.src,
            currentTime: this.audio.currentTime,
            volume: this.audio.volume,
            muted: this.audio.muted,
            playing: !this.audio.paused,
            timestamp: Date.now()
        };

        try {
            localStorage.setItem(this.storageKey, JSON.stringify(state));
        } catch (e) {
            console.error('保存音乐状态失败:', e);
        }
    }

    // 从存储中恢复状态
    syncFromStorage() {
        if (!this.audio) return;

        try {
            const savedState = localStorage.getItem(this.storageKey);
            if (!savedState) return;

            const state = JSON.parse(savedState);
            
            // 检查状态是否过期（超过5秒认为是旧状态）
            if (Date.now() - state.timestamp > 5000) {
                return;
            }

            // 如果音频源不同，加载新音频
            if (state.src && state.src !== this.audio.src) {
                this.audio.src = state.src;
            }

            // 恢复播放进度
            if (state.currentTime !== undefined && Math.abs(this.audio.currentTime - state.currentTime) > 1) {
                this.audio.currentTime = state.currentTime;
            }

            // 恢复音量和静音状态
            if (state.volume !== undefined) {
                this.audio.volume = state.volume;
            }
            if (state.muted !== undefined) {
                this.audio.muted = state.muted;
            }

            // 恢复播放状态
            if (state.playing && this.audio.paused) {
                // 尝试自动播放（可能受浏览器策略限制）
                const playPromise = this.audio.play();
                if (playPromise !== undefined) {
                    playPromise.catch(error => {
                        console.log('自动播放被阻止，需要用户交互:', error);
                    });
                }
            }
        } catch (e) {
            console.error('恢复音乐状态失败:', e);
        }
    }

    // 清除状态
    clearState() {
        try {
            localStorage.removeItem(this.storageKey);
        } catch (e) {
            console.error('清除音乐状态失败:', e);
        }
    }
}

// 创建全局实例
window.globalMusicPlayer = new GlobalMusicPlayer();
