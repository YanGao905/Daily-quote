// TTS初始化脚本 - 使用混合TTS替换原有逻辑

document.addEventListener('DOMContentLoaded', () => {
    const speakBtn = document.getElementById('speakBtn');
    if (!speakBtn || !window.hybridTTS) return;

    let isSpeaking = false;
    const bgMusic = document.getElementById('bgMusic');
    let originalVolume = bgMusic ? bgMusic.volume : 0.3;

    // 平滑降低音乐音量
    function fadeOutMusic(targetVolume = 0.15, duration = 400) {
        if (!bgMusic || bgMusic.paused || bgMusic.muted) return;

        originalVolume = bgMusic.volume;
        const startVolume = bgMusic.volume;
        const volumeChange = targetVolume - startVolume;
        const steps = 20;
        const stepDuration = duration / steps;
        let currentStep = 0;

        const fadeInterval = setInterval(() => {
            currentStep++;
            const progress = currentStep / steps;
            bgMusic.volume = Math.max(0, Math.min(1, startVolume + volumeChange * progress));
            if (currentStep >= steps) clearInterval(fadeInterval);
        }, stepDuration);
    }

    // 平滑恢复音乐音量
    function fadeInMusic(duration = 500) {
        if (!bgMusic || bgMusic.paused || bgMusic.muted) return;

        const startVolume = bgMusic.volume;
        const volumeChange = originalVolume - startVolume;
        const steps = 20;
        const stepDuration = duration / steps;
        let currentStep = 0;

        const fadeInterval = setInterval(() => {
            currentStep++;
            const progress = currentStep / steps;
            bgMusic.volume = Math.max(0, Math.min(1, startVolume + volumeChange * progress));
            if (currentStep >= steps) clearInterval(fadeInterval);
        }, stepDuration);
    }

    // 获取要朗读的日文文本（去除振假名标记）
    function getJapaneseText() {
        const quote = getQuoteByOffset ? getQuoteByOffset(currentDayOffset || 0) : null;
        if (!quote) return '';

        if (quote.furigana) {
            return quote.furigana
                .replace(/\{([^\}]+)\}\[([^\]]+)\]/g, '$1')
                .replace(/([^\s\[\]{}<>]{1,4})\[([^\]]+)\]/g, '$1');
        }

        return quote.japanese || '';
    }

    // 移除原有的事件监听器并添加新的
    const newSpeakBtn = speakBtn.cloneNode(true);
    speakBtn.parentNode.replaceChild(newSpeakBtn, speakBtn);

    // 朗读按钮点击事件
    newSpeakBtn.addEventListener('click', async () => {
        if (isSpeaking) {
            // 停止朗读
            window.hybridTTS.stop();
            isSpeaking = false;
            newSpeakBtn.classList.remove('speaking');
            fadeInMusic(300);
            console.log('✓ 停止朗读');
            return;
        }

        // 获取日文文本
        const text = getJapaneseText();
        if (!text) {
            console.warn('⚠️ 没有可朗读的文本');
            return;
        }

        try {
            isSpeaking = true;
            newSpeakBtn.classList.add('speaking');
            fadeOutMusic(0.15, 400);
            console.log('开始朗读:', text);

            const result = await window.hybridTTS.speak(text);
            console.log(`✓ 朗读完成 (${result.method === 'voicevox' ? 'VOICEVOX' : '浏览器TTS'})`);

            isSpeaking = false;
            newSpeakBtn.classList.remove('speaking');
            fadeInMusic(500);

        } catch (error) {
            console.error('✗ 朗读失败:', error);
            isSpeaking = false;
            newSpeakBtn.classList.remove('speaking');
            fadeInMusic(300);
            alert('朗读失败，请重试');
        }
    });

    console.log('✓ 混合TTS已初始化');
});
