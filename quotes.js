// 日剧经典台词数据库
const quotes = [
  {
    "id": 36,
    "japanese": "ここに来れば、誰かがいる",
    "chinese": "只要来这里，就一定有人在",
    "drama": "深夜食堂",
    "year": 2009,
    "image": "images/2-1.png",
    "music": "music/midnight-diner.mp3"
  },
  {
    "id": 32,
    "japanese": "人生には、長い休みが必要な時もあるのよ",
    "chinese": "人生啊，也会有需要放长假的时候",
    "drama": "悠长假期",
    "year": 1996,
    "image": "images/1-2.png",
    "music": "music/long-vacation.mp3",
    "isDefault": true
  },
  {
    "id": 37,
    "japanese": "一人で食べる夜も、悪くない",
    "chinese": "一个人吃饭的夜晚，也不算坏",
    "drama": "深夜食堂",
    "year": 2009,
    "image": "images/2-4.png",
    "music": "music/midnight-diner.mp3"
  },
  {
    "id": 38,
    "japanese": "今日もお疲れさま",
    "chinese": "今天也辛苦了",
    "drama": "深夜食堂",
    "year": 2009,
    "image": "images/2-3.png",
    "music": "music/midnight-diner.mp3"
  },
  {
    "id": 39,
    "japanese": "人は、食べながら元気になる",
    "chinese": "人啊，是一边吃一边恢复精神的",
    "drama": "深夜食堂",
    "year": 2009,
    "image": "images/2-5.png",
    "music": "music/midnight-diner.mp3"
  },
  {
    "id": 40,
    "japanese": "腹いっぱいになると、心も落ち着く",
    "chinese": "吃饱了，心也会安静下来",
    "drama": "深夜食堂",
    "year": 2009,
    "image": "images/2-2.png",
    "music": "music/midnight-diner.mp3"
  },
  {
    "id": 41,
    "japanese": "意味がなくても、好きでいい",
    "chinese": "就算没有意义，也可以喜欢",
    "drama": "我们由奇迹构成",
    "year": 2018,
    "image": "images/3-1.png",
    "music": "music/magic.mp3"
  },
  {
    "id": 42,
    "japanese": "分かってもらえなくても、間違いじゃない",
    "chinese": "不被理解，也不代表你是错的",
    "drama": "我们由奇迹构成",
    "year": 2018,
    "image": "images/3-2.png",
    "music": "music/magic.mp3"
  },
  {
    "id": 43,
    "japanese": "できないことがあっても、価値は変わらない",
    "chinese": "就算有做不到的事，价值也不会改变",
    "drama": "我们由奇迹构成",
    "year": 2018,
    "image": "images/3-3.png",
    "music": "music/magic.mp3"
  },
  {
    "id": 44,
    "japanese": "自分を諦めないって、大事",
    "chinese": "不放弃自己，很重要",
    "drama": "垫底辣妹",
    "year": 2014,
    "image": "images/4-1.png",
    "music": "music/biri-girl.mp3"
  },
  {
    "id": 45,
    "japanese": "信じてくれる人が一人いれば、人は変われる",
    "chinese": "只要有一个人相信你，人就能改变",
    "drama": "垫底辣妹",
    "year": 2015,
    "image": "images/4-2.png",
    "music": "music/biri-girl.mp3"
  },
  {
    "id": 46,
    "japanese": "今日からでも、人生は変えられる",
    "chinese": "就算从今天开始，人生也能改变",
    "drama": "垫底辣妹",
    "year": 2015,
    "image": "images/4-3.png",
    "music": "music/biri-girl.mp3"
  },
  {
    "id": 47,
    "japanese": "何気ない毎日が、いちばん大事",
    "chinese": "平凡的每一天，才最重要",
    "drama": "海街日记",
    "year": 2015,
    "image": "images/5-2.png",
    "music": "music/umimachi-diary.mp3"
  },
  {
    "id": 48,
    "japanese": "過去は消えないけど、薄くなる",
    "chinese": "过去不会消失，但会慢慢变淡",
    "drama": "海街日记",
    "year": 2015,
    "image": "images/5-3.png",
    "music": "music/umimachi-diary.mp3"
  },
  {
    "id": 50,
    "japanese": "人生は思っているより、やり直せる",
    "chinese": "人生比想象中更能重来",
    "drama": "重启人生",
    "year": 2023,
    "image": "images/6-1.png",
    "music": "music/reborn.mp3"
  },
  {
    "id": 51,
    "japanese": "何も起きない日が、いちばん幸せ",
    "chinese": "什么都没发生的一天，反而最幸福",
    "drama": "重启人生",
    "year": 2023,
    "image": "images/6-2.png",
    "music": "music/reborn.mp3"
  },
  {
    "id": 52,
    "japanese": "今日も無事だった、それでいい",
    "chinese": "今天平安无事，这样就够了",
    "drama": "重启人生",
    "year": 2023,
    "image": "images/6-3.png",
    "music": "music/reborn.mp3"
  },
  {
    "id": 53,
    "japanese": "人生って、クリアするものじゃない",
    "chinese": "人生不是用来通关的",
    "drama": "重启人生",
    "year": 2023,
    "image": "images/6-4.png",
    "music": "music/reborn.mp3"
  },
  {
    "id": 54,
    "japanese": "人生には三つの坂がある，上り坂、下り坂、まさか",
    "chinese": "人生有三种坡：上坡、下坡、没想到",
    "drama": "四重奏",
    "year": 2017,
    "image": "images/7-1.png",
    "music": "music/quartet.mp3"
  },
  {
    "id": 55,
    "japanese": "大人だって、寂しいんですよ",
    "chinese": "就算是大人，也会孤独",
    "drama": "四重奏",
    "year": 2017,
    "image": "images/7-2.png",
    "music": "music/quartet.mp3"
  },
  {
    "id": 56,
    "japanese": "幸せって、静かに来るもの",
    "chinese": "幸福是悄悄到来的",
    "drama": "四重奏",
    "year": 2017,
    "image": "images/7-3.png",
    "music": "music/quartet.mp3"
  },
  {
    "id": 57,
    "japanese": "泣きながらご飯を食べたことがある人は、生きていけます",
    "chinese": "能一边哭一边吃饭的人，是可以活下去的",
    "drama": "四重奏",
    "year": 2017,
    "image": "images/7-4.png",
    "music": "music/quartet.mp3"
  },
  {
    "id": 58,
    "japanese": "食べるって、大事だ",
    "chinese": "吃饭这件事，很重要",
    "drama": "孤独的美食家",
    "year": 2012,
    "image": "images/8-1.png",
    "music": "music/Lonely-gourmet.mp3"
  },
  {
    "id": 59,
    "japanese": "言い訳にも、理由がある",
    "chinese": "借口也是有理由的",
    "drama": "我的事说来话长",
    "year": 2019,
    "image": "images/9-2.png",
    "music": "music/my-family.mp3"
  },
  {
    "id": 60,
    "japanese": "頑張らないって、難しい",
    "chinese": "不努力，其实也很难",
    "drama": "我家的事说来话长",
    "year": 2019,
    "image": "images/9-3.png",
    "music": "music/my-family.mp3"
  },
  {
    "id": 61,
    "japanese": "ちゃんと悩んでる人は、ちゃんとしてる",
    "chinese": "能认真烦恼的人，本身就很认真",
    "drama": "我家的事说来话长",
    "year": 2019,
    "image": "images/9-1.png",
    "music": "music/my-family.mp3"
  },
  {
    "id": 62,
    "japanese": "逃げてもいい。生き抜くことのほうが大切だ",
    "chinese": "逃也没关系，活下去更重要",
    "drama": "逃避可耻但有用",
    "year": 2016,
    "image": "images/10-1.png",
    "music": "music/the-full-time-wife-escapist.mp3"
  },
  {
    "id": 63,
    "japanese": "かわいいは最強なんです",
    "chinese": "可爱就是最强的",
    "drama": "逃避可耻但有用",
    "year": 2016,
    "image": "images/10-2.png",
    "music": "music/the-full-time-wife-escapist.mp3"
  },
  {
    "id": 64,
    "japanese": "大切な人から逃げてはだめだ",
    "chinese": "别从重要的人身边逃开",
    "drama": "逃避可耻但有用",
    "year": 2016,
    "image": "images/10-3.png",
    "music": "music/the-full-time-wife-escapist.mp3"
  },
  {
    "id": 66,
    "japanese": "すぐに結果に結びつかなくても、後から出る努力もある",
    "chinese": "有些努力不是立刻见效，是后来才兑现。",
    "drama": "短剧开始啦",
    "year": 2021,
    "image": "images/11-1.png",
    "music": "music/short-drama-starts.mp3"
  },
  {
    "id": 67,
    "japanese": "いっぱい笑って終わろ，悔いのないように",
    "chinese": "好好笑着结束吧，别留下遗憾",
    "drama": "短剧开始啦",
    "year": 2021,
    "image": "images/11-2.png",
    "music": "music/short-drama-starts.mp3"
  },
  {
    "id": 68,
    "japanese": "動き出すきっかけになれば、それでいい",
    "chinese": "只要能成为你开始行动的契机，就够了",
    "drama": "短剧开始啦",
    "year": 2021,
    "image": "images/11-3.png",
    "music": "music/short-drama-starts.mp3"
  },
  {
    "id": 69,
    "japanese": "真実は一つなんかじゃない。でも、事実は一つです。",
    "chinese": "真相不是唯一的，但事实只有一个",
    "drama": "勿言推理",
    "year": 2022,
    "image": "images/12-1.png",
    "music": "music/no-talk.mp3"
  },
  {
    "id": 70,
    "japanese": "普通って、誰が決めるんですか",
    "chinese": "\"普通\"是谁决定的",
    "drama": "勿言推理",
    "year": 2022,
    "image": "images/12-2.png",
    "music": "music/short-drama-starts.mp3"
  },
  {
    "id": 71,
    "japanese": "好きで、大切なものほど、摂取するのは元気な時にしたい",
    "chinese": "越是喜欢、越珍贵的东西，越想在自己有力气时去享受",
    "drama": "花束般的恋爱",
    "year": 2021,
    "image": "images/13-1.png",
    "music": "music/flower-love.mp3"
  },
  {
    "id": 72,
    "japanese": "タイトルそのものが、名言みたい",
    "chinese": "光是片名本身，就像一句名言",
    "drama": "花束般的恋爱",
    "year": 2021,
    "image": "images/13-2.png",
    "music": "music/flower-love.mp3"
  },
  {
    "id": 73,
    "japanese": "終わりがあっても、意味は消えない",
    "chinese": "即使结束了，意义也不会消失",
    "drama": "花束般的恋爱",
    "year": 2021,
    "image": "images/13-3.png",
    "music": "music/flower-love.mp3"
  },
  {
    "id": 74,
    "japanese": "あの頃は 確かに幸せだった",
    "chinese": "那时候确实幸福过",
    "drama": "花束般的恋爱",
    "year": 2021,
    "image": "images/13-4.png",
    "music": "music/flower-love.mp3"
  },
  {
    "id": 75,
    "japanese": "変わっていくのは、悪いことじゃない",
    "chinese": "变了也不是坏事",
    "drama": "花束般的恋爱",
    "year": 2021,
    "image": "images/13-5.png",
    "music": "music/flower-love.mp3"
  },
  {
    "id": 76,
    "japanese": "会いたいって思うことが恋",
    "chinese": "想见面，这就是恋爱",
    "drama": "恋爱世纪",
    "year": 1997,
    "image": "images/14-1.png",
    "music": "music/love-century.mp3"
  },
  {
    "id": 77,
    "japanese": "哲平は、好き好き好きだ",
    "chinese": "哲平，喜欢喜欢喜欢你！",
    "drama": "恋爱世纪",
    "year": 1997,
    "image": "images/14-2.png",
    "music": "music/love-century.mp3"
  },
  {
    "id": 78,
    "japanese": "幸せって、好きな人がいるってこと",
    "chinese": "幸福就是：有一个喜欢的人",
    "drama": "恋爱世纪",
    "year": 1997,
    "image": "images/14-3.png",
    "music": "music/love-century.mp3"
  },
  {
    "id": 80,
    "japanese": "一人で生きていけるけど…（その先は分からない）。",
    "chinese": "我能一个人活下去，但……（后面的事谁也说不准）",
    "drama": "大豆田永久子和三名前夫",
    "year": 2021,
    "image": "images/15-3.png",
    "music": "music/ex-husband.mp3"
  },
  {
    "id": 83,
    "japanese": "幸せを諦めない",
    "chinese": "我不放弃幸福",
    "drama": "大豆田永久子和三名前夫",
    "year": 2021,
    "image": "images/15-5.png",
    "music": "music/ex-husband.mp3"
  },
  {
    "id": 84,
    "japanese": "生きてりゃ何回でも勝つチャンスがある",
    "chinese": "只要活着，就还有无数次赢的机会",
    "drama": "MIU404",
    "year": 2020,
    "image": "images/16-1.png",
    "music": "music/MIU404.mp3"
  },
  {
    "id": 85,
    "japanese": "無事に帰るのが仕事",
    "chinese": "平安回来，就是工作",
    "drama": "MIU404",
    "year": 2020,
    "image": "images/16-2.png",
    "music": "music/MIU404.mp3"
  },
  {
    "id": 86,
    "japanese": "あのー、実は俺、宇宙人なのね",
    "chinese": "那个……其实我，是外星人",
    "drama": "热点",
    "year": 2025,
    "image": "images/17-1.png",
    "music": "music/hot-spot.mp3"
  },
  {
    "id": 87,
    "japanese": "地球って、たいへんですね",
    "chinese": "地球，真的很辛苦呢",
    "drama": "热点",
    "year": 2025,
    "image": "images/17-4.png",
    "music": "music/hot-spot.mp3"
  },
  {
    "id": 88,
    "japanese": "本来、私が言うことじゃないんですけど",
    "chinese": "其实这件事不该我来说的……",
    "drama": "热点",
    "year": 2025,
    "image": "images/17-5.png",
    "music": "music/hot-spot.mp3"
  },
  {
    "id": 90,
    "japanese": "僕の星では、そんなことしません",
    "chinese": "在我们星球，不这么搞",
    "drama": "热点",
    "year": 2025,
    "image": "images/17-3.png",
    "music": "music/hot-spot.mp3"
  },
  {
    "id": 93,
    "japanese": "言葉足らずが、悲劇の引き金になる",
    "chinese": "话说不够，常常就是悲剧的导火索",
    "drama": "凪的新生活",
    "year": 2019,
    "image": "images/18-5.png",
    "music": "music/new-life.mp3"
  },
  {
    "id": 94,
    "japanese": "キライなことを口に出して自覚すると、ラクになることもある",
    "chinese": "把讨厌的事说出来并承认，有时反而轻松",
    "drama": "凪的新生活",
    "year": 2019,
    "image": "images/18-3.png",
    "music": "music/new-life.mp3"
  },
  {
    "id": 95,
    "japanese": "ちゃんと疲れてる自分を、ちゃんと認めたい",
    "chinese": "我想好好承认：自己是真的累了",
    "drama": "凪的新生活",
    "year": 2019,
    "image": "images/18-2.png",
    "music": "music/new-life.mp3"
  },
  {
    "id": 97,
    "japanese": "あの頃は、もっと良くなると思ってた",
    "chinese": "那时候啊，我们以为一切会变好",
    "drama": "热点",
    "year": 2025,
    "image": "images/17-2.png",
    "music": "music/hot-spot.mp3"
  },
  {
    "id": 100,
    "japanese": "しばしお暇いただきます",
    "chinese": "我先请个\"暂时的假\"",
    "drama": "凪的新生活",
    "year": 2019,
    "image": "images/18-1.png",
    "music": "music/new-life.mp3"
  },
  {
    "id": 101,
    "japanese": "空気は読むものじゃなくて、吸って吐くものだ",
    "chinese": "空气不是用来读的，是用来吸和呼的",
    "drama": "凪的新生活",
    "year": 2019,
    "image": "images/18-6.png",
    "music": "music/new-life.mp3"
  },
  {
    "id": 102,
    "japanese": "無理しないって、練習がいる",
    "chinese": "不勉强自己，其实也是需要练习的",
    "drama": "凪的新生活",
    "year": 2019,
    "image": "images/18-4.png",
    "music": "music/new-life.mp3"
  },
  {
    "id": 104,
    "japanese": "100円拾って使うのは犯罪だけど、100回離婚したって犯罪じゃない",
    "chinese": "捡到 100 日元花掉是犯罪，但离婚 100 次不算犯罪",
    "drama": "大豆田永久子和三名前夫",
    "year": 2021,
    "image": "images/15-8.png",
    "music": "music/ex-husband.mp3"
  },
  {
    "id": 105,
    "japanese": "人生に失敗はあったって、失敗した人生なんてない",
    "chinese": "人生会失败，但不存在\"失败的人生\"",
    "drama": "大豆田永久子和三名前夫",
    "year": 2021,
    "image": "images/15-9.png",
    "music": "music/ex-husband.mp3"
  },
  {
    "id": 106,
    "japanese": "無理に仲良くならなくてもいい",
    "chinese": "不用勉强自己和谁变得亲密",
    "drama": "西瓜",
    "year": 2003,
    "image": "images/20-1.png",
    "music": "music/watermelon.mp3"
  }
];

// 首次使用用户的精选内容ID（今天 + 过去6天）
// offset 0: 今天(1.8), -1: 昨天(1.7), -2: 前天(1.6), ..., -6: 第7天(1.2)
const firstTimeQuoteIds = [
  32,  // 1月9日（offset 0）- 悠长假期：人生啊，也会有需要放长假的时候
  36,  // 1月8日（offset -1）- 深夜食堂：只要来这里，就一定有人在
  41,  // 1月7日（offset -2）- 我们由奇迹构成：就算没有意义，也可以喜欢
  44,  // 1月6日（offset -3）- 垫底辣妹：不放弃自己，很重要
  47,  // 1月5日（offset -4）- 海街日记：平凡的每一天，才最重要
  50,  // 1月4日（offset -5）- 重启人生：人生比想象中更能重来
  54   // 1月3日（offset -6）- 四重奏：人生有三种坡：上坡、下坡、没想到
];
