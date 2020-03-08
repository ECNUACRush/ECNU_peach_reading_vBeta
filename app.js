//app.js
App({
  globalData: {
    userInfo: null,
    mydata: null,
    openid: "",
    appid: "wxf624081997ffcade",
    secret: "1ddce57b38b62494d07365fe7be3892a",
    myserveraddress: "https://www.peachreading.cn/student/", 
   // myserveraddress: "http://localhost:8000/student/", 
  },
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    var that = this;

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          url: that.globalData.myserveraddress, //仅为示例，并非真实的接口地址
          method: 'POST',
          data: {
            "func_id": -1,
            "code": res.code,
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },// 设置请求的 header
          success(res) {
            console.log(res.data);
            if (res.data.success == 1) { //与服务器交互成功
              that.globalData.openid = res.data.openid;
            }
          }
        });
      }
    });
    var that = this;
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
              wx.request({
                url: that.globalData.myserveraddress,
                data: {
                  "func_id": 0,
                  "openid": that.globalData.openid,
                  "nickname": that.globalData.userInfo.nickName,
                },
                method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                header: {
                  'content-type': 'application/x-www-form-urlencoded'
                },// 设置请求的 header
                success: function (res) {
                  if (res.statusCode == 200) {
                    console.log(res.data)
                    that.globalData.mydata = res.data
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
            }
          })
        } else {
          console.log("没有获得授权")
          wx.navigateTo({
            url: './user/login',
          })
        }
      }
    });
  }
})