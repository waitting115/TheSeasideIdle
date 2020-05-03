
const app = getApp();

Page({
  data: {
    user: {},
    admin: -1,//-1代表不是管理员，大于-1表示是管理员
    newMsgSum: 0,
    meFocus: 0,
    focusMe: 0,
    myList: [
      {
        myImg: "/icons/redstar.png",
        myTitle: "我收藏的",
        myRightImg: "/icons/right.png"
      },
      {
        myImg: "/icons/message3.png",
        myTitle: "我的消息",
        myRightImg: "/icons/right.png"
      },
      {
        myImg: "/icons/dollar7.png",
        myTitle: "我发布的",
        myRightImg: "/icons/right.png"
      },
      {
        myImg: "/icons/customerservice.png",
        myTitle: "客服中心",
        myRightImg: "/icons/right.png"
      },
      {
        myImg: "/icons/opinion3.png",
        myTitle: "意见反馈",
        myRightImg: "/icons/right.png"
      },
      {
        myImg: "/icons/set.png",
        myTitle: "设置",
        myRightImg: "/icons/right.png"
      },
    ]
  },
  onShow: function (e) {
    let newMsgSum = 0;
    let user = app.globalData.user;
    for (let i = 0, len = user.myMessage.length; i<len; i++) {
      newMsgSum += user.myMessage[i].newMsgNum;
    }
    // console.log(newMsgSum)
    this.setData({
      meFocus : app.globalData.user.meFocus.length,
      focusMe : app.globalData.user.focusMe.length,
      user: user,
      newMsgSum : newMsgSum
    })
    //判断是否是管理员
    let adminArr = app.globalData.admin;
    let admin = adminArr.findIndex(function (s) {
      return s == app.globalData.user.openID;
    })
    this.setData({
      admin : admin
    })
    // console.log(this.data.admin);
  },
  // onShow: function () {
  //   this.setData({
  //     newMsgSum: app.globalData.user.myMessage
  //   })
  // },
  inMyattention: function (e) {
    if(e.currentTarget.dataset.cls == "meFocus") {
      let msg = JSON.stringify(app.globalData.user.meFocus);
      wx.navigateTo({
        url: '/pages/myPage/myAttention/myAttention?msg=' + msg,
      })
    } else if (e.currentTarget.dataset.cls == "focusMe") {
      let msg = JSON.stringify(app.globalData.user.focusMe);
      // console.log(msg)
      wx.navigateTo({
        url: '/pages/myPage/myAttention/myAttention?msg=' + msg,
      })
    }
  },
  inFunction: function (e) {
    // console.log(e.currentTarget.dataset.title);
    switch (e.currentTarget.dataset.title) {
      case "我收藏的" :
        let myCollection = JSON.stringify(app.globalData.user.myCollection);
        // console.log(myCollection)
        wx.navigateTo({
          url: '/pages/myPage/myCollection/myCollection?myCollection' + myCollection,
        })
        break;
      case "我的消息" :
        let myMsg = JSON.stringify(app.globalData.user.myMessage);
        // console.log(myMsg);
        wx.navigateTo({
          url: '/pages/myPage/myMessage/myMessage?myMsg=' + myMsg,
        })
        break;
      case "我发布的" :
        let myPublish = JSON.stringify(app.globalData.user.goods);
        // console.log(myPublish);
        wx.navigateTo({
          url: '/pages/myPage/myPublish/myPublish?myPublish' + myPublish,
        })
        break;
      case "客服中心" :
        wx.navigateTo({
          url: '/pages/myPage/callCenter/callCenter',
        })
        break;
      case "意见反馈" :
        wx.navigateTo({
          url: '/pages/myPage/feedback/feedback',
        })
        break;
      case "设置" :
        wx.navigateTo({
          url: '/pages/myPage/install/install',
        })
        break;
      default :
        console.log("出错啦");
    }
  },
  backStage: function () {
    wx.navigateTo({
      url: '/pages/myPage/backStage/backStage',
    })
  }
})