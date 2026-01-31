// 混合TTS模块：优先VOICEVOX，降级到Web Speech API
// 本地环境使用VOICEVOX（高音质），线上环境使用浏览器TTS

class HybridTTS {
    constructor() {
        this.voicevoxAvailable = null; // null=未检测, true=可用, false=不可用
        this.voicevoxURL = 'http://localhost:50021';
        this.defaultSpeaker = 8; // 春日部つむぎ - 温柔
        this.currentAudio = null;
        this.japaneseVoices = [];

        // 初始化Web Speech API语音
        this.loadBrowserVoices();
    }

    // 检测VOICEVOX是否可用
    async checkVoicevox() {
        if (this.voicevoxAvailable !== null) {
            return this.voicevoxAvailable;
        }

        try {
            const response = await fetch(`${this.voicevoxURL}/version`, {
                method: 'GET',
                signal: AbortSignal.timeout(1000) // 1秒超时
            });
            this.voicevoxAvailable = response.ok;
            console.log(this.voicevoxAvailable ?
                '✓ 使用 VOICEVOX（本地高音质）' :
                '✓ 使用浏览器 TTS');
        } catch (error) {
            this.voicevoxAvailable = false;
            console.log('✓ 使用浏览器 TTS（线上版本）');
        }

        return this.voicevoxAvailable;
    }

    // 加载浏览器语音列表
    loadBrowserVoices() {
        const loadVoices = () => {
            const voices = window.speechSynthesis.getVoices();
            this.japaneseVoices = voices.filter(voice =>
                voice.lang.startsWith('ja') || voice.lang === 'ja-JP'
            );

            // 优先选择女性声音
            const femaleKeywords = ['kyoko', 'haruka', 'female', 'ayumi', 'woman', '女'];
            this.japaneseVoices.sort((a, b) => {
                const aIsFemale = femaleKeywords.some(k => a.name.toLowerCase().includes(k));
                const bIsFemale = femaleKeywords.some(k => b.name.toLowerCase().includes(k));
                if (aIsFemale && !bIsFemale) return -1;
                if (!aIsFemale && bIsFemale) return 1;
                if (a.localService && !b.localService) return -1;
                if (!a.localService && b.localService) return 1;
                return 0;
            });
        };

        if (window.speechSynthesis.onvoiceschanged !== undefined) {
            window.speechSynthesis.onvoiceschanged = loadVoices;
        }
        loadVoices();
    }

    // 使用VOICEVOX朗读
    async speakWithVoicevox(text) {
        try {
            // 第一步：生成音频查询
            const queryResponse = await fetch(
                `${this.voicevoxURL}/audio_query?text=${encodeURIComponent(text)}&speaker=${this.defaultSpeaker}`,
                { method: 'POST', signal: AbortSignal.timeout(5000) }
            );

            if (!queryResponse.ok) throw new Error('音频查询失败');

            const audioQuery = await queryResponse.json();

            // 调整语速和音调
            audioQuery.speedScale = 0.85;
            audioQuery.pitchScale = 0.0;

            // 第二步：合成音频
            const synthesisResponse = await fetch(
                `${this.voicevoxURL}/synthesis?speaker=${this.defaultSpeaker}`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(audioQuery),
                    signal: AbortSignal.timeout(10000)
                }
            );

            if (!synthesisResponse.ok) throw new Error('音频合成失败');

            // 第三步：播放音频
            const audioBlob = await synthesisResponse.blob();
            const audioUrl = URL.createObjectURL(audioBlob);

            if (this.currentAudio) {
                this.currentAudio.pause();
            }

            this.currentAudio = new Audio(audioUrl);

            return new Promise((resolve, reject) => {
                this.currentAudio.onended = () => {
                    URL.revokeObjectURL(audioUrl);
                    this.currentAudio = null;
                    resolve();
                };

                this.currentAudio.onerror = (e) => {
                    URL.revokeObjectURL(audioUrl);
                    reject(new Error('音频播放失败'));
                };

                this.currentAudio.play().catch(reject);
            });

        } catch (error) {
            console.error('VOICEVOX朗读失败:', error);
            throw error;
        }
    }

    // 使用浏览器TTS朗读
    async speakWithBrowser(text) {
        return new Promise((resolve, reject) => {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'ja-JP';

            // 设置语音
            if (this.japaneseVoices.length > 0) {
                utterance.voice = this.japaneseVoices[0];
            }

            utterance.rate = 0.85;  // 语速
            utterance.pitch = 1.1;  // 音调
            utterance.volume = 1.0;

            utterance.onend = resolve;
            utterance.onerror = reject;

            window.speechSynthesis.speak(utterance);
        });
    }

    // 智能朗读：自动选择最佳方式
    async speak(text) {
        const useVoicevox = await this.checkVoicevox();

        try {
            if (useVoicevox) {
                await this.speakWithVoicevox(text);
            } else {
                await this.speakWithBrowser(text);
            }
            return { success: true, method: useVoicevox ? 'voicevox' : 'browser' };
        } catch (error) {
            // 如果VOICEVOX失败，尝试降级到浏览器TTS
            if (useVoicevox) {
                console.log('VOICEVOX失败，降级到浏览器TTS');
                try {
                    await this.speakWithBrowser(text);
                    return { success: true, method: 'browser' };
                } catch (browserError) {
                    throw browserError;
                }
            }
            throw error;
        }
    }

    // 停止朗读
    stop() {
        // 停止VOICEVOX音频
        if (this.currentAudio) {
            this.currentAudio.pause();
            this.currentAudio = null;
        }

        // 停止浏览器TTS
        if (window.speechSynthesis.speaking) {
            window.speechSynthesis.cancel();
        }
    }
}

// 导出单例
window.hybridTTS = new HybridTTS();
