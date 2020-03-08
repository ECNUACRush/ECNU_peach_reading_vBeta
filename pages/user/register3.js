// pages/user/register3.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    plain1: true,
    plain2: true,
    plain3: true,
    plain4: true,
    plain5: true,
    plain6: true,
    opt1: 0,
    opt2: 0,
    opt3: 0,
    opt4: 0,
    opt5: 0,
    opt6: 0,
  },

  formSubmit: function (e) {
    var tmp = this.data.opt1 * 100000 + this.data.opt2 * 10000 + this.data.opt3 * 1000 + this.data.opt4 * 100 + this.data.opt5 * 10 + this.data.opt6;
    wx.request({
      url: app.globalData.myserveraddress,
      data: {
        "func_id": 5,
        "openid": app.globalData.openid,
        "query result": this.data.s1 + String(tmp),
        "age": this.data.age,
        "sex": this.data.sex
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },// 设置请求的 header
      success: function (res) {
        if (res.statusCode == 200) {
          console.log(res.data)
          app.globalData.mydata = res.data
          if (res.data.success == 1) {
            console.log("success")
            wx.switchTab({
              url: '../home/home',
            })
          }
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

  language: function () {
    this.setData({
      plain1: !this.data.plain1,
      opt1: (this.data.opt1 + 1) % 2
    })
  },
  growup: function () {
    this.setData({
      plain2: !this.data.plain2,
      opt2: (this.data.opt2 + 1) % 2
    })
  },
  recognize: function () {
    this.setData({
      plain3: !this.data.plain3,
      opt3: (this.data.opt3 + 1) % 2
    })
  },
  emotion: function () {
    this.setData({
      plain4: !this.data.plain4,
      opt4: (this.data.opt4 + 1) % 2
    })
  },
  social: function () {
    this.setData({
      plain5: !this.data.plain5,
      opt5: (this.data.opt5 + 1) % 2
    })
  },
  personality: function () {
    this.setData({
      plain6: !this.data.plain6,
      opt6: (this.data.opt6 + 1) % 2
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      age: options.age,
      sex: options.sex,
      s1: options.s1,
    })
    console.log(this.data)
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