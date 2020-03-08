// pages/allcourse/question.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  choice_0: function() {
    this.setData({
      plain1: false,
      plain2: true,
      plain3: true,
      plain4: true,
      bg1: '#00BFFF',
      bg2: '#FFC0CB',
      bg3: '#FFC0CB',
      bg4: '#FFC0CB',
    })
  },

  choice_1: function () {
    this.setData({
      plain1: true,
      plain2: false,
      plain3: true,
      plain4: true,
      bg1: '#FFC0CB',
      bg2: '#00BFFF',
      bg3: '#FFC0CB',
      bg4: '#FFC0CB',
    })
  },

  choice_2: function () {
    this.setData({
      plain1: true,
      plain2: true,
      plain3: false,
      plain4: true,
      bg1: '#FFC0CB',
      bg2: '#FFC0CB',
      bg3: '#00BFFF',
      bg4: '#FFC0CB',
    })
  },

  choice_3: function () {
    this.setData({
      plain1: true,
      plain2: true,
      plain3: true,
      plain4: false,
      bg1: '#FFC0CB',
      bg2: '#FFC0CB',
      bg3: '#FFC0CB',
      bg4: '#00BFFF',
    })
  },

  formSubmit: function() {
    var timeout = 1000;
    var islast = false;
    if (this.data.idx < this.data.ob_len - 1) {
      this.setData({
        idx: this.data.idx + 1,
      })
    } else {
      wx.navigateBack({
        
      })

      islast = true;
    }
    var ans_user = -1;
    if (this.data.plain1 == false) {
      ans_user = 0;
    }
    if (this.data.plain2 == false) {
      ans_user = 1;
    }
    if (this.data.plain3 == false) {
      ans_user = 2;
    }
    if (this.data.plain4 == false) {
      ans_user = 3;
    }
    if (ans_user == this.data.tmp_questions.correct) {
      wx.showToast({
        title: '恭喜你答对啦',
        image: '../../images/correct.png',
        duration: 1000,
      })
    } else {
      timeout = 5000;
      if (ans_user == 0) {
        this.setData({
          bg1: "#ff0000"
        })
      }
      if (ans_user == 1) {
        this.setData({
          bg2: "#ff0000"
        })
      }
      if (ans_user == 2) {
        this.setData({
          bg3: "#ff0000"
        })
      }
      if (ans_user == 3) {
        this.setData({
          bg4: "#ff0000"
        })
      }
      if (this.data.tmp_questions.correct == 0) {
        this.setData({
          bg1: "#00ff00"
        })
      }
      if (this.data.tmp_questions.correct == 1) {
        this.setData({
          bg2: "#00ff00"
        })
      }
      if (this.data.tmp_questions.correct == 2) {
        this.setData({
          bg3: "#00ff00"
        })
      }
      if (this.data.tmp_questions.correct == 3) {
        this.setData({
          bg4: "#00ff00"
        })
      }
      wx.showToast({
        title: '再仔细想想哦',
        image: '../../images/wrong.png',
        duration: 2000,
      })
    }
    var that = this;
    setTimeout(function(){
      if (islast) {
        wx.navigateBack({
          
        })
      }
      that.setData({
        tmp_questions: that.data.data_questions[that.data.idx],
        plain1: true,
        plain2: true,
        plain3: true,
        plain4: true,
        bg1: '#FFC0CB',
        bg2: '#FFC0CB',
        bg3: '#FFC0CB',
        bg4: '#FFC0CB',
      })
    }, timeout)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var current_courseid = options.courseid
    this.setData({
      idx: 0,
      plain1: true,
      plain2: true,
      plain3: true,
      plain4: true,
      bg1: '#FFC0CB',
      bg2: '#FFC0CB',
      bg3: '#FFC0CB',
      bg4: '#FFC0CB',
    });
    var that = this;
    wx.request({
      url: app.globalData.myserveraddress,
      data: {
        "func_id": 6,
        "openid": app.globalData.openid,
        "courseid": 1,
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },// 设置请求的 header
      success: function (res) {
        if (res.statusCode == 200) {
          //  测试用，监控变量值。
          console.log(res.data.ob[0]);
          //设置值 从后端接收到 item1和ob中
          that.setData({ 
            data_questions: res.data.ob, 
            tmp_questions: res.data.ob[that.data.idx],
            ob_len: res.data.ob.length
          });
          //console.log(this.data.data_questions);
        } else {
          console.log("index.js wx.request CheckCallUser statusCode" + res.statusCode);
        }
      },
      fail: function () {
        console.log("index.js wx.request CheckCallUser fail");
      },
      complete: function () {
        // complete
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log(this.data);
    console.log(this.data.idx);
    /*this.setData({
      tmp_questions: this.data.data_questions[this.data.idx]
    })*/
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})