// pages/user/login.js
var app = getApp()
Page({
  data: {
    hasLogin: false
  },
  onLoad: function () {
    console.log(app.globalData);
  },
  sub: function(res) {
    var tmp = res.detail;
    if(tmp.errMsg == "getUserInfo:ok") {
      app.globalData.userInfo = tmp.userInfo;
    wx.request({
      url: app.globalData.myserveraddress,
      data: {
        "func_id": 0, 
        "openid": app.globalData.openid,
        "nickname": app.globalData.userInfo.nickName,
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },// 设置请求的 header
      success: function (res) {
        if (res.statusCode == 200) {
          console.log(res.data)
          app.globalData.mydata = res.data
          if (res.data.isnewuser == 0) {
            console.log("success")
            wx.switchTab({
              url: '../home/home',
            })
          } else {
            wx.navigateTo({
              url: 'register',
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
    })
    } else {
      /*wx.showToast({
        title: '请通过授权来正常使用本小程序',
        image: '../../images/wrong.png'
      })*/
      wx.showModal({
        title: '提示',
        content: '请通过授权来正常使用本小程序',
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
  }
})
