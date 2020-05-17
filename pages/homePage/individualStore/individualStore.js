
const app = getApp();

Page({
  data: {
    userOpenID: "",
    currentUser: {},//商家信息
    user: {},
    btnDisplay: true,
    recommendation: [],
  },
  onLoad: function (options) {
      this.setData({
        userOpenID: options.userOpenID,
        user: app.globalData.user
      })
    // }
    // console.log(this.data.allUser)
    let allUser = app.globalData.allUser;
    //利用openID找到商家
    for(let i = 0, len = allUser.length; i < len; i ++) {
      if( allUser[i].openID == this.data.userOpenID) {
        this.setData({
          currentUser :  allUser[i]
        })
      }
    }
    allUser = null;
    //为传入组件的数据添加商家昵称和头像url
    let recom = this.data.currentUser.goods;
    this.setData({
      recommendation : recom
    })
    recom = null;
    //判断关注按钮应有的状态
    let meFocus = this.data.user.meFocus;
    let currentUserOpenID = this.data.currentUser.openID;
    for( let i = 0, len = meFocus.length; i < len; i ++) {
      if(meFocus[i] == currentUserOpenID) {
        this.setData({
          btnDisplay : false
        })
      }
    }
    meFocus = null;
    currentUserOpenID = null;
  },
  focusOn : function () {
    //思路：点击关注按钮，将btnDisplay变量转换为false；将用户的meFocus中添加商家的openID；将商家的meFocus中添加用户的openID，而且这里不能只修改app.js中的数据，因为那样此页并不能重新渲染，所以要两个页面的数据都改
    this.setData({
      btnDisplay : false
    })
    wx.showToast({
      title: '已关注',
    })
    let user_1 = this.data.user;
    user_1.meFocus.push(this.data.currentUser.openID);
    let currentUser_1 = this.data.currentUser;
    currentUser_1.focusMe.push(this.data.user.openID);
    this.setData({
      user : user_1,
      currentUser : currentUser_1
    })
    user_1 = null;
    currentUser_1 = null;
  },
  focusedOn : function () {
    //思路：点击已关注按钮将取消关注，将btnDisplay变量转换为true；将用户的meFocus中删除商家的openID；将商家的meFocus中删除用户的openID。
    this.setData({
      btnDisplay : true
    })
    wx.showToast({
      title: '已取消关注',
    })
    let user_1 = this.data.user;
    let index = user_1.meFocus.indexOf(this.data.currentUser.openID);
    user_1.meFocus.splice(index, 1);
    let currentUser_1 = this.data.currentUser;
    let index_1 = currentUser_1.focusMe.indexOf(this.data.user.openID);
    currentUser_1.focusMe.splice(index_1, 1);
    this.setData({
      user: user_1,
      currentUser: currentUser_1
    })
  }
})