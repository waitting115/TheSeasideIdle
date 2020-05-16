
let app = getApp();

Page({
  data: {
    currentMsg: [],//存放当前详情页需要的数据,
    str: '',//openID + ‘-’ + goodsID
    tabBar : [],
    tabBar1: [
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
        iconUrl: "/icons/Noredstar.png",
      },
      {
        title: "分 享",
        iconUrl: "/icons/share(2).png",
      }
    ],
    tabBar2 :  [//已收藏
      {
        title: "店 铺",
        iconUrl: "/icons/shop.png",
      },
      {
        title: "私 信",
        iconUrl: "/icons/message3.png",
      },
      {
        title: "已收藏",
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
    let myCollection = app.globalData.user.myCollection;
    let str = item.openID + '-' + item.goodsID;
    this.setData({
      currentMsg: item,
      tabBar : this.data.tabBar1,
      str : str
    });
    //判断该商品是否已收藏
    for(let i of myCollection) {
      if(i === str) {
        this.setData({
          tabBar : this.data.tabBar2
        })
      }
    }
  },
  tabBarClick: function (e) {
    let sign = e.currentTarget.dataset.sign;
    switch(sign) {
      case "店 铺":
        let userOpenID = this.data.currentMsg.openID;
        wx.navigateTo({
          url: '/pages/homePage/individualStore/individualStore?userOpenID=' + userOpenID,
        })
        break;
      case "私 信":
        wx.showModal({
          title: '该功能正在开发中，敬请期待~'
        })
        break;
      case "收 藏":
        //未收藏变收藏
        if(this.data.tabBar === this.data.tabBar1) {
          this.setData({
            tabBar : this.data.tabBar2
          });
          app.globalData.user.myCollection.push(this.data.str);
        }
        // console.log(app.globalData.user.myCollection)
        wx.showToast({
          title: '已收藏',
        })
        break;
      case "已收藏":
        //已收藏变未收藏
        this.setData({
          tabBar : this.data.tabBar1
        })
        app.globalData.user.myCollection = app.globalData.user.myCollection.filter((item) => {
          if(item === this.data.str) {
            return false;
          }
          return true;
        });
        // console.log(app.globalData.user.myCollection)
        wx.showToast({
          title: '取消收藏',
        })
        break;
      case "分 享":
        wx.showModal({
          title: '该功能正在开发中，敬请期待~'
        })
        break;
      default :
        console.log("出错啦！");
    }
  }
})