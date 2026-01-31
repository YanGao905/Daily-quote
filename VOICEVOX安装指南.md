# VOICEVOX 安装指南 (macOS)

## 📥 下载安装

### 方法1：直接下载（推荐）
1. 访问官网：https://voicevox.hiroshiba.jp/
2. 点击「無料ダウンロード」（免费下载）
3. 选择 macOS 版本下载
4. 下载完成后，打开 .dmg 文件
5. 将 VOICEVOX 拖到 Applications 文件夹
6. 打开 VOICEVOX 应用

### 方法2：使用 Homebrew
```bash
brew install --cask voicevox
```

## 🚀 启动 VOICEVOX

1. 打开 VOICEVOX 应用
2. 首次启动会下载语音模型（需要几分钟）
3. 看到主界面后，VOICEVOX 就已经在后台运行 API 服务了
4. 默认 API 地址：http://localhost:50021

## ✅ 测试 API 是否正常

打开终端，运行：
```bash
curl http://localhost:50021/speakers
```

如果返回一串 JSON 数据（包含角色列表），说明安装成功！

## 🎤 可用的角色声音

- **四国めたん (Metan)** - speaker=2 - 甜美可爱
- **ずんだもん (Zundamon)** - speaker=3 - 活泼萌系  
- **春日部つむぎ (Tsumugi)** - speaker=8 - 温柔
- **雨晴はう (Hau)** - speaker=10 - 元气少女
- **波音リツ (Ritsu)** - speaker=9 - 成熟女性

## 💡 使用提示

- VOICEVOX 必须保持运行状态，网页才能调用语音
- 可以最小化到后台运行
- 占用内存约 500MB-1GB
- 完全免费，无需注册

## ❓ 如果遇到问题

1. 确保 VOICEVOX 应用正在运行
2. 检查防火墙是否阻止了 localhost 连接
3. 重启 VOICEVOX 应用
4. 查看官方文档：https://github.com/VOICEVOX/voicevox

---

安装完成后，回到网页应用，点击朗读按钮即可使用动漫声音！
