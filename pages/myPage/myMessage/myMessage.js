
const app = getApp();

Page({
  data: {
    myMsg: [],
    startX: 0,
    endX: 0,
    delBtnWidth: 200
  },
  onLoad: function (options) {
    let myMsg = app.globalData.user.myMessage;
    let allUser = app.globalData.allUser;
    for(let j=0,len=myMsg.length; j<len; j++) {
      for (let i = 0, len = allUser.length; i < len; i++) {
        if (allUser[i].openID == myMsg[j].openID) {
          myMsg[j].headImg = allUser[i].headPortraitUrl;
          myMsg[j].userName = allUser[i].userName;
        }
      }
    }
    this.setData({
      myMsg : myMsg
    })
  },
  click: function (e) {
    //进入到聊天界面
  },
  //实现左滑删除有两种效果：第一种是左滑一点删除块直接运动出来，另一种是判断用户左滑的长度与删除块大小作比较，大于一半则划出来，小于一半则缩回去，此处暂时用第二种方法
  touchstart: function (e) {
    // console.log(e);
    //判断是否只有一个触摸点
    if(e.changedTouches.length == 1) {
      this.setData({
        startX: e.changedTouches[0].clientX
      })
    }
  },
  touchmove: function (e) {
    if(e.changedTouches.length == 1) {
      let moveX = e.changedTouches[0].clientX;
      let disX = this.data.startX - moveX;
      let delBtnWidth = this.data.delBtnWidth;
      let txtStyle = "";
      // console.log(disX)
      if(disX <= 0) {//如果移动距离小于等于0，文本层位置不变
        txtStyle = "left: 0";
      } else if (disX >0) {//移动距离大于0，文本层left等于移动距离
        txtStyle = "left:-" + disX + "rpx";
        if(disX >= delBtnWidth) {//移动距离大于删除按钮长度，则就等于删除按钮长度
          txtStyle = "left:-" + delBtnWidth + "rpx";
        }
      } 
      //获取手指触摸的是哪个item
      let index = e.currentTarget.dataset.index;
      let list = this.data.myMsg;
      //将拼接好的样式设置到当前的item中
      list[index].txtStyle = txtStyle;
      // 更新列表状态
      this.setData({
        myMsg : list
      })
    }
  },
  touchend: function (e) {
    if(e.changedTouches.length == 1) {
      let endX = e.changedTouches[0].clientX;
      let disX = this.data.startX - endX;
      let delBtnWidth = this.data.delBtnWidth;
      //如果距离小于删除按钮的1/2，不显示删除按钮
      // console.log("endX:",endX);
      // console.log("this.data.startX:",this.data.startX);
      // console.log("disX:",disX);
      let txtStyle = disX >= delBtnWidth/2 ? "left:-" + delBtnWidth + "rpx" : "left:0";
      //获取手指触摸的是哪个item
      // console.log("txtStyle:",txtStyle);
      let index = e.currentTarget.dataset.index;
      let list = this.data.myMsg;
      //将拼接好的样式设置到当前的item中
      list[index].txtStyle = txtStyle;
      // 更新列表状态
      this.setData({
        myMsg: list
      })
    }
  },
  deleteItem: function (e) {
    let index = e.currentTarget.dataset.index;
    let myMsg = this.data.myMsg;
    myMsg.splice(index, 1);//点击删掉
    this.setData({
      myMsg: myMsg
    })
  }
})