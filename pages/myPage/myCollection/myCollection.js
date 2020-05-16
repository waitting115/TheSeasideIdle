
const app = getApp();

Page({
  data: {
    myClt : []
  },
  onShow: function (options) {
    let user = app.globalData.user;
    let allUser = app.globalData.allUser;
    let myCollection = user.myCollection;
    let myClt = [];
    //将用户资料中的 我的收藏 数组分解并在所有用户中找到该商品，添加到myClt中
    for(let i=0,len=myCollection.length; i<len; i++) {
      let item = myCollection[i].split('-');
      for(let j=0,len=allUser.length; j<len; j++) {
        if(allUser[j].openID == item[0]) {
          let userName = allUser[j].userName;
          let openID = allUser[j].openID;
          for(let k=0,len=allUser[j].goods.length; k<len; k++) {
            if(allUser[j].goods[k].goodsID == item[1]) {
              let obj = allUser[j].goods[k];
              obj.userName = userName;//将商家的昵称放进myClt各项中
              obj.openID = openID;//将商家的openID放进myClt各项中
              myClt.push(obj);
            }
          }
        }
      }
    }
    this.setData({
      myClt : myClt
    })
  },
  clickShop: function (e) {
    let userOpenID = e.currentTarget.dataset.openid;//这里奥，很重要，在dataset中大写会自动转换为小写
    wx.navigateTo({
      url: '/pages/homePage/individualStore/individualStore?userOpenID=' + userOpenID,
    })

  },
  clickGoods: function (e) {
    let item = JSON.stringify(e.currentTarget.dataset.item)
    wx.navigateTo({
      url: '/pages/homePage/goodsDetails/goodsDetails?item=' + item,
    })
  }
})