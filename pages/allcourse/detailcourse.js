// pages/allcourse/detailcourse.js
var app = getApp()
Page({
    data: {
        audioAction: {
            method: 'pause'
        },
        lock: 0, // true：锁定状态，否则为解锁状态。
        song: "魔法亲亲",
        current_courseid: 0, //课程编号
        introduce: true,
        ellipsis: true, // 文字是否收起，默认收起
        course: 1, // 控制底部navigator显示模块
        fold: true, // 控制内容概述的显示与否

    },
    audioPlayed: function(e) {
        console.log('audio is played')
    },
    go1: function() {
        wx.navigateTo({
            url: '../class?courseid={{item.id}}'
        })
    },

    ellipsis: function() {
        var value = !this.data.ellipsis;
        var tag = !this.data.introduce;
        var unfold = !this.data.fold;
        this.setData({
            ellipsis: value,
            introduce: tag,
            fold: unfold
        })

    },

    intro_switch: function() {
        console.log("now it is here")
        var that = this;
        wx.navigateTo({
            url: './intro?courseid=' + that.data.current_courseid,
        })
    },

    ob_switch: function() {
        console.log("now it is here")
        var that = this;
        wx.navigateTo({
            url: './question?courseid=' + that.data.current_courseid,
        })
    },
    onLoad: function(options) {
        console.log(options.courseid);
        this.setData({ current_courseid: options.courseid }); //存当前详情页的courseid到data
        var that = this;
        wx.request({
                url: app.globalData.myserveraddress,
                data: {
                    "func_id": 6,
                    "openid": app.globalData.openid,
                    "courseid": options.courseid,
                },
                method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                header: {
                    'content-type': 'application/x-www-form-urlencoded'
                }, // 设置请求的 header
                success: function(res) {
                    if (res.statusCode == 200) {
                        //  测试用，监控变量值。
                        console.log(res.data)
                        console.log(res.data.ob[0])
                            //设置值 从后端接收到 item1和ob中
                        that.setData({ item1: res.data, ob: res.data.ob, op: res.data.ob[0] })

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
        var tag;
        if (this.data.currentTab === e.target.dataset.current) {
            return false;
        } else {
            that.setData({
                currentTab: e.target.dataset.current
            })
        }
        if (this.data.course == 1)
            tag = 2;
        else
            tag = 1;
        this.setData({
            course: tag
        })
    },
    buycourse: function(e) {
        console.log("进入购买");
        var that = this;
        var t_lock = 1;
        console.log(that.data.current_courseid);
        wx.request({
                url: app.globalData.myserveraddress, //仅为示例，并非真实的接口地址
                method: 'POST',
                data: {
                    "func_id": 7,
                    "courseid": that.data.current_courseid,
                    "openid": app.globalData.openid
                },
                header: {
                    'content-type': 'application/x-www-form-urlencoded'
                }, // 设置请求的 header
                success(res) {
                    console.log(res.data);
                    if (res.data.success == 1) { //与服务器交互成功
                        wx.setStorageSync('pay_information', res.data); //支付的参数，存到缓存
                        that.pay();
                    }
                }
            })
            // TODO：支付成功则解锁,建议后续放在Pay()中
        this.setData({
            lock: 1
        })

    },
    pay: function(e) {
        console.log("进入支付");
        var that = this;
        var args = wx.getStorageSync('pay_information');
        wx.requestPayment({
            timeStamp: args.timeStamp,
            nonceStr: args.nonceStr,
            package: args.package,
            signType: args.signType,
            paySign: args.paySign,
            success: function(res) {
                console.log(res);
                wx.showToast({
                    title: '支付成功',
                    icon: 'success',
                    duration: 2000
                });
                wx.request({ //让后台记录用户的购买信息
                    url: app.globalData.myserveraddress,
                    method: 'POST',
                    data: {
                        "func_id": 1,
                        "courseid": that.data.current_courseid,
                        "openid": app.globalData.openid
                    },
                    header: {
                        'content-type': 'application/x-www-form-urlencoded'
                    }, // 设置请求的 header
                    success: function(res) {
                        console.log("传给后台成功");
                    }
                })
            },
            fail: function(error) {
                console.log(error);
                wx.showToast({
                    title: '支付失败',
                    icon: 'none',
                    duration: 2000
                })
            }
        })
    },
    chooseImageTap: function() {
        var that = this;
        wx.showActionSheet({
            itemList: ['从相册中选择', '拍照'],
            itemColor: "#00000",
            success: function(res) {
                if (!res.cancel) {
                    if (res.tapIndex == 0) {
                        that.chooseWxImage('album')
                    } else if (res.tapIndex == 1) {
                        that.chooseWxImage('camera')
                    }
                }
            }
        })
    },
    // 图片本地路径
    chooseWxImage: function(type) {
        var that = this;
        var imgsPaths = that.data.imgs;
        wx.chooseImage({
            sizeType: ['original', 'compressed'],
            sourceType: [type],
            success: function(res) {
                console.log(res.tempFilePaths[0]);
                that.upImgs(res.tempFilePaths[0], 0) //调用上传方法
            }
        })
    },
    go1: function() {
        wx.switchTab({
            url: '../allcourse/allcourse'
        })
    },
    //上传服务器
    upImgs: function(imgurl, index) {
        var that = this;
        wx.uploadFile({
            url: app.globalData.myserveraddress, //
            filePath: imgurl,
            name: 'file',
            header: {
                'content-type': 'multipart/form-data'
            },
            formData: {
                func_id: 9,
                openid: app.globalData.openid,
                answer_choice: 500,
                courseid: that.data.current_courseid
            },
            success: function(res) {
                console.log(res.data) //接口返回网络路径
                    /*var data = JSON.parse(res.data)
                    that.data.picPaths.push(data['msg'])
                    that.setData({
                      picPaths: that.data.picPaths
                    })
                    console.log(that.data.picPaths)*/
            }
        })
    },
})