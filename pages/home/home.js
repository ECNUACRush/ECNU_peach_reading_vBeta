// pages/home/home.js
var app = getApp()
Page({
  data: {
    swiperCurrent: 0,
    indicatorDots: true,
    autoplay: true,
    interval: 6000,
    duration: 800,
    circular: true,
    beforeColor: "rgba(255,255,255,.3)",
    inputVal: "",
    imgUrls: [
      'https://www.peachreading.cn/student/img?imgname=5c8ee04809c12.jpg',
      'https://www.peachreading.cn/student/img?imgname=5c8ee09ca123c.jpg',
      'https://www.peachreading.cn/student/img?imgname=5c8ee0b1bfda9.jpg'
    ],
  },
  go1:function(){
    wx.switchTab({
      url: '../allcourse/allcourse'
    })
  },
  go2: function () {
    wx.switchTab({
      url: '../allcourse/allcourse'
    })
  },

  go3: function() {
    //console.log("#############")
    wx.navigateTo({
      url: '../allcourse/question',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData)
    this.setData({
      course_recm: app.globalData.mydata.lst_recommend,
      reading_recm: app.globalData.mydata.lst_recommend,
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
  },
  clickButton: function (e) {
    var viewDataset = e.target.dataset;
    var courseid = viewDataset.thisid;
    //console.log(courseid);
    wx.navigateTo({
      url: '../allcourse/detailcourse?courseid=' + courseid,
    })
  },
})