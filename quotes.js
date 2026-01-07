// 日剧经典台词数据库
// 每天一句，包含日文、中文翻译、图片、音乐和出处
const quotes = [
    {
        id: 1,
        japanese: "人生にはね、長い休みが必要な時もあるのよ",
        chinese: "人生啊，也会有需要放长假的时候",
        drama: "悠长假期",
        year: 1996,
        image: "images/1-1.png",
        music: "music/long-vacation.mp3"
    },
    {
        id: 2,
        japanese: "会いたくて会いたくて震える",
        chinese: "想见你想见你想见你到颤抖",
        drama: "东京爱情故事",
        year: 1991,
        image: "images/2-1.png"
    },
    {
        id: 3,
        japanese: "愛してると言ってくれ",
        chinese: "请对我说爱我",
        drama: "请对我说爱我",
        year: 1995,
        image: "images/3-1.png"
    },
    {
        id: 4,
        japanese: "一番大切なのは、自分を信じること",
        chinese: "最重要的是，相信自己",
        drama: "龙樱",
        year: 2005,
        image: "images/4-1.png"
    },
    {
        id: 5,
        japanese: "人は見た目が100パーセント",
        chinese: "人靠外表100%",
        drama: "人靠外表100%",
        year: 2017,
        image: "images/5-1.png"
    },
    {
        id: 6,
        japanese: "逃げるは恥だが役に立つ",
        chinese: "逃避虽可耻但有用",
        drama: "逃避虽可耻但有用",
        year: 2016,
        image: "images/6-1.png"
    },
    {
        id: 7,
        japanese: "好きな人がいること",
        chinese: "有喜欢的人",
        drama: "有喜欢的人",
        year: 2016,
        image: "images/7-1.png"
    },
    {
        id: 8,
        japanese: "あなたには帰る家がある",
        chinese: "你有家可归",
        drama: "你有家可归",
        year: 2018,
        image: "images/8-1.png"
    },
    {
        id: 9,
        japanese: "最高の離婚",
        chinese: "最完美的离婚",
        drama: "最完美的离婚",
        year: 2013,
        image: "images/9-1.png"
    },
    {
        id: 10,
        japanese: "カルテット",
        chinese: "四重奏",
        drama: "四重奏",
        year: 2017,
        image: "images/10-1.png"
    },
    {
        id: 11,
        japanese: "未来は明るいと思える人が、未来を明るくする",
        chinese: "认为未来光明的人，才能照亮未来",
        drama: "半泽直树",
        year: 2013,
        image: "images/11-1.png"
    },
    {
        id: 12,
        japanese: "一緒にいると温かい",
        chinese: "在一起就感到温暖",
        drama: "温柔时刻",
        year: 2005,
        image: "images/12-1.png"
    },
    {
        id: 13,
        japanese: "世界の中心で、愛をさけぶ",
        chinese: "在世界中心呼唤爱",
        drama: "在世界中心呼唤爱",
        year: 2004,
        image: "images/13-1.png"
    },
    {
        id: 14,
        japanese: "人生は美しい",
        chinese: "人生是美丽的",
        drama: "美丽人生",
        year: 2000,
        image: "images/14-1.png"
    },
    {
        id: 15,
        japanese: "一番大事なものは、目に見えない",
        chinese: "最重要的东西，眼睛是看不见的",
        drama: "小王子",
        year: 2014,
        image: "images/15-1.png"
    },
    {
        id: 16,
        japanese: "明日、私は誰かのカノジョ",
        chinese: "明天，我要做某人的女友",
        drama: "明天，我要做某人的女友",
        year: 2022,
        image: "images/16-1.png"
    },
    {
        id: 17,
        japanese: "恋はつづくよどこまでも",
        chinese: "恋爱可以持续到天长地久",
        drama: "恋爱可以持续到天长地久",
        year: 2020,
        image: "images/17-1.png"
    },
    {
        id: 18,
        japanese: "アンナチュラル",
        chinese: "非自然死亡",
        drama: "非自然死亡",
        year: 2018,
        image: "images/18-1.png"
    },
    {
        id: 19,
        japanese: "凪のお暇",
        chinese: "风平浪静的闲暇",
        drama: "风平浪静的闲暇",
        year: 2019,
        image: "images/19-1.png"
    },
    {
        id: 20,
        japanese: "重版出来！",
        chinese: "重版出来！",
        drama: "重版出来！",
        year: 2016,
        image: "images/20-1.png"
    },
    {
        id: 21,
        japanese: "私の家政夫ナギサさん",
        chinese: "我的家政夫渚先生",
        drama: "我的家政夫渚先生",
        year: 2020,
        image: "images/21-1.png"
    },
    {
        id: 22,
        japanese: "昨日何食べた？",
        chinese: "昨日的美食",
        drama: "昨日的美食",
        year: 2019,
        image: "images/22-1.png"
    },
    {
        id: 23,
        japanese: "リーガルハイ",
        chinese: "Legal High",
        drama: "Legal High",
        year: 2012,
        image: "images/23-1.png"
    },
    {
        id: 24,
        japanese: "大豆田とわ子と三人の元夫",
        chinese: "大豆田永久子与三名前夫",
        drama: "大豆田永久子与三名前夫",
        year: 2021,
        image: "images/24-1.png"
    },
    {
        id: 25,
        japanese: "コウノドリ",
        chinese: "产科医鸿鸟",
        drama: "产科医鸿鸟",
        year: 2015,
        image: "images/25-1.png"
    },
    {
        id: 26,
        japanese: "ドクターX",
        chinese: "派遣女医X",
        drama: "派遣女医X",
        year: 2012,
        image: "images/26-1.png"
    },
    {
        id: 27,
        japanese: "コンフィデンスマンJP",
        chinese: "行骗天下JP",
        drama: "行骗天下JP",
        year: 2018,
        image: "images/27-1.png"
    },
    {
        id: 28,
        japanese: "MIU404",
        chinese: "MIU404",
        drama: "MIU404",
        year: 2020,
        image: "images/28-1.png"
    },
    {
        id: 29,
        japanese: "dele",
        chinese: "dele删除人生",
        drama: "dele删除人生",
        year: 2018,
        image: "images/29-1.png"
    },
    {
        id: 30,
        japanese: "俺の話は長い",
        chinese: "我的话很长",
        drama: "我的话很长",
        year: 2019,
        image: "images/30-1.png"
    },
    {
        id: 31,
        japanese: "愛の不時着",
        chinese: "爱的迫降",
        drama: "爱的迫降",
        year: 2019,
        image: "images/31-1.png"
    }
];
