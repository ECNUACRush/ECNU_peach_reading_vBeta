// pages/user/register2.js
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
    sex: 0,
    age: 0,
    opt1: 0,
    opt2: 0,
    opt3: 0,
    opt4: 0,
    opt5: 0,
  },
  formSubmit: function (e) {
    var tmp = this.data.opt1 * 10000 + this.data.opt2 * 1000 + this.data.opt3 * 100 + this.data.opt4 * 10 + this.data.opt5;
    wx.navigateTo({
      url: 'register3?sex=' + this.data.sex + "&age=" + this.data.age + "&s1=" + String(tmp),
    })
  },

  story: function() {
    this.setData({
      plain1: !this.data.plain1,
      opt1: (this.data.opt1 + 1) % 2
    })
  },
  life: function () {
    this.setData({
      plain2: !this.data.plain2,
      opt2: (this.data.opt2 + 1) % 2
    })
  },
  skill: function () {
    this.setData({
      plain3: !this.data.plain3,
      opt3: (this.data.opt3 + 1) % 2
    })
  },
  nature: function () {
    this.setData({
      plain4: !this.data.plain4,
      opt4: (this.data.opt4 + 1) % 2
    })
  },
  science: function () {
    this.setData({
      plain5: !this.data.plain5,
      opt5: (this.data.opt5 + 1) % 2
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log(options.age, options.sex)
    this.data.age = options.age;
    this.data.sex = options.sex;
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