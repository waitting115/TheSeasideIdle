
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
    // console.log(options.userOpenID)
    //判断是从哪里点进来的，前者是在个人主页的关注页点进来，后者是从商品页点店铺进来---这里的问题及已经用另一种方法解决了
    // if(app.globalData.openID_1 != "") {
    //   this.setData({
    //     userOpenID: app.globalData.openID_1,
    //     user: app.globalData.user
    //   })
    //   app.globalData.openID_1 = "";//将app.globalData.openID_1清空
    // } else {
      // console.log(options)
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
    // for(let i = 0, len = recom.length; i < len; i ++) {
    //   recom[i].headPortraitUrl = this.data.currentUser.headPortraitUrl;
    //   recom[i].userName = this.data.currentUser.userName;
    //   recom[i].openID = this.data.currentUser.openID;
    // }
    this.setData({
      recommendation : recom
    })
    recom = null;
    // console.log(this.data.currentUser)
    // console.log(this.data.user)
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
    //可优化
    //取出app中的allUser，找到商家的位置并将用户的openID添加到商家的focusMe中，然后修改app中的allUser
    // let allUser = app.globalData.allUser;
    // console.log(allUser);
    //emmm...这里经过测试，控制台显示app.js中的数据也已经改变了，所以说就不用下面的步骤了，但这也正说明了，本页中的user，currentUser等都是指针，并非真正的赋值了！！！重大发现。但是这里还是有个问题，点击关注后我代码中的app.js中的数据并没有改变，难道是因为没有把代码放到服务器上的原因？
    // app.data.wawa = 2;
    // console.log(app.data.wawa);
    //又测试了一番，事实证明，控制台输出显示数据已经变化了，但是编译器中的代码是不会发生变化的，如果你刷新了，模拟器还是会按照编译器中的代码来渲染。这个问题可能把代码放到服务器上就好了。

    // for (let i = 0, len = allUser.length; i < len; i++) {
    //   if (allUser[i].openID == this.data.userOpenID) {
    //     allUser[i].focusMe.push(this.data.user.openID)
    //   }
    // }
    // console.log(allUser);
    // app.globalData.allUser = allUser;

    // console.log("user.meFocus:", this.data.user.meFocus);
    // console.log("currentUser.focusMe:", this.data.currentUser.focusme);
  },
  focusedOn : function () {
    //思路：点击已关注按钮将取消关注，将btnDisplay变量转换为true；将用户的meFocus中删除商家的openID；将商家的meFocus中删除用户的openID。
    this.setData({
      btnDisplay : true
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
    //有着与上面一样的问题，控制台显示功能正常，但是编辑器中代码不会改变
  }
})