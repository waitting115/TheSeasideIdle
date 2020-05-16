var util = require('./utils/util.js');

App({
  //当小程序初始化完成时，会触发onLauch（全局只触发一次）
  onLaunch: function (options) {
    // console.log('onLaunch-options:',options);
    //调用api从本地缓存中获取数据
    var that = this;
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录（查询用户code，然后发送到后台，后台向微信官方换取openID和session_key
    wx.login({
      success: res => {
        // console.log('登陆成功',res.code);
        if(res.code) {
          wx.request({
            url: 'https://www.tangchaolizi.club:11443/login', 
            data: {
              code: res.code
            },
            method: 'GET',
            success: (res) => {
              console.log('返回数据成功')
              // //将用户的openID存下
              console.log(res.data);//openid
              let openid = res.data;

              //获取用户信息
              wx.getSetting({
                success: res => {
                  if (res.authSetting['scope.userInfo']) {
                    console.log('已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框')
                    wx.getUserInfo({
                      success: res => {
                        // 可以将 res 发送给后台解码出 unionIds
                        this.globalData.userInfo = res.userInfo
                        // console.log('click true')
                        // console.log(res.userInfo)
                        //在这里，获取到用户头像昵称信息后，传到后端，并且在后端一并存入数据库
                        wx.request({
                          url: "https://www.tangchaolizi.club:11443/users",
                          data: {
                            nickName: res.userInfo.nickName,
                            avatarUrl: res.userInfo.avatarUrl,
                            openid: openid
                          },
                          method: 'GET',
                          success: function (res) {
                            console.log('提交用户信息数据返回数据成功');
                            console.log(res.data);
                          },
                          fail: (res) => {
                            console.log('提交用户信息数据返回数据失败');
                            console.log(res.data);
                          }
                        })
                        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                        // 所以此处加入 callback 以防止这种情况
                        if (this.userInfoReadyCallback) {
                          this.userInfoReadyCallback(res)
                        }
                      },
                      fail: res => {
                        console.log('未获取到用户授权信息')
                      }
                    })
                  }
                }
              })
            },
            fail: res => {
              console.log('后台请求数据失败') 
            }
          })
        } else {
          console.error('获取用户登陆码失败', res.errMsg);
        }
      }
    })
  },

  data: {
    // wawa : 1
  },
  globalData: {
    topUrl: "https://www.tangchaolizi.club/xchengxu/public/images/image/school-7a.jpg",
    userInfo: null,
    openid: '',
    url:'https://www.tangchaolizi.club:11443',
    // appid: 'wxf87440c296fb6767',
    // secret: '2af9b3a3c4afcec7371f4be3d557a250',
    //总注册人数
    registeredNum: 99,
    //所有注册用户
    totalRetistered: [],
    //总上架商品
    productsShelvesNum: 199,
    //所有上架商品
    totalProductsShelves: [],
    //总下架商品
    removedShelvesNum: 88,
    //所有下架商品
    totalRemovedShelves: [],
    // 过去七天的用户登录数据：
    userLoginChangeData: [12, 23, 34, 45, 56, 67, 78],
    // 商品类别分布数据
    goodsClassDistributionData: [22, 33, 44, 55, 66, 77, 88, 99, 45, 45, 33, 88],

    feedbackMsg: ["第一条用户反馈","第二条用户反馈"],//用户反馈
    classify: [
      {
        title: "考研资料",
        iconUrl: "https://www.tangchaolizi.club/xchengxu/public/images/icons/classifyIcon/yellowFace-1.png",
        checked: false
      },
      {
        title: "电脑硬件",
        iconUrl: "https://www.tangchaolizi.club/xchengxu/public/images/icons/classifyIcon/yellowFace-2.png",
        checked: false
      },
      {
        title: "图书",
        iconUrl: "https://www.tangchaolizi.club/xchengxu/public/images/icons/classifyIcon/yellowFace-3.png",
        checked: false
      },
      {
        title: "生活百货",
        iconUrl: "https://www.tangchaolizi.club/xchengxu/public/images/icons/classifyIcon/yellowFace-4.png",
        checked: false
      },
      {
        title: "服装鞋帽",
        iconUrl: "https://www.tangchaolizi.club/xchengxu/public/images/icons/classifyIcon/yellowFace-5.png",
        checked: false
      },
      {
        title: "手机硬件",
        iconUrl: "https://www.tangchaolizi.club/xchengxu/public/images/icons/classifyIcon/yellowFace-6.png",
        checked: false
      },
      {
        title: "健身器材",
        iconUrl: "https://www.tangchaolizi.club/xchengxu/public/images/icons/classifyIcon/yellowFace-7.png",
        checked: false
      },
      {
        title: "球类运动",
        iconUrl: "https://www.tangchaolizi.club/xchengxu/public/images/icons/classifyIcon/yellowFace-8.png",
        checked: false
      },
      {
        title: "美妆美品",
        iconUrl: "https://www.tangchaolizi.club/xchengxu/public/images/icons/classifyIcon/yellowFace-9.png",
        checked: false
      },
      {
        title: "游戏交易",
        iconUrl: "https://www.tangchaolizi.club/xchengxu/public/images/icons/classifyIcon/yellowFace-10.png",
        checked: false
      },
      {
        title: "租好物",
        iconUrl: "https://www.tangchaolizi.club/xchengxu/public/images/icons/classifyIcon/yellowFace-11.png",
        checked: false
      },
      {
        title: "其他",
        iconUrl: "https://www.tangchaolizi.club/xchengxu/public/images/icons/classifyIcon/yellowFace-12.png",
        checked: false
      }
    ],
    goodsSituation: [
      {
        title: "1成新",
        checked: false
        },
          {
        title: "2成新",
        checked: false
      },
      {
        title: "3成新",
        checked: false
      },
      {
        title: "4成新",
        checked: false
      },
      {
        title: "5成新",
        checked: false
      },
      {
        title: "6成新",
        checked: false
      },
      {
        title: "7成新",
        checked: false
      },
      {
        title: "8成新",
        checked: false
      },
      {
        title: "9成新",
        checked: false
      },
      {
        title: "全新",
        checked: false
      }
    ],
    callCenter: [
      {
        name: "王敬伟(电商1702)",
        picture:"https://www.tangchaolizi.club/xchengxu/public/images/icons/dollar5.png",
        wx: "wjw1151042726"
      },
      {
        name: "刘晓萌(电商1701)",
        picture: "https://www.tangchaolizi.club/xchengxu/public/images/icons/dollar5.png",
        wx: "Lxiaomeng1997"
      },
      {
        name: "黄嘉欣(电商1701)",
        picture: "https://www.tangchaolizi.club/xchengxu/public/images/icons/dollar5.png",
        wx: "huangjiaxinhaowawa"
      },
      {
        name: "高梓木(软件)",
        picture: "https://www.tangchaolizi.club/xchengxu/public/images/icons/dollar5.png",
        wx: "wxid_eqv1053qnrqc22"
      },
      {
        name: "焦子梦(计科)",
        picture: "https://www.tangchaolizi.club/xchengxu/public/images/icons/dollar5.png",
        wx: "m1458561952"
      },
    ],
    //热门搜索
    topSearch: [
      "金士顿固态硬盘",
      "提高自身的图书",
      "OPPO闪充数据线",
      "手游辅助器",
      "雷克斯变速"
    ],
    //所有商品名称，用于搜索
    allGoodsTitle: [
      "金士顿固态硬盘",
      "提高自身的图书",
      "OPPO闪充数据线",
      "提高自身的图书",
      "手游辅助器",
      "雷克斯变速"
    ],
    //管理员openID
    admin: [
      "five",
      "meng"

    ],
    //user不存数据库
    user: {
      userName: "five",
      headPortraitUrl: "https://www.tangchaolizi.club/xchengxu/public/images/image/userHead/cat.jpg",
      openID: "five",
      recommendation: [
        "考研资料",
        "球类运动",
        "租好物"
      ],
      searchHistory: [
        "键盘",
        "OPPO闪充数据线",
        "金士顿固态硬盘",
        "考研数学",
        "手机吃鸡神器游戏手柄",
        "散热器",
        "提高自身的图书"
      ],
      meFocus : ["snwn", "xxg", "hx", "ch", "lsjy"],//openID
      focusMe : ["snwn", "hx", "fzzf"],
      myCollection : ["lsjy-7", "snwn-8", "hx-14", "hx-17"],//暂时的思路是存“openID-goodsID”，然后再分解从数据中查找，goodsID是1~10000000的一个数字，后台设一个变量，从1开始，审核发布一个商品就加一，这样不会有重复的，这个数字也会是我们小程序中发布的商品总数。
      myMessage: [
        {
          openID: "hx",
          lastMsg: "这是你与花巷的最后一条消息哦！",
          lastMsgTime: "1天前",
          newMsgNum: 1
        },
        {
          openID: "beautiful",
          lastMsg: "这是你与beautiful的最后一条消息哦！",
          lastMsgTime: "12:21",
          newMsgNum: 66
        }
      ],
      goods: [
        {
          userName: "five",
          headPortraitUrl: "https://www.tangchaolizi.club/xchengxu/public/images/image/userHead/cat.jpg",
          openID: "five",
          goodsID: 1,
          picture: [
            "https://www.tangchaolizi.club/xchengxu/public/images/image/goods/falbala.png",
            "https://www.tangchaolizi.club/xchengxu/public/images/image/goods/falbala-g.png",
            "https://www.tangchaolizi.club/xchengxu/public/images/image/goods/falbala.png",
            "https://www.tangchaolizi.club/xchengxu/public/images/image/goods/falbala-g.png"
          ],
          goodsTitle: "荷叶边衬衫系带V领打底衫上衣女",
          price: "￥20",
          goodsSituation: "9成新",
          introduceText: "款式：V领，荷叶边 颜色：白色",
          classify: "服装鞋帽",
          wx: 'wx',
          state: 'UP'
        },
        {
          userName: "five",
          headPortraitUrl: "https://www.tangchaolizi.club/xchengxu/public/images/image/userHead/cat.jpg",
          openID: "five",
          goodsID: 2,
          picture: [
            "https://www.tangchaolizi.club/xchengxu/public/images/image/goods/solidStateDrives.png",
            "https://www.tangchaolizi.club/xchengxu/public/images/image/goods/solidStateDrives1.png"
          ],
          goodsTitle: "Kingston/金士顿固态硬盘SA400S37/240G 笔记本",
          price: "￥120",
          goodsSituation: "6成新",
          introduceText: "2.5英寸，SATA接口 ，保修期还有12个月",
          classify: "电脑硬件",
          wx: 'wx',
          state: 'UP'
        },
        {
          userName: "five",
          headPortraitUrl: "https://www.tangchaolizi.club/xchengxu/public/images/image/userHead/cat.jpg",
          openID: "five",
          goodsID: 3,
          picture: [
            "https://www.tangchaolizi.club/xchengxu/public/images/image/goods/link.png",
            "https://www.tangchaolizi.club/xchengxu/public/images/image/goods/link1.png"
          ],
          goodsTitle: "OPPO闪充数据线",
          price: "￥10",
          goodsSituation: "8成新",
          introduceText: "闪充，长度1m",
          classify: "手机硬件",
          wx: 'wx',
          state: 'UP'
        },
      ]
    },
    //allUser
    allUser: [
      {
        userName: "five",
        headPortraitUrl: "https://www.tangchaolizi.club/xchengxu/public/images/image/userHead/cat.jpg",
        openID: "five",
        recommendation: [
          "考研资料",
          "球类运动",
          "租好物"
        ],
        meFocus: ["snwn", "xxg", "hx", "ch", "lsjy", "fzzf"],//openID
        focusMe: ["snwn", "hx", "fzzf"],
        goods: [
          {
            userName: "five",
            headPortraitUrl: "https://www.tangchaolizi.club/xchengxu/public/images/image/userHead/cat.jpg",
            openID: "five",
            goodsID: 4,
            picture: [
              "https://www.tangchaolizi.club/xchengxu/public/images/image/goods/falbala.png",
              "https://www.tangchaolizi.club/xchengxu/public/images/image/goods/falbala-g.png"
            ],
            goodsTitle: "荷叶边衬衫系带V领打底衫上衣女",
            price: "￥20",
            goodsSituation: "9成新",
            introduceText: "款式：V领，荷叶边 颜色：白色",
            classify: "服装鞋帽",
            wx: 'wx',
            state: 'UP'
          },
          {
            userName: "five",
            headPortraitUrl: "https://www.tangchaolizi.club/xchengxu/public/images/image/userHead/cat.jpg",
            openID: "five",
            goodsID: 5,
            picture: [
              "https://www.tangchaolizi.club/xchengxu/public/images/image/goods/solidStateDrives.png",
              "https://www.tangchaolizi.club/xchengxu/public/images/image/goods/solidStateDrives1.png"
            ],
            goodsTitle: "Kingston/金士顿固态硬盘SA400S37/240G 笔记本",
            price: "￥120",
            goodsSituation: "6成新",
            introduceText: "2.5英寸，SATA接口 ，保修期还有12个月",
            classify: "电脑硬件",
            wx: 'wx',
            state: 'UP'
          },
          {
            userName: "five",
            headPortraitUrl: "https://www.tangchaolizi.club/xchengxu/public/images/image/userHead/cat.jpg",
            openID: "five",
            goodsID: 6,
            picture: [
              "https://www.tangchaolizi.club/xchengxu/public/images/image/goods/link.png",
              "https://www.tangchaolizi.club/xchengxu/public/images/image/goods/link1.png"
            ],
            goodsTitle: "OPPO闪充数据线",
            price: "￥10",
            goodsSituation: "8成新",
            introduceText: "闪充，长度1m",
            classify: "手机硬件",
            wx: 'wx',
            state: 'UP'
          },
        ]
      },
      {
        userName: "零碎记忆",
        headPortraitUrl: "https://www.tangchaolizi.club/xchengxu/public/images/image/userHead/K.png",
        openID: "lsjy",
        recommendation: [
          "生活百货",
          "图书",
          "美妆美品"
        ],
        meFocus: ["snwn", "xxg", "hx", "ch", "fzzf"],//openID
        focusMe: ["snwn", "hx", "fzzf", "five"],
        goods: [
          {
            userName: "零碎记忆",
            headPortraitUrl: "https://www.tangchaolizi.club/xchengxu/public/images/image/userHead/K.png",
            openID: "lsjy",
            goodsID: 7,
            picture: [
              "https://www.tangchaolizi.club/xchengxu/public/images/image/goods/pick-c.png",
              "https://www.tangchaolizi.club/xchengxu/public/images/image/goods/pick-m.png",
              "https://www.tangchaolizi.club/xchengxu/public/images/image/goods/pick-c.png"
            ],
            goodsTitle: "甜美上衣小清新宽松兔耳朵长袖t恤",
            price: "￥17",
            goodsSituation: "8成新",
            introduceText: "颜色：白色，粉色 尺码：M",
            classify: "服装鞋帽",
            wx: 'wx',
            state: 'UP'
          },
        ]
      },
      {
        userName: "三年五年",
        headPortraitUrl: "https://www.tangchaolizi.club/xchengxu/public/images/image/userHead/V.png",
        openID: "snwn",
        recommendation: [
          "图书",
          "电脑硬件",
          "手机硬件"
        ],
        meFocus: ["xxg", "hx", "ch", "lsjy", "fzzf", "five"],//openID
        focusMe: ["hx", "fzzf", "five"],
        goods: [
          {
            userName: "三年五年",
            headPortraitUrl: "https://www.tangchaolizi.club/xchengxu/public/images/image/userHead/V.png",
            openID: "snwn",
            goodsID: 8,
            picture: [
              "https://www.tangchaolizi.club/xchengxu/public/images/image/goods/math.png"
            ],
            goodsTitle: "2018李永乐考研数学",
            price: "￥20",
            goodsSituation: "9成新",
            introduceText: "复习全书，有视频课程",
            classify: "考研资料",
            wx: 'wx',
            state: 'UP'
          },
          {
            userName: "三年五年",
            headPortraitUrl: "https://www.tangchaolizi.club/xchengxu/public/images/image/userHead/V.png",
            openID: "snwn",
            goodsID: 9,
            picture: [
              "https://www.tangchaolizi.club/xchengxu/public/images/image/goods/GameControllers.png",
              "https://www.tangchaolizi.club/xchengxu/public/images/image/goods/GameControllers1.png",
              "https://www.tangchaolizi.club/xchengxu/public/images/image/goods/GameControllers2.png"
            ],
            goodsTitle: "手机吃鸡神器游戏手柄",
            price: "￥10",
            goodsSituation: "7成新",
            introduceText: "：手游辅助器 和平精英 苹果专用 安卓机械按键 透视 合金 自动压抢 六指王者荣耀外设套装一体式",
            classify: "游戏交易",
            wx: 'wx',
            state: 'UP'
          },
          {
            userName: "三年五年",
            headPortraitUrl: "https://www.tangchaolizi.club/xchengxu/public/images/image/userHead/V.png",
            openID: "snwn",
            goodsID: 10,
            picture: [
              "https://www.tangchaolizi.club/xchengxu/public/images/image/goods/RedAndWhite.png",
              "https://www.tangchaolizi.club/xchengxu/public/images/image/goods/BlackAndBlue.png"
            ],
            goodsTitle: "雷克斯变速",
            price: "￥20",
            goodsSituation: "9成新",
            introduceText: "变速自行车，爬山无压力，正版雷克斯变速",
            classify: "租好物",
            wx: 'wx',
            state: 'UP'
          },
          {
            userName: "三年五年",
            headPortraitUrl: "https://www.tangchaolizi.club/xchengxu/public/images/image/userHead/V.png",
            openID: "snwn",
            goodsID: 11,
            picture: [
              "https://www.tangchaolizi.club/xchengxu/public/images/image/goods/watermelon.png",
              "https://www.tangchaolizi.club/xchengxu/public/images/image/goods/watermelon1.png",
            ],
            goodsTitle: "冰镇西瓜",
            price: "￥5",
            goodsSituation: "全新",
            introduceText: "超甜，绝对凉爽",
            classify: "其他",
            wx: 'wx',
            state: 'UP'
          },
        ]
      },
      {
        userName: "我想做一个坏孩纸",
        headPortraitUrl: "https://www.tangchaolizi.club/xchengxu/public/images/image/userHead/U.png",
        openID: "wxzyghhz",
        recommendation: [
          "其他",
          "游戏交易",
          "生活百货"
        ],
        meFocus: ["snwn", "xxg", "hx", "ch", "lsjy", "fzzf"],//openID
        focusMe: ["snwn", "hx", "fzzf"],
        goods: [
          {
            userName: "我想做一个坏孩纸",
            headPortraitUrl: "https://www.tangchaolizi.club/xchengxu/public/images/image/userHead/U.png",
            openID: "wxzyghhz",
            goodsID: 12,
            picture: [
              "https://www.tangchaolizi.club/xchengxu/public/images/image/goods/English.png",
              "https://www.tangchaolizi.club/xchengxu/public/images/image/goods/English1.png",
              "https://www.tangchaolizi.club/xchengxu/public/images/image/goods/English.png",
              "https://www.tangchaolizi.club/xchengxu/public/images/image/goods/English.png",
              "https://www.tangchaolizi.club/xchengxu/public/images/image/goods/English1.png",
              "https://www.tangchaolizi.club/xchengxu/public/images/image/goods/English.png"
            ],
            goodsTitle: "考研英语词汇",
            price: "￥10",
            goodsSituation: "全新",
            introduceText: "朱伟恋练有词",
            classify: "考研资料",
            wx: 'wx',
            state: 'UP'
          },
        ]
      },
      {
        userName: "beautiful°",
        headPortraitUrl: "https://www.tangchaolizi.club/xchengxu/public/images/image/userHead/X.png",
        openID: "beautiful",
        recommendation: [
          "美妆美品",
          "服装鞋帽",
          "图书"
        ],
        meFocus: ["snwn", "xxg", "hx", "ch", "lsjy", "fzzf"],//openID
        focusMe: ["snwn", "hx", "fzzf"],
        goods: [
          {
            userName: "beautiful°",
            headPortraitUrl: "https://www.tangchaolizi.club/xchengxu/public/images/image/userHead/X.png",
            openID: "beautiful",
            goodsID: 13,
            picture: [
              "https://www.tangchaolizi.club/xchengxu/public/images/image/goods/radiator.png",
              "https://www.tangchaolizi.club/xchengxu/public/images/image/goods/radiator1.png",
              "https://www.tangchaolizi.club/xchengxu/public/images/image/goods/radiator2.png"
            ],
            goodsTitle: "散热器",
            price: "￥19",
            goodsSituation: "7成新",
            introduceText: "USB口连接电脑，自由调节风速",
            classify: "电脑硬件",
            wx: 'wx',
            state: 'UP'
          },
        ]
      },
      {
        userName: "花巷",
        headPortraitUrl: "https://www.tangchaolizi.club/xchengxu/public/images/image/userHead/A.png",
        openID: "hx",
        recommendation: [
          "考研资料",
          "球类运动",
          "其他"
        ],
        meFocus: ["snwn", "xxg", "ch", "lsjy", "fzzf", "five"],//openID
        focusMe: ["snwn", "fzzf", "five"],
        goods: [
          {
            userName: "花巷",
            headPortraitUrl: "https://www.tangchaolizi.club/xchengxu/public/images/image/userHead/A.png",
            openID: "hx",
            goodsID: 14,
            picture: [
              "https://www.tangchaolizi.club/xchengxu/public/images/image/goods/phone.png"
            ],
            goodsTitle: "Huawei/华为 P30 天空之境",
            price: "￥3200",
            goodsSituation: "9成新",
            introduceText: "8核，8+64G",
            classify: "手机硬件",
            wx: 'wx',
            state: 'UP'
          },
          {
            userName: "花巷",
            headPortraitUrl: "https://www.tangchaolizi.club/xchengxu/public/images/image/userHead/A.png",
            openID: "hx",
            goodsID: 15,
            picture: [
              "https://www.tangchaolizi.club/xchengxu/public/images/image/goods/5book.png"
            ],
            goodsTitle: "提高自身的图书",
            price: "￥5",
            goodsSituation: "9成新",
            introduceText: "基本没翻过，每本5元，五本20元",
            classify: "图书",
            wx: 'wx',
            state: 'AUDIT'
          },
          {
            userName: "花巷",
            headPortraitUrl: "https://www.tangchaolizi.club/xchengxu/public/images/image/userHead/A.png",
            openID: "hx",
            goodsID: 17,
            picture: [
              "https://www.tangchaolizi.club/xchengxu/public/images/image/goods/fan.png"
            ],
            goodsTitle: "小风扇",
            price: "￥15",
            goodsSituation: "7成新",
            introduceText: "小功率USB口，可充电",
            classify: "生活百货",
            wx: 'wx',
            state: 'UP'
          },
        ]
      },
      {
        userName: "我愿站在风口",
        headPortraitUrl: "https://www.tangchaolizi.club/xchengxu/public/images/image/userHead/C.png",
        openID: "wyzzfk",
        recommendation: [
          "球类运动",
          "服装鞋帽",
          "图书"
        ],
        meFocus: ["snwn", "xxg", "hx", "ch", "lsjy", "fzzf"],//openID
        focusMe: ["snwn", "hx", "fzzf"],
        goods: [
          {
            userName: "我愿站在风口",
            headPortraitUrl: "https://www.tangchaolizi.club/xchengxu/public/images/image/userHead/C.png",
            openID: "wyzzfk",
            goodsID: 18,
            picture: [
              "https://www.tangchaolizi.club/xchengxu/public/images/image/goods/book.png",
              "https://www.tangchaolizi.club/xchengxu/public/images/image/goods/book1.png"
            ],
            goodsTitle: "图书",
            price: "￥5",
            goodsSituation: "9成新",
            introduceText: "为人三会，修心三不，口才三绝，每本5元",
            classify: "图书",
            wx: 'wx',
            state: 'UP'
          },
        ]
      },
      {
        userName: "风中追风",
        headPortraitUrl: "https://www.tangchaolizi.club/xchengxu/public/images/image/userHead/P.png",
        openID: "fzzf",
        recommendation: [
          "生活百货",
          "租好物",
          "服装鞋帽"
        ],
        meFocus: ["snwn", "xxg", "hx", "ch", "lsjy", "five"],//openID
        focusMe: ["snwn", "hx"],
        goods: [
          {
            userName: "风中追风",
            headPortraitUrl: "https://www.tangchaolizi.club/xchengxu/public/images/image/userHead/P.png",
            openID: "fzzf",
            goodsID: 19,
            picture: [
              "https://www.tangchaolizi.club/xchengxu/public/images/image/goods/paper.png",
              "https://www.tangchaolizi.club/xchengxu/public/images/image/goods/paper1.png",
              "https://www.tangchaolizi.club/xchengxu/public/images/image/goods/paper.png"
            ],
            goodsTitle: "纸抽",
            price: "￥0.5",
            goodsSituation: "全新",
            introduceText: "蓝漂竹浆抽纸整箱婴儿餐巾纸0.5元一包",
            classify: "生活百货",
            wx: 'wx',
            state: 'UP'
          },
          {
            userName: "风中追风",
            headPortraitUrl: "https://www.tangchaolizi.club/xchengxu/public/images/image/userHead/P.png",
            openID: "fzzf",
            goodsID: 20,
            picture: [
              "https://www.tangchaolizi.club/xchengxu/public/images/image/goods/ThrowingArmDevice.png",
              "https://www.tangchaolizi.club/xchengxu/public/images/image/goods/ThrowingArmDevice1.png"
            ],
            goodsTitle: "臂力器",
            price: "￥10",
            goodsSituation: "7成新",
            introduceText: "30公斤",
            classify: "健身器材",
            wx: 'wx',
            state: 'AUDIT'
          },
          {
            userName: "风中追风",
            headPortraitUrl: "https://www.tangchaolizi.club/xchengxu/public/images/image/userHead/P.png",
            openID: "fzzf",
            goodsID: 21,
            picture: [
              "https://www.tangchaolizi.club/xchengxu/public/images/image/goods/basketball.png"
            ],
            goodsTitle: "NBA斯伯丁/SpaldingExtreme印花系列",
            price: "￥50",
            goodsSituation: "8成新",
            introduceText: "室外 7号橡胶篮球 SBD0160A",
            classify: "球类运动",
            wx: 'wx',
            state: 'UP'
          },
        ]
      },
      {
        userName: "泰菲",
        headPortraitUrl: "https://www.tangchaolizi.club/xchengxu/public/images/image/userHead/N.png",
        openID: "tf",
        recommendation: [
          "游戏交易",
          "生活百货",
          "图书"
        ],
        meFocus: ["snwn", "xxg", "hx", "ch", "lsjy", "fzzf"],//openID
        focusMe: ["snwn", "hx", "fzzf"],
        goods: [
          {
            userName: "泰菲",
            headPortraitUrl: "https://www.tangchaolizi.club/xchengxu/public/images/image/userHead/N.png",
            openID: "tf",
            goodsID: 22,
            picture: [
              "https://www.tangchaolizi.club/xchengxu/public/images/image/goods/powerRoller.png",
              "https://www.tangchaolizi.club/xchengxu/public/images/image/goods/powerRoller1.png",
              "https://www.tangchaolizi.club/xchengxu/public/images/image/goods/powerRoller2.png"
            ],
            goodsTitle: "健腹轮",
            price: "￥10",
            goodsSituation: "7成新",
            introduceText: "绿色防滑三轮固定",
            classify: "健身器材",
            wx: 'wx',
            state: 'UP'
          },
          {
            userName: "泰菲",
            headPortraitUrl: "https://www.tangchaolizi.club/xchengxu/public/images/image/userHead/N.png",
            openID: "tf",
            goodsID: 23,
            picture: [
              "https://www.tangchaolizi.club/xchengxu/public/images/image/goods/dior.png",
              "https://www.tangchaolizi.club/xchengxu/public/images/image/goods/dior1.png",
              "https://www.tangchaolizi.club/xchengxu/public/images/image/goods/dior2.png",
              "https://www.tangchaolizi.club/xchengxu/public/images/image/goods/dior3.png"
            ],
            goodsTitle: "Dior/迪奥",
            price: "￥200",
            goodsSituation: "全新",
            introduceText: "烈艳蓝金唇膏口红888/999哑光滋润047/520/028",
            classify: "美妆美品",
            wx: 'wx',
            state: 'UP'
          },
          {
            userName: "泰菲",
            headPortraitUrl: "https://www.tangchaolizi.club/xchengxu/public/images/image/userHead/N.png",
            openID: "tf",
            goodsID: 24,
            picture: [
              "https://www.tangchaolizi.club/xchengxu/public/images/image/goods/EyeShadow.png",
              "https://www.tangchaolizi.club/xchengxu/public/images/image/goods/EyeShadow1.png",
              "https://www.tangchaolizi.club/xchengxu/public/images/image/goods/EyeShadow2.png",
              "https://www.tangchaolizi.club/xchengxu/public/images/image/goods/EyeShadow3.png",
            ],
            goodsTitle: "完美日记光影星河九色眼影盘",
            price: "￥20",
            goodsSituation: "全新",
            introduceText: "C位大地色哑光珠光初学者少女系，买了不久，用过一点点的20元，全新的50元",
            classify: "美妆美品",
            wx: 'wx',
            state: 'UP'
          },
        ]
      },
      {
        userName: "城河",
        headPortraitUrl: "https://www.tangchaolizi.club/xchengxu/public/images/image/userHead/B.png",
        openID: "ch",
        recommendation: [
          "手机硬件",
          "球类运动",
          "其他"
        ],
        meFocus: ["snwn", "xxg", "hx", "lsjy", "fzzf"],//openID
        focusMe: ["snwn", "hx", "fzzf", "five"],
        goods: [
          {
            userName: "城河",
            headPortraitUrl: "https://www.tangchaolizi.club/xchengxu/public/images/image/userHead/B.png",
            openID: "ch",
            goodsID: 25,
            picture: [
              "https://www.tangchaolizi.club/xchengxu/public/images/image/goods/BadmintonRacket.png",
              "https://www.tangchaolizi.club/xchengxu/public/images/image/goods/BadmintonRacket1.png",
              "https://www.tangchaolizi.club/xchengxu/public/images/image/goods/BadmintonRacket2.png"
            ],
            goodsTitle: "WITESS羽毛球拍双单拍2支套装正品",
            price: "￥30",
            goodsSituation: "8成新",
            introduceText: "双，正品，超轻碳素成人进攻耐打型耐用全",
            classify: "球类运动",
            wx: 'wx',
            state: 'UP'
          },
        ]
      },
      {
        userName: "酒乃鱼",
        headPortraitUrl: "https://www.tangchaolizi.club/xchengxu/public/images/image/userHead/I.png",
        openID: "jny",
        recommendation: [
          "考研资料",
          "电脑硬件",
          "游戏交易"
        ],
        meFocus: ["snwn", "xxg", "hx", "ch", "lsjy", "fzzf"],//openID
        focusMe: ["snwn", "hx", "fzzf"],
        goods: [
          {
            userName: "酒乃鱼",
            headPortraitUrl: "https://www.tangchaolizi.club/xchengxu/public/images/image/userHead/I.png",
            openID: "jny",
            goodsID: 26,
            picture: [
              "https://www.tangchaolizi.club/xchengxu/public/images/image/goods/whereas.png"
            ],
            goodsTitle: "LOL游戏账号",
            price: "￥6",
            goodsSituation: "全新",
            introduceText: "全区有货，诚信安全，首单6元",
            classify: "游戏交易",
            wx: 'wx',
            state: 'UP'
          },
        ]
      },
      {
        userName: "小小怪",
        headPortraitUrl: "https://www.tangchaolizi.club/xchengxu/public/images/image/userHead/O.png",
        openID: "xxg",
        recommendation: [
          "租好物",
          "服装鞋帽",
          "球类运动"
        ],
        meFocus: ["snwn", "hx", "ch", "lsjy", "fzzf"],//openID
        focusMe: ["snwn", "hx", "fzzf", "five"],
        goods: [
          {
            userName: "小小怪",
            headPortraitUrl: "https://www.tangchaolizi.club/xchengxu/public/images/image/userHead/O.png",
            openID: "xxg",
            goodsID: 27,
            picture: [
              "https://www.tangchaolizi.club/xchengxu/public/images/image/goods/kite.png",
              "https://www.tangchaolizi.club/xchengxu/public/images/image/goods/kite1.png",
              "https://www.tangchaolizi.club/xchengxu/public/images/image/goods/kite2.png"
            ],
            goodsTitle: "风筝",
            price: "￥20",
            goodsSituation: "9成新",
            introduceText: "2米草原+10米尾，20自动锁轮,500米线",
            classify: "租好物",
            wx: 'wx',
            state: 'UP'
          },
        ]
      },
      {
        userName: "大男孩！",
        headPortraitUrl: "https://www.tangchaolizi.club/xchengxu/public/images/image/userHead/R.png",
        openID: "dnh",
        recommendation: [
          "服装鞋帽",
          "健身器材",
          "图书"
        ],
        meFocus: ["snwn", "xxg", "hx", "ch", "lsjy", "fzzf"],//openID
        focusMe: ["snwn", "hx", "fzzf"],
        goods: [
          {
            userName: "大男孩！",
            headPortraitUrl: "https://www.tangchaolizi.club/xchengxu/public/images/image/userHead/R.png",
            openID: "dnh",
            goodsID: 28,
            picture: [
              "https://www.tangchaolizi.club/xchengxu/public/images/image/goods/gobang.png"
            ],
            goodsTitle: "五子棋",
            price: "￥5",
            goodsSituation: "9成新",
            introduceText: "没玩过几回",
            classify: "其他",
            wx: 'wx',
            state: 'UP'
          },
        ]
      },
    ],
  }
})
  //当小程序启动，或者从后台进入前台显示，会触发onShow
  // onShow: function(options) {
  //   console.log('onShow-options:',options);
  //   var that = this,
  //   //scenes是场景值，它的类型是整型
  //   scenes = options.scene,
  //   //sid是参数，建议兼容ios和android的时候转换为整型
  //   sid = Number(options.query.sid);

  //   //获取用户信息
  //   that.getUserInfo(function (UserInfo) {
  //     //判断场景是否是从公众号进入（这里的意思是如果用户从公众号的自定义菜单进入的话，且sid参数为1的话触发什么方法
  //     //获取场景值在onLaunch中也可以获取到，但是呢由于业务要求我们的这个方法需要用户进入就会触发
  //     //onLaunch是小程序未关闭的情况下只执行一次，所以这里需要考虑清楚
  //     if(scenes === 1035 && sid === 1) {
  //       //这里是从什么场景下要执行的方法
  //     }
  //   })
  // },

  // //获取用户信息
  // getUserInfo: function (cb) {
  //   var that = this;
  //   if(this.globalData.userInfo) {
  //     typeof cb == 'function' && cb(this.globalDatal.userInfo)
  //   } else {
  //     //调用登录接口
  //     wx.login({
  //       success: function (res) {
  //         //登录成功
  //         //在这里登录的时候会返回一个登录凭证，以前是发送一次请求换一个，现在好像是登陆凭证有5分钟的登录时间
  //         //从这种情况来看微信小程序的发展还是不错的，以前估计没多少人访问，现在访问量上去后，后台的布局重新架构了
  //         var code = res.code;//登录凭证
  //         console.log('登录凭证：', code);

  //         //获取用户信息
  //         wx.getUserInfo({
  //           //当你获取用户信息的时候会弹出一个弹框，是否允许授权
            
  //           //这里点击允许触发的方法
  //           success: function (res2) {
  //             console.log('获取用户信息成功')
  //             that.globalData.userInfo = res2.userInfo;
  //             // console.log('获取用户信息');ok
  //             //准备数据（下面这些参数都是必须参数，请不要问为什么，看文档）
  //             var data = {encryptedData: res2.encryptedData, iv: res2.iv, code: code};

  //             //请求自己的服务器（在这里我结合promise封装了一下request请求）
  //             util.commonAjax('方法名', 'POST', data)
  //             .then(function (resolve) {
  //               //这里是接口返回的参数
  //               if(resolve.data.status === 200) {
  //                 //成功
  //                 console.log('请求服务器成功')
  //                 wx.setStorageSync('userInfo', resolve.data.data);
  //                 //下面这行有好处，新手注意
  //                 typeof cb == 'function' && cb(that.globalData.userInfo);
  //               } else {
  //                 //失败
  //                 console.error('请求服务器失败')
  //               }
  //             })
  //           },

  //           //这里是用户点击拒绝触发的方法
  //           fail: function (res2) {
  //             //在这里做一下兼容，有些同行的用户会点击拒绝玩一下你的小程序，看你的小程序是否存在bug
  //             //所以在这里加两行代码，打开微信小程序的设置，允许小程序重新授权的页面
  //             wx.openSetting({
  //               success: (res) => {
  //                 //下面代码的格式按照我的写，不要看工具打印什么的，在这里提醒一下，有时候不要相信开发者工具，因为Android和ios还有工具底层的js库是不同的，有些时候坑的是你是一点脾气都没有，所以要注意一下，不相信的慢慢自己去跳坑把
  //                 if(res.authSetting['scope.userInfo']) {
  //                   //进入这里说明用户重新授权了，重新执行获取用户信息的方法
  //                   that.getUserInfo();
  //                 }
  //               }
  //             })
  //           }
  //         })
  //       }
  //     })
  //   }
  // },