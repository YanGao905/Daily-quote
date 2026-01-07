// 日剧经典台词数据库
// 每天一句，包含日文、中文翻译、图片、音乐和出处
const quotes = [
  {
    "id": 4,
    "japanese": "焦らなくていいの，自分のペースでいい",
    "chinese": "不用着急，按自己的节奏就好",
    "drama": "悠长假期",
    "year": 1996,
    "image": "images/1-1.png",
    "music": "music/long-vacation.mp3"
  },
  {
    "id": 5,
    "japanese": "何もしない時間って、大事だと思う",
    "chinese": "什么都不做的时间，其实很重要",
    "drama": "悠长假期",
    "year": 1996,
    "image": "images/1-3.png",
    "music": "music/long-vacation.mp3"
  },
  {
    "id": 6,
    "japanese": "ここに来れば、誰かがいる",
    "chinese": "只要来这里，就一定有人在",
    "drama": "深夜食堂",
    "year": 2009,
    "image": "images/2-1.png"
  },
  {
    "id": 7,
    "japanese": "一人で食べる夜も、悪くない",
    "chinese": "一个人吃饭的夜晚，也不算坏",
    "drama": "深夜食堂",
    "year": 2009,
    "image": "images/2-4.png"
  },
  {
    "id": 8,
    "japanese": "今日もお疲れさま",
    "chinese": "今天也辛苦了",
    "drama": "深夜食堂",
    "year": 2009,
    "image": "images/2-3.png"
  },
  {
    "id": 9,
    "japanese": "人は、食べながら元気になる",
    "chinese": "人啊，是一边吃一边恢复精神的",
    "drama": "深夜食堂",
    "year": 2009,
    "image": "images/2-5.png"
  },
  {
    "id": 10,
    "japanese": "腹いっぱいになると、心も落ち着く",
    "chinese": "吃饱了，心也会安静下来",
    "drama": "深夜食堂",
    "year": 2009,
    "image": "images/2-2.png"
  },
  {
    "id": 11,
    "japanese": "意味がなくても、好きでいい",
    "chinese": "就算没有意义，也可以喜欢",
    "drama": "我们由奇迹构成",
    "year": 2018,
    "image": "images/3-1.png"
  },
  {
    "id": 12,
    "japanese": "分かってもらえなくても、間違いじゃない",
    "chinese": "不被理解，也不代表你是错的",
    "drama": "我们由奇迹构成",
    "year": 2018,
    "image": "images/3-2.png"
  },
  {
    "id": 13,
    "japanese": "できないことがあっても、価値は変わらない",
    "chinese": "就算有做不到的事，价值也不会改变",
    "drama": "我们由奇迹构成",
    "year": 2018,
    "image": "images/3-3.png"
  },
  {
    "id": 14,
    "japanese": "自分を諦めないって、大事",
    "chinese": "不放弃自己，很重要",
    "drama": "垫底辣妹",
    "year": 2014,
    "image": "images/4-1.png"
  },
  {
    "id": 15,
    "japanese": "信じてくれる人が一人いれば、人は変われる",
    "chinese": "只要有一个人相信你，人就能改变",
    "drama": "垫底辣妹",
    "year": 2015,
    "image": "images/4-2.png"
  },
  {
    "id": 16,
    "japanese": "今日からでも、人生は変えられる",
    "chinese": "就算从今天开始，人生也能改变",
    "drama": "垫底辣妹",
    "year": 2015,
    "image": "images/4-3.png"
  },
  {
    "id": 17,
    "japanese": "そばにいるだけで、救われることもある",
    "chinese": "そばにいるだけで、救われることもある",
    "drama": "海街日记",
    "year": 2015,
    "image": "images/5-1.png"
  },
  {
    "id": 18,
    "japanese": "何気ない毎日が、いちばん大事",
    "chinese": "平凡的每一天，才最重要",
    "drama": "海街日记",
    "year": 2015,
    "image": "images/5-2.png"
  },
  {
    "id": 19,
    "japanese": "過去は消えないけど、薄くなる",
    "chinese": "过去不会消失，但会慢慢变淡",
    "drama": "海街日记",
    "year": 2015,
    "image": "images/5-3.png"
  },
  {
    "id": 20,
    "japanese": "人生は思っているより、やり直せる",
    "chinese": "人生比想象中更能重来",
    "drama": "重启人生",
    "year": 2023,
    "image": "images/6-1.png"
  },
  {
    "id": 21,
    "japanese": "何も起きない日が、いちばん幸せ",
    "chinese": "什么都没发生的一天，反而最幸福",
    "drama": "重启人生",
    "year": 2023,
    "image": "images/6-2.png"
  },
  {
    "id": 22,
    "japanese": "今日も無事だった、それでいい",
    "chinese": "今天平安无事，这样就够了",
    "drama": "重启人生",
    "year": 2023,
    "image": "images/6-3.png"
  },
  {
    "id": 23,
    "japanese": "人生って、クリアするものじゃない",
    "chinese": "人生不是用来通关的",
    "drama": "重启人生",
    "year": 2023,
    "image": "images/6-4.png",
    "music": "music/long-vacation.mp3"
  },
  {
    "id": 24,
    "japanese": "人生には三つの坂がある，上り坂、下り坂、まさか",
    "chinese": "人生有三种坡：上坡、下坡、没想到",
    "drama": "四重奏",
    "year": 2017,
    "image": "images/7-1.png"
  },
  {
    "id": 25,
    "japanese": "大人だって、寂しいんですよ",
    "chinese": "就算是大人，也会孤独",
    "drama": "四重奏",
    "year": 2017,
    "image": "images/7-2.png"
  },
  {
    "id": 26,
    "japanese": "幸せって、静かに来るもの",
    "chinese": "幸福是悄悄到来的",
    "drama": "四重奏",
    "year": 2017,
    "image": "images/7-3.png"
  },
  {
    "id": 27,
    "japanese": "泣きながらご飯を食べたことがある人は、生きていけます",
    "chinese": "能一边哭一边吃饭的人，是可以活下去的",
    "drama": "四重奏",
    "year": 2017,
    "image": "images/7-4.png"
  },
  {
    "id": 28,
    "japanese": "食べるって、大事だ",
    "chinese": "吃饭这件事，很重要",
    "drama": "孤独的美食家",
    "year": 2012,
    "image": "images/8-1.png"
  },
  {
    "id": 30,
    "japanese": "言い訳にも、理由がある",
    "chinese": "借口也是有理由的",
    "drama": "我的事说来话长",
    "year": 2019,
    "image": "images/9-2.png"
  },
  {
    "id": 32,
    "japanese": "人生には、長い休みが必要な時もあるのよ",
    "chinese": "人生啊，也会有需要放长假的时候",
    "drama": "悠长假期",
    "year": 1996,
    "image": "images/1-2.png",
    "music": "music/long-vacation.mp3"
  },
  {
    "id": 33,
    "japanese": "頑張らないって、難しい",
    "chinese": "不努力，其实也很难",
    "drama": "我家的事说来话长",
    "year": 2019,
    "image": "images/9-3.png"
  },
  {
    "id": 34,
    "japanese": "ちゃんと悩んでる人は、ちゃんとしてる",
    "chinese": "能认真烦恼的人，本身就很认真",
    "drama": "我家的事说来话长",
    "year": 2019,
    "image": "images/9-1.png"
  }
];
