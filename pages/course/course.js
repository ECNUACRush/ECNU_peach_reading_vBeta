// pages/course/course.js
const myaudio = wx.createInnerAudioContext();
var app = getApp()
Page({
    data: {
        isplay: false,
        person_name: {
            id: 123,
            name: 'hz'
        },
        arr: ['黄震', 'nancy', '宝贝'],
        lover: 'nancy',
        my_color: "red",
        isboy: true,
        my_box: "box",
        /** 
         * 页面配置 
         */
        winWidth: 0,
        winHeight: 0,
        // tab切换  
        currentTab: 0,
    },
    onshow: function() {
        myaudio.srt = "https://www.peachreading.cn/student/audio/audioname=mofaqinqin.mp3"
    },
    //播放
    play: function() {
        myaudio.play();
        console.log(myaudio.duration);
        this.setData({ isplay: true });
    },
    // 停止
    stop: function() {
        myaudio.pause();
        this.setData({ isplay: false });
    },

    onLoad: function() {
        var that = this;

        /** 
         * 获取系统信息 
         */
        wx.getSystemInfo({

            success: function(res) {
                that.setData({
                    winWidth: res.windowWidth,
                    winHeight: res.windowHeight
                });
            }

        });

        wx.request({
            url: app.globalData.myserveraddress,
            data: {
                "func_id": 10,
                "openid": app.globalData.openid,
            },
            method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            }, // 设置请求的 header
            success: function(res) {
                if (res.statusCode == 200) {
                    console.log(res.data)
                    that.setData({ item_1: res.data.data })
                } else {
                    console.log("index.js wx.request CheckCallUser statusCode" + res.statusCode);
                }
            },
            fail: function() {
                console.log("index.js wx.request CheckCallUser fail");
            },
            complete: function() {
                // complete
            }
        })
    },
    go1: function() {
        wx.switchTab({
            url: '../me/me'
        })
    },
    /** 
     * 滑动切换tab 
     */
    bindChange: function(e) {

        var that = this;
        that.setData({ currentTab: e.detail.current });

    },
    /** 
     * 点击tab切换 
     */
    swichNav: function(e) {

        var that = this;

        if (this.data.currentTab === e.target.dataset.current) {
            return false;
        } else {
            that.setData({
                currentTab: e.target.dataset.current
            })
        }
    }
})