
let app = getApp();

Page({
  data: {
    currentMsg: [],//存放当前详情页需要的数据
    tabBar: [
      {
        title: "店 铺",
        iconUrl: "/icons/shop.png",
      },
      {
        title: "私 信",
        iconUrl: "/icons/message3.png",
      },
      {
        title: "收 藏",
        iconUrl: "/icons/redstar.png",
      },
      {
        title: "分 享",
        iconUrl: "/icons/share(2).png",
      },
    ]
  },
  onLoad: function (options) {
    //获得app.js和上一页传过来的数据
    let item = JSON.parse(options.item);//json-->obj
    this.setData({
      currentMsg: item,
    })
  },
  inFunction: function (e) {
    // console.log(e.currentTarget.dataset.sign);
    let sign = e.currentTarget.dataset.sign;
    switch(sign) {
      case "店 铺":
        let userOpenID = this.data.currentMsg.openID;
        wx.navigateTo({
          url: '/pages/homePage/individualStore/individualStore?userOpenID=' + userOpenID,
        })
        break;
      case "私 信":

        break;
      case "收 藏":

        break;
      case "分 享":

        break;
      default :
        console.log("出错啦！");
    }
  }
})