// pages/order/order.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orders:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: app.globalData.myserveraddress,
      data: {
        "func_id": 8,
        "openid": app.globalData.openid
      },
      header: {
        'content-type':'application/x-www-form-urlencoded'
      },
      method: 'POST',
      success: function(res){
        for(var i=0; i<res.data.data.length; i++){
          res.data.data[i].time = res.data.data[i].time.slice(0,19);
        }
        that.setData({
          orders:res.data.data
        })
      },
      fail: function(fres){
        console.log("获取订单信息失败")
      }
    })
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