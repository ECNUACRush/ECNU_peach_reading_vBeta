// pages/allcourse/allcourse.js
var app = getApp()
Page({
  data: {
    /** 
        * 页面配置 
        */
    winWidth: 0,
    winHeight: 0,

    swiperCurrent: 0,
    indicatorDots: true,
    autoplay: true,
    interval: 6000,
    duration: 800,
    circular: true,
    // tab切换  
    currentTab: 0,
    inputShowed: false,
    inputVal: "",
    beforeColor: "rgba(255,255,255,.3)",
    /*imgUrls: [
      'https://i.loli.net/2019/03/18/5c8ee04809c12.jpg',
      'https://i.loli.net/2019/03/18/5c8ee09ca123c.jpg',
      'https://i.loli.net/2019/03/18/5c8ee0b1bfda9.jpg'
    ],*/
    imgUrls: [
      'https://www.peachreading.cn/student/img?imgname=mofaqinqin.jpg',
      'https://www.peachreading.cn/student/img?imgname=zaisenlinli.jpg',
      'https://www.peachreading.cn/student/img?imgname=milidemaozi.jpg'
    ],
    item: [{
      courseid: '0',
      img_url: 'https://www.peachreading.cn/student/img?imgname=mofaqinqin.jpg',
      title: '《魔法亲亲》',
      username: '奥黛丽.潘恩',
      introduction: '故事说的是小浣熊Chester不愿意去上学，因为他不愿意离开妈妈去一个陌生的环境，妈妈向他保证，他一定会喜欢新学校，并告诉他一个秘密：“the kissing hand”.'
    }
    ],
    items_1: [{
      courseid: '1',
      img_url: 'https://www.peachreading.cn/student/img?imgname=mofaqinqin.jpg',
      title: '《魔法亲亲》',
      username: '奥黛丽.潘恩',
      introduction: '故事说的是小浣熊Chester不愿意去上学，因为他不愿意离开妈妈去一个陌生的环境，妈妈向他保证，他一定会喜欢新学校，并告诉他一个秘密：“the kissing hand”.'
    }
    ],
    items_2: [{
      courseid: '2',
      img_url: 'https://www.peachreading.cn/student/img?imgname=yujiushiyu.jpg',
      title: '《鱼就是鱼》',
      username: '玛丽.荷.艾斯',
      introduction: '这是一本富有童趣的书。封面和封底拉开是一幅画。这是一场男孩的想象游戏。小男孩一个人独自到森林里去散步，先后遇到了狮子，大象，棕熊，袋鼠，鹳，猴子，猴子和小兔子，在小男孩的召唤下，大家在森林举行了盛大的游行，还一起开party，做游戏。真是一段快乐的童年时光。'
    }
    ],
    items_3: [{
      courseid: '3',
      img_url: 'https://www.peachreading.cn/student/img?imgname=milidemaozi.jpg',
      title: '《米莉的帽子变变变》',
      username: '喜多村惠',
      introduction: '这是一本需要带着想象力阅读的图画书。小女孩米莉放学回家，路过一家商店，看见她最喜欢的一顶插着彩色羽毛的帽子。她没有足够的钱把它带回家，可是她却借用想象力，一路玩得超级开心和满足。故事里的大人也超级可爱，配合着小女孩完成这样一个想象的游戏。'
    }
    ]
    ,
    items_4: [{
      courseid: '4',
      img_url: 'https://www.peachreading.cn/student/img?imgname=chidaodawang.jpg',
      title: '《迟到大王》',
      username: '约翰·柏林罕',
      introduction: '约翰派克罗门麦肯席每天背着书包走路去上学。可是，这天一只鳄鱼突然从下水道里钻了出来，一口咬住了他的书包。让他上学迟到了。可老师怎么也不相信上学路上会有鳄鱼，于是罚他写三百遍：“我不可以说有鳄鱼的谎，也不可以把手套弄丢”，可是第二次，第三次又出现了狮子，巨浪……老师一次比一次愤怒，惩罚也一次比一次厉害。最后，终于有一天，约翰派克罗门麦肯席准时到校了，可老师被一只大猩猩抓到屋顶，喊约翰派克罗门麦肯席救他，可约翰派克罗门麦肯席却说：“老师，这附近哪里会有什么毛茸茸的大猩猩！”'
    },
    ]
  },

  go1: function () {
    wx.switchTab({
      url: '../me/me'
    })
  },


  onLoad: function (e) {
    var that = this;

    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }

    });
    this.setData({
      items_1: app.globalData.mydata.lst0,
    });
    console.log(this.data.items_1.img_url);
    console.log(this.data.items_1.video_url);
    console.log(this.data.items_1.title);

  },
  /** 
     * 滑动切换tab 
     */
  bindChange: function (e) {

    var that = this;
    that.setData({ currentTab: e.detail.current });

  },
  /** 
   * 点击tab切换 
   */
  swichNav: function (e) {

    var that = this;

    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  }
})  