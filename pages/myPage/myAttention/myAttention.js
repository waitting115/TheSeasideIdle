
const app = getApp();

Page({
  data: {
    meFocus: [],
  },
  onLoad: function (options) {
    let mef = JSON.parse(options.msg);
    let meFocus = [];
    let allUser = app.globalData.allUser;
    let user = app.globalData.user;
    for(let i = 0, len = mef.length; i < len; i ++) {
      for(let j = 0, length = allUser.length; j < length; j ++) {
        if(mef[i] == allUser[j].openID) {
          meFocus[i] = allUser[j];
          //判断是加关注还是已关注
          // console.log(user.meFocus)
          // console.log(allUser[j].openID);
          // console.log(user.meFocus.indexOf("snwn"))
          if(user.meFocus.indexOf(allUser[j].openID)+1) {//因为第一位的下标是0，不会通过if语句
            // console.log(user.meFocus.indexOf(allUser[j].openID))
            meFocus[i].addAttention = false;
          } else {
            meFocus[i].addAttention = true;
          }
        }
      }
    }
    this.setData({
      meFocus : meFocus
    })
    // console.log(this.data.meFocus)
  },
  //思路:跳转的时候在全局变量里设置一个变量cate_id,调到category.js中后.调取全局变量里的cate_id,用完后,再把这个变量清除掉.--这是一个思想，但是这里并没有使用成功，最后还是使用的navigateTo方法，官网说不能跨tabBar但是实际上还是可以的
  inIndividualStore:function (e) {
    let openID_1 = e.currentTarget.dataset.openid_1;
    //app.globalData.openID_1 = openID_1;//设置全局变量
    // console.log(app.globalData.openID_1);
    wx.navigateTo({
      url: '/pages/homePage/individualStore/individualStore?userOpenID=' + openID_1,
    })
  },
  clickBtn: function (e) {
    if(e.currentTarget.dataset.cls == "focusOn") {
      //加关注按钮
      wx.showToast({
        title: '已关注',
      })
      let user_1 = app.globalData.user;
      let id = e.currentTarget.dataset.item.openID;
      user_1.meFocus.push(id);//把他加到我的meFocus中
      // console.log(user_1.meFocus);
      for (let i = 0, len = this.data.meFocus.length; i < len; i++) {//找到当前点击的人
        if (this.data.meFocus[i].openID == id) {

          this.data.meFocus[i].focusMe.push(app.globalData.user.openID);//把我添加到他的focusme中
          // console.log(this.data.meFocus[i].focusMe);
          this.setData({//修改按钮状态
            ['meFocus[' + i + '].addAttention']: false
          })
        }
      }
    } else if (e.currentTarget.dataset.cls == "focusedOn") {
      //已关注按钮
      wx.showToast({
        title: '已取消关注',
      })
      let id = e.currentTarget.dataset.item.openID;
      let user_1 = app.globalData.user;
      let index = user_1.meFocus.indexOf(id);//找到位置把他在我的meFocus中删掉
      user_1.meFocus.splice(index, 1);
      // console.log(user_1.meFocus);
      for(let i=0, len=this.data.meFocus.length; i<len; i++) {
        if(this.data.meFocus[i].openID == id) {

          let index = this.data.meFocus[i].focusMe.indexOf(app.globalData.user.openID);//找到位置把我在他的focusMe中删掉
          this.data.meFocus[i].focusMe.splice(index, 1);
          // console.log(this.data.meFocus[i].focusMe)
          this.setData({
            ['meFocus['+i+'].addAttention'] : true
          })
        }
      }
    } else {
      console.log("出错啦！")
    }
  },
})